import { useCallback, useEffect, useRef, useState } from 'react'
import { Slider } from '../ui/slider'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { motion } from 'motion/react'

import type { PlayerState } from '../../hooks'
import { algorithmNames, type AlgorithmKeys } from '../../algorithms'
import type { AlgorithmState } from '../../hooks'
import {
  SkipBack,
  SkipForward,
  ChevronDown,
  Play,
  Pause,
  RotateCcw,
} from 'lucide-react'

import classes from './Player.module.css'
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
import fetchRandomNumber from '@/utils/fetchRandomNumber'

const speedDisplayMap: { [key: number]: string } = {
  10: 'Fast',
  50: 'Moderate',
  100: 'Normal',
  250: 'Slow',
}
const SPEEDS = [250, 100, 50, 10]

type PlayerProps = {
  selectAlgorithm: (algorithm: AlgorithmKeys) => void
  goToNextStep: () => void
  goToPreviousStep: () => void
  resetAlgorithm: (arrayLength?: number) => void
  setSpeed: (speed: number) => void
  handlePlay: () => void
  speed: number
  selectedAlgorithm: AlgorithmKeys
  algorithmState: AlgorithmState
  playerState: PlayerState
}

const [MIN_SIZE, MAX_SIZE] = [10, 75]
const Player: React.FC<PlayerProps> = ({
  speed,
  setSpeed,
  selectAlgorithm,
  goToNextStep,
  goToPreviousStep,
  resetAlgorithm,
  handlePlay,
  selectedAlgorithm,
  algorithmState,
  playerState,
}) => {
  const [arrayLength, setArrayLength] = useState(20)
  const [isRotating, setIsRotating] = useState(false)
  const intervalRef = useRef<number | null | NodeJS.Timeout>(null)

  useEffect(() => {
    fetchRandomNumber(MIN_SIZE, MAX_SIZE)
      .catch(() => {
        setArrayLength(
          Math.floor(Math.random() * (MAX_SIZE - MIN_SIZE) + MIN_SIZE),
        )
      })
      .then((num) => {
        setArrayLength(num ?? 20)
      })
  }, [])
  const handleArrayLengthChange = (newLength: number) => {
    setArrayLength(newLength)
    resetAlgorithm(newLength)
  }

  const handleResetAlgorithm = useCallback(() => {
    resetAlgorithm(arrayLength)
    setIsRotating(true)
    setTimeout(() => setIsRotating(false), 500)
  }, [arrayLength, resetAlgorithm])

  const startInterval = (action: () => void) => {
    if (intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        action()
      }, 100)
    }
  }

  const clearTimer = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = null
  }

  const handleMouseDown = (action: () => void) => {
    action()
    startInterval(action)
  }
  const handleMouseUpOrLeave = () => {
    clearTimer()
  }

  const getButtonIcon = useCallback(() => {
    if (algorithmState === 'notStarted') {
      return <Play />
    }
    if (algorithmState === 'finished') {
      return <RotateCcw />
    }

    if (playerState === 'play') {
      return <Pause />
    }
    {
      return <Play />
    }
  }, [algorithmState, playerState])

  const updateSpeed = () => {
    const currentIndex = SPEEDS.indexOf(speed)
    setSpeed(SPEEDS[(currentIndex + 1) % SPEEDS.length])
  }

  return (
    <motion.section className="flex flex-col gap-6 w-full max-w-3xl mx-auto p-6 rounded-lg bg-zinc-900/80 text-white sticky bottom-0">
      <div className="flex items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="text-xl font-semibold hover:bg-zinc-800 px-3"
            >
              {capitalizeFirstLetter(selectedAlgorithm)}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {algorithmNames.map((algo) => (
              <DropdownMenuItem
                key={algo}
                onClick={() => selectAlgorithm(algo)}
                className="cursor-pointer"
              >
                {capitalizeFirstLetter(algo)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-white hover:bg-zinc-800"
            onClick={updateSpeed}
          >
            Speed: {speedDisplayMap[speed]}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-white hover:bg-zinc-800"
            onClick={handleResetAlgorithm}
          >
            <RotateCcw className="h-4 w-4" />
            <span className="ml-2">Reset</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-white hover:bg-zinc-800"
            aria-label="Previous step"
            disabled={algorithmState === 'notStarted'}
            onMouseDown={() => handleMouseDown(goToPreviousStep)}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onTouchStart={() => handleMouseDown(goToPreviousStep)}
            onTouchEnd={handleMouseUpOrLeave}
            onTouchCancel={handleMouseUpOrLeave}
          >
            <SkipBack className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full text-white hover:text-white hover:bg-zinc-800"
            onClick={handlePlay}
          >
            {getButtonIcon()}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-white hover:bg-zinc-800"
            aria-label="Next step"
            disabled={algorithmState === 'notStarted'}
            onMouseDown={() => handleMouseDown(goToNextStep)}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onTouchStart={() => handleMouseDown(goToNextStep)}
            onTouchEnd={handleMouseUpOrLeave}
            onTouchCancel={handleMouseUpOrLeave}
          >
            <SkipForward className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-zinc-400 min-w-[60px]">
            Size {arrayLength}
          </div>
          <Slider
            value={[arrayLength]}
            onValueChange={(value) => handleArrayLengthChange(value[0])}
            max={MAX_SIZE}
            min={MIN_SIZE}
            step={1}
            className="flex-1"
          />
        </div>
      </div>
    </motion.section>
  )
}

export default Player
