"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface HoverButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: "primary" | "glass" | "dark"
}

export function HoverButton({
  children,
  className,
  onClick,
  variant = "primary",
}: HoverButtonProps) {
  const baseStyles = "px-8 py-4 rounded-full font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all duration-300"
  
  const variantStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-[hsl(38,85%,45%)] hover:shadow-[0_20px_40px_rgba(212,175,55,0.5)] hover:scale-110",
    glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/25 hover:border-white/50 hover:shadow-[0_20px_40px_rgba(255,255,255,0.15)] hover:scale-110",
    dark: "bg-foreground text-background hover:bg-[hsl(210,40%,90%)] hover:shadow-[0_20px_40px_rgba(255,255,255,0.25)] hover:scale-110",
  }

  return (
    <motion.button
      className={cn(baseStyles, variantStyles[variant], className)}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  )
}
