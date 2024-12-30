import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface Module {
  title: string
  lessons: string[]
}

interface CourseContentProps {
  modules: Module[]
}

const CourseContent: React.FC<CourseContentProps> = ({ modules }) => {
  const [openModule, setOpenModule] = useState<number | null>(null)

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Course Content</h3>
      {modules.map((module, index) => (
        <div key={index} className="mb-4">
          <motion.button
            className="w-full flex justify-between items-center bg-gray-100 p-4 rounded-lg"
            onClick={() => setOpenModule(openModule === index ? null : index)}
          >
            <span className="font-semibold">{module.title}</span>
            {openModule === index ? <ChevronUp /> : <ChevronDown />}
          </motion.button>
          <AnimatePresence>
            {openModule === index && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white border border-gray-200 rounded-b-lg overflow-hidden"
              >
                {module.lessons.map((lesson, lessonIndex) => (
                  <li key={lessonIndex} className="p-3 border-b last:border-b-0">
                    {lesson}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

export default CourseContent

