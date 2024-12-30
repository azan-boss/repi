'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { User, Mail, Lock, Loader2 } from 'lucide-react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/config/firebase'
import { useToast } from '@/hooks/use-toast'

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isError, setIsError] = useState(false)
  const { toast } = useToast()
  
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    console.log(email);
    console.log(password);
    try {
      const user= await createUserWithEmailAndPassword(auth,email,password)
      console.log("user created with id",user.user);
      toast({ title: "Login Successfully ",
        description: "You have been logined",})
      setIsError(true)
      router.push("/")
      setIsLoading(false)
      
    } catch (error) {
      console.log("some error occurs");
      setIsLoading(false)
      toast({ title: "User already exists",
        description: "this email already taken",})
      setIsError(true)
      
      
    }
    // await new Promise(resolve => setTimeout(resolve, 2000))
    // setIsLoading(false)
  }

  return (
    <div className='flex  justify-center pt-20'>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-3xl font-bold text-center mb-6 text-gray-800"
      >
        Create an Account
      </motion.h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              required
              className="pl-10"
            />
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              className="pl-10"
              value={email}
              onChange={e=>{setEmail(e.target.value)}}
            />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              required
              className="pl-10"
              value={password}
              onChange={e=>{setPassword(e.target.value)}}

            />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Registering...
              </>
            ) : (
              'Register'
            )}
          </Button>
        </motion.div>
      </form>
      <div className="mt-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-sm text-gray-600"
        >
          Already have an account?{' '}
          <Link href="/login" className="text-purple-600 hover:underline">
            Log in here
          </Link>
        </motion.p>
      </div>
    </motion.div>
    </div>
  )
}
