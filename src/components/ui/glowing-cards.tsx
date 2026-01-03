"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface GlowingCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
}

export const GlowingCard: React.FC<GlowingCardProps> = ({
  children,
  className,
  glowColor = "#d4af37",
}) => {
  return (
    <motion.div
      className={cn(
        "relative h-full w-full p-6 rounded-2xl",
        "bg-card/50 border border-white/10",
        "cursor-pointer",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.05,
        borderColor: glowColor,
        boxShadow: `0 20px 40px ${glowColor}30, 0 0 0 1px ${glowColor}50`,
        backgroundColor: "rgba(30, 30, 40, 0.8)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  )
}

GlowingCard.displayName = "GlowingCard"

export interface GlowingCardsProps {
  children: React.ReactNode
  className?: string
  gap?: string
  responsive?: boolean
}

export const GlowingCards: React.FC<GlowingCardsProps> = ({
  children,
  className,
  gap = "2rem",
  responsive = true,
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 max-w-6xl mx-auto",
        responsive && "md:grid-cols-2 lg:grid-cols-4",
        className
      )}
      style={{ gap }}
    >
      {children}
    </div>
  )
}

export default GlowingCards
