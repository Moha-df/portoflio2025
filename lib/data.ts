export interface SkillGroup {
  label: string
  items: { name: string; url: string }[]
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Langages",
    items: [
      { name: "C", url: "https://en.wikipedia.org/wiki/C_(programming_language)" },
      { name: "C++", url: "https://cplusplus.com/" },
      { name: "C#", url: "https://learn.microsoft.com/dotnet/csharp/" },
      { name: "Java", url: "https://www.java.com/" },
      { name: "Kotlin", url: "https://kotlinlang.org/" },
      { name: "Python", url: "https://www.python.org/" },
      { name: "TypeScript", url: "https://www.typescriptlang.org/" },
      { name: "JavaScript", url: "https://developer.mozilla.org/fr/docs/Web/JavaScript" },
      { name: "PHP", url: "https://www.php.net/" },
      { name: "Assembleur", url: "https://fr.wikipedia.org/wiki/Assembleur" },
    ],
  },
  {
    label: "Web & Front-end",
    items: [
      { name: "React", url: "https://react.dev/" },
      { name: "Next.js", url: "https://nextjs.org/" },
      { name: "Tailwind CSS", url: "https://tailwindcss.com/" },
      { name: "HTML", url: "https://developer.mozilla.org/fr/docs/Web/HTML" },
      { name: "CSS", url: "https://developer.mozilla.org/fr/docs/Web/CSS" },
      { name: "Apache", url: "https://httpd.apache.org/" },
    ],
  },
  {
    label: "Mobile",
    items: [
      { name: "Android Studio", url: "https://developer.android.com/studio" },
      { name: "Kotlin Android", url: "https://developer.android.com/kotlin" },
    ],
  },
  {
    label: "Jeu vidéo & 3D",
    items: [
      { name: "Unreal Engine 5", url: "https://www.unrealengine.com/" },
      { name: "Unity", url: "https://unity.com/" },
      { name: "Godot", url: "https://godotengine.org/" },
      { name: "AR Foundation", url: "https://unity.com/unity/features/ar" },
    ],
  },
  {
    label: "Données & IA",
    items: [
      { name: "MySQL", url: "https://www.mysql.com/" },
      { name: "MariaDB", url: "https://mariadb.org/" },
      { name: "MongoDB", url: "https://www.mongodb.com/" },
      { name: "SQLite", url: "https://www.sqlite.org/" },
      { name: "PyTorch", url: "https://pytorch.org/" },
      { name: "OpenCV", url: "https://opencv.org/" },
    ],
  },
  {
    label: "Outils & Méthodes",
    items: [
      { name: "Git", url: "https://git-scm.com/" },
      { name: "Shell / Linux", url: "https://fr.wikipedia.org/wiki/Script_shell" },
      { name: "Wireshark", url: "https://www.wireshark.org/" },
      { name: "Figma", url: "https://www.figma.com/" },
      { name: "Méthode Agile", url: "https://fr.wikipedia.org/wiki/M%C3%A9thode_agile" },
    ],
  },
]
