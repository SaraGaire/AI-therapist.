import fetch from 'node-fetch'
import Message from '../models/Message.js'
import Session from '../models/Session.js'

export const sendMessage = async (req, res) => {
  const { sessionId, message } = req.body

  try {
    // Store user message
    const userMessage = await Message.create({
      sessionId,
      role: 'user',
      text: message,
    })

    // Send to Echo API (replace with real key)
    const aiRes = await fetch('https://api.echoai.com/v1/therapist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ECHO_API_KEY}`,
      },
      body: JSON.stringify({ prompt: message }),
    })

    const aiData = await aiRes.json()
    const aiResponseText = aiData.response || 'I’m here with you. Can you tell me more?'

    // Store AI response
    const aiMessage = await Message.create({
      sessionId,
      role: 'ai',
      text: aiResponseText,
    })

    await Session.findByIdAndUpdate(sessionId, {
      $push: { messages: { $each: [userMessage._id, aiMessage._id] } },
    })

    res.json({ userMessage, aiResponse: aiMessage })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error processing message' })
  }
}
