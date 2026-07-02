import { useEffect, useMemo, useState } from "react";
import backgroundImage from "../background.jpg";
import productLogo from "../product-logo.png";
import profileImage from "../profile.jpg";

const githubProfile = "https://github.com/minitheguitarist";
const roAsdOrg = "https://github.com/Project-Ro-ASD";

const roTools = [
  {
    id: "ro-installer",
    title: "ro-Installer",
    label: "Bana ait ana proje",
    repo: "https://github.com/Project-Ro-ASD/ro-Installer",
    summary:
      "Ro-ASD live ortamını kurulu, boot edilebilir bir sisteme dönüştüren grafik kurulum aracı.",
    points: [
      "Flutter/Dart ile Ro-ASD'ye özel kurulum akışını, disk doğrulama katmanını ve aşamalı kurulum mantığını geliştirdim.",
      "UEFI/GPT ve Btrfs hedefi etrafında güvenli disk işlemleri, RPM paketleme, ISO audit ve QEMU doğrulama süreçlerini kurguladım.",
      "Fedora 43 release RPM çıktıları için GitHub Actions tabanlı build ve doğrulama hattını hazırladım.",
    ],
    stack: ["Flutter", "Dart", "Btrfs", "RPM", "QEMU"],
  },
  {
    id: "ro-kernel",
    title: "Ro-Kernel Experimental",
    label: "Bana ait ana proje",
    repo: "https://github.com/Project-Ro-ASD/Ro-Kernel-Experimental",
    summary:
      "Ro-ASD için yeni kernel özelliklerini, masaüstü tepkiselliğini ve donanım desteğini test eden deneysel kernel dalı.",
    points: [
      "Fedora tabanlı kernel config yaklaşımı, RPM spec dosyaları ve seçilmiş yamalar üzerine çalıştım.",
      "Masaüstü performansı, oyun odaklı iyileştirmeler ve donanım destek denemeleri için ayrı paket hattı tasarladım.",
      "akmods ve DKMS gibi harici modül derlemelerinde kullanılacak devel paketini planladım.",
    ],
    stack: ["Linux Kernel", "Fedora", "RPM", "COPR", "DKMS"],
  },
  {
    id: "ro-printer",
    title: "ro-printer",
    label: "Bana ait sistem aracı",
    repo: "",
    summary:
      "Ro-ASD için yazıcı ve tarayıcı desteğini daha otomatik hale getirmeyi hedefleyen sistem bileşeni.",
    points: [
      "CUPS, udev ve systemd üzerinden donanım algılama ve destek akışı tasarladım.",
      "Yazıcı bağlandığında kullanıcıya gerekli desteği kurmayı öneren agent/daemon mantığı üzerinde çalıştım.",
      "Donanım-sürücü eşleşmesini sade bir veri yapısı ile yöneterek dağıtım içinde bakım yapılabilir hale getirmeyi hedefledim.",
    ],
    stack: ["Linux", "CUPS", "udev", "systemd", "RPM"],
  },
  {
    id: "iso-structure",
    title: "Ro-ASD ISO Yapısı",
    label: "Bana ait release yapısı",
    repo: "https://github.com/Project-Ro-ASD/ro-Installer",
    summary:
      "Ro-ASD'nin kurulabilir live imaj mantığı, ISO hazırlama akışı ve doğrulama hattı için oluşturduğum yapı.",
    points: [
      "ISO remix, audit, manifest ve log üretimi gibi release kanıtlarını installer hattıyla birlikte ele aldım.",
      "QEMU/OVMF ile boot ve kurulum doğrulamasını manuel gözleme bağlı kalmadan test edilebilir hale getirdim.",
      "Dağıtımın canlı ortamdan kurulu sisteme geçişini installer, paketleme ve ISO üretimiyle aynı teknik çerçevede düşündüm.",
    ],
    stack: ["ISO", "QEMU", "OVMF", "GitHub Actions", "Fedora"],
  },
  {
    id: "media-writer",
    title: "Ro-MediaWriter",
    label: "Fork üzerinde düzenleme",
    repo: "https://github.com/Project-Ro-ASD/Ro-MediaWriter",
    summary:
      "Ro-ASD imajlarının indirilmesi ve USB belleğe yazılması için kullanılan media writer tarafında düzenlemeler yaptığım fork.",
    points: [
      "Dağıtım imajını son kullanıcıya ulaştıran araç zincirinin bir parçası olarak değerlendirdim.",
      "Ro-ASD marka/akış ihtiyaçlarına göre fork üzerinde uyarlama ve düzenleme çalışmaları yaptım.",
      "Bu aracı ana installer ve ISO yapısından ayrı, tamamlayıcı bir dağıtım bileşeni olarak konumlandırdım.",
    ],
    stack: ["Media Writer", "Fork", "USB", "ISO"],
  },
  {
    id: "ro-assist",
    title: "ro-Assist",
    label: "Katkıda bulunduğum ekip uygulaması",
    repo: "https://github.com/Project-Ro-ASD/ro-Assist",
    summary:
      "Ro-ASD için bir ekip üyemin geliştirdiği, benim de katkıda bulunduğum bakım ve güncelleme asistanı.",
    points: [
      "Uygulama Ro-ASD masaüstünde güncelleme ve bakım akışlarını daha anlaşılır hale getirmeyi hedefliyor.",
      "Qt6/C++ tabanlı bu araçta proje yönü, dağıtım içindeki rolü ve bazı teknik kararlar tarafında destek verdim.",
      "Ana geliştirme sorumluluğunu ekip üyesinin yürüttüğü bir topluluk bileşeni olarak konumlandırıyorum.",
    ],
    stack: ["C++17", "Qt6", "CMake", "RPM"],
  },
  {
    id: "community",
    title: "Topluluk Bileşenleri",
    label: "Topluluk üyelerinin çalışmaları",
    repo: "https://github.com/Project-Ro-ASD",
    summary:
      "Ro-ASD altında yer alan diğer repolar, topluluk üyelerinin dağıtım ekosistemine katkı olarak geliştirdiği çalışmalar.",
    points: [
      "Ro-Repo, Ro-Store, Ro-Theme, ro-Control ve benzeri bileşenler farklı ekip üyelerinin sorumluluğunda ilerliyor.",
      "Bu çalışmalarda kurucu ve proje lideri olarak repo ayrımı, genel yön ve ekosistem bütünlüğü tarafında rol alıyorum.",
      "Amaç, Ro-ASD'yi tek uygulama değil; installer, paket deposu, tema, store ve sistem araçlarıyla birlikte yaşayan bir dağıtım projesi olarak geliştirmek.",
    ],
    stack: ["GitHub Org", "Project Leadership", "Packaging", "KDE"],
  },
];

