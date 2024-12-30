import { motion } from 'framer-motion'

interface CourseCardProps {
  title: string
  description: string
  price: number
  discountedPrice: number
  ribbon?: string
}

const CourseCard: React.FC<CourseCardProps> = ({ title, description, price, discountedPrice, ribbon }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden relative"
    >
      {ribbon && (
        <div className="absolute top-4 right-0 bg-red-500 text-white py-1 px-4 transform rotate-45 translate-x-5">
          {ribbon}
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-gray-400 line-through">${price}</span>
            <span className="text-2xl font-bold text-green-600 ml-2">${discountedPrice}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 text-white px-4 py-2 rounded-full"
          >
            Enroll Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default CourseCard

