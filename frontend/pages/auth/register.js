import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    if (res.ok) router.push('/auth/login')
    else alert('Registration failed')
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Create Account</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded w-full p-2 mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded w-full p-2 mb-4"
        />
        <button className="bg-green-600 text-white w-full py-2 rounded">Register</button>
      </form>
    </main>
  )
}
