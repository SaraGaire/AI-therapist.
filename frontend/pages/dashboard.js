import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Dashboard() {
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    fetch('/api/session')
      .then(res => res.json())
      .then(data => setSessions(data))
  }, [])

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Your Therapy Sessions</h1>
      <Link href="/chat" className="bg-blue-600 text-white px-4 py-2 rounded">Start New Session</Link>
      <ul className="mt-6 space-y-2">
        {sessions.map(session => (
          <li key={session._id} className="border p-4 rounded shadow-sm">
            <Link href={`/chat/${session._id}`}>Session on {new Date(session.createdAt).toLocaleString()}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
