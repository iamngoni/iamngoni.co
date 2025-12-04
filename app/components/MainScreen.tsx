import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Briefcase } from "lucide-react";
import { useState } from "react";
import { ProjectsSidebar } from "./ProjectsSidebar";
import { ExperienceSidebar } from "./ExperienceSidebar";
import { GitHubContributions } from "./GitHubContributions";

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

  return (
    <>
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* GitHub contributions background */}
        <GitHubContributions />

        {/* Animated background grid */}
        <div className="absolute inset-0 bg-cyber-grid bg-grid opacity-20" />

        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/15 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/15 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[128px]" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative flex-shrink-0"
            >
              <div className="relative w-48 h-48 md:w-56 md:h-56">
                {/* Glow rings */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-accent to-secondary opacity-30 blur-2xl animate-pulse" />
                <div className="absolute inset-2 rounded-full bg-gradient-to-r from-secondary via-primary to-accent opacity-20 blur-xl animate-pulse" />

                {/* Avatar image */}
                <div className="relative w-full h-full rounded-full border-2 border-primary/40 overflow-hidden animate-pulse-glow">
                  <img
                    src="/images/iamngoni-2.png"
                    alt="Ngonidzashe Mangudya"
                    className="w-full h-full object-cover"
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
                <span className="inline-block px-3 py-1 mb-4 text-xs font-mono text-primary border border-primary/30 rounded-full">
                  Backend & Mobile Developer
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight"
              >
                <span className="text-zinc-100">Talk is cheap.</span>
                <br />
                <span className="gradient-text">Show me the code.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-base text-zinc-400 mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              >
                Hi, I'm{" "}
                <span className="text-primary font-semibold">
                  Ngonidzashe Mangudya
                </span>
                . 6+ years building high-performance mobile apps, architecting
                backend systems, and shipping production-ready products across
                multiple stacks. I work across Flutter, Rust, Python, and
                TypeScript — designing systems that are scalable, reliable, and
                intentionally engineered.
              </motion.p>

              {/* Tech stack pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-2 mb-8 justify-center lg:justify-start"
              >
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-mono text-zinc-400 bg-surface/50 border border-zinc-800 rounded-full hover:border-primary/30 hover:text-primary transition-colors cursor-default"
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
                className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
              >
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="px-8 py-4 bg-primary text-background font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]"
                >
                  Show me the code
                </button>

                <button
                  onClick={() => setIsExperienceOpen(true)}
                  className="px-6 py-4 border border-zinc-700 text-zinc-300 font-semibold rounded-lg hover:border-primary/50 hover:text-primary transition-all duration-300 flex items-center gap-2"
                >
                  <Briefcase className="w-4 h-4" />
                  Experience
                </button>

                <div className="hidden sm:flex items-center gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-zinc-500 hover:text-primary transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 left-0 right-0 text-center px-4">
          <div className="flex sm:hidden items-center justify-center gap-4 mb-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-600 hover:text-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
          <p className="text-zinc-600 text-xs font-mono">
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
