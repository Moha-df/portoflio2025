"use client"

import ProfileHeader from "@/components/profile-header"
import ThreeList from "@/components/3list"
import ChatbotWidget from "@/components/chatbot-widget"
import ContactForm from "@/components/contact-form"

export default function Home() {
  const skills = [
    { name: "ASSEMBLY", url: "https://en.wikipedia.org/wiki/Assembly_language" },
    { name: "C", url: "https://en.wikipedia.org/wiki/C_(programming_language)" },
    { name: "C++", url: "https://cplusplus.com/" },
    { name: "JAVA", url: "https://www.java.com/" },
    { name: "KOTLIN", url: "https://kotlinlang.org/" },
    { name: "PYTHON", url: "https://www.python.org/" },
    { name: "JAVASCRIPT", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "TYPESCRIPT", url: "https://www.typescriptlang.org/" },
    { name: "PHP", url: "https://www.php.net/" },
    { name: "HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { name: "CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    { name: "TAILWIND", url: "https://tailwindcss.com/" },
    { name: "NEXT.JS", url: "https://nextjs.org/" },
    { name: "REACT", url: "https://react.dev/" },
    { name: "UE5", url: "https://www.unrealengine.com/" },
    { name: "UNITY", url: "https://unity.com/" },
    { name: "GODOT", url: "https://godotengine.org/" },
    { name: "FIGMA", url: "https://www.figma.com/" },
    { name: "AGILE", url: "https://en.wikipedia.org/wiki/Agile_software_development" },
    { name: "ANDROID STUDIO", url: "https://developer.android.com/studio" },
    { name: "SHELL", url: "https://en.wikipedia.org/wiki/Shell_script" },
    { name: "APACHE", url: "https://httpd.apache.org/" },
    { name: "WIRESHARK", url: "https://www.wireshark.org/" },
    { name: "MONGODB", url: "https://www.mongodb.com/" },
    { name: "MYSQL", url: "https://www.mysql.com/" },
    { name: "MARIADB", url: "https://mariadb.org/" },
    { name: "SQLITE", url: "https://www.sqlite.org/" },
    { name: "OPENCV", url: "https://opencv.org/" },
    { name: "PYTORCH", url: "https://pytorch.org/" },
  ]

  const projects = [
    { name: "CHATBOT", url: "https://chatbot.moha-df.fr" },
    { name: "KIOSK ANDROID APP", url: "https://github.com/Moha-df/KioskAppAndroid" },
    { name: "SCRABBLE MULTIPLAYER", url: "https://github.com/Moha-df/Scrabble-Godot" },
    { name: "AUTH SECURITY", url: "https://github.com/Moha-df/Auth-Security-with-Next.js" },
    { name: "SETUP WIZARD WINFORMS", url: "https://github.com/Moha-df/setup-wizard-winforms" },
    { name: "TIERXVIEW", url: "https://www.moha-df.fr/tierxview" },
    { name: "TABLETTESYSTEM", url: "https://www.moha-df.fr/tablettesystem" },
    { name: "FRACTAL GENERATOR", url: "https://github.com/Moha-df/Fractal-Generator-React" },
    { name: "JAVA 2D GAME", url: "https://github.com/Moha-df/Java2Dgame" },
    { name: "PROCEDURAL MAP UNITY", url: "https://github.com/Moha-df/ProceduralMapUnity" },
  ]

  return (
    <main className="min-h-screen bg-[#151312] overflow-x-hidden">
      <div className="animate-[fadeInDown_0.8s_ease-out]">
        <ProfileHeader />
      </div>
      <div className="animate-[fadeInDown_1s_ease-out_0.2s_both]">
        <ThreeList 
          items={skills}
          title1="TECHNICAL"
          title2="SKILLS"
          showTitle={true}
          backgroundColor="#151312"
        />
      </div>
      <div className="animate-[fadeInDown_1.2s_ease-out_0.4s_both]">
        <ThreeList 
          items={projects}
          title1="PROJETS"
          title2="RÉALISÉS"
          showTitle={true}
          backgroundColor="#151312"
        />
      </div>
      <ChatbotWidget />
      <ContactForm />
    </main>
  )
}
