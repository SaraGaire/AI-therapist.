import { useState } from 'react'

export default function ChatInput({ onSend }) {
  const [input, setInput] = useState('')

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    onSend(input)
    setInput('')
  }

  return (
    <form onSubmit={handleSend} className="flex border-t mt-4 pt-2">
      <input
        className="flex-1 border rounded-l-lg p-3 focus:outline-none"
        type="text"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 rounded-r-lg hover:bg-blue-700"
      >
        Send
      </button>
    </form>
  )
}
