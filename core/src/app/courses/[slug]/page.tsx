'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import CourseContent from '@/components/CourseContent'
import { useParams } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/config/firebase'
import Loader from '@/components/loader'

// Mock data for the course


export default function CoursePage() {
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [courseData, setCourse] = useState({})
  const [loading, setLoading] = useState(false)
  const { slug } = useParams()
  useEffect(() => {
    
    // Fetch course data based on the slug
         async function getCourse(){
          setLoading(true)
            const course=await getDoc(doc(db, 'courses', slug))
           
            setCourse(course.data)
            setLoading(false)
            
        }
        console.log(courseData);
        

        getCourse()
  },[])


  if (loading){
    return (
      <Loader />
    )
  }
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
                  src="/placeholder.svg?height=50&width=50"
                  alt="Jhon Doe"
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">Jhon Doe</p>
                  <p className="text-sm text-gray-600">Instructor</p>
                </div>
              </div>
              <div className="flex items-center mb-6">
                <span className="text-yellow-500 mr-2">★☆</span>
                <span className="font-semibold">4.2</span>
                <span className="text-gray-600 ml-2">student</span>
              </div>
              <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEnrolled(!isEnrolled)}
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
                  src="/placeholder.svg?height=200&width=400"
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
                  onClick={() => setIsEnrolled(!isEnrolled)}
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
  )
}

