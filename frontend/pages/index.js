import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to AI Therapist</h1>
      <p className="max-w-xl text-gray-600 mb-8">
        Your confidential AI-powered mental health companion. Engage in real-time, empathetic
        conversations designed to help you process and reflect safely.
      </p>
      <div className="flex gap-4">
        <Link href="/auth/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg">Login</Link>
        <Link href="/auth/register" className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg">
          Register
        </Link>
      </div>
    </main>
  )
}
