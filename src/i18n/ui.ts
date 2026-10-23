// UI copy for all site languages. Shape must stay identical across every
// entry; add new keys here first, then fill them for the other languages.
// Segment arrays drive rich inline text: style 'hl' renders with the hover-blue
// highlight, 'hl-em' is the non-italic emphasis variant of the same highlight.

export interface Segment {
  text: string
  style?: 'hl' | 'hl-em'
}

export interface UiStrings {
  nav: {
    work: string
    about: string
    contact: string
  }
  hero: {
    hiPrefix: string
    hiSuffix: string
    tagline: Segment[]
    viewWork: string
    knowMe: string
  }
  featured: {
    title: string
    subtitle: string
    leftTitles: string[]
    rightTitles: string[]
    firstBuild: string
    latestBuild: string
    slideFirst: string
    slideLatest: string
  }
  cards: {
    starred: string
    watchVid: string
    visitLive: string
    repo: string
    caseStudy: string
  }
  foss: {
    title: string
    subtitle: string
    merged: string
    noPrs: string
    unavailable: string
    opened: string
    mergedAt: string
    commentOne: string
    commentsMany: string
    descriptions: {
      'vscode-icons/vscode-icons': string
      'h0tp-ftw/ankimon': string
    }
  }
  cs: {
    role: string
    timeline: string
    live: string
    open: string
    inProgress: string
    github: string
    repo: string
    problem: string
    approach: string
    techSolution: string
    features: string
    challenges: string
    takeaway: string
  }
  about: {
    title: string
    techStack: string
    categories: {
      languages: string
      web: string
      plugin: string
      ai: string
      databases: string
      deployment: string
      design: string
    }
    bio: Segment[]
  }
  contact: {
    heading: Segment[]
    available: string
    copyEmail: string
    emailCopied: string
    telegram: string
    findOn: string
    and: string
    tail: string
    github: string
    devpost: string
  }
  footer: {
    line: string
  }
}

const en: UiStrings = {
  nav: { work: 'Work', about: 'About', contact: 'Contact' },
  hero: {
    hiPrefix: "Hi, it's ",
    hiSuffix: '!',
    tagline: [
      { text: "I'm an undergraduate student aspiring to be a " },
      { text: 'full-stack developer', style: 'hl' },
      { text: ' - one who turns a ' },
      { text: 'single-line pitch', style: 'hl' },
      { text: ' into a ' },
      { text: 'standout product', style: 'hl' },
      { text: '.' },
    ],
    viewWork: 'View My Work',
    knowMe: 'Get to Know Me',
  },
  featured: {
    title: 'Featured Programs',
    subtitle: 'Meet my software ventures!',
    leftTitles: ['00', 'Ready, set', 'Kickoff', 'Once upon a time...'],
    rightTitles: ['Fin', '∞', "Something's brewing!", 'The code and beyond'],
    firstBuild: 'Welcome, {title} ({month}) is my first build!',
    latestBuild: '{title} ({month}) is my latest build. More will come!',
    slideFirst: 'Slide to first build',
    slideLatest: 'Slide to latest build',
  },
  cards: {
    starred: 'Starred',
    watchVid: 'Watch Vid',
    visitLive: 'Visit Live',
    repo: 'Repo',
    caseStudy: 'Case Study',
  },
  foss: {
    title: 'My FOSS Fire',
    subtitle: 'Meet the cool open source software I contribute to!',
    merged: '{count} merged',
    noPrs: 'No merged pull requests yet.',
    unavailable: 'PR data is unavailable right now.',
    opened: 'Opened {date}',
    mergedAt: 'Merged {date}',
    commentOne: 'comment',
    commentsMany: 'comments',
    descriptions: {
      'vscode-icons/vscode-icons':
        '**Why I joined:** I was tired of missing icons in my file tree — instead of waiting for someone else to patch it, I jumped in and shipped. What looked like simple palette work taught me the project\'s design language, its SVG pipeline, and how a 20k-star project protects quality at scale.\n**The challenge:** consistency — every icon must follow strict naming, sizing and geometry rules, so even "just an icon" demands real care.\n**What I enjoyed:** digging into the build/validation automation and maturing into a community-first review culture.',
      'h0tp-ftw/ankimon':
        '**Why I joined:** Ankimon fuses two of my favourite things — Anki and Pokémon — into one add-on. I started by fixing a bug that broke my own deck and stayed for the community.\n**The challenge:** Anki\'s hooks and window lifecycle are fragile, so every change has to be surgical to avoid regressions.\n**What I enjoyed:** deep-diving Anki internals and Python packaging while shipping fixes people use every day.',
    },
  },
  cs: {
    role: 'Role',
    timeline: 'Timeline',
    live: 'Live Website',
    open: 'Open',
    inProgress: 'In Progress',
    github: 'GitHub',
    repo: 'Repo',
    problem: 'The Problem',
    approach: 'The Approach',
    techSolution: 'Technical Solution',
    features: 'Features',
    challenges: 'Challenges Overcome',
    takeaway: 'Key Takeaway',
  },
  about: {
    title: 'About Me',
    techStack: 'Tech Stack',
    categories: {
      languages: 'Languages',
      web: 'Web Development',
      plugin: 'Plugin Development',
      ai: 'AI & Automation',
      databases: 'Databases',
      deployment: 'Deployment',
      design: 'Design',
    },
    bio: [
      { text: 'I specialise in transforming ideas into ' },
      { text: 'polished software', style: 'hl' },
      { text: '. My ' },
      { text: 'ability', style: 'hl' },
      { text: ' and ' },
      { text: 'passion', style: 'hl' },
      { text: ' for building scalable programs from scratch led me into ' },
      { text: 'full-stack development', style: 'hl' },
      { text: '. Beyond the code, you can find me ' },
      { text: 'writing', style: 'hl-em' },
      { text: ' or spending ' },
      { text: 'quality time with family', style: 'hl-em' },
      { text: '. I believe great technology is built through ' },
      { text: 'empathy', style: 'hl' },
      { text: ' and ' },
      { text: 'perseverance', style: 'hl' },
      { text: '.' },
    ],
  },
  contact: {
    heading: [
      { text: "Let's Build " },
      { text: 'Amazingz', style: 'hl' },
      { text: ' Together.' },
    ],
    available:
      '🟢 Currently available for freelance / part-time roles / open-source collaboration.',
    copyEmail: 'Copy my Email',
    emailCopied: 'Email copied!',
    telegram: 'Talk on Telegram',
    findOn: 'Or find me on',
    and: 'and',
    tail: '',
    github: 'GitHub',
    devpost: 'Devpost',
  },
  footer: {
    line: '© 2026 Nuz Zealous. Built at night on a brainwave.',
  },
}

