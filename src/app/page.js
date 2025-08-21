'use client'

import { useState } from 'react'
import ChatRoom from './components/ChatRoom'

export default function Home() {
  const [username, setUsername] = useState('')
  const [selectedRoom, setSelectedRoom] = useState('general')
  const [isJoined, setIsJoined] = useState(false)

  const availableRooms = [
    { id: 'general', name: '🏠 일반', desc: '자유로운 대화' },
    { id: 'dev', name: '💻 개발', desc: '개발 관련 이야기' },
    { id: 'game', name: '🎮 게임', desc: '게임 이야기' },
    { id: 'music', name: '🎵 음악', desc: '음악 추천 및 감상' },
  ]

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
          <h2>🚀 실시간 멀티룸 채팅</h2>
          <input
            type="text"
            className="login-input"
            placeholder="닉네임을 입력하세요"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            maxLength={20}
          />
          
          <div className="room-selection">
            <h3>채팅방 선택:</h3>
            <div className="room-grid">
              {availableRooms.map((room) => (
                <div
                  key={room.id}
                  className={`room-card ${selectedRoom === room.id ? 'selected' : ''}`}
                  onClick={() => setSelectedRoom(room.id)}
                >
                  <div className="room-name">{room.name}</div>
                  <div className="room-desc">{room.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <button className="login-button" onClick={handleJoin}>
            {availableRooms.find(r => r.id === selectedRoom)?.name} 방 입장
          </button>
          <p style={{ color: '#666', fontSize: '0.9em' }}>
            각 방은 독립적으로 운영됩니다!
          </p>
        </div>
      </div>
    )
  }

  return <ChatRoom username={username} room={selectedRoom} />
}