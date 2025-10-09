"use client"

interface CarouselIndicatorProps {
    total: number
    current: number
    onSelect?: (index: number) => void
}

export function CarouselIndicator({ total, current, onSelect }: CarouselIndicatorProps) {
    return (
        <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: total }).map((_, index) => (
                <button
                    key={index}
                    onClick={() => onSelect?.(index)}
                    className={`
            w-3 h-3 rounded-full transition-all
            ${current === index ? "bg-blue-500 scale-125" : "bg-gray-300"}
            hover:scale-110
            `}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>
    )
}
