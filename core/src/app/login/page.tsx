'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Mail, Lock, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {signInWithEmailAndPassword } from "firebase/auth"
import { useToast } from '@/hooks/use-toast'
import {auth} from "@/config/firebase"
export default function LoginPage() {
  const router=useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const { toast } = useToast()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    try{
      const user=await signInWithEmailAndPassword (auth,email,password)
      console.log(user.user) 
      setIsLoading(false)
      toast({title:"Login successfully"})
      router.push("/")
    }
    catch(error){
      setIsLoading(false)
      console.log(error);

      toast({title:"Login failed"})
      

    }
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
        Welcome Back
      </motion.h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={e=>{setEmail(e.target.value)}}
              className="pl-10"
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
              placeholder="Enter your password"
              required
              value={password}
              onChange={e=>{setPassword(e.target.value)}}
              className="pl-10"
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
                Logging in...
              </>
            ) : (
              'Log In'
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
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-purple-600 hover:underline">
            Register here
          </Link>
        </motion.p>
      </div>
    </motion.div>
      </div>
  )
}

