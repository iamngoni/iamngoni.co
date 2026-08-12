import { motion, AnimatePresence } from "framer-motion";
import { X, Briefcase, MapPin, Calendar } from "lucide-react";

interface Experience {
  id: string;
  title: string;
  company: string;
  type: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  skills: string[];
  color: string;
}

const monthMap: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

function parseMonthYear(input: string): Date {
  const [mon, yearStr] = input.trim().split(" ");
  const month = monthMap[mon];
  const year = Number(yearStr);
  return new Date(year, month ?? 0, 1);
}

function formatDuration(totalMonths: number): string {
  if (totalMonths < 1) totalMonths = 1;
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  if (years === 0) return `${months} mo${months === 1 ? "" : "s"}`;
  if (months === 0) return `${years} yr${years === 1 ? "" : "s"}`;
  return `${years} yr${years === 1 ? "" : "s"} ${months} mo${months === 1 ? "" : "s"}`;
}

function getDuration(period: string): string {
  const [startStr, endStrRaw] = period.split(" - ").map((s) => s.trim());
  const start = parseMonthYear(startStr);
  const end =
    endStrRaw === "Present" ? new Date() : parseMonthYear(endStrRaw);
  // inclusive month count – matches resume convention (Apr 2021 - Dec 2021 = 9 mos)
  const totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) +
    1;
  return formatDuration(totalMonths);
}