const ms: UiStrings = {
  nav: { work: 'Kerja', about: 'Tentang Saya', contact: 'Hubungi' },
  hero: {
    hiPrefix: 'Hai, saya ',
    hiSuffix: '!',
    tagline: [
      { text: 'Saya seorang pelajar siswazah yang bercita-cita menjadi ' },
      { text: 'pembangun full-stack', style: 'hl' },
      { text: ' - seseorang yang mengubah ' },
      { text: 'pitch satu baris', style: 'hl' },
      { text: ' kepada ' },
      { text: 'produk yang menonjol', style: 'hl' },
      { text: '.' },
    ],
    viewWork: 'Lihat Kerja Saya',
    knowMe: 'Kenali Saya',
  },
  featured: {
    title: 'Program Pilihan',
    subtitle: 'Temui usaha perisian bulanan saya!',
    leftTitles: ['00', 'Sedia, set', 'Mulakan', 'Pada suatu ketika...'],
    rightTitles: ['Tamat', '∞', 'Sedang dimasak!', 'Kod dan selepasnya'],
    firstBuild: 'Selamat datang, {title} ({month}) ialah binaan pertama saya!',
    latestBuild: '{title} ({month}) ialah binaan terkini saya. Akan ada lagi!',
    slideFirst: 'Luncur ke binaan pertama',
    slideLatest: 'Luncur ke binaan terkini',
  },
  cards: {
    starred: 'Dipilih',
    watchVid: 'Tonton Vid',
    visitLive: 'Layari Live',
    repo: 'Repo',
    caseStudy: 'Kajian Kes',
  },
  foss: {
    title: 'Api FOSS Saya',
    subtitle: 'Temui perisian sumber terbuka hebat yang saya sumbangkan!',
    merged: '{count} digabung',
    noPrs: 'Tiada permintaan tarik digabung lagi.',
    unavailable: 'Data PR tidak tersedia buat masa ini.',
    opened: 'Dibuka {date}',
    mergedAt: 'Digabung {date}',
    commentOne: 'komen',
    commentsMany: 'komen',
    descriptions: {
      'vscode-icons/vscode-icons':
        '**Kenapa saya sertai:** Saya letih dengan ikon yang hilang dalam pepokok fail saya — alih-alih menunggu orang lain membaikinya, saya terus sumbangkan. Kerja yang kelihatan murah itu justru mengajar saya bahasa reka bentuk projek, salur paip SVG, dan cara projek 20k-bintang menjaga kualiti pada skala besar.\n**Cabaran:** konsistensi — setiap ikon mesti mengikuti penamaan, saiz dan geometri yang ketat, jadi "sekadar ikon" pun menuntut keringkasan.\n**Yang saya nikmati:** mendedah automasi binaan/validasi serta budaya semakan berteraskan komuniti yang matang.',
      'h0tp-ftw/ankimon':
        '**Kenapa saya sertai:** Ankimon mencantumkan dua kegemaran saya — Anki dan Pokémon — dalam satu add-on. Saya bermula dengan membaiki pepijat yang merosakkan dek saya sendiri, lalu kekal kerana komuniti.\n**Cabaran:** Hook dan kitaran tetingkap Anki mudah pecah, jadi setiap perubahan mesti bersifat pembedahan untuk mengelakkan regresi.\n**Yang saya nikmati:** menyelami dalaman Anki dan pembungkusan Python sambil menghantar pembetulan yang digunakan orang setiap hari.',
    },
  },
  cs: {
    role: 'Peranan',
    timeline: 'Tempoh Masa',
    live: 'Laman Live',
    open: 'Buka',
    inProgress: 'Sedang Dibina',
    github: 'GitHub',
    repo: 'Repo',
    problem: 'Masalahnya',
    approach: 'Pendekatan',
    techSolution: 'Penyelesaian Teknikal',
    features: 'Ciri-ciri',
    challenges: 'Cabaran yang Ditangani',
    takeaway: 'Pengajaran Utama',
  },
  about: {
    title: 'Tentang Saya',
    techStack: 'Tindanan Teknologi',
    categories: {
      languages: 'Bahasa',
      web: 'Pembangunan Web',
      plugin: 'Pembangunan Plugin',
      ai: 'AI & Automasi',
      databases: 'Pangkalan Data',
      deployment: 'Deployment',
      design: 'Reka Bentuk',
    },
    bio: [
      { text: 'Saya pakar dalam mengubah idea menjadi ' },
      { text: 'perisian yang kemas', style: 'hl' },
      { text: '. Kebolehan' },
      { text: ' dan ' },
      { text: 'semangat', style: 'hl' },
      { text: ' untuk membina atur cara berskala dari kosong membawa saya ke ' },
      { text: 'pembangunan full-stack', style: 'hl' },
      { text: '. Selain kod, anda boleh mendapati saya ' },
      { text: 'menulis', style: 'hl-em' },
      { text: ' atau menghabiskan ' },
      { text: 'masa berkualiti bersama keluarga', style: 'hl-em' },
      { text: '. Saya percaya teknologi hebat dibina melalui ' },
      { text: 'empati', style: 'hl' },
      { text: ' dan ' },
      { text: 'ketekunan', style: 'hl' },
      { text: '.' },
    ],
  },
  contact: {
    heading: [
      { text: 'Mari Bina ' },
      { text: 'Amazingz', style: 'hl' },
      { text: ' Bersama.' },
    ],
    available:
      '🟢 Kini tersedia untuk peranan bebas / sambilan / kerjasama sumber terbuka.',
    copyEmail: 'Salin Email Saya',
    emailCopied: 'Email disalin!',
    telegram: 'Bercakap di Telegram',
    findOn: 'Atau temui saya di',
    and: 'dan',
    tail: '',
    github: 'GitHub',
    devpost: 'Devpost',
  },
  footer: {
    line: '© 2026 Nuz Zealous. Dibina waktu malam atas satu kilauan minda.',
  },
}

