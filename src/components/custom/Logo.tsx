import React from 'react'
import { Zap, Heart } from 'lucide-react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'full' | 'icon' | 'text'
  className?: string
}

export default function Logo({ size = 'md', variant = 'full', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8', 
    lg: 'h-12',
    xl: 'h-16'
  }

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl'
  }

  const iconSizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  if (variant === 'icon') {
    return (
      <div className={`relative ${className}`}>
        <div className="relative">
          {/* Background circle with gradient */}
          <div className={`${iconSizeClasses[size]} rounded-full bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center shadow-lg`}>
            {/* Inner icon */}
            <div className="relative">
              <Zap className={`${size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : size === 'lg' ? 'w-5 h-5' : 'w-7 h-7'} text-white fill-white`} />
              {/* Small heart accent */}
              <Heart className={`absolute -top-0.5 -right-0.5 ${size === 'sm' ? 'w-1.5 h-1.5' : size === 'md' ? 'w-2 h-2' : size === 'lg' ? 'w-2.5 h-2.5' : 'w-3 h-3'} text-pink-300 fill-pink-300`} />
            </div>
          </div>
          {/* Glow effect */}
          <div className={`absolute inset-0 ${iconSizeClasses[size]} rounded-full bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 blur-sm opacity-30 -z-10`}></div>
        </div>
      </div>
    )
  }

  if (variant === 'text') {
    return (
      <div className={`${className}`}>
        <h1 className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent`}>
          FitMotiva Pro
        </h1>
      </div>
    )
  }

  // Full logo (icon + text)
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Icon */}
      <div className="relative">
        <div className={`${iconSizeClasses[size]} rounded-full bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center shadow-lg`}>
          <div className="relative">
            <Zap className={`${size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : size === 'lg' ? 'w-5 h-5' : 'w-7 h-7'} text-white fill-white`} />
            <Heart className={`absolute -top-0.5 -right-0.5 ${size === 'sm' ? 'w-1.5 h-1.5' : size === 'md' ? 'w-2 h-2' : size === 'lg' ? 'w-2.5 h-2.5' : 'w-3 h-3'} text-pink-300 fill-pink-300`} />
          </div>
        </div>
        {/* Glow effect */}
        <div className={`absolute inset-0 ${iconSizeClasses[size]} rounded-full bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 blur-sm opacity-30 -z-10`}></div>
      </div>

      {/* Text */}
      <div>
        <h1 className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent leading-tight`}>
          FitMotiva Pro
        </h1>
        {size === 'lg' || size === 'xl' ? (
          <p className={`${size === 'lg' ? 'text-xs' : 'text-sm'} text-gray-600 -mt-1`}>
            Motivação e resultado todos os dias
          </p>
        ) : null}
      </div>
    </div>
  )
}

// Componente adicional para favicon/ícone SVG
export function LogoIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      
      {/* Background circle */}
      <circle cx="16" cy="16" r="15" fill="url(#logoGradient)" />
      
      {/* Lightning bolt (Zap icon simplified) */}
      <path 
        d="M12 8L20 16H16L20 24L12 16H16L12 8Z" 
        fill="white"
        stroke="white"
        strokeWidth="0.5"
      />
      
      {/* Small heart accent */}
      <path 
        d="M22 10C22 9.5 21.8 9.1 21.4 8.9C21 8.7 20.5 8.8 20.2 9.1L19 10.3L17.8 9.1C17.5 8.8 17 8.7 16.6 8.9C16.2 9.1 16 9.5 16 10C16 10.3 16.1 10.5 16.3 10.7L19 13.4L21.7 10.7C21.9 10.5 22 10.3 22 10Z" 
        fill="#fbb6ce"
      />
    </svg>
  )
}