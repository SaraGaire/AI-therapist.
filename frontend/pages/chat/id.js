import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function ChatSession() {
  const router = useRouter()
  const { id } = router.query
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    if (id) {
      fetch(`/api/session/${id}`)
        .then(res => res.json())
        .then(data => setMessages(data.messages))
    }
  }, [id])

  const sendMessage = async () => {
    const res = await fetch('/api/conversation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: id, message: input })
    })
    const data = await res.json()
    setMessages(prev => [...prev, data.userMessage, data.aiResponse])
    setInput('')
  }

  return (
    <main className="flex flex-col h-screen p-6">
      <div className="flex-1 overflow-y-auto border p-4 rounded bg-gray-50 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === 'ai' ? 'text-blue-700' : 'text-gray-800'}`}>
            <strong>{msg.role === 'ai' ? 'Therapist' : 'You'}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-1 border rounded-l p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 rounded-r">Send</button>
      </div>
    </main>
  )
}
