'use client'

import { useState } from 'react'
import ChatRoom from './components/ChatRoom'

export default function Home() {
  const [username, setUsername] = useState('')
  const [isJoined, setIsJoined] = useState(false)

  const handleJoin = () => {
    if (username.trim()) {
      setIsJoined(true)
    } else {
      alert('닉네임을 입력해주세요!')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleJoin()
    }
  }

  if (!isJoined) {
    return (
      <div className="chat-container">
        <div className="login-form">
          <h2>🚀 실시간 채팅에 참여하세요</h2>
          <input
            type="text"
            className="login-input"
            placeholder="닉네임을 입력하세요"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            maxLength={20}
          />
          <button className="login-button" onClick={handleJoin}>
            채팅 시작
          </button>
          <p style={{ color: '#666', fontSize: '0.9em' }}>
            실시간으로 메시지가 업데이트됩니다!
          </p>
        </div>
      </div>
    )
  }

  return <ChatRoom username={username} />
}