const experiences: Experience[] = [
  {
    id: "toppan",
    title: "Software Engineer",
    company: "TOPPAN Security",
    type: "Contract",
    period: "Apr 2024 - Present",
    location: "Ethiopia · Namibia · South Africa · Japan · Hybrid",
    description:
      "Building secure, scalable government identity platforms with Flutter for web and desktop and .NET services. Working across the full lifecycle — from requirements and architecture to deployment and live operational support — for ePassports, visas and election-related biometric systems.",
    highlights: [
      "Delivered Ethiopia's first locally manufactured ICAO-compliant ePassport and digital visa system (TOPPAN Gravity Ethiopia JV with ICS & EIH, Bole-Lemi facility, Addis Ababa) — biometrics, advanced encryption, tamper-proof materials, now in nationwide use",
      "Contributing to election and national ID biometrics footprint via TOPPAN FaceTech (acquired Face Technologies) — biometric voter registration kits (MVRKs), AFIS deduplication and voter verification devices, including support around Namibia's 2024 general elections (27–30 Nov 2024)",
      "Developed resilient sync and patching infrastructure for low-connectivity field environments — fault tolerance, retry handling, conflict resolution, zero/minimal-downtime deployments",
      "Build reusable components and tooling to accelerate future government deployments and ensure seamless handover and adoption",
      "Actively maintain and evolve deployed systems based on real-time client feedback and provide live operational support during critical production periods with high availability requirements",
      "Hardware integration, WebSocket and encryption across Flutter Web/Desktop and Windows platforms",
    ],
    skills: [
      "Flutter",
      ".NET Framework",
      "Flutter Web",
      "Flutter Desktop",
      "Android",
      "Windows",
      "WebSocket",
      "Encryption",
      "Hardware Integration",
      "UIX",
    ],
    color: "from-portfolio-moss to-portfolio-forest",
  },
  {
    id: "merlin",
    title: "Software Developer",
    company: "Merlin Software for Vacation Ownership (QuickMerlin)",
    type: "Contract",
    period: "Jul 2023 - Present",
    location: "South Africa · Malaysia · Remote",
    description:
      "Part of the QuickMerlin Work Platform team — Merlin's end-to-end cloud platform for vacation ownership. Working across companion mobile apps and the core system: modernizing legacy web services, shipping new platform features and keeping mobile ↔ core in real-time sync.",
    highlights: [
      "Modernizing legacy ASP.NET / WCF / SOAP web services to modern REST APIs (.NET) and evolving the core domain — reservations, owner/member management, levies, accounting and sales contracts",
      "Shipping new platform capabilities across Merlin CORE and modular web apps (Sales Contract, MiniVac, owner Portal/self-service) linked to the central cloud database",
      "Building and enhancing companion Flutter apps for housekeeping, maintenance and guest services with focus on offline resilience and performance",
      "Ensuring seamless, real-time data synchronization between mobile apps and .NET backend — REST APIs, WebSocket and background sync",
      "Implementing UI/UX best practices and collaborating cross-functionally with international teams across design, backend and operations",
    ],
    skills: [
      "Flutter",
      ".NET",
      "ASP.NET Web API",
      "REST APIs",
      "MS SQL",
      "Dart",
      "Android",
      "iOS Development",
      "Figma",
      "WebSocket",
    ],
    color: "from-rose-600 to-portfolio-copper",
  },
  {
    id: "africai",
    title: "Mobile Engineer",
    company: "AfricAi Project",
    type: "Part-time",
    period: "May 2023 - Aug 2023",
    location: "City of Johannesburg, Gauteng, South Africa · Remote",
    description:
      "Mobile and Backend Engineer exploring technology's potential to empower underserved populations in Africa through GPT models.",
    highlights: [
      "Architected ZivAi by DanAi.chat - a mobile app providing ChatGPT access to underserved communities",
      "Pioneered the African Folktales app with AI-generated imagery and infinite coloring book powered by GPT-4",
      "Led development of payments platform for ZivAi credits with Stripe integration",
    ],
    skills: [
      "Django REST Framework",
      "iOS",
      "Redis",
      "FastAPI",
      "Python",
      "GPT-4",
      "Docker",
      "Flutter",
      "ChatGPT",
    ],
    color: "from-slate-600 to-portfolio-forest",
  },
  {
    id: "afriblocks",
    title: "Professional Freelancer",
    company: "AfriBlocks",
    type: "Freelance",
    period: "Jan 2022 - Nov 2023",
    location: "Harare, Zimbabwe",
    description:
      "Freelance work with Afriblocks and ModestNerds, actively involved in diverse projects across various domains.",
    highlights: [
      "Expense Tracking Platform for Farmers (topfarmer.africa) - React, Flutter, Firebase",
      "Web-Based Social Space for Meditation and Accommodation (bookhuru.space) - React, Python Django, Redis",
      "Online Therapy Platform connecting users with therapists - Next.js, Python Django, Redis, Flutter",
    ],
    skills: [
      "Django REST Framework",
      "Redis",
      "Python",
      "Firebase",
      "PostgreSQL",
      "Flutter",
      "WebSocket",
      "React.js",
    ],
    color: "from-portfolio-forest to-portfolio-moss",
  },
  {
    id: "intelliafrica",
    title: "Software Developer",
    company: "Intelli Africa Solutions",
    type: "Full-time",
    period: "Oct 2021 - Jun 2022",
    location: "Harare, Zimbabwe",
    description:
      "Mobile App Design and Development with Flutter, Process Optimization for Exceptional UX, and Collaborative Backend Services Development.",
    highlights: [
      "Designed and developed mobile apps including Tumai Mobile using Flutter",
      "Collaborated with Frontend team to develop the Zimswitch website",
      "Enhanced SMS and Email Gateway with integrations to Econet and Netone",
      "Developed custom web chat solution using native web sockets",
      "Served as Customer Support Officer for the ZB WhatsApp chatbot",
    ],
    skills: [
      "Database Administration",
      "Django REST Framework",
      "Systems Design",
      "Python",
      "PostgreSQL",
      "Flutter",
    ],
    color: "from-slate-600 to-portfolio-copper",
  },
  {
    id: "freshideas",
    title: "Mobile Application Developer",
    company: "Fresh Ideas Studio",
    type: "Contract",
    period: "Apr 2021 - Dec 2021",
    location: "Harare, Zimbabwe · Remote",
    description:
      "Creating mobile applications to complement and enhance e-commerce web products during three consecutive contracts.",
    highlights: [
      "Developed mobile apps for Fresh In A Box, Till-point, Munch Zimbabwe, Golden Harmony, and Nyamabantu",
      "Led migration of existing mobile applications from React Native web views to Flutter",
      "Participated in development of capital crowdfunding solution for agriculture sector",
    ],
    skills: [
      "iOS",
      "Firebase",
      "Android Studio",
      "Node.js",
      "Mobile Application Development",
      "Flutter",
      "React Native",
    ],
    color: "from-emerald-700 to-portfolio-moss",
  },
  {
    id: "lads",
    title: "Software Developer",
    company: "LADS Africa",
    type: "Full-time",
    period: "Sep 2020 - Oct 2021",
    location: "Harare, Zimbabwe · On-site",
    description:
      "Design and Development of Core ERP Modules for local authorities, contributing to the nation's digital transformation.",
    highlights: [
      "Designed and developed core ERP modules for city councils",
      "Created companion mobile apps including coordinates mapping app for GIS, Housing & Water Billing",
      "Led ERP Solution Upgrade - migration to Laravel 8 with Livewire integration",
      "Requirements gathering and deployment support for local authorities",
      "Developed benchmarking solution for local authorities performance comparison",
    ],
    skills: [
      "Laravel",
      "PHP",
      "MySQL",
      "JavaScript",
      "Mobile Application Development",
      "Systems Design",
    ],
    color: "from-orange-700 to-portfolio-copper",
  },
];

