// Project-level translations for ms / zh / hi. English is the source of truth
// in src/data/projects.ts; every other language overrides all user-visible
// fields here so nothing falls back mid-sentence.
import type { Lang } from './LanguageContext'
import { projects, type Project } from '../data/projects'

export interface CaseStudyL10n {
  role: string
  timeline: string
  team: string
  problem: string
  approach: string
  technicalSolution: string[]
  features: { title: string; description: string }[]
  challenges: string[]
  takeaway: string
}

export interface ProjectL10n {
  title: string
  subtitle: string
  description: string
  month: string
  tags: string[]
  caseStudy: CaseStudyL10n
}

export type ProjectOverrideMap = Record<string, ProjectL10n>

const ms: ProjectOverrideMap = {
  nuzzle: {
    title: 'Nuzzle',
    subtitle: 'Userbot Telegram di Terminal & Pelari Tugasan Automatik',
    description: 'Pengendali Telegram berasaskan terminal dengan pelbagai arahan; ia berjalan pada satu userbot.',
    month: 'Januari 2026',
    tags: ['Python', 'Telethon', 'CLI', 'Userbot Telegram'],
    caseStudy: {
      role: 'Pembangun Backend & Automasi',
      timeline: 'Januari 2026 (4 minggu)',
      team: 'Pembangun Solo',
      problem: 'Mengurus moderasi komuniti yang berulang, siaran berita berjadual dan pelaksanaan arahan CLI terminal merentas banyak saluran Telegram bawa janggal apabila dipakai melalui panel web tradisional.',
      approach: 'Mereka bentuk satu userbot Python ringkas dan berasaskan terminal yang dibina dengan Telethon, mengikat alat pembangun CLI terus kepada pencetus arahan mesej peribadi Telegram yang selamat.',
      technicalSolution: [
        'Pengendalian peristiwa asinkron MTProto Telethon dengan pemeriksaan kebenaran berperingkat',
        'Papan pemuka terminal curses terbina-dalam yang memaparkan penggunaan memori dan saluran arahan aktif',
        'Baris giliran had kadar dengan backoff eksponen untuk mengelakkan had FloodWait Telegram',
      ],
      features: [
        { title: 'Enjin Araahan Tersuai', description: 'Tentukan dan muat semula arahan terminal melalui sembang Telegram tanpa memulakan semula userbot.' },
        { title: 'Ringkasan Digest Automatik', description: 'Kumpulkan mesej saluran dan hasilkan digest berformat markdown terus ke mesej tersimpan.' },
        { title: 'Telemetri Terminal', description: 'Pemantauan CLI terminal masa nyata yang memantau kesihatan sambungan dan set arahan.' },
      ],
      challenges: [
        'Mengelakkan keadaan lumba apabila mengurus pelbagai skrip terminal jangka panjang serentak melalui sambungan soket.',
        'Bertahan dengan baik semasa sambungan selular terganggu dengan penerusan sesi MTProto yang berterusan.',
      ],
      takeaway: 'Menguasai seni bina klien MTProto, baris giliran tugas serentak asinkron dalam Python, dan pengurusan proses daemon tanpa kepala.',
    },
  },
  flush: {
    title: 'Flush',
    subtitle: 'Pembersih Cache & Kitaran Tab Pelayar Berprestasi Tinggi',
    description: 'Pembersih cache pelayar dan pengurus memori berprestasi tinggi untuk pengguna kuat, dengan pemantauan proses masa nyata.',
    month: 'Mei 2026',
    tags: ['TypeScript', 'Sambungan Chrome', 'Web Workers'],
    caseStudy: {
      role: 'Pembangun Utama',
      timeline: 'Mei 2026 (4 minggu)',
      team: 'Pembangun Solo',
      problem: 'Pembangun dan pengguna kuat kerap mengalami kelengahan pelayar teruk disebabkan ratusan tab malas memakan gigabait RAM aktif.',
      approach: 'Membina sambungan Chrome MV3 pintar yang mengesan tab malas, menyimpan snapshot DOM/skrolnya ke storan berindeks, dan mengampuh prosesnya tanpa kehilangan keadaan.',
      technicalSolution: [
        'Pekerja perkhidmatan latar Chrome Manifest V3 dengan penapisan permintaan rangkaian deklaratif',
        'Paip mampatan Web Worker untuk snapshot pokok DOM tab',
        'Enjin pemarkaan aktiviti tab heuristik yang menilai pola interaksi pengguna',
      ],
      features: [
        { title: 'Tidur Tab Tanpa Latensi', description: 'Ampuhkan tab malas untuk jimat sehingga 80% RAM, serta pulihkannya serta-merta semasa fokus.' },
        { title: 'Analitik Proses', description: 'Pecahan visual memori dan rangkaian mengikut domain.' },
      ],
      challenges: ['Menangani kitaran hidup sementara pekerja perkhidmatan MV3 tanpa memutuskan pemantau status tab.'],
      takeaway: 'Mendalami dalaman pelayar, seni bina berpandukan peristiwa MV3, dan pengalmayaan proses tab.',
    },
  },
  eyeterra: {
    title: 'Eyeterra',
    subtitle: 'Pembantu Kesejahteraan Skrin Ergonomik Visi Komputer',
    description: 'Aplikasi ruang kerja ergonomik visi komputer dengan pembetulan postur berterusan, penjejakan kelipan dan amaran kesejahteraan skrin 20-20-20.',
    month: 'Jun 2026',
    tags: ['Python', 'OpenCV', 'MediaPipe', 'PyQt'],
    caseStudy: {
      role: 'Jurutera Full Stack & ML',
      timeline: 'Jun 2026 (5 minggu)',
      team: 'Pembangun Solo',
      problem: 'Pembangun perisian menghabiskan lebih 10 jam sehari menatap skrin, menyebabkan letih mata kronik, kadar kelipan berkurang dan postur rosak.',
      approach: 'Mencipta aplikasi desktop yang memproses suapan webcam sepenuhnya pada peranti untuk mengukur kadar kelipan dan jarak postur tanpa sebarang penghantaran data ke awan.',
      technicalSolution: [
        'Penjejakan tanda arah Muka & Iris MediaPipe yang berjalan dalam utas C++ berasingan',
        'Penunjuk tray PyQt dipercepat perkakasan tersuai dengan tindanan peringatan postur lembut',
        'Pemprosesan video beza untuk mengurangkan CPU melahu di bawah 2%',
      ],
      features: [
        { title: 'Pengesanan Kadar Kelipan', description: 'Pantau frekuensi kelipan dan picu peringatan rehat mikro.' },
        { title: 'Penjejakan Sudut Postur', description: 'Kira condong leher dan jarak skrin untuk elak membongkok.' },
      ],
      challenges: ['Memastikan ketepatan tanda arah boleh dipercayai merentasi pelbagai pencahayaan tanpa herotan auto-gain perkakasan kamera.'],
      takeaway: 'Pengalaman hands-on dalam model tanda arah neural pada peranti, seni bina klien terpelihara privasi, dan utas UI desktop.',
    },
  },
  snackglobe: {
    title: 'SnackGlobe',
    subtitle: 'Kotak Langgan Snack Global & Penemuan Budaya',
    description: 'Platform penemuan snek antarabangsa yang disusun dengan profil citarasa interaktif, peta asal serantau dan kotak langgan global.',
    month: 'Julai 2026',
    tags: ['React', 'Next.js', 'Tailwind', 'Stripe'],
    caseStudy: {
      role: 'Pembangun Full-Stack',
      timeline: 'Julai 2026 (4 minggu)',
      team: 'Pembangun Solo',
      problem: 'Peminat makanan yang mahukan snek serantau sebenar kerap bingung disebabkan portal import membingungkan, pesanan minimum mahal dan maklumat allergen yang tidak diterjemahkan.',
      approach: 'Merekabentuk platform e-dagang interaktif yang mempamerkan snek global dengan roda citarasa interaktif, terjemahan ramuan dan langganan bulanan fleksibel.',
      technicalSolution: [
        'Next.js 14 App Router dengan penjanaan semula statik inkremental bagi pemuatan katalog produk segera',
        'Paip webhook Stripe Billing yang menangani pelan langgan berulang berbilang mata wang',
        'Carta radar perisa SVG interaktif memvisualkan nisbah manis, enak, umami dan berempah',
      ],
      features: [
        { title: 'Radar Perisa Interaktif', description: 'Terokai snek menerusi carta profil perisa 5-paksi interaktif.' },
        { title: 'Peta Perjalanan Negara', description: 'Layari snek mengikut cerita sejarah dan asal geografi negara.' },
      ],
      challenges: ['Mengekalkan keadaan troli responsif merentas penukaran mata wang dan kalkulator penghantaran antarabangsa.'],
      takeaway: 'Menguasai lapisan cache Next.js semasa, pembayaran berulang antarabangsa, dan komponen e-dagang yang boleh diakses.',
    },
  },
  sporthyp: {
    title: 'Sporthyp',
    subtitle: 'Analitika Sukan Masa Nyata & Peramal Momen Viral',
    description: 'Radar analitika sukan langsung dan penjejak hype komuniti yang meramalkan momen sukan viral dan anjakan kebarangkalian kemenangan perlawanan.',
    month: 'Ogos 2026',
    tags: ['Python', 'FastAPI', 'WebSockets', 'Chart.js'],
    caseStudy: {
      role: 'Jurutera Full-Stack & Data',
      timeline: 'Ogos 2026 (4 minggu)',
      team: 'Pembangun Solo',
      problem: 'Papan skor sukan tradisional hanya memaparkan angka statik dan gagal menangkap anjakan momentum elektrik yang membuatkan sukan langsung mendebarkan.',
      approach: 'Merekayasa platform analitik langsung yang menggabungkan turun naik statistik setiap ronde dengan halaju media sosial untuk menggabungkan indeks keseronokan perlawanan masa nyata.',
      technicalSolution: [
        'Kluster penyiaran WebSocket asinkron FastAPI yang menghantar 60 kemas kini/saat kepada ribuan pelanggan',
        'Enjin lukisan Canvas beza yang mengelakkan penghasilan semula DOM semasa peristiwa langsung berfrekuensi tinggi',
        'Perantara mesej Redis streams dengan pengesanan anomali sentimen bergelundung',
      ],
      features: [
        { title: 'Pengukur Hype Langsung', description: 'Kira keseronokan perlawanan segera berdasarkan anjakan kebarangkalian menang dan halaju sembang.' },
        { title: 'Radar Momen', description: 'Maklumkan peminat apabila perlawanan memasuki minit kemuncak berisiko tinggi.' },
      ],
      challenges: ['Mengekalkan lewat mesej bawah-50ms merentas sambungan WebSocket semasa lonjakan trafik viral mendadak.'],
      takeaway: 'Pemahaman lanjut tentang kluster penyiaran WebSocket, broker mesej masa nyata, dan penegralan penampilan canvas.',
    },
  },
  'nuz-zealous-a-portfolio': {
    title: 'Nuz Zealous - A Portfolio',
    subtitle: 'Karusel Binaan Bulanan Interaktif & Galeri Pembangun',
    description: 'Portfolio peribadi interaktif dengan karusel binaan bulanan melengkung berterusan, peluncur segerak, kajian kes, dan reka bentuk responsif.',
    month: 'September 2026',
    tags: ['React', 'TypeScript', 'Tailwind', 'Vite'],
    caseStudy: {
      role: 'Pembangun & Pereka Full-Stack',
      timeline: 'September 2026 (Berterusan)',
      team: 'Pembangun Solo',
      problem: 'Laman portfolio linear biasa kerap terasa generik dan gagal menonjolkan rentak iterasi bulanan pelepasan perisian yang berterusan.',
      approach: 'Merekabentuk karusel 3D melengkung yang meluncur berterusan dan segerak dengan peluncur mengufuk tersuai, mengetengahkan eksperimen kejuruteraan bulanan dengan kajian kes mendalam.',
      technicalSolution: [
        'Model fizik penunjuk tersuai dengan manipulasi seret tetikus 1:1 terus dan penampakan momentum',
        'Token reka bentuk Tailwind memastikan kontras WCAG AA dan peralihan tema merentas mod terang/gelap',
        'Penyegerakan nisbah trek peluncur matematik mengekalkan penjajaran mulus dengan kad karusel',
      ],
      features: [
        { title: 'Karusel 3D Melengkung', description: 'Karusel seretan berterusan dengan fokus tengah aktif dan penunjuk sempadan pintasan.' },
        { title: 'Bar Peluncur Segerak', description: 'Peluncur pengepala dwiarah yang memaparkan kedudukan masa nyata karusel dengan snap automatik.' },
        { title: 'Kajian Kes Menyeluruh', description: 'Tinjauan seni bina modal terperinci bagi setiap binaan bulanan.' },
      ],
      challenges: [
        'Membuang hamparan bekas susun atur sambil membiarkan kesan cahaya emas padat melimpah bebas semasa kad melayang.',
        'Menyegerak fizik seretan tetikus supaya kandungan mengikut gerak isyarat pengguna secara semula jadi tanpa terlonjak.',
      ],
      takeaway: 'Menghalusi reka bentuk interaksi mikro, transformasi perspektif matematik karusel, dan ergonomik web mudah diakses.',
    },
  },
}

