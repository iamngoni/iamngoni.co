import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Code2,
  Feather,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { ExperienceSidebar } from "./ExperienceSidebar";
import { GitHubContributions } from "./GitHubContributions";
import { ProjectsSidebar } from "./ProjectsSidebar";
import { getExperienceYearsLabel } from "~/lib/experience";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialLinks = [
  { icon: Github, href: "https://github.com/iamngoni", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/ngonidzashe-mangudya-ba084a174/",
    label: "LinkedIn",
  },
  { icon: XIcon, href: "https://x.com/iamngoni", label: "X" },
  {
    icon: Mail,
    href: "mailto:ngmangudya@codecraftsolutions.co.za",
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

const revealTransition = (delay: number, reduceMotion: boolean | null) =>
  reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: 0.62,
          delay,
          ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        },
      };

export function MainScreen() {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const experienceYears = getExperienceYearsLabel();

  return (
    <>
      <main className="home-page" id="main-content">
        <section className="home-hero" aria-labelledby="home-title">
          <div className="home-copy">
            <motion.p
              className="home-role"
              {...revealTransition(0.04, reduceMotion)}
            >
              <span aria-hidden="true">[</span>
              Senior Software Engineer
              <span aria-hidden="true">]</span>
            </motion.p>

            <motion.h1
              id="home-title"
              className="home-title"
              {...revealTransition(0.1, reduceMotion)}
            >
              Talk is cheap.
              <br />
              Show me the <span>code.</span>
            </motion.h1>

            <motion.p
              className="home-intro"
              {...revealTransition(0.16, reduceMotion)}
            >
              Hi, I&apos;m <strong>Ngonidzashe Mangudya</strong>. {experienceYears}{" "}
              years building high-performance mobile apps, architecting backend
              systems, and shipping production-ready products across multiple
              stacks. I work across Flutter, Rust, Python, and TypeScript —
              designing systems that are scalable, reliable, and intentionally
              engineered.
            </motion.p>

            <motion.ul
              className="home-stack"
              aria-label="Technology stack"
              {...revealTransition(0.22, reduceMotion)}
            >
              {techStack.map((tech, index) => (
                <li className={index === 0 ? "is-active" : undefined} key={tech}>
                  {tech}
                </li>
              ))}
            </motion.ul>

            <motion.div
              className="home-actions"
              {...revealTransition(0.28, reduceMotion)}
            >
              <button
                type="button"
                className="home-button home-button--primary"
                onClick={() => setIsProjectsOpen(true)}
              >
                <Code2 aria-hidden="true" />
                <span>Show me the code</span>
              </button>

              <button
                type="button"
                className="home-button home-button--secondary"
                onClick={() => setIsExperienceOpen(true)}
              >
                <Briefcase aria-hidden="true" />
                <span>Experience</span>
                <ArrowRight aria-hidden="true" />
              </button>
            </motion.div>
          </div>

          <motion.figure
            className="home-portrait"
            {...revealTransition(0.12, reduceMotion)}
          >
            <img
              src="/images/ngoni-home-reference.webp"
              alt="Ngonidzashe Mangudya"
              width="1024"
              height="1536"
              fetchPriority="high"
            />
          </motion.figure>

          <GitHubContributions />

          <footer className="home-footer">
            <nav className="home-socials" aria-label="Social links">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="home-social-link"
                >
                  <social.icon aria-hidden="true" />
                  <span>{social.label}</span>
                </a>
              ))}
              <Link to="/blog" className="home-social-link">
                <BookOpen aria-hidden="true" />
                <span>Writing</span>
              </Link>
              <Link to="/poetry" className="home-social-link">
                <Feather aria-hidden="true" />
                <span>Poetry</span>
              </Link>
            </nav>

            <p>Building the future, one commit at a time</p>
          </footer>
        </section>
      </main>

      <ProjectsSidebar
        isOpen={isProjectsOpen}
        onClose={() => setIsProjectsOpen(false)}
      />
      <ExperienceSidebar
        isOpen={isExperienceOpen}
        onClose={() => setIsExperienceOpen(false)}
      />
    </>
  );
}
