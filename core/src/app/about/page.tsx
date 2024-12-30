'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
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
              About EduLearn
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl mb-8"
            >
              Empowering learners worldwide with quality education
            </motion.p>
          </div>
        </section>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-gray-600 mb-4">
                  At EduLearn, we believe that education should be accessible to everyone, everywhere. Our mission is to provide high-quality, affordable online courses that empower individuals to achieve their personal and professional goals.
                </p>
                <p className="text-gray-600 mb-4">
                  We collaborate with industry experts and top educators to create engaging, interactive courses that cater to various learning styles and skill levels. Whether you're looking to advance your career, explore a new hobby, or gain cutting-edge skills, EduLearn has something for you.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="EduLearn Team"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose EduLearn?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Expert Instructors', description: 'Learn from industry professionals and experienced educators.' },
                { title: 'Flexible Learning', description: 'Study at your own pace, anytime and anywhere.' },
                { title: 'Interactive Content', description: 'Engage with multimedia lessons, quizzes, and hands-on projects.' },
                { title: 'Career Support', description: 'Access career guidance and networking opportunities.' },
                { title: 'Affordable Pricing', description: 'High-quality education at competitive prices.' },
                { title: 'Certificate of Completion', description: 'Earn recognized certificates to boost your resume.' },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
