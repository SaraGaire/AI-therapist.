import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center">
      <Link href="/" className="text-2xl font-semibold text-blue-700">
        AI Therapist
      </Link>
      <div className="flex gap-4 items-center">
        {session ? (
          <>
            <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/login" className="text-blue-600">Login</Link>
            <Link href="/auth/register" className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
