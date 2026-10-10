export interface ProjectFeature {
  title: string
  description: string
}

export interface ProjectCaseStudy {
  role: string
  timeline: string
  team?: string
  problem: string
  approach: string
  technicalSolution: string[]
  features: ProjectFeature[]
  challenges: string[]
  takeaway: string
}

export interface Project {
  id: string
  title: string
  subtitle?: string
  month: string
  monthIndex: number
  description: string
  tags: string[]
  image: string
  liveUrl?: string
  repoUrl: string
  featured?: boolean
  caseStudy: ProjectCaseStudy
}

// Placeholder avatars used to keep the UI layout stable across all project cards.
// Each image is a neutral, untitled placeholder that keeps the UI layout stable.
const placeholderImage =
  'https://unsplash.com/photos/digital-code-number-abstract-background-represent-coding-technology-and-programming-languages-D6P8FNyZxx4'

export const projects: Project[] = [
  {
    id: 'nuzzle',
    title: 'Nuzzle',
    subtitle: 'Terminal Telegram Userbot & Automated Task Runner',
    month: 'January 2026',
    monthIndex: 0,
    description: 'A terminal-based Telegram handler with various commands; it runs on a userbot.',
    tags: ['Python', 'Telethon', 'CLI', 'Telegram Userbot'],
    image: placeholderImage,
    liveUrl: 'https://nuzzle-browser.vercel.app',
    repoUrl: 'https://github.com/Nut2026/nuzzle',
    caseStudy: {
      role: 'Backend & Automation Developer',
      timeline: 'January 2026 (4 weeks)',
      team: 'Solo Developer',
      problem: 'Managing repetitive community moderation, scheduled broadcast feeds, and terminal CLI command execution across multiple Telegram channels was cumbersome through traditional web panels.',
      approach: 'Designed a terminal-native, lightweight Python userbot built with Telethon that binds CLI developer tools directly to secure Telegram direct-message command triggers.',
      technicalSolution: [
        'Asynchronous Telethon MTProto event handling with scoped permission checking',
        'Built-in curses terminal dashboard displaying memory usage and active command pipelines',
        'Exponential backoff rate-limiting queue preventing Telegram FloodWait limits',
      ],
      features: [
        {
          title: 'Custom Command Engine',
          description: 'Define and hot-reload terminal commands via Telegram chats without restarting the userbot.',
        },
        {
          title: 'Automated Digest Summaries',
          description: 'Aggregate channel messages and generate formatted markdown digests directly into saved messages.',
        },
        {
          title: 'Terminal Telemetry',
          description: 'Real-time terminal CLI display monitoring connection health and command throughput.',
        },
      ],
      challenges: [
        'Preventing race conditions when handling multiple concurrent long-running terminal scripts over socket connections.',
        'Gracefully surviving spotty cellular disconnects with persistent MTProto session resumption.',
      ],
      takeaway: 'Mastered MTProto client architecture, asynchronous concurrent task queues in Python, and headless daemon process management.',
    },
  },
  {
    id: 'flush',
    title: 'Flush',
    subtitle: 'High-Performance Browser Cache & Tab Lifecycle Purger',
    month: 'May 2026',
    monthIndex: 1,
    description: 'High-performance browser cache cleaner and memory management tool designed for power users with real-time process monitoring.',
    tags: ['TypeScript', 'Chrome Extension', 'Web Workers'],
    image: placeholderImage,
    liveUrl: 'https://flush-browser.vercel.app',
    repoUrl: 'https://github.com/Nut2026/flush',
    caseStudy: {
      role: 'Lead Developer',
      timeline: 'May 2026 (4 weeks)',
      team: 'Solo Developer',
      problem: 'Developers and power users regularly suffer severe browser slowdowns from hundreds of idle tabs eating gigabytes of active RAM.',
      approach: 'Built an intelligent Chrome MV3 extension that detects idle tabs, snapshots their DOM/scroll state into indexed storage, and suspends the underlying process without losing state.',
      technicalSolution: [
        'Chrome Manifest V3 background service workers with declarative net request filtering',
        'Web Worker compression pipeline for tab DOM tree snapshots',
        'Heuristic tab activity scoring engine evaluating user interaction patterns',
      ],
      features: [
        {
          title: 'Zero-Latency Tab Sleeping',
          description: 'Suspends inactive tabs saving up to 80% RAM while instantly restoring them on focus.',
        },
        {
          title: 'Process Analytics',
          description: 'Visual breakdown of per-domain memory and network consumption.',
        },
      ],
      challenges: ['Handling MV3 service worker ephemeral lifecycles without dropping tab status monitors.'],
      takeaway: 'Deepened browser internals knowledge, MV3 event-driven architecture, and tab process virtualization.',
    },
  },
  {
    id: 'eyeterra',
    title: 'Eyeterra',
    subtitle: 'Computer Vision Ergonomic Screen Wellness Assistant',
    month: 'June 2026',
    monthIndex: 2,
    description: 'Computer vision ergonomic workspace app providing continuous posture correction, blink tracking, and 20-20-20 screen wellness alerts.',
    tags: ['Python', 'OpenCV', 'MediaPipe', 'PyQt'],
    image: placeholderImage,
    liveUrl: 'https://eyeterra.health',
    repoUrl: 'https://github.com/Nut2026/eyeterra',
    caseStudy: {
      role: 'Full Stack & ML Engineer',
      timeline: 'June 2026 (5 weeks)',
      team: 'Solo Developer',
      problem: 'Software developers spend 10+ hours staring at screens daily, leading to chronic eye fatigue, reduced blink rates, and posture breakdown.',
      approach: 'Created a desktop application that processes webcam feeds completely on-device to measure blink rates and posture distance with zero cloud data transmission.',
      technicalSolution: [
        'MediaPipe Face Mesh and Iris landmark tracking running in an isolated C++ thread',
        'Custom PyQt hardware-accelerated tray indicator with gentle posture reminder overlays',
        'Differential video frame processing reducing idle CPU usage below 2%',
      ],
      features: [
        {
          title: 'Blink Rate Detection',
          description: 'Monitors blink frequency and triggers subtle micro-break reminders.',
        },
        {
          title: 'Posture Angle Tracking',
          description: 'Calculates neck tilt and screen distance to prevent slouching.',
        },
      ],
      challenges: [
        'Ensuring reliable landmark accuracy across diverse lighting conditions without camera hardware auto-gain distortion.',
      ],
      takeaway: 'Gained hands-on experience in on-device neural landmark models, privacy-preserving client architecture, and desktop UI threads.',
    },
  },
  {
    id: 'snackglobe',
    title: 'SnackGlobe',
    subtitle: 'Global Snack Discovery & Culture Subscription Box',
    month: 'July 2026',
    monthIndex: 3,
    description: 'Curated international snacks discovery platform with interactive taste profiles, regional origin maps, and global subscription boxes.',
    tags: ['React', 'Next.js', 'Tailwind', 'Stripe'],
    image: placeholderImage,
    liveUrl: 'https://snackglobe-demo.vercel.app',
    repoUrl: 'https://github.com/Nut2026/snackglobe',
    featured: false,
    caseStudy: {
      role: 'Full-Stack Developer',
      timeline: 'July 2026 (4 weeks)',
      team: 'Solo Developer',
      problem: 'Foodies wanting authentic regional snacks often struggle with confusing import portals, expensive minimum orders, and non-localized allergen information.',
      approach: 'Designed an interactive ecommerce platform showcasing global snacks with interactive flavor wheels, ingredient translation, and flexible monthly subscriptions.',
      technicalSolution: [
        'Next.js 14 App Router with incremental static regeneration for instant product catalog loads',
        'Stripe Billing webhook pipeline handling recurring multi-currency subscription tiers',
        'Interactive SVG flavor radar charts visualizing sweet, savory, umami, and spice ratios',
      ],
      features: [
        {
          title: 'Interactive Flavor Radar',
          description: 'Explore snacks through an interactive 5-axis flavor profile chart.',
        },
        {
          title: 'Country Journey Map',
          description: 'Browse snacks grouped by geographic country stories and historical origins.',
        },
      ],
      challenges: ['Maintaining responsive cart state across currency switching and international shipping calculators.'],
      takeaway: 'Mastered modern Next.js caching layers, international recurring billing, and accessible ecommerce components.',
    },
  },
  {
    id: 'sporthyp',
    title: 'Sporthyp',
    subtitle: 'Real-Time Sports Analytics & Viral Moment Predictor',
    month: 'August 2026',
    monthIndex: 4,
    description: 'Live sports analytics radar and hypetrain community tracker predicting viral athletic moments and game-winning probability shifts.',
    tags: ['Python', 'FastAPI', 'WebSockets', 'Chart.js'],
    image: placeholderImage,
    liveUrl: 'https://sporthyp.live',
    repoUrl: 'https://github.com/Nut2026/sporthyp',
    featured: false,
    caseStudy: {
      role: 'Full-Stack & Data Engineer',
      timeline: 'August 2026 (4 weeks)',
      team: 'Solo Developer',
      problem: 'Traditional sports scoreboards deliver static numbers but fail to capture the electric momentum shifts that make live sports exhilarating.',
      approach: 'Engineered a live analytics platform combining play-by-play statistical volatility with social media velocity to graph real-time match excitement indexes.',
      technicalSolution: [
        'FastAPI async WebSocket broadcast cluster pushing 60 updates/sec to thousands of clients',
        'Differential Canvas rendering engine preventing DOM re-renders during high-frequency live events',
        'Redis streams message broker with rolling sentiment anomaly detection',
      ],
      features: [
        {
          title: 'Live Hype Meter',
          description: 'Calculates instant match excitement based on win probability swings and chat velocity.',
        },
        {
          title: 'Moment Radar',
          description: 'Alerts fans when a game enters high-leverage clutch minutes.',
        },
      ],
      challenges: [
        'Maintaining sub-50ms message latency across WebSocket connections during sudden viral traffic spikes.',
      ],
      takeaway: 'Advanced understanding of WebSocket broadcast clustering, real-time message brokers, and canvas performance profiling.',
    },
  },
  {
    id: 'nuz-zealous-a-portfolio',
    title: 'Nuz Zealous - A Portfolio',
    subtitle: 'Interactive Monthly Builds Carousel & Developer Showcase',
    month: 'September 2026',
    monthIndex: 5,
    description: 'Interactive personal portfolio featuring an arched continuous gliding monthly builds carousel, synchronised sliders, case studies, and responsive design.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Vite'],
    image: placeholderImage,
    liveUrl: 'https://nuzealous.xyz',
    repoUrl: 'https://github.com/Nut2026/nuz-zealous-a-portfolio',
    featured: true,
    caseStudy: {
      role: 'Full-Stack Developer & Designer',
      timeline: 'September 2026 (Ongoing)',
      team: 'Solo Developer',
      problem: 'Standard linear portfolio sites often feel generic and fail to showcase the continuous iterative rhythm of monthly software releases.',
      approach: 'Designed an arched, continuous-gliding 3D carousel synchronized with a custom horizontal slider, highlighting monthly engineering experiments with case study deep-dives.',
      technicalSolution: [
        'Custom pointer physics model with direct 1:1 mouse drag manipulation and momentum snapping',
        'Tailwind design tokens ensuring WCAG AA contrast and theme transitions across light and dark modes',
        'Mathematical slider track ratio synchronization maintaining seamless alignment with carousel cards',
      ],
      features: [
        {
          title: 'Arched 3D Carousel',
          description: 'Continuous dragging carousel with active center focus and boundary placeholder indicators.',
        },
        {
          title: 'Synchronized Slider Bar',
          description: 'Bi-directional header slider reflecting real-time carousel position with auto-snap.',
        },
        {
          title: 'Comprehensive Case Studies',
          description: 'Detailed modal architectural overviews for every monthly build.',
        },
      ],
      challenges: [
        'Eliminating layout container clipping while allowing intense golden glow effects to bleed freely on card hover.',
        'Synchronizing mouse dragging physics so content follows user drag gestures naturally without jumping.',
      ],
      takeaway: 'Refined micro-interaction design, mathematical carousel perspective transforms, and accessible web ergonomics.',
    },
  },
]