const projectGroups = [
  {
    id: "gempa",
    title: "GempaSoft Ürünleri",
    kicker: "İşletmeler için masaüstü ve mobil uygulamalar",
    description:
      "Yerel işletmelerin kampanya, cari, gider, emlak ve doküman süreçlerini daha düzenli takip edebilmesi için geliştirdiğim uygulama ailesi.",
    items: [
      {
        name: "GempaSoft Campaign Manager",
        text: "Tauri + React + Rust ile market broşürleri ve kampanya çıktıları üretmeye odaklanan masaüstü uygulaması. Ürün yönetimi, yedekleme, A4/Instagram çıktı alma ve sürükle-bırak görsel akışı içeriyor.",
        repo: "https://github.com/minitheguitarist/gempasoft-campaign-manager",
      },
      {
        name: "Sorgun Emlak Defteri",
        text: "GempaSoft ürün ailesine dahil Flutter/Android mobil uygulama. Emlak kayıtlarını çevrimdışı saklama, fotoğraf, fiyat geçmişi, konum paylaşımı ve APK release akışı üzerine kurulu.",
        repo: "https://github.com/minitheguitarist/Sorgun-Emlak-Defteri",
      },
      {
        name: "Zahit ARSLAN / KoopAsist",
        text: "Tauri, React, TypeScript ve SQLite ile işletme süreçleri için cari, gider, yedekleme ve doküman odaklı yerel uygulama denemeleri.",
        repo: "https://github.com/minitheguitarist/ZahitARSLAN",
      },
    ],
    stack: ["Tauri", "React", "Rust", "TypeScript", "Flutter", "SQLite"],
  },
  {
    id: "ro-engine",
    title: "Ro-Engine",
    kicker: "Başlangıç aşamasında C++ oyun motoru",
    description:
      "Oyun motorlarının temel parçalarını öğrenmek için C++20 ile yürüttüğüm erken aşama motor denemesi. Amaç, yalnızca oyun yapmak değil; render, sahne, asset ve sistem mimarisini anlamak.",
    items: [
      {
        name: "Motor çekirdeği",
        text: "CMake tabanlı yapı, Vulkan + GLFW entegrasyonu, shader derleme, scene, serializer, asset, input, audio, physics ve job system bileşenleri.",
        repo: "https://github.com/minitheguitarist/Ro-Engine",
      },
    ],
    stack: ["C++20", "CMake", "Vulkan", "GLFW", "Shaders"],
  },
  {
    id: "academic",
    title: "Akademik Problem Çözme Projeleri",
    kicker: "Derslerdeki konuları gerçek senaryolara çevirme",
    description:
      "Okul projelerinde sadece istenen çıktıyı üretmek yerine; mimari, nesne yönelimli programlama, test ve genişletilebilirlik taraflarını da çalıştığım örnekler.",
    items: [
      {
        name: "UstaPlatformm",
        text: ".NET/C# ile SOLID prensipleri, plugin mimarisi, dinamik fiyatlandırma, rota planlama, iş emri ve xUnit testleri içeren servis eşleştirme simülasyonu.",
        repo: "https://github.com/minitheguitarist/UstaPlatformm",
      },
      {
        name: "Kuantum-Kaos",
        text: "C#, Java, Python ve JavaScript ile aynı problemi farklı dillerde modelleyen OOP çalışması. Abstract class, interface, encapsulation, polymorphism ve custom exception kullanıldı.",
        repo: "https://github.com/minitheguitarist/Kuantum-Kaos",
      },
    ],
    stack: [".NET", "C#", "OOP", "xUnit", "Java", "Python"],
  },
  {
    id: "ugrak",
    title: "Uğrak",
    kicker: "Ekip yönetimi ve iletişim platformu",
    description:
      "Kendi ekibimi yönetirken ihtiyaç duyduğum haberleşme, görev takibi ve durum görünürlüğü fikrinden çıkan web tabanlı iş birliği platformu.",
    items: [
      {
        name: "Takım ve görev akışı",
        text: "Node.js/Express, Prisma, Socket.io, JWT ve EJS ile takım sohbeti, görev panosu, kullanıcı durumları, admin paneli ve rol bazlı akışlar kurgulandı.",
        repo: "https://github.com/minitheguitarist/Ugrak",
      },
    ],
    stack: ["Node.js", "Express", "Prisma", "Socket.io", "JWT", "EJS"],
  },
];

