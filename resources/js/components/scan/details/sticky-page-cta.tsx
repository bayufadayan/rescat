import React from "react"

const StickyPageCTA: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center">
        <div className="pointer-events-auto w-full max-w-[480px] px-4">
            <button onClick={onClick} className="w-full rounded-2xl bg-sky-600 py-3.5 text-white shadow-lg shadow-sky-600/30 active:scale-[0.98]">
                Isi Data
            </button>
        </div>
    </div>
)

export default StickyPageCTA
