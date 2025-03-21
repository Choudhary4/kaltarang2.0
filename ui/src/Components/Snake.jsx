"use client"

import { useEffect, useRef } from "react"

export default function SnakeEffect() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const gridSize = 20
    const gridColor = "rgba(0, 0, 0, 0.05)"
    const snakeColor = "#000"
    const foodColor = "#E6E6FA"
    const snakeSpeed = 8
    const initialLength = 5

    let snake = []
    let food = []
    let direction = { x: 1, y: 0 }
    let lastTime = 0
    let accumulator = 0
    let textObstacles = []

    // Function to detect text elements on the page
    const detectTextElements = () => {
      const textElements = []

      // Get all elements that might contain text
      const elements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, a, button, li, label, div")

      elements.forEach((el) => {
        // Skip our canvas and elements with no visible text
        if (el === canvas || !el.textContent.trim()) return

        // Get element position relative to the viewport
        const rect = el.getBoundingClientRect()

        // Convert to grid coordinates
        const startX = Math.floor(rect.left / gridSize)
        const startY = Math.floor(rect.top / gridSize)
        const endX = Math.ceil(rect.right / gridSize)
        const endY = Math.ceil(rect.bottom / gridSize)

        // Only add if the element has some size
        if (endX > startX && endY > startY) {
          textElements.push({
            startX,
            startY,
            endX,
            endY,
          })
        }
      })

      return textElements
    }

    // Check if a position collides with text elements
    const isCollidingWithText = (x, y) => {
      return textObstacles.some(
        (obstacle) => x >= obstacle.startX && x <= obstacle.endX && y >= obstacle.startY && y <= obstacle.endY,
      )
    }

    const initSnake = () => {
      snake = []
      const startY = Math.floor(Math.random() * (canvas.height / gridSize))
      for (let i = 0; i < initialLength; i++) {
        snake.push({ x: i, y: startY })
      }
    }

    const placeFood = () => {
      const maxX = Math.floor(canvas.width / gridSize)
      const maxY = Math.floor(canvas.height / gridSize)
      food = []
      const foodCount = 10

      // Place food avoiding text elements
      for (let i = 0; i < foodCount; i++) {
        let x, y
        let attempts = 0

        do {
          x = Math.floor(Math.random() * maxX)
          y = Math.floor(Math.random() * maxY)
          attempts++
          // Prevent infinite loop
          if (attempts > 100) break
        } while (isCollidingWithText(x, y))

        food.push({ x, y })
      }
    }

    const drawGrid = () => {
      ctx.strokeStyle = gridColor
      ctx.lineWidth = 1
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    const drawSnake = () => {
      ctx.fillStyle = snakeColor
      snake.forEach((segment, index) => {
        const size = index === snake.length - 1 ? gridSize : gridSize - 2
        const offset = index === snake.length - 1 ? 0 : 1
        ctx.fillRect(segment.x * gridSize + offset, segment.y * gridSize + offset, size, size)
      })
    }

    const drawFood = () => {
      ctx.fillStyle = foodColor
      food.forEach((item) => {
        ctx.fillRect(item.x * gridSize + 5, item.y * gridSize + 5, gridSize - 10, gridSize - 10)
      })
    }

    const checkFoodCollision = () => {
      const head = snake[snake.length - 1]
      for (let i = 0; i < food.length; i++) {
        if (head.x === food[i].x && head.y === food[i].y) {
          food.splice(i, 1)
          const tail = { ...snake[0] }
          snake.unshift(tail)

          // Add new food avoiding text
          const maxX = Math.floor(canvas.width / gridSize)
          const maxY = Math.floor(canvas.height / gridSize)

          let newX, newY
          let attempts = 0

          do {
            newX = Math.floor(Math.random() * maxX)
            newY = Math.floor(Math.random() * maxY)
            attempts++
            if (attempts > 100) break
          } while (isCollidingWithText(newX, newY))

          food.push({ x: newX, y: newY })
          break
        }
      }
    }

    // Find a valid direction that avoids text
    const findValidDirection = (head) => {
      // Possible directions (excluding going backwards)
      const possibleDirections = [
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
      ].filter((dir) => !(dir.x === -direction.x && dir.y === -direction.y))

      // Shuffle directions for more natural movement
      possibleDirections.sort(() => Math.random() - 0.5)

      // Try each direction
      for (const dir of possibleDirections) {
        const nextX = head.x + dir.x
        const nextY = head.y + dir.y

        // Check if this direction is valid (not colliding with text)
        if (
          !isCollidingWithText(nextX, nextY) &&
          nextX >= 0 &&
          nextX < canvas.width / gridSize &&
          nextY >= 0 &&
          nextY < canvas.height / gridSize
        ) {
          return dir
        }
      }

      // If no valid direction, return current direction as fallback
      return direction
    }

    const updateSnake = () => {
      const head = { ...snake[snake.length - 1] }

      // Check if next position would hit text
      const nextX = head.x + direction.x
      const nextY = head.y + direction.y

      if (isCollidingWithText(nextX, nextY)) {
        // Find a new valid direction
        direction = findValidDirection(head)
      }

      // Update head position with current direction
      head.x += direction.x
      head.y += direction.y

      // Handle edge cases
      if (head.x >= canvas.width / gridSize) {
        initSnake()
        placeFood()
        return
      }

      if (head.x < 0) head.x = 0
      if (head.y < 0) head.y = Math.floor(canvas.height / gridSize) - 1
      if (head.y >= Math.floor(canvas.height / gridSize)) head.y = 0

      snake.push(head)
      snake.shift()
    }

    const changeDirectionRandomly = () => {
      if (Math.random() < 0.02) {
        const options = [
          { x: 1, y: 0 },
          { x: 0, y: -1 },
          { x: 0, y: 1 },
        ]
        const filtered = options.filter((opt) => !(opt.x === -direction.x && opt.y === -direction.y))
        const newDir = filtered[Math.floor(Math.random() * filtered.length)]

        // Only change direction if it won't immediately hit text
        const head = snake[snake.length - 1]
        if (!isCollidingWithText(head.x + newDir.x, head.y + newDir.y)) {
          direction = newDir
        }
      }
    }

    // Update text obstacles periodically
    const updateTextObstacles = () => {
      textObstacles = detectTextElements()
    }

    const gameLoop = (timestamp) => {
      if (!lastTime) lastTime = timestamp
      const deltaTime = timestamp - lastTime
      lastTime = timestamp
      accumulator += deltaTime / 1000

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawGrid()

      while (accumulator >= 1 / snakeSpeed) {
        updateSnake()
        checkFoodCollision()
        changeDirectionRandomly()
        accumulator -= 1 / snakeSpeed
      }

      drawFood()
      drawSnake()
      requestAnimationFrame(gameLoop)
    }

    // Initialize
    initSnake()

    // Detect text elements initially and periodically
    updateTextObstacles()
    const textDetectionInterval = setInterval(updateTextObstacles, 2000)

    placeFood()
    requestAnimationFrame(gameLoop)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      clearInterval(textDetectionInterval)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
}