const zh: ProjectOverrideMap = {
  nuzzle: {
    title: 'Nuzzle',
    subtitle: '终端 Telegram Userbot 与自动化任务执行器',
    description: '一个运行在 userbot 上的基于终端的 Telegram 处理器,支持多种命令。',
    month: '2026年1月',
    tags: ['Python', 'Telethon', 'CLI', 'Telegram Userbot'],
    caseStudy: {
      role: '后端与自动化开发',
      timeline: '2026年1月(4周)',
      team: '独立开发者',
      problem: '通过传统网页面板来管理重复的社区审核、定时广播推送,以及在多个 Telegram 频道上执行终端 CLI 命令,一直很繁琐。',
      approach: '设计了一个用 Telethon 构建的轻量级终端原生 Python userbot,把开发者 CLI 工具直接绑定到安全的 Telegram 私聊命令触发器上。',
      technicalSolution: [
        '支持范围化权限校验的 Telethon MTProto 异步事件处理',
        '内置 curses 终端仪表盘,显示内存占用与活动命令流水线',
        '采用指数退避的速率限制队列,避免触发 Telegram FloodWait 限制',
      ],
      features: [
        { title: '自定义命令引擎', description: '通过 Telegram 聊天定义并热重载终端命令,无需重启 userbot。' },
        { title: '自动摘要推送', description: '聚合频道消息,生成格式化的 Markdown 摘要直接发送到收藏夹。' },
        { title: '终端监控', description: '实时终端 CLI 显示,监控连接健康度与命令吞吐量。' },
      ],
      challenges: [
        '在通过套接字连接并发处理多个长时间运行的终端脚本时,避免竞态条件。',
        '在蜂窝网络频繁断连的情况下,依靠持久的 MTProto 会话恢复优雅存续。',
      ],
      takeaway: '掌握了 MTProto 客户端架构、Python 异步并发任务队列以及无头守护进程管理。',
    },
  },
  flush: {
    title: 'Flush',
    subtitle: '高性能浏览器缓存与标签页生命周期清理工具',
    description: '面向高级用户的高性能浏览器缓存清理与内存管理工具,带有实时进程监控。',
    month: '2026年5月',
    tags: ['TypeScript', 'Chrome 扩展', 'Web Workers'],
    caseStudy: {
      role: '主负责开发',
      timeline: '2026年5月(4周)',
      team: '独立开发者',
      problem: '开发者和高级用户常年因数百个闲置标签页占用大量内存而饱受浏览器卡顿之苦。',
      approach: '构建了一个智能的 Chrome MV3 扩展,检测闲置标签页,将其 DOM/滚动状态快照存入索引存储,并挂起底层进程而不丢失状态。',
      technicalSolution: [
        'Chrome Manifest V3 后台 Service Worker 与声明式网络请求过滤',
        '用于标签页 DOM 树快照的 Web Worker 压缩管线',
        '基于启发式的标签页活跃度评分引擎,评估用户交互模式',
      ],
      features: [
        { title: '零延迟标签页休眠', description: '挂起非活动标签页,最多节省 80% 内存,并在获得焦点时即时恢复。' },
        { title: '进程分析', description: '按域名直观展示内存与网络消耗的细分。' },
      ],
      challenges: ['处理 MV3 Service Worker 的临时生命周期,同时不让标签页状态监控中断。'],
      takeaway: '深化了对浏览器内部机制、MV3 事件驱动架构与标签页进程虚拟化的理解。',
    },
  },
  eyeterra: {
    title: 'Eyeterra',
    subtitle: '基于计算机视觉的人体工学护眼助手',
    description: '计算机视觉工位健康应用,提供持续的坐姿纠正、眨眼监测和 20-20-20 护眼提醒。',
    month: '2026年6月',
    tags: ['Python', 'OpenCV', 'MediaPipe', 'PyQt'],
    caseStudy: {
      role: '全栈与 ML 工程师',
      timeline: '2026年6月(5周)',
      team: '独立开发者',
      problem: '软件开发者每天盯着屏幕超过 10 小时,导致慢性眼疲劳、眨眼频率下降和坐姿变形。',
      approach: '打造了一款桌面应用,在本地设备上完全处理摄像头画面来测量眨眼频率和坐姿距离,零云端数据传输。',
      technicalSolution: [
        'MediaPipe Face Mesh 与虹膜关键点追踪,运行在隔离的 C++ 线程中',
        '自定义 PyQt 硬件加速托盘指示器,带轻柔的坐姿提醒浮层',
        '差分视频帧处理,把空闲 CPU 占用降到 2% 以下',
      ],
      features: [
        { title: '眨眼频率检测', description: '持续监测眨眼频率并触发轻微的微休息提醒。' },
        { title: '坐姿角度追踪', description: '计算颈部倾斜和屏幕距离,预防驼背。' },
      ],
      challenges: ['在多种光照条件下确保关键点检测的可靠性,同时避免相机硬件自动增益带来的失真。'],
      takeaway: '积累了端侧神经关键点模型、隐私保护客户端架构与桌面 UI 线程的实战经验。',
    },
  },
  snackglobe: {
    title: 'SnackGlobe',
    subtitle: '全球零食探索与文化订阅盒',
    description: '精心策划的国际零食发现平台,带互动味觉档案、地区原产地地图与全球订阅盒。',
    month: '2026年7月',
    tags: ['React', 'Next.js', 'Tailwind', 'Stripe'],
    caseStudy: {
      role: '全栈开发',
      timeline: '2026年7月(4周)',
      team: '独立开发者',
      problem: '想吃正宗地方零食的美食爱好者常常被混乱的进口入口、昂贵的最低起订量以及未本地化的过敏原信息弄得一头雾水。',
      approach: '设计了一个互动式电商展示全球零食的平台,带有互动式风味轮、成分翻译与灵活的月度订阅。',
      technicalSolution: [
        'Next.js 14 App Router 配增量静态再生成,实现商品目录的即时加载',
        'Stripe Billing webhook 管线,处理多币种循环订阅套餐',
        '交互式 SVG 风味雷达图,呈现甜、咸香、鲜味与辣度的配比',
      ],
      features: [
        { title: '互动风味雷达', description: '通过互动式五维风味档案图探索零食。' },
        { title: '国家之旅地图', description: '按地理国家故事与历史渊源浏览零食。' },
      ],
      challenges: ['在货币切换与国际运费计算器之间保持响应式购物车状态。'],
      takeaway: '精通了现代 Next.js 缓存层、国际循环计费和无障碍电商组件。',
    },
  },
  sporthyp: {
    title: 'Sporthyp',
    subtitle: '实时体育分析与爆点时刻预测器',
    description: '实时体育分析雷达与社区热度追踪器,预测体育中的爆点时刻与胜负概率变化。',
    month: '2026年8月',
    tags: ['Python', 'FastAPI', 'WebSockets', 'Chart.js'],
    caseStudy: {
      role: '全栈与数据工程师',
      timeline: '2026年8月(4周)',
      team: '独立开发者',
      problem: '传统比分板只呈现静态数字,无法捕捉让直播体育充满激情的瞬时势头变化。',
      approach: '构建了一个实时分析平台,将逐回合统计波动与社媒讨论速度结合,绘制出实时比赛兴奋指数曲线。',
      technicalSolution: [
        'FastAPI 异步 WebSocket 广播集群,以每秒 60 次推送给上千客户端',
        '差分 Canvas 渲染引擎,在高频直播事件中避免 DOM 重渲染',
        'Redis Streams 消息代理,带滚动式情绪异常检测',
      ],
      features: [
        { title: '实时热度计', description: '根据胜负概率波动与聊天速度计算当下比赛兴奋度。' },
        { title: '时刻雷达', description: '当比赛进入高杠杆的关键时刻时提醒球迷。' },
      ],
      challenges: ['在突发流量高峰期间,跨 WebSocket 连接保持 50ms 以内的消息延迟。'],
      takeaway: '深入理解了 WebSocket 广播集群、实时消息代理与 Canvas 性能调优。',
    },
  },
  'nuz-zealous-a-portfolio': {
    title: 'Nuz Zealous - A Portfolio',
    subtitle: '交互式月度项目滑动展示与开发者橱窗',
    description: '交互式个人作品集,包含拱形连续滑动的月度项目轮播、同步滑块、案例研究和响应式设计。',
    month: '2026年9月',
    tags: ['React', 'TypeScript', 'Tailwind', 'Vite'],
    caseStudy: {
      role: '全栈开发与设计',
      timeline: '2026年9月(持续更新)',
      team: '独立开发者',
      problem: '普通线性排布的作品集网站往往千篇一律,无法展现软件月度发布那种持续迭代的节奏感。',
      approach: '设计了拱形连续滑动的 3D 轮播,并与自定义水平滑块同步,以深度案例研究的方式突出每月的工程实验。',
      technicalSolution: [
        '自定义指针物理模型,实现 1:1 鼠标拖拽与惯性吸附',
        'Tailwind 设计令牌确保 WCAG AA 对比度以及明暗模式间的主题过渡',
        '数学化滑轨比例同步,让轮播卡片保持无缝对齐',
      ],
      features: [
        { title: '拱形 3D 轮播', description: '可持续拖动的轮播,中心卡片高亮聚焦,并带有边界占位指示。' },
        { title: '同步滑块栏', description: '与轮播实时联动并自动吸附的头部双向滑块。' },
        { title: '完整案例研究', description: '为每个月度项目提供详细的架构式弹窗总览。' },
      ],
      challenges: [
        '在卡片悬停时消除布局容器的裁剪,让浓烈的金色光晕自由溢出。',
        '同步鼠标拖拽物理,让内容自然跟随手势而不会跳变。',
      ],
      takeaway: '打磨了微交互设计、轮播透视变换的数学建模与无障碍网页人体工学。',
    },
  },
}

