import '@/app/globals.css'

export const metadata = {
  title: '🚀 실시간 채팅',
  description: 'Next.js와 WebSocket을 이용한 실시간 채팅',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}