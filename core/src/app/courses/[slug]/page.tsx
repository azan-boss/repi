'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { useParams } from 'next/navigation';
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '@/config/firebase';
import Loader from '@/components/loader';
import { onAuthStateChanged } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

// Define a type for course data
type CourseData = {
  title: string;
  description: string;
  image?: string;
  instructorName?: string;
  instructorImage?: string;
  rating?: number;
  students?: number;
  price: number;
  priceDiscount: number;
};

export default function CoursePage() {
  const {toast} = useToast();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const courseRef = doc(db, 'courses', slug);
        const courseSnap = await getDoc(courseRef);
        if (courseSnap.exists()) {
          setCourseData(courseSnap.data() as CourseData);
        } else {
          console.error('Course not found');
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
      } finally {
        setLoading(false);
      }
    };

    const getUserDetails = () => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const email = user.email;
            const userQuery = query(
              collection(db, 'identifier'),
              where('email', '==', email)
            );
            const querySnapshot = await getDocs(userQuery);
            if (!querySnapshot.empty) {
              const userDoc = querySnapshot.docs[0];
              const courses = userDoc.data().courses || [];
              setIsEnrolled(courses.includes(slug));
            }
          } catch (error) {
            console.error('Error fetching user details:', error);
          }
        }
      });
      return unsubscribe;
    };

    if (slug) {
      fetchCourse();
      const unsubscribe = getUserDetails();
      return () => unsubscribe(); // Clean up the listener on component unmount
    }
  }, [slug]);

  if (loading) {
    return <Loader />;
  }

  if (!courseData) {
    return <div className="text-center py-20">Course not found.</div>;
  }

  const handleEnroll = async () => {
    if (!auth.currentUser) {
      toast({ title: 'Error', description: 'You must be logged in to enroll.' });
      return;
    }

    const email = auth.currentUser.email;
    try {
      const userQuery = query(
        collection(db, 'identifier'),
        where('email', '==', email)
      );
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const courses = userDoc.data().courses || [];

        if (courses.includes(slug)) {
          toast({ title: 'Info', description: 'You are already enrolled in this course.' });
        } else {
          await updateDoc(userDoc.ref, { courses: arrayUnion(slug) });
          toast({ title: 'Success', description: 'You have successfully enrolled in the course.' });
          setIsEnrolled(true);
        }
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      toast({ title: 'Error', description: 'Failed to enroll. Please try again later.' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold mb-4"
              >
                {courseData.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-600 mb-6"
              >
                {courseData.description}
              </motion.p>
              <div className="flex items-center mb-6">
                <Image
                  src={courseData.instructorImage || '/placeholder.svg'}
                  alt={courseData.instructorName || 'Instructor'}
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">{courseData.instructorName || 'Instructor'}</p>
                  <p className="text-sm text-gray-600">Instructor</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEnroll}
                className={`w-full py-6 rounded-full font-semibold text-white ${
                  isEnrolled ? 'bg-green-600' : 'bg-purple-600'
                }`}
              >
                {isEnrolled ? 'Enrolled' : 'Enroll Now'}
              </motion.button>
            </div>
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg p-6 sticky top-6"
              >
                <Image
                  src={courseData.image || '/placeholder.svg'}
                  alt={courseData.title}
                  width={400}
                  height={200}
                  className="w-full rounded-lg mb-4"
                />
                <div className="mb-4">
                  <span className="text-3xl font-bold">${courseData.priceDiscount}</span>
                  <span className="text-gray-500 line-through ml-2">${courseData.price}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEnroll}
                  className={`w-full py-3 rounded-full font-semibold text-white ${
                    isEnrolled ? 'bg-green-600' : 'bg-purple-600'
                  }`}
                >
                  {isEnrolled ? 'Enrolled' : 'Enroll Now'}
                </motion.button>
                <p className="text-sm text-gray-600 mt-4">30-day money-back guarantee</p>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