const hi: ProjectOverrideMap = {
  nuzzle: {
    title: 'Nuzzle',
    subtitle: 'टर्मिनल टेलीग्राम यूज़रबॉट व स्वचालित टास्क रनर',
    description: 'विभिन्न कमांड वाला टर्मिनल-आधारित टेलीग्राम हैंडलर; यह एक यूज़रबॉट पर चलता है।',
    month: 'जनवरी 2026',
    tags: ['Python', 'Telethon', 'CLI', 'Telegram Userbot'],
    caseStudy: {
      role: 'बैकएंड व ऑटोमेशन डेवलपर',
      timeline: 'जनवरी 2026 (4 हफ़्ते)',
      team: 'एकल डेवलपर',
      problem: 'कई टेलीग्राम चैनलों में बार-बार होने वाली कम्युनिटी मॉडरेशन, शेड्यूल्ड ब्रॉडकास्ट फीड और टर्मिनल CLI कमांड निष्पादन को पारंपरिक वेब पैनलों से संभालना बहुत कठिन था।',
      approach: 'Telethon से बने एक टर्मिनल-नेटिव Python यूज़रबॉट का डिज़ाइन किया, जिसने डेवलपर CLI टूल्स को सुरक्षित टेलीग्राम प्राइवेट-मैसेज कमांड ट्रिगरों से सीधे जोड़ा।',
      technicalSolution: [
        'स्कोप्ड परमिशन चेक के साथ एसिंक्रोनस Telethon MTProto इवेंट हैंडलिंग',
        'बिल्ट-इन curses टर्मिनल डैशबोर्ड जो मेमोरी उपयोग और सक्रिय कमांड पाइपलाइनें दिखाता है',
        'टेलीग्राम FloodWait सीमाओं से बचाने वाली एक्सपोनेंशियल बैकऑफ़ रेट-लिमिटिंग क्यू',
      ],
      features: [
        { title: 'कस्टम कमांड इंजन', description: 'यूज़रबॉट रीस्टार्ट किए बिना टेलीग्राम चैट के ज़रिए टर्मिनल कमांड परिभाषित व हॉट-रीलोड करें।' },
        { title: 'ऑटोमेटेड डाइजेस्ट समरी', description: 'चैनल मैसेजों को एकत्र कर सेव्ड मैसेज में फ़ॉर्मेटेड मार्कडाउन डाइजेस्ट बनाए।' },
        { title: 'टर्मिनल टेलीमेट्री', description: 'कनेक्शन हेल्थ और कमांड थ्रूपुट पर रीयल-टाइम टर्मिनल CLI मॉनिटरिंग।' },
      ],
      challenges: [
        'सॉकेट कनेक्शनों पर एक साथ कई लंबे चलने वाले टर्मिनल स्क्रिप्ट संभालते समय रेस कंडीशन से बचना।',
        'सेल्युलर डिस्कनेक्ट के बीच स्थायी MTProto सेशन रीज़ूम्पशन के ज़रिए सहजता से बना रहना।',
      ],
      takeaway: 'MTProto क्लाइंट आर्किटेक्चर, Python में एसिंक्रोनस कंकरेंट टास्क क्यू और हेडलेस डेमॉन प्रोसेस मैनेजमेंट में महारत।',
    },
  },
  flush: {
    title: 'Flush',
    subtitle: 'हाई-परफ़ॉर्मेंस ब्राउज़र कैश और टैब लाइफ़साइकल पर्जर',
    description: 'हाई-परफ़ॉर्मेंस ब्राउज़र कैश क्लीनर और मेमोरी मैनेजमेंट टूल, जिसमें रीयल-टाइम प्रोसेस मॉनिटरिंग के साथ।',
    month: 'मई 2026',
    tags: ['TypeScript', 'Chrome एक्सटेंशन', 'Web Workers'],
    caseStudy: {
      role: 'लीड डेवलपर',
      timeline: 'मई 2026 (4 हफ़्ते)',
      team: 'एकल डेवलपर',
      problem: 'डेवलपर और पावर यूज़र्स नियमित रूप से सैकड़ों निष्क्रिय टैबों की भारी मेमोरी खपत के चलते ब्राउज़र स्लोडाउन से पीड़ित रहते हैं।',
      approach: 'एक इंटेलिजेंट Chrome MV3 एक्सटेंशन बनाया जो निष्क्रिय टैब पहचानता है, उनके DOM/स्क्रॉल स्टेट के स्नैपशॉट इंडेक्स्ड स्टोरेज में रखता है, और स्टेट खोए बिना प्रोसेस को सस्पेंड करता है।',
      technicalSolution: [
        'डिक्लेरेटिव नेट रिक्वेस्ट फ़िल्टरिंग के साथ Chrome Manifest V3 बैकग्राउंड सर्विस वर्कर',
        'टैब DOM ट्री स्नैपशॉट के लिए Web Worker कम्प्रेशन पाइपलाइन',
        'यूज़र इंटरैक्शन पैटर्न आँकने वाला ह्यूरिस्टिक टैब एक्टिविटी स्कोरिंग इंजन',
      ],
      features: [
        { title: 'ज़ीरो-लेटेंसी टैब स्लीपिंग', description: 'निष्क्रिय टैब सस्पेंड करके 80% तक मेमोरी बचाएँ, और फोकस पर तुरंत वापस लाएँ।' },
        { title: 'प्रोसेस एनालिटिक्स', description: 'डोमेन-वार मेमोरी और नेटवर्क खपत का विज़ुअल ब्रेकडाउन।' },
      ],
      challenges: ['टैब स्टेट मॉनिटर छोड़े बिना MV3 सर्विस वर्कर के क्षणिक लाइफ़साइकल संभालना।'],
      takeaway: 'ब्राउज़र इंटरनल्स, MV3 इवेंट-ड्रिवन आर्किटेक्चर, और टैब प्रोसेस वर्चुअलाइज़ेशन की गहरी समझ।',
    },
  },
  eyeterra: {
    title: 'Eyeterra',
    subtitle: 'कंप्यूटर विज़न एर्गोनॉमिक स्क्रीन वेलनेस असिस्टेंट',
    description: 'कंप्यूटर विज़न एर्गोनॉमिक वर्कस्पेस ऐप, जिसमें लगातार पोस्चर करेक्शन, ब्लिंक ट्रैकिंग और 20-20-20 स्क्रीन वेलनेस अलर्ट।',
    month: 'जून 2026',
    tags: ['Python', 'OpenCV', 'MediaPipe', 'PyQt'],
    caseStudy: {
      role: 'फुल स्टैक और ML इंजीनियर',
      timeline: 'जून 2026 (5 हफ़्ते)',
      team: 'एकल डेवलपर',
      problem: 'सॉफ़्टवेयर डेवलपर हर दिन 10+ घंटे स्क्रीन पर टकटकी लगाकर बिताते हैं, जिससे चिरकालिक आँखों की थकान, कम ब्लिंक दर और पोस्चर टूट होती है।',
      approach: 'एक डेस्कटॉप ऐप बनाया जो वेबकैम फ़ीड को पूरी तरह डिवाइस पर प्रोसेस करके ब्लिंक दर और पोस्चर दूरी मापता है, जिसमें बिल्कुल शून्य क्लाउड डेटा ट्रांसमिशन है।',
      technicalSolution: [
        'एक अलग C++ थ्रेड में चलने वाली MediaPipe फेस मेश/आइरिस लैंडमार्क ट्रैकिंग',
        'सौम्य पोस्चर रिमाइंडर ओवरले के साथ कस्टम PyQt हार्डवेयर-एक्सेलरेटेड ट्रे इंडिकेटर',
        'इडल CPU उपयोग 2% से नीचे रखने के लिए डिफरेंशियल वीडियो फ़्रेम प्रोसेसिंग',
      ],
      features: [
        { title: 'ब्लिंक रेट डिटेक्शन', description: 'ब्लिंक फ़्रीक्वेंसी मॉनिटर करें और सूक्ष्म माइक्रो-ब्रेक रिमाइंडर ट्रिगर करें।' },
        { title: 'पोस्चर एंगल ट्रैकिंग', description: 'गर्दन के झुकाव और स्क्रीन दूरी की गणना कर झुकने से बचाएँ।' },
      ],
      challenges: ['कैमरा हार्डवेयर ऑटो-गेन विकृति के बिना विविध प्रकाश में भरोसेमंद लैंडमार्क सटीकता सुनिश्चित करना।'],
      takeaway: 'ऑन-डिवाइस न्यूरल लैंडमार्क मॉडल, प्राइवेसी-संरक्षित क्लाइंट आर्किटेक्चर और डेस्कटॉप UI थ्रेड्स का प्रत्यक्ष अनुभव।',
    },
  },
  snackglobe: {
    title: 'SnackGlobe',
    subtitle: 'ग्लोबल स्नैक डिस्कवरी और संस्कृति सब्सक्रिप्शन बॉक्स',
    description: 'इंटरैक्टिव टेस्ट प्रोफ़ाइल, क्षेत्रीय मूल मैप और ग्लोबल सब्सक्रिप्शन बॉक्स के साथ क्यूरेटेड इंटरनेशनल स्नैक डिस्कवरी प्लेटफ़ॉर्म।',
    month: 'जुलाई 2026',
    tags: ['React', 'Next.js', 'Tailwind', 'Stripe'],
    caseStudy: {
      role: 'फुल-स्टैक डेवलपर',
      timeline: 'जुलाई 2026 (4 हफ़्ते)',
      team: 'एकल डेवलपर',
      problem: 'असली क्षेत्रीय स्नैक चाहने वाले फ़ूडीज़ अक्सर उलझे हुए इंपोर्ट पोर्टलों, महंगे मिनिमम ऑर्डर और नॉन-लोकलाइज़्ड एलर्जेन जानकारी से परेशान रहते हैं।',
      approach: 'इंटरैक्टिव फ़्लेवर वील्स, इंग्रेडिएंट ट्रांसलेशन और लचीली मासिक सब्सक्रिप्शन के साथ ग्लोबल स्नैक दिखाने वाले इंटरैक्टिव ई-कॉमर्स प्लेटफ़ॉर्म का डिज़ाइन किया।',
      technicalSolution: [
        'तुरंत प्रोडक्ट कैटलॉग लोड के लिए इंक्रीमेंटल स्टैटिक रिज़नरेशन के साथ Next.js 14 App Router',
        'बार-बार होने वाली मल्टी-करेंसी सब्सक्रिप्शन टियर संभालने वाली Stripe Billing वेबहुक पाइपलाइन',
        'मीठा, सेवरी, उमामी और स्पाइसी के अनुपात दिखाने वाले इंटरैक्टिव SVG फ़्लेवर रडार चार्ट',
      ],
      features: [
        { title: 'इंटरैक्टिव फ़्लेवर रडार', description: 'इंटरैक्टिव 5-एक्सिस फ़्लेवर प्रोफ़ाइल चार्ट से स्नैक देखें।' },
        { title: 'कंट्री जर्नी मैप', description: 'स्नैक को भौगोलिक देश कहानियों और ऐतिहासिक मूल के अनुसार ब्राउज़ करें।' },
      ],
      challenges: ['करेंसी स्विचिंग और इंटरनेशनल शिपिंग कैलकुलेटर के बीच रिस्पॉन्सिव कार्ट स्टेट बनाए रखना।'],
      takeaway: 'आधुनिक Next.js कैशिंग लेयर्स, इंटरनेशनल रेकरिंग बिलिंग और एक्सेसिबल ई-कॉमर्स कंपोनेंट्स में महारत।',
    },
  },
  sporthyp: {
    title: 'Sporthyp',
    subtitle: 'रीयल-टाइम स्पोर्ट्स एनालिटिक्स और वायरल मोमेंट प्रेडिक्टर',
    description: 'लाइव स्पोर्ट्स एनालिटिक्स रडार और हाइपट्रेन कम्युनिटी ट्रैकर जो वायरल एथलेटिक मोमेंट्स और गेम-विनिंग प्रोबेबिलिटी शिफ़्ट्स की भविष्यवाणी करता है।',
    month: 'अगस्त 2026',
    tags: ['Python', 'FastAPI', 'WebSockets', 'Chart.js'],
    caseStudy: {
      role: 'फुल-स्टैक और डेटा इंजीनियर',
      timeline: 'अगस्त 2026 (4 हफ़्ते)',
      team: 'एकल डेवलपर',
      problem: 'पारंपरिक स्पोर्ट्स स्कोरबोर्ड सिर्फ स्टैटिक नंबर देते हैं और वे उन मोमेंटम शिफ़्ट्स को नहीं पकड़ पाते जो लाइव स्पोर्ट्स को रोमांचक बनाते हैं।',
      approach: 'प्ले-बाय-प्ले स्टैटिस्टिकल वोलेटिलिटी और सोशल मीडिया वर्लोसिटी को जोड़कर रीयल-टाइम मैच एक्साइटमेंट इंडेक्स ग्राफ़ करने वाला लाइव एनालिटिक्स प्लेटफ़ॉर्म इंजीनियर किया।',
      technicalSolution: [
        'हज़ारों क्लाइंट्स को 60 अपडेट/सेकंड भेजने वाला FastAPI एसिंक WebSocket ब्रॉडकास्ट क्लस्टर',
        'हाई-फ़्रीक्वेंसी लाइव इवेंट्स के दौरान DOM री-रेंडर रोकने वाला डिफरेंशियल Canvas रेंडरिंग इंजन',
        'रोलिंग सेंटिमेंट एनोमली डिटेक्शन के साथ Redis स्ट्रीम्स मैसेज ब्रोकर',
      ],
      features: [
        { title: 'लाइव हाइप मीटर', description: 'विन प्रोबेबिलिटी स्विंग और चैट वर्लोसिटी से तुरंत मैच एक्साइटमेंट कैलकुलेट करें।' },
        { title: 'मोमेंट रडार', description: 'जब गेम हाई-लेवरेज क्लच मिनटों में चला जाए तो फ़ैन्स को अलर्ट करें।' },
      ],
      challenges: ['अचानक वायरल ट्रैफ़िक स्पाइक्स के दौरान WebSocket कनेक्शनों पर सब-50ms मैसेज लेटेंसी बनाए रखना।'],
      takeaway: 'WebSocket ब्रॉडकास्ट क्लस्टरिंग, रीयल-टाइम मैसेज ब्रोकर और Canvas परफ़ॉर्मेंस प्रोफ़ाइलिंग की उन्नत समझ।',
    },
  },
  'nuz-zealous-a-portfolio': {
    title: 'Nuz Zealous - A Portfolio',
    subtitle: 'इंटरैक्टिव मासिक बिल्ड कैरोसेल और डेवलपर शोकेस',
    description: 'इंटरैक्टिव व्यक्तिगत पोर्टफ़ोलियो, जिसमें आर्च्ड कंटीन्यूअस-ग्लाइडिंग मासिक बिल्ड कैरोसेल, सिंक्रनाइज़्ड स्लाइडर, केस स्टडी और रिस्पॉन्सिव डिज़ाइन।',
    month: 'सितंबर 2026',
    tags: ['React', 'TypeScript', 'Tailwind', 'Vite'],
    caseStudy: {
      role: 'फुल-स्टैक डेवलपर और डिज़ाइनर',
      timeline: 'सितंबर 2026 (जारी)',
      team: 'एकल डेवलपर',
      problem: 'सामान्य लीनियर पोर्टफ़ोलियो साइटें अक्सर जेनेरिक लगती हैं और मासिक सॉफ़्टवेयर रिलीज़ की निरंतर इटरेटिव लय को नहीं दिखा पातीं।',
      approach: 'आर्च्ड, कंटीन्यूअस-ग्लाइडिंग 3D कैरोसेल डिज़ाइन किया और कस्टम हॉरिज़ॉन्टल स्लाइडर से सिंक्रनाइज़्ड रखा, जिससे मासिक इंजीनियरिंग प्रयोग केस स्टडी डीप-डाइव्स के रूप में उजागर हों।',
      technicalSolution: [
        'सीधे 1:1 माउस ड्रैग मैनिपुलेशन और मोमेंटम स्नैपिंग के साथ कस्टम पॉइंटर फ़िज़िक्स मॉडल',
        'WCAG AA कंट्रास्ट और लाइट/डार्क मोड थीम ट्रांज़िशन सुनिश्चित करते Tailwind डिज़ाइन टोकन',
        'कैरोसेल कार्ड्स के साथ सहज संरेकण बनाए रखने वाला गणितीय स्लाइडर ट्रैक रेशियो सिंक्रनाइज़ेशन',
      ],
      features: [
        { title: 'आर्च्ड 3D कैरोसेल', description: 'सक्रिय सेंटर फोकस और बाउंड्री प्लेसहोल्डर इंडिकेटर के साथ निरंतर ड्रैगिंग कैरोसेल।' },
        { title: 'सिंक्रनाइज़्ड स्लाइडर बार', description: 'बाई-डायरेक्शनल हेडर स्लाइडर जो ऑटो-स्नैप के साथ रीयल-टाइम कैरोसेल पोज़िशन दिखाता है।' },
        { title: 'व्यापक केस स्टडी', description: 'हर मासिक बिल्ड का विस्तृत मोडल आर्किटेक्चरल ओवरव्यू।' },
      ],
      challenges: [
        'कार्ड होवर पर लेआउट कंटेनर क्लिपिंग खत्म करना और तीव्र गोल्डन ग्लो इफ़ेक्ट को बिना रोक-टोक बाहर फैलने देना।',
        'माउस ड्रैगिंग फ़िज़िक्स को सिंक्रनाइज़ करना ताकि कंटेंट यूज़र के ड्रैग जेस्चर के साथ स्वाभाविक रूप से चले, बिना किसी जंप के।',
      ],
      takeaway: 'माइक्रो-इंटरैक्शन डिज़ाइन, सुगम वेब इर्गोनॉमिक्स और गणितीय कैरोसेल पर्सपेक्टिव ट्रांसफ़ॉर्म्स को निखारा।',
    },
  },
}

const overrides: Record<Exclude<Lang, 'en'>, ProjectOverrideMap> = { ms, zh, hi }

export function getProjects(lang: Lang): Project[] {
  if (lang === 'en') return projects
  const map = overrides[lang]
  return projects.map((p) => {
    const l = map[p.id]
    if (!l) return p
    return {
      ...p,
      title: l.title,
      subtitle: l.subtitle,
      description: l.description,
      month: l.month,
      tags: l.tags,
      caseStudy: {
        ...p.caseStudy,
        ...l.caseStudy,
      },
    }
  })
}
