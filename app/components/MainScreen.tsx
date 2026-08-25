import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  Github,
  Linkedin,
  Mail,
  Briefcase,
  BookOpen,
  Feather,
  Code2,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { ProjectsSidebar } from "./ProjectsSidebar";
import { ExperienceSidebar } from "./ExperienceSidebar";
import { GitHubContributions } from "./GitHubContributions";
import { getExperienceYearsLabel } from "~/lib/experience";

// X (Twitter) icon component
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialLinks = [
  { icon: Github, url: "https://github.com/iamngoni", label: "GitHub" },
  {
    icon: Linkedin,
    url: "https://www.linkedin.com/in/ngonidzashe-mangudya-ba084a174/",
    label: "LinkedIn",
  },
  { icon: XIcon, url: "https://x.com/iamngoni", label: "X" },
  {
    icon: Mail,
    url: "mailto:ngmangudya@codecraftsolutions.co.za",
    label: "Email",
  },
];

const techStack = [
  "Flutter",
  "Rust",
  "Python",
  "TypeScript",
  "React",
  "PostgreSQL",
  "Redis",
  "Docker",
  "+ more",
];

export function MainScreen() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);
  const experienceYears = getExperienceYearsLabel();

  return (
    <>
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-portfolio-ivory text-portfolio-ink">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_45%,hsl(40_38%_92%/0.86),hsl(42_48%_96%)_48%,hsl(40_35%_91%))]" />
        <GitHubContributions />

        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-10 pb-28 sm:py-20 sm:pb-28">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-20">
            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative flex-shrink-0"
            >
              <div className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-60 md:h-60">
                <div className="absolute -inset-3 rounded-full border border-portfolio-copper/30" />
                <div className="absolute -inset-1 rounded-full border border-portfolio-line bg-portfolio-paper/50" />

                {/* Avatar image */}
                <div className="relative w-full h-full rounded-full border-2 border-portfolio-copper/80 overflow-hidden shadow-[0_24px_60px_hsl(22_34%_36%/0.16)]">
                  <img
                    src="/images/ngoni-home.jpg"
                    alt="Ngonidzashe Mangudya"
                    className="w-full h-full object-cover saturate-[0.78] contrast-[1.05]"
                  />
                </div>
              </div>
            </motion.div>

            {/* Info */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="inline-block px-4 py-1.5 mb-4 sm:mb-5 text-xs sm:text-sm font-mono text-portfolio-ink border border-portfolio-copper/70 rounded-full bg-portfolio-ivory/80">
                  Backend & Mobile Developer
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.94] sm:leading-[0.92] mb-5 sm:mb-6"
              >
                <span>Talk is cheap.</span>
                <br />
                <span>
                  Show me the <span className="text-portfolio-copper">code.</span>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-sm sm:text-base md:text-lg text-portfolio-soft mb-6 max-w-2xl mx-auto lg:mx-0 leading-7 sm:leading-8"
              >
                Hi, I'm{" "}
                <span className="text-portfolio-forest font-bold">
                  Ngonidzashe Mangudya
                </span>
                . {experienceYears} years building high-performance mobile apps,
                architecting backend systems, and shipping production-ready
                products across multiple stacks. I work across Flutter, Rust,
                Python, and TypeScript — designing systems that are scalable,
                reliable, and intentionally engineered.
              </motion.p>

              {/* Tech stack pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-2.5 mb-8 sm:mb-10 justify-center lg:justify-start"
              >
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-1.5 text-xs font-mono text-portfolio-ink bg-portfolio-ivory/70 border border-portfolio-line rounded-full hover:border-portfolio-copper/60 hover:text-portfolio-copperDark transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>

              {/* CTA and socials */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center lg:justify-start"
              >
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-lg bg-portfolio-forest px-8 py-4 font-semibold text-portfolio-ivory shadow-[0_16px_34px_hsl(148_42%_18%/0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-portfolio-moss focus:outline-none focus:ring-2 focus:ring-portfolio-forest/30 sm:w-auto"
                >
                  <Code2 className="w-5 h-5" />
                  Show me the code
                </button>

                <button
                  onClick={() => setIsExperienceOpen(true)}
                  className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-lg border border-portfolio-moss/50 bg-portfolio-ivory/40 px-7 py-4 font-semibold text-portfolio-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-portfolio-copper/80 hover:text-portfolio-copperDark focus:outline-none focus:ring-2 focus:ring-portfolio-copper/25 sm:w-auto"
                >
                  <Briefcase className="w-4 h-4" />
                  Experience
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="hidden sm:flex items-center gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-portfolio-forest/75 hover:text-portfolio-copper transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                  <Link
                    to="/blog"
                    className="p-2 text-portfolio-forest/75 hover:text-portfolio-copper transition-colors"
                    aria-label="Writing"
                  >
                    <BookOpen className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/thoughts"
                    className="p-2 text-portfolio-forest/75 hover:text-portfolio-copper transition-colors"
                    aria-label="Intrusive Thoughts"
                  >
                    <Feather className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 left-0 right-0 z-20 text-center px-4">
          <div className="flex sm:hidden items-center justify-center gap-4 mb-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-portfolio-forest/75 hover:text-portfolio-copper transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
            <Link
              to="/blog"
              className="p-2 text-portfolio-forest/75 hover:text-portfolio-copper transition-colors"
              aria-label="Writing"
            >
              <BookOpen className="w-4 h-4" />
            </Link>
            <Link
              to="/thoughts"
              className="p-2 text-portfolio-forest/75 hover:text-portfolio-copper transition-colors"
              aria-label="Intrusive Thoughts"
            >
              <Feather className="w-4 h-4" />
            </Link>
          </div>
          <div className="mx-auto mb-4 hidden max-w-xs items-center justify-center gap-3 sm:flex">
            <span className="h-px flex-1 bg-portfolio-line" />
            <span className="h-2 w-2 rounded-full bg-portfolio-copper" />
            <span className="h-px flex-1 bg-portfolio-line" />
          </div>
          <p className="text-portfolio-soft text-xs font-mono">
            Building the future, one commit at a time
          </p>
        </div>
      </main>

      <ProjectsSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <ExperienceSidebar
        isOpen={isExperienceOpen}
        onClose={() => setIsExperienceOpen(false)}
      />
    </>
  );
}
