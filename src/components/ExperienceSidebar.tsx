import { motion, AnimatePresence } from "framer-motion";
import { X, Briefcase, MapPin, Calendar } from "lucide-react";

interface Experience {
  id: string;
  title: string;
  company: string;
  type: string;
  period: string;
  duration: string;
  location: string;
  description: string;
  highlights: string[];
  skills: string[];
  color: string;
}

const experiences: Experience[] = [
  {
    id: "toppan",
    title: "Software Engineer",
    company: "TOPPAN Security",
    type: "Contract",
    period: "Apr 2024 - Present",
    duration: "1 yr 9 mos",
    location: "South Africa · Hybrid",
    description:
      "Building secure, scalable, and user-centric applications using Flutter for web and desktop platforms. Working across the full software development lifecycle — from gathering complex requirements and architecting solutions, to coding, deploying, and supporting production systems.",
    highlights: [
      "Delivered secure ePassport and visa system now in use nationwide in Ethiopia",
      "Ensuring seamless handover and adoption",
      "Actively maintain and evolve deployed systems based on real-time client feedback",
      "Build reusable components and tools to accelerate future government-related deployments",
    ],
    skills: ["Flutter", ".NET Framework", "Android", "UIX", "Windows", "WebSocket", "Encryption", "Flutter Desktop", "Flutter Web", "Hardware Integration"],
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "merlin",
    title: "Software Developer – Mobile Apps",
    company: "Merlin Software for Vacation Ownership",
    type: "Contract",
    period: "Jul 2023 - Present",
    duration: "2 yrs 6 mos",
    location: "South Africa · Remote",
    description:
      "Building companion apps for vacation ownership software using Flutter. Developing mobile applications that serve different aspects of the business, including housekeeping, maintenance, and guest services. Working closely with .NET API services, ensuring seamless integration and real-time data synchronization.",
    highlights: [
      "Developing mobile applications for housekeeping, maintenance, and guest services",
      "Seamless integration with .NET API services",
      "Real-time data synchronization between mobile apps and backend",
      "Implementing UI/UX best practices and solving performance issues",
    ],
    skills: ["Android Development", "REST APIs", "Flutter", "iOS Development", "Figma"],
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "africai",
    title: "Mobile Engineer",
    company: "AfricAi Project",
    type: "Part-time",
    period: "May 2023 - Aug 2023",
    duration: "4 mos",
    location: "City of Johannesburg, Gauteng, South Africa · Remote",
    description:
      "Mobile and Backend Engineer exploring technology's potential to empower underserved populations in Africa through GPT models.",
    highlights: [
      "Architected ZivAi by DanAi.chat - a mobile app providing ChatGPT access to underserved communities",
      "Pioneered the African Folktales app with AI-generated imagery and infinite coloring book powered by GPT-4",
      "Led development of payments platform for ZivAi credits with Stripe integration",
    ],
    skills: ["Django REST Framework", "iOS", "Redis", "FastAPI", "Python", "GPT-4", "Docker", "Flutter", "ChatGPT"],
    color: "from-violet-500 to-purple-500",
  },
  {
    id: "afriblocks",
    title: "Professional Freelancer",
    company: "AfriBlocks",
    type: "Freelance",
    period: "Jan 2022 - Nov 2023",
    duration: "1 yr 11 mos",
    location: "Harare, Zimbabwe",
    description:
      "Freelance work with Afriblocks and ModestNerds, actively involved in diverse projects across various domains.",
    highlights: [
      "Expense Tracking Platform for Farmers (topfarmer.africa) - React, Flutter, Firebase",
      "Web-Based Social Space for Meditation and Accommodation (bookhuru.space) - React, Python Django, Redis",
      "Online Therapy Platform connecting users with therapists - Next.js, Python Django, Redis, Flutter",
    ],
    skills: ["Django REST Framework", "Redis", "Python", "Firebase", "PostgreSQL", "Flutter", "WebSocket", "React.js"],
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "intelliafrica",
    title: "Software Developer",
    company: "Intelli Africa Solutions",
    type: "Full-time",
    period: "Oct 2021 - Jun 2022",
    duration: "9 mos",
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
    skills: ["Database Administration", "Django REST Framework", "Systems Design", "Python", "PostgreSQL", "Flutter"],
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: "freshideas",
    title: "Mobile Application Developer",
    company: "Fresh Ideas Studio",
    type: "Contract",
    period: "Apr 2021 - Dec 2021",
    duration: "9 mos",
    location: "Harare, Zimbabwe · Remote",
    description:
      "Creating mobile applications to complement and enhance e-commerce web products during three consecutive contracts.",
    highlights: [
      "Developed mobile apps for Fresh In A Box, Till-point, Munch Zimbabwe, Golden Harmony, and Nyamabantu",
      "Led migration of existing mobile applications from React Native web views to Flutter",
      "Participated in development of capital crowdfunding solution for agriculture sector",
    ],
    skills: ["iOS", "Firebase", "Android Studio", "Node.js", "Mobile Application Development", "Flutter", "React Native"],
    color: "from-lime-500 to-green-500",
  },
  {
    id: "lads",
    title: "Software Developer",
    company: "LADS Africa",
    type: "Full-time",
    period: "Sep 2020 - Oct 2021",
    duration: "1 yr 2 mos",
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
    skills: ["Laravel", "PHP", "MySQL", "JavaScript", "Mobile Application Development", "Systems Design"],
    color: "from-orange-500 to-red-500",
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 left-0 h-full w-full md:w-[55%] bg-background border-r border-primary/20 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <div>
                <span className="text-primary font-mono text-xs block mb-1">
                  // EXPERIENCE
                </span>
                <h2 className="text-2xl font-bold">
                  Career <span className="gradient-text">Journey</span>
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-primary transition-colors rounded-lg hover:bg-zinc-800/50"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Timeline */}
            <div className="h-[calc(100%-88px)] overflow-y-auto p-6">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary opacity-30" />

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
                      <div className={`absolute left-0 top-1 w-6 h-6 rounded-full bg-gradient-to-r ${exp.color} flex items-center justify-center`}>
                        <Briefcase className="w-3 h-3 text-white" />
                      </div>

                      {/* Content */}
                      <div className="bg-surface/30 border border-zinc-800 rounded-lg p-5 hover:border-primary/30 transition-colors">
                        {/* Header */}
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-zinc-100">
                              {exp.title}
                            </h3>
                            <p className="text-primary font-medium">
                              {exp.company}
                              <span className="text-zinc-500 font-normal"> · {exp.type}</span>
                            </p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full bg-gradient-to-r ${exp.color} text-white`}>
                            {exp.duration}
                          </span>
                        </div>

                        {/* Meta */}
                        <div className="flex flex-wrap gap-4 text-xs text-zinc-500 mb-4">
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
                        <p className="text-sm text-zinc-400 mb-4">
                          {exp.description}
                        </p>

                        {/* Highlights */}
                        {exp.highlights.length > 0 && (
                          <div className="mb-4">
                            <ul className="space-y-1">
                              {exp.highlights.map((highlight, i) => (
                                <li key={i} className="text-xs text-zinc-400 flex items-start gap-2">
                                  <span className="text-primary mt-1">•</span>
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
                              className="px-2 py-0.5 text-xs font-mono text-zinc-500 bg-zinc-800/50 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                          {exp.skills.length > 6 && (
                            <span className="px-2 py-0.5 text-xs font-mono text-zinc-600">
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
