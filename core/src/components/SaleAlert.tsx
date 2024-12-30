import { motion } from 'framer-motion'

const SaleAlert = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-yellow-400 text-gray-800 py-2 text-center font-bold"
    >
      🎉 Limited Time Offer: 50% OFF on all courses! Use code LEARN50 at checkout 🎉
    </motion.div>
  )
}

export default SaleAlert

