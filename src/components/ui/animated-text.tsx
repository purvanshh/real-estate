"use client"

import { motion, Variants } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
  delay?: number
  type?: "words" | "chars" | "lines"
}

const containerVariants: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: {
      staggerChildren: 0.03,
      delayChildren: delay,
    },
  }),
}

const childVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
}

export function AnimatedText({
  text,
  className,
  once = true,
  delay = 0,
  type = "words",
}: AnimatedTextProps) {
  const items = type === "chars" ? text.split("") : text.split(" ")

  return (
    <motion.span
      className={cn("inline-flex flex-wrap", className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      custom={delay}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={childVariants}
          className="inline-block"
          style={{ marginRight: type === "chars" ? 0 : "0.25em" }}
        >
          {item}
        </motion.span>
      ))}
    </motion.span>
  )
}

interface AnimatedCounterProps {
  value: number
  suffix?: string
  className?: string
  duration?: number
}

export function AnimatedCounter({
  value,
  suffix = "",
  className,
  duration = 2,
}: AnimatedCounterProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <Counter value={value} duration={duration} />
        {suffix}
      </motion.span>
    </motion.span>
  )
}

function Counter({ value, duration }: { value: number; duration: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
      >
        <MotionNumber value={value} duration={duration} />
      </motion.span>
    </motion.span>
  )
}

function MotionNumber({ value, duration }: { value: number; duration: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView="visible"
      viewport={{ once: true }}
      onViewportEnter={(entry) => {
        const el = entry?.target as HTMLElement
        if (el) {
          let start = 0
          const end = value
          const stepTime = Math.abs(Math.floor((duration * 1000) / end))
          const timer = setInterval(() => {
            start += 1
            el.textContent = String(start)
            if (start === end) clearInterval(timer)
          }, stepTime)
        }
      }}
    >
      0
    </motion.span>
  )
}
