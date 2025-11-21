"use client"

import { useState } from "react"

interface ContactFormData {
  email: string
  subject: string
  message: string
  attachments: File[]
}

export default function ContactForm() {
  const [contactForm, setContactForm] = useState<ContactFormData>({
    email: "",
    subject: "",
    message: "",
    attachments: [],
  })
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSubmitState("loading")
      setErrorMessage("")
      
      // 1) Upload selected files to our Blob API
      let uploadedUrls: string[] = []
      if (contactForm.attachments.length > 0) {
        const fd = new FormData()
        contactForm.attachments.forEach((file) => fd.append("files", file))
        const res = await fetch("/api/upload", { method: "POST", body: fd })
        if (res.ok) {
          const data = await res.json()
          uploadedUrls = Array.isArray(data?.urls) ? data.urls : []
        } else {
          const errorData = await res.json()
          throw new Error(errorData?.error || "Upload failed")
        }
      }

      // 2) Send to Formspree without attachments, include image URLs
      const formData = new FormData()
      formData.append("email", contactForm.email)
      formData.append("subject", contactForm.subject)
      formData.append(
        "message",
        uploadedUrls.length
          ? `${contactForm.message}\n\nFichiers:\n${uploadedUrls.join("\n")}`
          : contactForm.message,
      )
      if (uploadedUrls.length) {
        formData.append("files", uploadedUrls.join(", "))
      }

      const resp = await fetch("https://formspree.io/f/mzzapalw", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })

      if (!resp.ok) {
        const errorText = await resp.text()
        console.error("Formspree error", errorText)
        throw new Error("Échec de l'envoi du formulaire. Veuillez réessayer.")
      }

      setSubmitState("success")
      setContactForm({ email: "", subject: "", message: "", attachments: [] })
      
      setTimeout(() => {
        setSubmitState("idle")
      }, 3000)
    } catch (err) {
      console.error("Contact submit error", err)
      setSubmitState("error")
      setErrorMessage(err instanceof Error ? err.message : "Une erreur est survenue")
      setTimeout(() => {
        setSubmitState("idle")
        setErrorMessage("")
      }, 5000)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const allowed = new Set([
        "image/jpeg",
        "image/png",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ])
      const all = Array.from(e.target.files)
      const valid = all.filter((f) => allowed.has(f.type))
      const rejected = all.length - valid.length
      if (rejected > 0) {
        console.warn(`Ignored ${rejected} unsupported file(s).`)
      }
      const remaining = Math.max(0, 5 - contactForm.attachments.length)
      if (remaining === 0) {
        console.warn("Attachment limit reached (5).")
        e.target.value = ""
        return
      }
      const toAdd = valid.slice(0, remaining)
      const overflow = valid.length - toAdd.length
      if (overflow > 0) {
        console.warn(`Ignored ${overflow} file(s) due to 5 attachments limit.`)
      }
      setContactForm((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...toAdd],
      }))
      e.target.value = ""
    }
  }

  const removeAttachment = (index: number) => {
    setContactForm((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }))
  }

  return (
    <section className="w-full bg-[#151312] py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-12">
          <h2 className="mb-0">
            <span className="block leading-none mb-2" style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(48px, 8vw, 94px)",
              fontWeight: 1000,
              letterSpacing: "0em",
              lineHeight: "100%",
              color: "#ffffff",
            }}>
              CONTACTER
            </span>
            <span className="block leading-none" style={{
              fontFamily: "var(--font-family, 'Poppins', sans-serif)",
              fontSize: "clamp(48px, 8vw, 94px)",
              fontWeight: 1000,
              letterSpacing: "0em",
              lineHeight: "1.2em",
              textAlign: "start",
              color: "#B6B4BD",
              opacity: 0.33,
            }}>
              MOI
            </span>
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleContactSubmit} className="space-y-6 max-w-3xl">
          {/* Error Message */}
          {errorMessage && (
            <div className="bg-black border-2 border-white rounded-lg p-4 animate-[fadeIn_0.3s_ease-out]">
              <p className="text-white font-medium"> {errorMessage}</p>
            </div>
          )}

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-white/80 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              required
              value={contactForm.email}
              onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-3 bg-[#1a1918] border-2 border-[#B6B4BD]/20 rounded-lg focus:border-[#B6B4BD] focus:outline-none transition-colors text-white placeholder:text-white/30"
              placeholder="votre@email.com"
              disabled={submitState === "loading"}
            />
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-bold text-white/80 mb-2">
              Sujet *
            </label>
            <input
              type="text"
              id="subject"
              required
              value={contactForm.subject}
              onChange={(e) => setContactForm((prev) => ({ ...prev, subject: e.target.value }))}
              className="w-full px-4 py-3 bg-[#1a1918] border-2 border-[#B6B4BD]/20 rounded-lg focus:border-[#B6B4BD] focus:outline-none transition-colors text-white placeholder:text-white/30"
              placeholder="Sujet de votre message"
              disabled={submitState === "loading"}
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-bold text-white/80 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              required
              value={contactForm.message}
              onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
              className="w-full px-4 py-3 bg-[#1a1918] border-2 border-[#B6B4BD]/20 rounded-lg focus:border-[#B6B4BD] focus:outline-none transition-colors resize-none text-white placeholder:text-white/30"
              placeholder="Votre message..."
              rows={8}
              disabled={submitState === "loading"}
            />
          </div>

          {/* File Upload */}
          <div>
            <label htmlFor="files" className="block text-sm font-bold text-white/80 mb-2">
              Pièces jointes (max 5) - JPG, PNG, PDF, DOC, DOCX
            </label>
            <input
              type="file"
              id="files"
              multiple
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="w-full text-sm text-white/80 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#B6B4BD]/20 file:text-white hover:file:bg-[#B6B4BD]/30 cursor-pointer"
              disabled={submitState === "loading" || contactForm.attachments.length >= 5}
            />
            
            {/* Attachment List */}
            {contactForm.attachments.length > 0 && (
              <div className="mt-3 space-y-2">
                {contactForm.attachments.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-[#1a1918] px-3 py-2 rounded-lg border border-[#B6B4BD]/20">
                    <span className="text-sm text-white/80 truncate flex-1">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(idx)}
                      className="ml-2 text-red-400 hover:text-red-300 font-bold text-xl"
                      disabled={submitState === "loading"}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitState === "loading" || submitState === "success"}
            className="w-full py-4 px-6 rounded-lg font-black text-lg text-[#0a0908] bg-white hover:bg-[#B6B4BD] disabled:bg-[#B6B4BD]/50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {submitState === "loading" && "ENVOI EN COURS..."}
            {submitState === "success" && "✓ MESSAGE ENVOYÉ !"}
            {submitState === "error" && "✗ ERREUR - RÉESSAYER"}
            {submitState === "idle" && "ENVOYER"}
          </button>
        </form>
      </div>
    </section>
  )
}
