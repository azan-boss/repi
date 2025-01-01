'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc, getDocs, collection } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';
import Header from '@/components/Header';
import InstructorStats from '@/components/InstructorStats';
import StudentList from '@/components/StudentLisy';
import EnrolledCourses from '@/components/EnrolledCourses';
import QuickStats from '@/components/QuickStats';
import ProgressChart from '@/components/ProgressChar';
import CourseOverview from '@/components/CourseOverview';
import UpcomingAssignments from '@/components/UpcomingAssignment';
import Loader from '@/components/loader';

export default function Dashboard() {
  const [isStudent, setIsStudent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [studentCourses, setStudentCourses] = useState<string[]>([]);
  const [studentName, setStudentName] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          
          const userDocs = await getDocs(collection(db, 'identifier'));
          userDocs.forEach((doc) => {
            const userData = doc.data();
            if (userData.email === user.email) {
              if (userData.role === 'student') {
                setStudentName(userData.fullName);
                setStudentCourses(userData.courses || []);
                setIsStudent(true);
              }
            }
          });
        } catch (error) {
          console.error('Error fetching user data:', error.message);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });

    const fetchCourse=()=>{
      const getCourse=doc(db,"courses")
    }

    return () => unsubscribe();
  }, []);



  console.log(studentName);
  console.log(studentCourses);
  
  if (loading) {
    return <p>loading.....</p>  // Show a loader while data is being fetched
  }

  if (isStudent) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-8">
          <h1 className="text-2xl font-bold mb-4">Welcome, {studentName}!</h1>
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              className="col-span-1 lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ProgressChart courses={studentCourses} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <QuickStats />
            </motion.div>
            <motion.div
              className="col-span-1 lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <EnrolledCourses courses={studentCourses} />
            </motion.div>
            <motion.div
              className="col-span-1 lg:col-span-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <UpcomingAssignments />
            </motion.div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <h1 className="mb-8 text-3xl font-bold">Instructor Dashboard</h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <InstructorStats />
        </motion.div>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CourseOverview />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <StudentList />
          </motion.div>
        </div>
      </div>
    </>
  );
}
