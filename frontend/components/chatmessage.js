export default function ChatMessage({ role, text }) {
  const isAI = role === 'ai'

  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-3`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${
          isAI
            ? 'bg-gray-200 text-gray-900 rounded-bl-none'
            : 'bg-blue-600 text-white rounded-br-none'
        }`}
      >
        {text}
      </div>
    </div>
  )
}