interface ExperienceSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExperienceSidebar({ isOpen, onClose }: ExperienceSidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-portfolio-ink/35 backdrop-blur-sm z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 left-0 h-full w-full md:w-[55%] bg-portfolio-ivory text-portfolio-ink border-r border-portfolio-line z-50 overflow-hidden shadow-[24px_0_60px_hsl(148_42%_18%/0.14)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-portfolio-line bg-portfolio-paper/45">
              <div>
                <span className="text-portfolio-copper font-mono text-xs block mb-1">
                  // EXPERIENCE
                </span>
                <h2 className="font-display text-3xl leading-none">
                  Career <span className="gradient-text">Journey</span>
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-portfolio-soft hover:text-portfolio-copper transition-colors rounded-lg hover:bg-portfolio-paper"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Timeline */}
            <div className="h-[calc(100%-88px)] overflow-y-auto p-6">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-portfolio-forest via-portfolio-copper to-portfolio-sage opacity-35" />

                {/* Experience items */}
                <div className="space-y-8">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-10"
                    >
                      {/* Timeline dot */}
                      <div
                        className={`absolute left-0 top-1 w-6 h-6 rounded-full bg-gradient-to-r ${exp.color} flex items-center justify-center`}
                      >
                        <Briefcase className="w-3 h-3 text-portfolio-ivory" />
                      </div>

                      {/* Content */}
                      <div className="bg-portfolio-paper/55 border border-portfolio-line rounded-lg p-5 hover:border-portfolio-copper/55 transition-colors">
                        {/* Header */}
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-portfolio-ink">
                              {exp.title}
                            </h3>
                            <p className="text-portfolio-forest font-medium">
                              {exp.company}
                              <span className="text-portfolio-soft font-normal">
                                {" "}
                                · {exp.type}
                              </span>
                            </p>
                          </div>
                          <span
                            className={`px-2 py-1 text-xs rounded-full bg-gradient-to-r ${exp.color} text-portfolio-ivory`}
                          >
                            {getDuration(exp.period)}
                          </span>
                        </div>

                        {/* Meta */}
                        <div className="flex flex-wrap gap-4 text-xs text-portfolio-soft mb-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {exp.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {exp.location}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-portfolio-soft mb-4">
                          {exp.description}
                        </p>

                        {/* Highlights */}
                        {exp.highlights.length > 0 && (
                          <div className="mb-4">
                            <ul className="space-y-1">
                              {exp.highlights.map((highlight, i) => (
                                <li
                                  key={i}
                                  className="text-xs text-portfolio-soft flex items-start gap-2"
                                >
                                  <span className="text-portfolio-copper mt-1">
                                    •
                                  </span>
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Skills */}
                        <div className="flex flex-wrap gap-1.5">
                          {exp.skills.slice(0, 6).map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-0.5 text-xs font-mono text-portfolio-forest bg-portfolio-ivory/75 border border-portfolio-line rounded"
                            >
                              {skill}
                            </span>
                          ))}
                          {exp.skills.length > 6 && (
                            <span className="px-2 py-0.5 text-xs font-mono text-portfolio-soft">
                              +{exp.skills.length - 6} more
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
