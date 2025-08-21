'use client'

import { useState } from 'react'

export default function MessageInput({ onSendMessage, disabled }) {
  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <div className="input-container">
      <input
        type="text"
        className="message-input"
        placeholder="메시지를 입력하세요..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={disabled}
        maxLength={500}
      />
      <button
        className="send-button"
        onClick={handleSend}
        disabled={disabled || !message.trim()}
      >
        전송
      </button>
    </div>
  )
}