function getInitialPage() {
  return window.location.hash === "#/ro-asd" ? "ro-asd" : "home";
}

function App() {
  const [page, setPage] = useState(getInitialPage);
  const [activeProject, setActiveProject] = useState("gempa");

  useEffect(() => {
    const onHashChange = () => setPage(getInitialPage());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (page === "ro-asd") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [page]);

  const selectedProject = useMemo(
    () => projectGroups.find((project) => project.id === activeProject),
    [activeProject]
  );

  const navigateHome = () => {
    if (window.location.hash !== "#/") {
      window.location.hash = "#/";
    }
    setPage("home");
  };

  const scrollTo = (id) => {
    navigateHome();
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  };

  return (
    <div className="site-shell" style={{ "--background-image": `url(${backgroundImage})` }}>
      <Header onAbout={() => scrollTo("about")} onProjects={() => scrollTo("projects")} />
      {page === "ro-asd" ? (
        <RoAsdPage onBack={() => scrollTo("projects")} />
      ) : (
        <HomePage
          activeProject={activeProject}
          selectedProject={selectedProject}
          setActiveProject={setActiveProject}
          onProjects={() => scrollTo("projects")}
        />
      )}
    </div>
  );
}

function Header({ onAbout, onProjects }) {
  return (
    <header className="topbar">
      <button className="brand" type="button" onClick={onAbout}>
        Semih Murat ARSLAN
      </button>
      <nav className="nav-actions" aria-label="Ana navigasyon">
        <button type="button" onClick={onAbout}>
          Hakkımda
        </button>
        <button type="button" onClick={onProjects}>
          Projeler
        </button>
        <a href={githubProfile} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </nav>
    </header>
  );
}

function HomePage({ activeProject, selectedProject, setActiveProject, onProjects }) {
  return (
    <main>
      <section className="hero section-band" id="about">
        <div className="hero-media">
          <img src={profileImage} alt="Semih Murat ARSLAN" className="profile-photo" />
        </div>
        <div className="hero-copy">
          <p className="eyebrow">Bilgisayar Mühendisliği Öğrencisi</p>
          <h1>Merhaba, ben Semih Murat ARSLAN.</h1>
          <p className="intro-line">
            Yozgat Bozok Üniversitesinde Bilgisayar Mühendisliği öğrencisiyim.
          </p>
          <p className="intro-detail">
            2. sınıfı tamamladım. Açık kaynak Linux dağıtımı Ro-ASD'nin kurucusu ve
            proje lideriyim; aynı zamanda işletmeler için masaüstü ve mobil
            uygulamalar, okul projeleri için problem çözme odaklı yazılımlar ve C++
            ile sistem/motor denemeleri geliştiriyorum.
          </p>
          <div className="quick-facts" aria-label="Kısa bilgiler">
            <span>Ro-ASD kurucusu</span>
            <span>Linux & RPM</span>
            <span>Tauri / Flutter</span>
            <span>C++ sistem ilgisi</span>
          </div>
          <button className="primary-action" type="button" onClick={onProjects}>
            Projelerime göz at
          </button>
        </div>
      </section>

      <section className="section-band about-grid" aria-label="Profil özeti">
        <InfoBlock
          title="Yönelimlerim"
          text="Linux dağıtımları, sistem entegrasyonu, paketleme, masaüstü araçları, işletme odaklı yerel uygulamalar ve C++ ile düşük seviye mimari denemeleri."
        />
        <InfoBlock
          title="Çalıştığım Alanlar"
          text="Fedora, RPM, systemd, CUPS, Qt/C++, Flutter/Dart, Tauri, React, TypeScript, SQLite, GitHub Actions ve teknik dokümantasyon."
        />
        <InfoBlock
          title="Geçmiş Tecrübelerim"
          text="Deneyap/T3 eğitim geçmişi, gönüllü staj deneyimi, açık kaynak topluluk yönetimi ve ders projelerini gerçek problem senaryolarına dönüştürme pratiği."
        />
      </section>

      <section className="section-band projects-section" id="projects">
        <div className="section-heading">
          <p className="eyebrow">Seçilmiş çalışmalar</p>
          <h2>Projeler</h2>
          <p>
            Üzerinde çalıştığım projeler; sistem yazılımı, işletme uygulamaları,
            akademik çalışmalar ve ekip yönetimi araçları etrafında şekilleniyor.
          </p>
        </div>

        <div className="project-layout">
          <div className="project-menu" aria-label="Proje başlıkları">
            <a className="project-card ro-card" href="#/ro-asd">
              <span>Ro-ASD Linux Ekosistemi</span>
              <small>Dağıtım, topluluk ve sistem araçları</small>
            </a>
            {projectGroups.map((project) => (
              <button
                className={`project-card ${activeProject === project.id ? "active" : ""}`}
                key={project.id}
                type="button"
                onClick={() => setActiveProject(project.id)}
              >
                <span>{project.title}</span>
                <small>{project.kicker}</small>
              </button>
            ))}
          </div>

          <ProjectDetail project={selectedProject} />
        </div>
      </section>
    </main>
  );
}

function InfoBlock({ title, text }) {
  return (
    <article className="info-block">
      <h2>{title}</h2>
      <p>{text}</p>
    </article>
  );
}

function ProjectDetail({ project }) {
  return (
    <article className="project-detail">
      <p className="eyebrow">{project.kicker}</p>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="detail-list">
        {project.items.map((item) => (
          <div className="detail-row" key={item.name}>
            <div>
              <h4>{item.name}</h4>
              <p>{item.text}</p>
            </div>
            {item.repo ? (
              <a href={item.repo} target="_blank" rel="noreferrer">
                Repo
              </a>
            ) : null}
          </div>
        ))}
      </div>
      <TagList tags={project.stack} />
    </article>
  );
}

function RoAsdPage({ onBack }) {
  const [openTool, setOpenTool] = useState("ro-installer");

  return (
    <main className="ro-page">
      <section className="section-band ro-hero">
        <button className="back-button" type="button" onClick={onBack}>
          Projelere dön
        </button>
        <div className="ro-hero-copy">
          <p className="eyebrow">Açık kaynak Linux dağıtımı</p>
          <h1>Ro-ASD Linux Ekosistemi</h1>
          <p className="lead">
            Ro-ASD, Fedora tabanlı bir Linux dağıtımı fikrini yalnızca tema veya paket
            seçimi olarak değil; installer, kernel, repo, store, bakım araçları ve
            masaüstü deneyimiyle birlikte ele alan açık kaynak bir topluluk projesi.
          </p>
        </div>
        <figure className="ro-logo-panel" aria-label="Ro-ASD logosu">
          <img src={productLogo} alt="Ro-ASD logosu" />
        </figure>
      </section>

      <section className="section-band role-section">
        <div>
          <p className="eyebrow">Buradaki rolüm</p>
          <h2>Kurucu ve proje lideri olarak teknik yönü ve repo organizasyonunu yönetiyorum.</h2>
        </div>
        <div className="role-copy">
          <p>
            Ro-ASD'de kurucu ve proje lideri olarak dağıtımın teknik yönünü,
            repo mimarisini ve ekip içi görev ayrımını yönetiyorum. ro-Installer,
            Ro-Kernel Experimental, ro-printer ve ISO yapısı doğrudan geliştirdiğim
            ana bileşenler arasında yer alıyor.
          </p>
          <p>
            Ro-MediaWriter tarafında fork üzerinde düzenlemeler yaptım. ro-Assist,
            ana geliştirmesini ekip üyemin yürüttüğü ve benim katkıda bulunduğum bir
            uygulama. Diğer Ro-ASD repoları ise topluluk üyelerinin dağıtım
            ekosistemine kattığı çalışmalar olarak ilerliyor.
          </p>
        </div>
      </section>

      <section className="section-band">
        <div className="section-heading compact">
          <p className="eyebrow">Ro-ASD için araçlar</p>
          <h2>Geliştirdiğim ve destek verdiğim bileşenler</h2>
        </div>
        <div className="tool-accordion">
          {roTools.map((tool) => (
            <ToolPanel
              key={tool.id}
              tool={tool}
              isOpen={openTool === tool.id}
              onToggle={() => setOpenTool(openTool === tool.id ? "" : tool.id)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function ToolPanel({ tool, isOpen, onToggle }) {
  return (
    <article className={`tool-panel ${isOpen ? "open" : ""}`}>
      <button className="tool-trigger" type="button" onClick={onToggle} aria-expanded={isOpen}>
        <span>
          <strong>{tool.title}</strong>
          <small>{tool.label}</small>
        </span>
        <span className="toggle-mark">{isOpen ? "Kapat" : "Aç"}</span>
      </button>
      <div className="tool-content" aria-hidden={!isOpen}>
        <p>{tool.summary}</p>
        <ul>
          {tool.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <div className="tool-footer">
          <TagList tags={tool.stack} />
          {tool.repo ? (
            <a href={tool.repo} target="_blank" rel="noreferrer">
              Repoyu aç
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function TagList({ tags }) {
  return (
    <div className="tag-list">
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  );
}

export default App;
