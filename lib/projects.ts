export interface ProjectLink {
  label: string
  url: string
}

export interface ProjectSection {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

export interface Project {
  slug: string
  title: string
  tagline: string
  context: string
  year: string
  tags: string[]
  featured?: boolean
  live?: boolean
  intro: string
  facts: { label: string; value: string }[]
  sections: ProjectSection[]
  links: ProjectLink[]
}

export const projects: Project[] = [
  {
    slug: "tablette-system",
    title: "TABLETTE SYSTEM",
    tagline:
      "Système d'affichage dynamique déployé en magasin : un serveur local diffuse le catalogue produits sur des tablettes installées à des points clés du magasin. Mon projet le plus abouti, livré de A à Z.",
    context: "Projet client — micro-entreprise",
    year: "2024 — 2026",
    tags: ["Node.js", "SQLite", "Kotlin", "Android", "C#", ".NET", "PM2"],
    featured: true,
    intro:
      "Tablette System est une solution complète d'affichage en magasin. Un serveur installé sur place diffuse le catalogue produits d'une enseigne sur des tablettes disposées à des points clés du magasin, pour que les clients consultent l'offre là où ils en ont besoin. C'est le projet dont je suis le plus fier : le seul que j'ai mené de bout en bout — conception, développement, déploiement chez le client et maintenance — et livré via ma micro-entreprise.",
    facts: [
      { label: "Rôle", value: "Conception, développement et déploiement, en autonomie" },
      { label: "Contexte", value: "Projet client livré via ma micro-entreprise" },
      { label: "Statut", value: "En production en magasin" },
      { label: "Architecture", value: "Serveur local + tablettes Android verrouillées" },
    ],
    sections: [
      {
        heading: "Le principe",
        paragraphs: [
          "Le serveur tourne en local, dans le magasin. Les tablettes s'y connectent sur le réseau interne : pas de dépendance à une connexion internet, pas d'hébergement externe, et un affichage immédiat même en heure de pointe.",
          "Chaque tablette est installée à un endroit précis du magasin et affiche le contenu correspondant à sa zone. Le personnel n'a rien à manipuler : les écrans s'allument, affichent et s'éteignent tout seuls.",
        ],
      },
      {
        heading: "La partie web — administration et affichage",
        paragraphs: [
          "Le site se divise en deux : une interface d'administration réservée au gérant, et les pages d'affichage consultées par les tablettes.",
        ],
        bullets: [
          "Chaque tablette possède sa propre page d'affichage sur une route dédiée, du type /nom-tablette",
          "L'ajout d'une tablette depuis l'administration crée automatiquement son sous-site d'affichage — le système grandit avec le magasin",
          "Contenu entièrement personnalisable, tablette par tablette",
          "Base de données SQLite pour les données, et un dossier uploads pour les fichiers déposés (PDF, images, documents)",
          "Tout se pilote depuis l'admin, sans toucher au code ni au serveur",
        ],
      },
      {
        heading: "La partie Android — application kiosque",
        paragraphs: [
          "Les tablettes tournent sous une application kiosque maison, installée en Device Owner. Une fois lancée, elle prend le contrôle total de l'appareil : impossible d'en sortir, d'accéder aux réglages ou de lancer autre chose.",
        ],
        bullets: [
          "Verrouillage kiosque complet : l'utilisateur ne peut pas quitter l'application",
          "Sortie du mode kiosque par une zone tactile cachée, à taper plusieurs fois, suivie d'un mot de passe",
          "Plages horaires configurables avec gestion de la mise en veille : les tablettes s'allument et s'éteignent aux horaires du magasin",
          "ADB persistant en Wi-Fi pour intervenir à distance sans démonter les supports",
          "Mise à jour à distance : l'application vérifie périodiquement un fichier update.json et télécharge elle-même la nouvelle version",
        ],
      },
      {
        heading: "Le déploiement",
        paragraphs: [
          "Installer le système sur une nouvelle machine devait rester simple, y compris pour quelqu'un qui n'est pas développeur. J'ai donc écrit un assistant d'installation en C# WinForms qui prend tout en charge.",
        ],
        bullets: [
          "Installation automatique des dépendances : Node.js, Git, Android SDK Tools (ADB), scrcpy, Nmap",
          "Clonage du dépôt avec authentification GitHub chiffrée",
          "Configuration de PM2 pour que le serveur redémarre tout seul",
          "Création des tâches planifiées Windows",
          "Écran de fin avec une vidéo d'explication, via WebView2 et un serveur HTTP local",
        ],
      },
      {
        heading: "Ce que ce projet m'a apporté",
        paragraphs: [
          "C'est le projet qui m'a le plus appris, parce qu'il ne s'arrête pas au code. Il a fallu comprendre un besoin métier, choisir une architecture qui tienne dans un magasin réel, installer physiquement le matériel, former l'utilisateur, puis assurer le suivi et les mises à jour à distance.",
          "Travailler pour un vrai client change la manière de développer : la fiabilité et la simplicité d'usage passent avant tout le reste.",
        ],
      },
    ],
    links: [
      { label: "Application kiosque Android", url: "https://github.com/Moha-df/KioskAppAndroid" },
      { label: "Assistant d'installation", url: "https://github.com/Moha-df/setup-wizard-winforms" },
      { label: "Système de mise à jour", url: "https://github.com/Moha-df/kiosk-apk-update" },
    ],
  },
  {
    slug: "jeu-cooperatif-unreal",
    title: "JEU COOPÉRATIF MULTIJOUEUR",
    tagline:
      "Jeu multijoueur coopératif sous Unreal Engine 5, inspiré de We Were Here : deux joueurs doivent communiquer pour progresser.",
    context: "Projet de Master 1 — binôme",
    year: "2026",
    tags: ["Unreal Engine 5.7", "C++", "Blueprints", "Réseau P2P", "Git LFS"],
    intro:
      "Projet de Master 1 semestre 2, à sujet libre : un jeu coopératif à deux joueurs développé sous Unreal Engine 5.7, inspiré de We Were Here. Chaque joueur ne dispose que d'une partie de l'information — la progression passe obligatoirement par la communication entre les deux.",
    facts: [
      { label: "Rôle", value: "Développement en binôme" },
      { label: "Contexte", value: "Projet de Master 1, sujet libre" },
      { label: "Moteur", value: "Unreal Engine 5.7" },
      { label: "Équipe", value: "2 développeurs" },
    ],
    sections: [
      {
        heading: "Le jeu",
        paragraphs: [
          "Deux joueurs, deux points de vue différents, un même objectif. Le principe repris de We Were Here : ce que voit un joueur manque à l'autre, et inversement. Sans échange verbal, la partie n'avance pas.",
        ],
      },
      {
        heading: "L'architecture réseau",
        paragraphs: [
          "La partie fonctionne en peer-to-peer : l'un des deux joueurs héberge la session, l'autre le rejoint. Cela évite d'avoir à maintenir un serveur dédié tout en gardant la synchronisation entre les deux clients.",
        ],
      },
      {
        heading: "La stack et l'organisation",
        bullets: [
          "Unreal Engine 5.7, avec un module de jeu en C++",
          "Blueprints pour le gameplay et le prototypage rapide",
          "Git couplé à Git LFS pour versionner les assets binaires du moteur (.uasset, .umap, textures, modèles 3D)",
        ],
      },
    ],
    links: [{ label: "Code source sur GitHub", url: "https://github.com/Moha-df/ProjetM1S2" }],
  },
  {
    slug: "chatbot-ia",
    title: "CHATBOT IA",
    tagline:
      "Assistant conversationnel en ligne, intégré à ce portfolio, qui répond aux questions sur mon parcours et mes projets.",
    context: "Projet personnel — en ligne",
    year: "2026",
    tags: ["Next.js", "TypeScript", "IA conversationnelle"],
    live: true,
    intro:
      "Un assistant conversationnel accessible directement depuis ce portfolio. L'idée : permettre à un recruteur d'obtenir une réponse immédiate sur mon parcours, mes projets ou mes compétences, sans avoir à parcourir tout le site ni à attendre une réponse par mail.",
    facts: [
      { label: "Rôle", value: "Conception et développement, en autonomie" },
      { label: "Contexte", value: "Projet personnel" },
      { label: "Statut", value: "En ligne et accessible publiquement" },
      { label: "Accès", value: "Bulle en bas à droite, ou en plein écran" },
    ],
    sections: [
      {
        heading: "À quoi il sert",
        paragraphs: [
          "Le chatbot répond aux questions courantes qu'on se pose en arrivant sur un portfolio : quel est mon parcours, sur quelles technologies j'ai réellement travaillé, ce que contient tel projet, ou encore mes disponibilités pour un stage.",
        ],
      },
      {
        heading: "L'intégration au portfolio",
        bullets: [
          "Bouton flottant présent sur toutes les pages du site",
          "Ouverture en surcouche, sans quitter la page consultée",
          "Message d'invitation qui apparaît au bout de quelques secondes, puis se tait une fois écarté",
          "Également accessible en plein écran sur son propre sous-domaine",
        ],
      },
    ],
    links: [{ label: "Ouvrir le chatbot", url: "https://chatbot.moha-df.fr" }],
  },
  {
    slug: "whack-a-mole-ar",
    title: "WHACK-A-MOLE EN RÉALITÉ AUGMENTÉE",
    tagline:
      "Jeu Android en réalité augmentée : les taupes apparaissent sur une image imprimée, et le joueur les détruit à main nue.",
    context: "Projet universitaire",
    year: "2026",
    tags: ["Unity", "C#", "AR Foundation", "ARCore", "MediaPipe", "URP"],
    intro:
      "Une application de réalité augmentée pour Android qui combine deux technologies de suivi : le suivi d'image pour ancrer le jeu dans le monde réel, et le suivi de main pour interagir sans manette ni écran tactile. Les taupes apparaissent sur un marqueur imprimé posé sur une table, et le joueur les détruit en passant la main dessus.",
    facts: [
      { label: "Rôle", value: "Développement, en autonomie" },
      { label: "Contexte", value: "Projet universitaire" },
      { label: "Plateforme", value: "Android (ARCore)" },
      { label: "Interaction", value: "Suivi de main, sans contact" },
    ],
    sections: [
      {
        heading: "Le principe",
        paragraphs: [
          "Un marqueur ArUco est imprimé et posé sur une surface plane. Une fois détecté par la caméra, il sert d'ancrage : les taupes apparaissent dessus, à la bonne position et à la bonne échelle. Le joueur les élimine en passant sa main au-dessus.",
        ],
      },
      {
        heading: "La réalité augmentée",
        bullets: [
          "Base du projet : template Mobile AR d'Unity, avec AR Foundation 5.2 et le plugin ARCore",
          "Rendu en Universal Render Pipeline, optimisé pour le mobile",
          "Détection de plans du template remplacée par un système de marqueurs ArUco",
          "Marqueur enregistré dans une Reference Image Library avec sa taille physique réelle, pour qu'ARCore estime correctement la position et l'échelle des objets virtuels",
        ],
      },
      {
        heading: "Le suivi de main",
        paragraphs: [
          "La détection de la main repose sur MediaPipe, intégré à Unity via le MediaPipe Unity Plugin. C'est la partie qui a demandé le plus de travail d'intégration : au-delà du modèle de détection, il a fallu embarquer les librairies natives Android et écrire un script de préchargement pour résoudre les erreurs de chargement au démarrage sur l'appareil.",
        ],
      },
      {
        heading: "Le gameplay",
        bullets: [
          "Le spawner s'abonne aux événements de suivi d'image pour savoir quand le marqueur entre ou sort du champ de la caméra",
          "Apparition d'une taupe à intervalle régulier, à une position aléatoire sur la surface du marqueur",
          "Rayon de spawn paramétrable pour contrôler la zone de jeu sur le marqueur",
          "Les taupes actives sont suivies dans une liste partagée, accessible aux scripts de détection de collision avec la main",
        ],
      },
    ],
    links: [{ label: "Code source sur GitHub", url: "https://github.com/Moha-df/AR-Whack-A-Mole" }],
  },
  {
    slug: "authentification-securite",
    title: "AUTHENTIFICATION & SÉCURITÉ WEB",
    tagline:
      "Implémentation complète d'une authentification par mot de passe sous Next.js : hachage bcrypt, anti-force brute et cookies sécurisés.",
    context: "Projet personnel — en ligne",
    year: "2025",
    tags: ["Next.js", "TypeScript", "bcrypt", "Tailwind CSS", "Sécurité"],
    live: true,
    intro:
      "Un projet mené pour approfondir les fondamentaux de la sécurité web moderne. Plutôt que de brancher une bibliothèque d'authentification toute faite, j'ai implémenté chaque couche de protection à la main pour comprendre précisément ce qu'elle empêche.",
    facts: [
      { label: "Rôle", value: "Développement, en autonomie" },
      { label: "Contexte", value: "Projet d'apprentissage personnel" },
      { label: "Statut", value: "Déployé sur Vercel" },
      { label: "Sujet", value: "Authentification et sécurité applicative" },
    ],
    sections: [
      {
        heading: "Les protections implémentées",
        bullets: [
          "Hachage des mots de passe avec bcrypt et un facteur de coût adapté",
          "Salage pour rendre inopérantes les attaques par table arc-en-ciel",
          "Limitation du nombre de tentatives de connexion par adresse IP",
          "Blocage progressif après plusieurs échecs, avec expiration programmée du suivi",
          "Cookies de session en httpOnly et sameSite",
          "Middleware de protection des routes, avec redirections selon l'état d'authentification",
        ],
      },
      {
        heading: "L'architecture",
        bullets: [
          "Un endpoint d'API dédié à l'authentification",
          "Une zone applicative protégée, inaccessible sans jeton valide",
          "Un middleware qui vérifie le jeton avant chaque accès",
          "Des fonctions utilitaires d'authentification isolées du reste du code",
          "Un utilitaire séparé pour générer les hachages bcrypt",
        ],
      },
    ],
    links: [
      {
        label: "Code source sur GitHub",
        url: "https://github.com/Moha-df/Auth-Security-with-Next.js",
      },
      { label: "Voir la démo en ligne", url: "https://moha-df-auth.vercel.app/" },
    ],
  },
  {
    slug: "notedash",
    title: "NOTEDASH — AGENDA WEB",
    tagline:
      "Agenda web moderne : vue hebdomadaire, événements récurrents et import de calendriers externes.",
    context: "Projet personnel",
    year: "2025",
    tags: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS"],
    intro:
      "Une application web de gestion de notes et d'agenda, née d'un besoin personnel : réunir au même endroit mon emploi du temps universitaire et mes événements personnels, sans passer par un service en ligne.",
    facts: [
      { label: "Rôle", value: "Développement, en autonomie" },
      { label: "Contexte", value: "Projet personnel" },
      { label: "Type", value: "Application web locale" },
      { label: "Stack", value: "Next.js 14 et React 18" },
    ],
    sections: [
      {
        heading: "Les fonctionnalités",
        bullets: [
          "Vue hebdomadaire de l'agenda, pensée pour être lisible d'un coup d'œil",
          "Ajout, modification et suppression d'événements",
          "Gestion des événements récurrents",
          "Import de calendriers externes, notamment l'emploi du temps universitaire",
          "Regroupement visuel des événements consécutifs",
          "Vue détaillée d'un événement",
          "Thème clair et thème sombre",
          "Interface responsive",
        ],
      },
      {
        heading: "La stack",
        paragraphs: [
          "Next.js 14 et React 18 en TypeScript, avec Tailwind CSS pour l'interface. Les données restent locales : l'application fonctionne sans compte ni serveur distant.",
        ],
      },
    ],
    links: [{ label: "Code source sur GitHub", url: "https://github.com/Moha-df/NoteDash" }],
  },
  {
    slug: "scrabble-multijoueur",
    title: "SCRABBLE MULTIJOUEUR",
    tagline:
      "Jeu de Scrabble en réseau développé sous Godot, avec parties en temps réel entre plusieurs joueurs.",
    context: "Projet de fin de licence",
    year: "2025",
    tags: ["Godot", "GDScript", "Réseau", "Multijoueur"],
    intro:
      "Un Scrabble multijoueur développé avec Godot Engine, permettant à plusieurs joueurs de s'affronter en temps réel. Réalisé en dernière année de licence, c'est le projet sur lequel j'ai le plus travaillé la partie réseau et la construction d'une interface de jeu complète.",
    facts: [
      { label: "Rôle", value: "Développement" },
      { label: "Contexte", value: "Projet de dernière année de licence" },
      { label: "Moteur", value: "Godot Engine" },
      { label: "Mode", value: "Multijoueur en temps réel" },
    ],
    sections: [
      {
        heading: "Le jeu",
        paragraphs: [
          "Les règles du Scrabble, transposées en ligne : plusieurs joueurs rejoignent une même partie et jouent chacun leur tour, l'état du plateau restant synchronisé entre tous les participants en temps réel.",
        ],
      },
      {
        heading: "Les points techniques",
        bullets: [
          "Synchronisation réseau de l'état de partie entre les joueurs",
          "Interface de jeu complète : plateau, chevalet, gestion du tour et score",
          "Dépôt organisé en branches séparées pour le code, les comptes rendus d'avancement et le rapport final",
        ],
      },
    ],
    links: [{ label: "Code source sur GitHub", url: "https://github.com/Moha-df/Scrabble-Godot" }],
  },
  {
    slug: "generateur-fractales",
    title: "GÉNÉRATEUR DE FRACTALES",
    tagline:
      "Explorateur de fractales interactif dans le navigateur : Mandelbrot, Julia et Burning Ship, en temps réel.",
    context: "Projet personnel",
    year: "2025",
    tags: ["React", "TypeScript", "Tailwind CSS", "Calcul temps réel"],
    intro:
      "Une application web pour générer et explorer des fractales en temps réel. Le sujet est un bon terrain d'exercice : il combine calcul intensif dans le navigateur, rendu fluide et interface de réglage.",
    facts: [
      { label: "Rôle", value: "Développement, en autonomie" },
      { label: "Contexte", value: "Projet personnel" },
      { label: "Type", value: "Application web interactive" },
      { label: "Stack", value: "React et TypeScript" },
    ],
    sections: [
      {
        heading: "Les fractales générées",
        bullets: [
          "Ensemble de Mandelbrot",
          "Ensemble de Julia, avec paramètres personnalisables",
          "Burning Ship",
        ],
      },
      {
        heading: "Les contrôles",
        bullets: [
          "Zoom et déplacement dans la fractale",
          "Réglage du nombre d'itérations, qui arbitre entre précision et fluidité",
          "Choix de la palette de couleurs",
          "Interface responsive",
        ],
      },
    ],
    links: [
      { label: "Code source sur GitHub", url: "https://github.com/Moha-df/Fractal-Generator-React" },
    ],
  },
  {
    slug: "carte-procedurale-unity",
    title: "CARTE PROCÉDURALE UNITY",
    tagline: "Expérimentation de génération procédurale de cartes et de terrains sous Unity.",
    context: "Projet exploratoire",
    year: "2025",
    tags: ["Unity", "C#", "Génération procédurale"],
    intro:
      "Une expérimentation autour de la génération procédurale sous Unity : produire des cartes et des terrains par algorithme plutôt que de les modéliser à la main, et pouvoir en générer une infinité de variantes à partir de quelques paramètres.",
    facts: [
      { label: "Rôle", value: "Développement, en autonomie" },
      { label: "Contexte", value: "Projet exploratoire" },
      { label: "Moteur", value: "Unity" },
      { label: "Sujet", value: "Génération procédurale" },
    ],
    sections: [
      {
        heading: "Le principe",
        paragraphs: [
          "Plutôt que de dessiner une carte, on décrit les règles qui la produisent. Le terrain est ensuite généré à la volée, ce qui permet d'obtenir un résultat différent à chaque exécution tout en gardant la main sur l'allure générale via les paramètres.",
        ],
      },
    ],
    links: [
      { label: "Code source sur GitHub", url: "https://github.com/Moha-df/ProceduralMapUnity" },
    ],
  },
  {
    slug: "jeu-2d-java",
    title: "JEU D'EXPLORATION 2D EN JAVA",
    tagline:
      "Jeu d'exploration de salles développé en Java, poussé au-delà du sujet avec du temps réel et du défilement.",
    context: "Projet universitaire — binôme",
    year: "2024",
    tags: ["Java", "POO", "Temps réel", "UML"],
    intro:
      "Projet du cours de programmation orientée objet : un jeu d'exploration de salles développé en Java, en binôme. Le sujet de base n'imposait ni temps réel ni défilement — après accord de l'enseignant, nous avons choisi d'aller plus loin et de viser quelque chose de plus proche des anciens Zelda.",
    facts: [
      { label: "Rôle", value: "Développement en binôme" },
      { label: "Contexte", value: "Projet de programmation orientée objet" },
      { label: "Langage", value: "Java, sans moteur externe" },
      { label: "Équipe", value: "2 développeurs" },
    ],
    sections: [
      {
        heading: "Le jeu",
        paragraphs: [
          "Un jeu d'exploration où le joueur parcourt un ensemble de salles. Là où le sujet se contentait d'un déplacement simple, nous avons implémenté un déplacement en temps réel et un défilement de la caméra — deux fonctionnalités supplémentaires validées en amont avec l'enseignant.",
        ],
      },
      {
        heading: "Le rendu",
        bullets: [
          "Jeu développé en Java à partir des librairies de base, sans moteur de jeu",
          "Rapport écrit accompagné du diagramme UML de l'architecture",
          "Archive .jar exécutable directement, sans compilation",
        ],
      },
    ],
    links: [{ label: "Code source sur GitHub", url: "https://github.com/Moha-df/Java2Dgame" }],
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
