import { motion } from "framer-motion";
import { ExternalLink, Github, Calendar } from "lucide-react";
import { useState } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  date: string;
  githubUrl: string;
  appPath: string;
  color: string;
}

const projects: Project[] = [
  {
    id: "lingua",
    title: "Lingua",
    description:
      "An innovative Flutter application designed to bridge communication gaps by translating words and letters into sign language. A valuable resource for enhancing accessibility and fostering inclusivity for the deaf and hard-of-hearing community.",
    date: "Feb 2021",
    githubUrl: "https://github.com/iamngoni/lingua",
    appPath: "/apps/lingua/index.html",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "parkade",
    title: "Parkade",
    description:
      "A dynamic and user-friendly solution for parking management and navigation. Assists users in locating free parking slots with real-time updates and manages parking tickets efficiently for a hassle-free experience.",
    date: "Apr 2023",
    githubUrl: "https://github.com/iamngoni/parkade",
    appPath: "/apps/parkade/index.html",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "marketstack",
    title: "MarketStack",
    description:
      "A simple yet powerful project to retrieve world stock market historical data from Marketstack and display it using candlestick charts. Built with Flutter and the BLoC pattern for clean state management.",
    date: "Oct 2022",
    githubUrl: "https://github.com/iamngoni/marketstack_report",
    appPath: "/apps/marketstack/index.html",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "shopperschoice",
    title: "Shopper's Choice",
    description:
      "A revamp of the ShoppersChoice shopping platform app, showcasing modern Flutter UI design patterns and smooth user experience for e-commerce applications.",
    date: "Jul 2022",
    githubUrl: "https://github.com/iamngoni",
    appPath: "/apps/shoppers_choice/index.html",
    color: "from-orange-500 to-red-500",
  },
];

function DeviceFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`device-frame ${className}`}>
      <div className="device-screen">{children}</div>
    </div>
  );
}

export function Projects() {
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);

  return (
    <section id="projects" className="relative py-32 px-6">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-mono text-sm mb-4 block">
            // PROJECTS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Show Me The <span className="gradient-text">Code</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Interactive demonstrations of my Flutter applications. Each project
            runs live in your browser.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Project list */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {projects.map((project, index) => (
              <motion.button
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                onClick={() => setActiveProject(project)}
                className={`w-full text-left p-6 rounded-xl border transition-all duration-300 ${
                  activeProject.id === project.id
                    ? "bg-surface border-primary/50 shadow-[0_0_30px_rgba(0,240,255,0.1)]"
                    : "bg-surface/30 border-zinc-800 hover:border-zinc-700"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3
                      className={`text-xl font-bold mb-1 ${
                        activeProject.id === project.id
                          ? "text-primary"
                          : "text-zinc-100"
                      }`}
                    >
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 text-zinc-500 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{project.date}</span>
                    </div>
                  </div>
                  <div
                    className={`w-3 h-3 rounded-full bg-gradient-to-r ${project.color}`}
                  />
                </div>
                <p className="text-zinc-400 text-sm line-clamp-2">
                  {project.description}
                </p>

                {activeProject.id === project.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 pt-4 border-t border-zinc-800 flex gap-4"
                  >
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-zinc-400 hover:text-primary transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                    </a>
                    <a
                      href={project.appPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-zinc-400 hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open Full Screen
                    </a>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Device preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="sticky top-8"
          >
            <div className="flex justify-center">
              <DeviceFrame>
                <iframe
                  key={activeProject.id}
                  src={activeProject.appPath}
                  className="w-full h-full"
                  title={activeProject.title}
                  loading="lazy"
                />
              </DeviceFrame>
            </div>
            <p className="text-center text-zinc-500 text-sm mt-6 font-mono">
              ↑ Live Flutter Web App
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
