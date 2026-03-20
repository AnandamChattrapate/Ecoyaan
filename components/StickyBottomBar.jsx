'use client'
export default function StickyBottomBar({ onBack, onNext, nextText = "Next", showBack = true }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
      <div className="max-w-4xl mx-auto flex gap-3">

        {showBack && (
          <button 
            onClick={onBack}
            className="flex-1 sm:flex-none px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition">
            ← Back
          </button>
        )}

        <button 
          onClick={onNext}
          className="flex-1 sm:flex-none px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition shadow-sm">
          {nextText} →
        </button>
      </div>

    </div>
  )
}