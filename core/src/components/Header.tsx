import Link from 'next/link'
import { motion } from 'framer-motion'

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="text-2xl font-bold">EduLearn</Link>
        </motion.div>
        <nav>
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            className="flex space-x-6"
          >
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link href="/courses" className="hover:text-gray-200">Courses</Link>
            </motion.li>
            {['About', 'Contact'].map((item) => (
              <motion.li key={item} whileHover={{ scale: 1.1 }}>
                <Link href={`/${item.toLowerCase()}`} className="hover:text-gray-200">{item}</Link>
              </motion.li>
            ))}
          </motion.ul>
        </nav>
      </div>
    </header>
  )
}

export default Header

