"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"

const TEASER_DELAY_MS = 7000
const TEASER_STORAGE_KEY = "chatbot-teaser-dismissed"

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [showTeaser, setShowTeaser] = useState(false)
  const [teaserDone, setTeaserDone] = useState(false)

  // Affiche la bulle d'invitation après un moment, une seule fois par session
  useEffect(() => {
    let alreadySeen = false
    try {
      alreadySeen = sessionStorage.getItem(TEASER_STORAGE_KEY) === "1"
    } catch {
      // sessionStorage indisponible (navigation privée, cookies bloqués)
    }
    if (alreadySeen) {
      setTeaserDone(true)
      return
    }

    const timer = setTimeout(() => setShowTeaser(true), TEASER_DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  const dismissTeaser = useCallback(() => {
    setShowTeaser(false)
    setTeaserDone(true)
    try {
      sessionStorage.setItem(TEASER_STORAGE_KEY, "1")
    } catch {
      // ignoré
    }
  }, [])

  const openChatbot = useCallback(() => {
    dismissTeaser()
    setIsOpen(true)
  }, [dismissTeaser])

  return (
    <>
      {/* Bulle d'invitation */}
      {showTeaser && !isOpen && (
        <div
          className="fixed bottom-26 right-6 z-50 w-[min(20rem,calc(100vw-3rem))]"
          style={{ animation: "teaserIn 0.45s cubic-bezier(0.16, 1, 0.3, 1)" }}
          role="status"
        >
          <div className="relative rounded-2xl bg-white p-4 pr-9 shadow-2xl">
            <button
              onClick={dismissTeaser}
              className="absolute top-2 right-2 w-7 h-7 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 flex items-center justify-center transition-colors duration-200"
              aria-label="Fermer le message"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <button onClick={openChatbot} className="block text-left w-full">
              <p className="text-sm font-black text-gray-900">
                Une question sur mon profil&nbsp;?
              </p>
              <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">
                Posez-la à mon assistant IA : parcours, projets, compétences ou disponibilité pour
                un stage.
              </p>
              <span className="mt-2.5 inline-flex items-center gap-1 text-sm font-bold text-gray-900 underline underline-offset-2">
                Discuter maintenant
                <span aria-hidden="true">→</span>
              </span>
            </button>

            {/* Petite pointe vers le bouton */}
            <span
              aria-hidden="true"
              className="absolute -bottom-1.5 right-7 w-3 h-3 rotate-45 bg-white"
            />
          </div>
        </div>
      )}

      {/* Bouton flottant */}
      <button
        onClick={() => (isOpen ? setIsOpen(false) : openChatbot())}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
        aria-label="Ouvrir le chatbot"
      >
        <Image src="/logo.png" alt="Chatbot" width={40} height={40} className="w-10 h-10" />
        {!isOpen && !teaserDone && (
          <span
            aria-hidden="true"
            className="absolute -top-0.5 -right-0.5 flex w-4 h-4"
          >
            <span className="absolute inline-flex w-full h-full rounded-full bg-[#151312] opacity-75 animate-ping" />
            <span className="relative inline-flex w-4 h-4 rounded-full bg-[#151312] border-2 border-white" />
          </span>
        )}
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
