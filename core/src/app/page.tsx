'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SaleAlert from '../components/SaleAlert';
import CourseCard from '../components/CourseCard';
import { db } from '@/config/firebase';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import Loader from '@/components/loader';
type Course = {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  ribbon?: string;
};

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading,setIsLoading] = useState(false);

  useEffect(() => {
    async function getCourses() {
      setIsLoading(true);
      try {
        const courseDocs = await getDocs(collection(db, 'courses'));
        const fetchedCourses: Course[] = courseDocs.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || 'Untitled Course', // Fallback if title is missing
            description: data.description || 'No description available',
            price: Number(data.price) || 0, // Ensure price is a number
            discountedPrice: Number(data.discountedPrice || data.priceDiscount) || 0, // Handle `priceDiscount` fallback
            ribbon: data.ribbon || undefined, // Optional ribbon field
          };
        });
        setCourses(fetchedCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
      finally {
        setIsLoading(false);
      }
    }
  
    getCourses();
  }, []);
  
  if (isLoading){
      return(
        <Loader/>
      )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SaleAlert />
      <Header />
      <main className="flex-grow bg-gray-100">
        <section className="py-20 bg-gradient-to-b from-purple-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-bold mb-6"
            >
              Unlock Your Potential with EduLearn
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl mb-8"
            >
              Discover a world of knowledge with our expert-led courses
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/courses">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-yellow-400 text-gray-800 px-8 py-3 rounded-full font-bold text-lg"
                >
                  Explore All Courses
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id} // Fixed key usage
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CourseCard {...course} />
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/courses">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-purple-600 text-white px-8 py-3 rounded-full font-bold text-lg"
                >
                  View All Courses
                </motion.button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
