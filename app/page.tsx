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
      <ProfileHeader />
      <InternshipBanner />
      <ProjectsList />
      <SkillsSection />
      <ContactForm />
      <ChatbotWidget />
    </main>
  )
}
