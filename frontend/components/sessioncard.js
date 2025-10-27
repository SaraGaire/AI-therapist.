import Link from 'next/link'

export default function SessionCard({ session }) {
  const { _id, createdAt } = session

  return (
    <Link href={`/chat/${_id}`} className="block border rounded-lg shadow-sm hover:shadow-md p-4 transition">
      <h3 className="font-semibold text-gray-800">Therapy Session</h3>
      <p className="text-sm text-gray-500 mt-1">
        {new Date(createdAt).toLocaleString()}
      </p>
    </Link>
  )
}