const zh: UiStrings = {
  nav: { work: '作品', about: '关于', contact: '联系' },
  hero: {
    hiPrefix: '你好,我是 ',
    hiSuffix: '!',
    tagline: [
      { text: '我是一名立志成为' },
      { text: '全栈开发者', style: 'hl' },
      { text: '的大学生 — 一个能把' },
      { text: '单行推销语', style: 'hl' },
      { text: '打造成' },
      { text: '出众产品', style: 'hl' },
      { text: '的人。' },
    ],
    viewWork: '查看我的作品',
    knowMe: '了解我',
  },
  featured: {
    title: '精选项目',
    subtitle: '看看我的月度软件项目!',
    leftTitles: ['00', '预备,开始', '起跑', '很久很久以前...'],
    rightTitles: ['剧终', '∞', '正在酝酿中!', '代码之外'],
    firstBuild: '欢迎,{title}({month})是我的第一个项目!',
    latestBuild: '{title}({month})是我目前最新的项目,以后还会有更多!',
    slideFirst: '滑动到第一个项目',
    slideLatest: '滑动到最新项目',
  },
  cards: {
    starred: '精选',
    watchVid: '观看视频',
    visitLive: '在线访问',
    repo: '源码',
    caseStudy: '案例研究',
  },
  foss: {
    title: '我的 FOSS 之火',
    subtitle: '来看看我参与贡献的那些很棒的开源软件!',
    merged: '{count} 次合并',
    noPrs: '暂无已合并的 Pull Request。',
    unavailable: 'PR 数据暂时无法获取。',
    opened: '开启于 {date}',
    mergedAt: '合并于 {date}',
    commentOne: '条评论',
    commentsMany: '条评论',
    descriptions: {
      'vscode-icons/vscode-icons':
        '**加入原因:** 我受够了文件树里缺失的图标——与其等别人修复，我选择直接上手。看似简单的调色工作，却让我学到了项目的设计语言、SVG 生成管线，以及一个 2 万星项目如何在规模下守护质量。\n**挑战:** 一致性——每个图标都要遵守严格的命名、尺寸与几何规范，连“只是一个图标”也不能马虎。\n**收获:** 深入构建/校验自动化脚本，融入以社区为先的评审文化。',
      'h0tp-ftw/ankimon':
        '**加入原因:** Ankimon 把我最喜欢的两样东西——Anki 和宝可梦——融为一体。我从修复自己卡组的一个 bug 开始，最终为社区留了下来。\n**挑战:** Anki 的钩子和窗口生命周期很脆弱，所以每处改动都必须像手术一样精准，避免回归。\n**收获:** 深入 Anki 内部机制和 Python 打包，并交付大家每天都在用的修复。',
    },
  },
  cs: {
    role: '角色',
    timeline: '时间线',
    live: '在线网站',
    open: '打开',
    inProgress: '开发中',
    github: 'GitHub',
    repo: '仓库',
    problem: '遇到的问题',
    approach: '解决思路',
    techSolution: '技术方案',
    features: '功能特性',
    challenges: '克服的挑战',
    takeaway: '核心收获',
  },
  about: {
    title: '关于我',
    techStack: '技术栈',
    categories: {
      languages: '编程语言',
      web: '网页开发',
      plugin: '插件开发',
      ai: 'AI 与自动化',
      databases: '数据库',
      deployment: '部署',
      design: '设计',
    },
    bio: [
      { text: '我擅长把想法打磨成' },
      { text: '精致的软件', style: 'hl' },
      { text: '。从零开始构建可扩展程序的' },
      { text: '能力', style: 'hl' },
      { text: '和' },
      { text: '热情', style: 'hl' },
      { text: '让我一路走进了' },
      { text: '全栈开发', style: 'hl' },
      { text: '。敲代码之外,你还能看到我在' },
      { text: '写作', style: 'hl-em' },
      { text: '或享受' },
      { text: '与家人的美好时光', style: 'hl-em' },
      { text: '。我相信优秀的技术源于' },
      { text: '同理心', style: 'hl' },
      { text: '和' },
      { text: '坚持不懈', style: 'hl' },
      { text: '。' },
    ],
  },
  contact: {
    heading: [
      { text: '一起创造 ' },
      { text: 'Amazingz', style: 'hl' },
      { text: ' 吧。' },
    ],
    available: '🟢 目前可接自由职业 / 兼职 / 开源合作。',
    copyEmail: '复制我的邮箱',
    emailCopied: '邮箱已复制!',
    telegram: '在 Telegram 上找我聊',
    findOn: '也可以在',
    and: '和',
    tail: '找到我',
    github: 'GitHub',
    devpost: 'Devpost',
  },
  footer: {
    line: '© 2026 Nuz Zealous。深夜灵感一闪,便把它建了出来。',
  },
}

export const ui: Record<'en' | 'ms' | 'zh', UiStrings> = { en, ms, zh }
