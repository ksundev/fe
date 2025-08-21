'use client'

import { useState, useEffect, useRef } from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'

export default function ChatRoom({ username, room }) {
  const [messages, setMessages] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  const wsRef = useRef(null)

  const roomNames = {
    general: '🏠 일반',
    dev: '💻 개발', 
    game: '🎮 게임',
    music: '🎵 음악'
  }

  useEffect(() => {
    console.log(`🔌 ${room}방에 ${username}으로 연결 시도`)
    
    // WebSocket 연결
    const wsUrl = `ws://localhost:8080/ws?username=${encodeURIComponent(username)}&room=${encodeURIComponent(room)}`
    wsRef.current = new WebSocket(wsUrl)

    wsRef.current.onopen = () => {
      console.log(`✅ ${room}방 WebSocket 연결 성공`)
      setIsConnected(true)
    }

    wsRef.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data)
        console.log(`💬 [${message.room}] ${message.username}: ${message.content}`)
        
        // 새 메시지를 즉시 화면에 추가 (새로고침 없음!)
        setMessages(prev => [...prev, message])
      } catch (error) {
        console.error('메시지 파싱 에러:', error)
      }
    }

    wsRef.current.onclose = () => {
      console.log(`❌ ${room}방 WebSocket 연결 종료`)
      setIsConnected(false)
      
      // 3초 후 재연결 시도
      setTimeout(() => {
        if (wsRef.current?.readyState === WebSocket.CLOSED) {
          window.location.reload()
        }
      }, 3000)
    }

    wsRef.current.onerror = (error) => {
      console.error(`🚨 ${room}방 WebSocket 에러:`, error)
      setIsConnected(false)
    }

    // 컴포넌트 언마운트시 연결 정리
    return () => {
      if (wsRef.current) {
        console.log(`🔌 ${room}방 연결 정리`)
        wsRef.current.close()
      }
    }
  }, [username, room])

  const sendMessage = (content) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const message = { content }
      wsRef.current.send(JSON.stringify(message))
      console.log(`📤 [${room}] 메시지 전송: ${content}`)
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-title">🚀 실시간 채팅</div>
        <div className="header-center">
          <div className="current-room">{roomNames[room] || room}</div>
          <div className="current-user">👤 {username}</div>
        </div>
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