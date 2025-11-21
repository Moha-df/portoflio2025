"use client"

import { useState } from "react"
import Image from "next/image"

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
        aria-label="Ouvrir le chatbot"
      >
        <Image
          src="/logo.png"
          alt="Chatbot"
          width={40}
          height={40}
          className="w-10 h-10"
        />
      </button>

      {/* Modal avec iframe */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div 
            className="fixed bottom-6 right-6 w-[90vw] max-w-3xl h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
            style={{
              transformOrigin: 'bottom right',
              animation: 'scaleIn 0.3s ease-out'
            }}
          >
            {/* Bouton fermer */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-gray-900/80 hover:bg-gray-900 text-white flex items-center justify-center transition-colors duration-200"
              aria-label="Fermer le chatbot"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Iframe */}
            <iframe
              src="https://chatbot.moha-df.fr"
              className="w-full h-full border-0"
              title="Chatbot"
              allow="microphone"
            />
          </div>
        </div>
      )}
    </>
  )
}
