import OpenAI from 'openai'
import Message from '../models/Message.js'
import Session from '../models/Session.js'


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const sendMessage = async (req, res) => {
  const { sessionId, message } = req.body

  try {
 
    const userMessage = await Message.create({
      sessionId,
      role: 'user',
      text: message,
    })


    const previousMessages = await Message.find({ sessionId }).sort({ createdAt: 1 })

    // Convert DB messages into the format expected by OpenAI
    const formattedMessages = [
      {
        role: 'system',
        content:
          'You are a compassionate, empathetic AI therapist. ' +
          'Your job is to listen carefully, provide emotional support, and guide users ' +
          'toward insight and calm reflection. Avoid giving medical advice.',
      },
      ...previousMessages.map((m) => ({
        role: m.role,
        content: m.text,
      })),
    ]

 
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // You can also use "gpt-4-turbo" or "gpt-4o"
      messages: formattedMessages,
      temperature: 0.7, // Controls creativity (0.7 = balanced)
      max_tokens: 300, // Limit the length of the therapist’s response
    })

    const aiResponseText = completion.choices[0].message.content

    
    const aiMessage = await Message.create({
      sessionId,
      role: 'ai',
      text: aiResponseText,
    })

    // 🪄 5. Link both messages (user + AI) to the session
    await Session.findByIdAndUpdate(sessionId, {
      $push: { messages: { $each: [userMessage._id, aiMessage._id] } },
    })

    res.json({ userMessage, aiResponse: aiMessage })
  } catch (error) {
    console.error('Error in AI integration:', error)
    res.status(500).json({ message: 'Error processing AI response' })
  }
}
