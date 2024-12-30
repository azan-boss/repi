'use client'

import { motion } from 'framer-motion'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import CourseCard from '../../components/CourseCard'

const courses = [
  { title: 'Web Development Bootcamp', description: 'Learn full-stack web development from scratch', price: 199, discountedPrice: 99, ribbon: 'Bestseller', slug: 'web-development-bootcamp' },
  { title: 'Data Science Fundamentals', description: 'Master the basics of data science and analytics', price: 149, discountedPrice: 74, slug: 'data-science-fundamentals' },
  { title: 'Mobile App Development', description: 'Create iOS and Android apps with React Native', price: 179, discountedPrice: 89, ribbon: 'New', slug: 'mobile-app-development' },
  { title: 'Machine Learning A-Z', description: 'Comprehensive machine learning course for beginners', price: 199, discountedPrice: 99, slug: 'machine-learning-a-z' },
  { title: 'Digital Marketing Mastery', description: 'Learn to grow your business with digital marketing', price: 129, discountedPrice: 64, slug: 'digital-marketing-mastery' },
  { title: 'Graphic Design Essentials', description: 'Master the fundamentals of graphic design', price: 159, discountedPrice: 79, slug: 'graphic-design-essentials' },
  { title: 'Python for Beginners', description: 'Start your programming journey with Python', price: 129, discountedPrice: 64, slug: 'python-for-beginners' },
  { title: 'Advanced JavaScript', description: 'Take your JavaScript skills to the next level', price: 179, discountedPrice: 89, slug: 'advanced-javascript' },
  { title: 'UX/UI Design Principles', description: 'Learn to create user-friendly and attractive interfaces', price: 149, discountedPrice: 74, slug: 'ux-ui-design-principles' },
]

export default function CoursesPage() {
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
              Explore Our Courses
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl mb-8"
            >
              Discover a wide range of courses to enhance your skills and knowledge
            </motion.p>
          </div>
        </section>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <motion.div
                  key={course.slug}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CourseCard {...course} />
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

