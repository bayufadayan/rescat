"use client"

import React, { ReactNode } from "react"

interface BgWrapperProps {
    children: ReactNode
    className?: string
    gradient?: boolean
}

export function OnboardingBgWrapper({ children, className = "", gradient = true }: BgWrapperProps) {
    return (
        <div
            className={`
        relative w-full min-h-screen
        ${gradient ? "bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500" : "bg-gray-100"}
        ${className}
        `}
        >
            {children}
        </div>
    )
}
