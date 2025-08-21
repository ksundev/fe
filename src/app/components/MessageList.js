'use client'

import { useEffect, useRef } from 'react'

export default function MessageList({ messages, currentUsername }) {
  const messagesEndRef = useRef(null)

  // 새 메시지가 올 때마다 자동 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="messages-container">
      {messages.map((message, index) => {
        const isOwn = message.username === currentUsername
        
        return (
          <div 
            key={index}
            className={`message ${isOwn ? 'own' : 'other'}`}
          >
            <div className="message-header">
              {message.username} • {formatTime(message.timestamp)}
            </div>
            <div className="message-content">
              {message.content}
            </div>
          </div>
        )
      })}
      {/* 자동 스크롤을 위한 빈 요소 */}
      <div ref={messagesEndRef} />
    </div>
  )
}