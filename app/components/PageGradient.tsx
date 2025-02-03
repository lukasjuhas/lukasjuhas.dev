"use client"

import { useState, useEffect } from "react"

const palette: string[][] = [
  ["#ffcab4", "#d2baa7", "#94a394", "#5f9084"],
  ["#5f9084", "#94a394", "#d2baa7", "#ffcab4"],
  ["#63B3CB", "#C5D3AC", "#DECD95", "#F6C47A"],
  ["#F6C47A", "#DECD95", "#C5D3AC", "#63B3CB"],
]

const PageGradient: React.FC = () => {
  const [current, setCurrent] = useState<string[] | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true) // Ensure component is only mounted on the client
    setCurrent(palette[0])

    let i = 0
    const interval = setInterval(() => {
      setCurrent(palette[i])
      i = (i + 1) % palette.length
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  if (!isMounted || !current) return null // Ensure nothing renders on the server

  return (
    <div className="absolute top-0 left-0 right-0 w-full h-full scale-100 transition-all z-0">
      <svg
        viewBox="0 0 100 100"
        height="100%"
        width="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="page__gradient-svg"
      >
        <rect x="0" y="0" height="100%" width="100%" fill="url(#gradient)" />
        <linearGradient
          id="gradient"
          x1="0"
          y1="0"
          x2="0"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            className="transition-all duration-[4000ms]"
            offset="0"
            stopColor={current[0]}
          />
          <stop
            className="transition-all duration-[4000ms]"
            offset="0.3333"
            stopColor={current[1]}
          />
          <stop
            className="transition-all duration-[4000ms]"
            offset="0.6666"
            stopColor={current[2]}
          />
          <stop
            className="transition-all duration-[4000ms]"
            offset="1"
            stopColor={current[3]}
          />
        </linearGradient>
      </svg>
    </div>
  )
}

export default PageGradient
