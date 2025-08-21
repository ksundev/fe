'use client'

import { useState, useEffect, useRef } from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'

export default function ChatRoom({ username }) {
  const [messages, setMessages] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  const wsRef = useRef(null)

  useEffect(() => {
    // WebSocket 연결
    const wsUrl = `ws://localhost:8080/ws?username=${encodeURIComponent(username)}`
    wsRef.current = new WebSocket(wsUrl)

    wsRef.current.onopen = () => {
      console.log('WebSocket 연결 성공')
      setIsConnected(true)
    }

    wsRef.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data)
        console.log('메시지 수신:', message)
        
        // 새 메시지를 즉시 화면에 추가 (새로고침 없음!)
        setMessages(prev => [...prev, message])
      } catch (error) {
        console.error('메시지 파싱 에러:', error)
      }
    }

    wsRef.current.onclose = () => {
      console.log('WebSocket 연결 종료')
      setIsConnected(false)
      
      // 3초 후 재연결 시도
      setTimeout(() => {
        if (wsRef.current?.readyState === WebSocket.CLOSED) {
          window.location.reload()
        }
      }, 3000)
    }

    wsRef.current.onerror = (error) => {
      console.error('WebSocket 에러:', error)
      setIsConnected(false)
    }

    // 컴포넌트 언마운트시 연결 정리
    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [username])

  const sendMessage = (content) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const message = { content }
      wsRef.current.send(JSON.stringify(message))
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-title">🚀 실시간 채팅</div>
        <div className="connection-status">
          <div className={`status-dot ${isConnected ? 'connected' : ''}`}></div>
          <span>{isConnected ? '연결됨' : '연결 끊김'}</span>
        </div>
      </div>

      <MessageList messages={messages} currentUsername={username} />
      
      <MessageInput 
        onSendMessage={sendMessage} 
        disabled={!isConnected}
      />
    </div>
  )
}