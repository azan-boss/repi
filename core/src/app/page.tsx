'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SaleAlert from '../components/SaleAlert'
import CourseCard from '../components/CourseCard'
import {auth} from "@/config/firebase"
import { useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";

const courses = [
  { title: 'Web Development Bootcamp', description: 'Learn full-stack web development from scratch', price: 199, discountedPrice: 99, ribbon: 'Bestseller', slug: 'web-development-bootcamp' },
  { title: 'Data Science Fundamentals', description: 'Master the basics of data science and analytics', price: 149, discountedPrice: 74, slug: 'data-science-fundamentals' },
  { title: 'Mobile App Development', description: 'Create iOS and Android apps with React Native', price: 179, discountedPrice: 89, ribbon: 'New', slug: 'mobile-app-development' },
  { title: 'Machine Learning A-Z', description: 'Comprehensive machine learning course for beginners', price: 199, discountedPrice: 99, slug: 'machine-learning-a-z' },
  { title: 'Digital Marketing Mastery', description: 'Learn to grow your business with digital marketing', price: 129, discountedPrice: 64, slug: 'digital-marketing-mastery' },
  { title: 'Graphic Design Essentials', description: 'Master the fundamentals of graphic design', price: 159, discountedPrice: 79, slug: 'graphic-design-essentials' },
]





export default function Home() {
  useEffect(()=>{
      const unsubcribe = onAuthStateChanged(auth,(user)=>{
        if(user){
          console.log(user.email)
          console.log(user.uid)
        }
  
      })
   return ()=>unsubcribe()
  },[])
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
                  key={course.title}
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
  )
}

