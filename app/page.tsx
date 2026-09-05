"use client"

import ProfileHeader from "@/components/profile-header"
import InternshipBanner from "@/components/internship-banner"
import ProjectsList from "@/components/projects-list"
import SkillsSection from "@/components/skills-section"
import ChatbotWidget from "@/components/chatbot-widget"
import ContactForm from "@/components/contact-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#151312] overflow-x-hidden">
      <div className="animate-[fadeInDown_0.8s_ease-out]">
        <ProfileHeader />
      </div>
      <div className="animate-[fadeInDown_1s_ease-out_0.2s_both]">
        <InternshipBanner />
      </div>
      <div className="animate-[fadeInDown_1.1s_ease-out_0.3s_both]">
        <ProjectsList />
      </div>
      <div className="animate-[fadeInDown_1.2s_ease-out_0.4s_both]">
        <SkillsSection />
      </div>
      <ChatbotWidget />
      <ContactForm />
    </main>
  )
}
