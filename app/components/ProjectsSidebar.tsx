import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Github,
  ExternalLink,
  Calendar,
  Terminal,
  Package,
  Globe,
  Smartphone,
  Tablet,
  GitPullRequest,
  GitMerge,
  CircleDot,
} from "lucide-react";
import { useState } from "react";

type ProjectType =
  | "mobile"
  | "tablet"
  | "web"
  | "cli"
  | "library"
  | "contribution";

interface Project {
  id: string;
  title: string;
  description: string;
  date: string;
  githubUrl: string;
  type: ProjectType;
  // For mobile/web apps
  appPath?: string;
  // For CLI tools
  cliDemo?: string[];
  installCommand?: string;
  // For libraries
  packageUrl?: string;
  usageCode?: string;
  // For image preview
  imagePreview?: string;
  // For contributions (PRs)
  prNumber?: number;
  prStatus?: "merged" | "open" | "closed";
  prTitle?: string;
  color: string;
}

const projects: Project[] = [
  // Open Source Contributions
  {
    id: "zed-pr-39537",
    title: "Zed Editor PR #39537",
    description:
      "Contributed to Zed, a high-performance, multiplayer code editor from the creators of Atom. This PR fixes a bug where splitting a terminal pane would open the new pane in the root directory instead of maintaining the current working directory.",
    date: "Oct 2025",
    githubUrl: "https://github.com/zed-industries/zed/pull/39537",
    type: "contribution",
    prNumber: 39537,
    prStatus: "merged",
    prTitle: "terminal: Fix terminal split pane opening in wrong directory",
    color: "from-amber-500 to-yellow-500",
  },
  // Mixed Apps & Websites
  {
    id: "car-dash-2",
    title: "Car Dashboard 2",
    description:
      "An evolved version of the car dashboard concept with enhanced UI/UX, multiple deployment environments, and cross-platform support.",
    date: "2024",
    githubUrl: "https://github.com/iamngoni/car_dash_2",
    type: "tablet",
    appPath: "/apps/cardash2/index.html",
    color: "from-indigo-500 to-violet-500",
  },
  {
    id: "parkade",
    title: "Parkade",
    description:
      "A dynamic and user-friendly solution for parking management and navigation. Assists users in locating free parking slots with real-time updates and manages parking tickets efficiently for a hassle-free experience.",
    date: "Apr 2023",
    githubUrl: "https://github.com/iamngoni/parkade",
    type: "mobile",
    appPath: "/apps/parkade/index.html",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "codecraft-solutions",
    title: "CodeCraft Solutions",
    description:
      "My software development company - delivering high-quality mobile and web applications for businesses across Africa and beyond.",
    date: "2024",
    githubUrl: "https://codecraftsolutions.co.za",
    type: "web",
    appPath: "https://codecraftsolutions.co.za",
    color: "from-primary to-secondary",
  },
  {
    id: "lingua",
    title: "Lingua",
    description:
      "An innovative Flutter application designed to bridge communication gaps by translating words and letters into sign language. A valuable resource for enhancing accessibility and fostering inclusivity for the deaf and hard-of-hearing community.",
    date: "Feb 2021",
    githubUrl: "https://github.com/iamngoni/lingua",
    type: "mobile",
    appPath: "/apps/lingua/index.html",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "spirit-finder",
    title: "Spirit Finder",
    description:
      "A web application helping users discover and explore spirits and beverages.",
    date: "2024",
    githubUrl: "https://spirit-finder.com",
    type: "web",
    appPath: "https://spirit-finder.com",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "marketstack",
    title: "MarketStack",
    description:
      "A simple yet powerful project to retrieve world stock market historical data from Marketstack and display it using candlestick charts. Built with Flutter and the BLoC pattern for clean state management.",
    date: "Oct 2022",
    githubUrl: "https://github.com/iamngoni/marketstack_report",
    type: "mobile",
    appPath: "/apps/marketstack/index.html",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "hullu-kinderpalliativ",
    title: "Hullu Kinderpalliativ",
    description:
      "Website for Hullu Kinderpalliativ, an organization dedicated to pediatric palliative care services.",
    date: "2024",
    githubUrl: "https://hullu-kinderpalliativ.org",
    type: "web",
    appPath: "https://hullu-kinderpalliativ.org",
    color: "from-sky-500 to-blue-500",
  },
  {
    id: "shopperschoice",
    title: "Shopper's Choice",
    description:
      "A revamp of the ShoppersChoice shopping platform app, showcasing modern Flutter UI design patterns and smooth user experience for e-commerce applications.",
    date: "Jul 2022",
    githubUrl: "https://github.com/iamngoni/shoppers_choice",
    type: "mobile",
    appPath: "/apps/shoppers_choice/index.html",
    color: "from-orange-500 to-red-500",
  },
  {
    id: "x-hwindi",
    title: "X Hwindi",
    description:
      "A Flutter application showcasing modern mobile development practices with multi-platform support for Android, iOS, web, and Windows.",
    date: "2024",
    githubUrl: "https://github.com/iamngoni/x_hwindi",
    type: "mobile",
    appPath: "/apps/hwindi/index.html",
    color: "from-teal-500 to-cyan-500",
  },
  {
    id: "ecocash-ui",
    title: "EcoCash UI",
    description:
      "A beautiful UI clone of Zimbabwe's leading mobile money platform. Showcasing Flutter's capability to recreate complex, production-grade mobile interfaces.",
    date: "2024",
    githubUrl: "https://github.com/iamngoni/ecocash_ui",
    type: "mobile",
    appPath: "/apps/ecocash_ui/index.html",
    color: "from-green-500 to-emerald-500",
  },
  // Tablet Apps
  {
    id: "car-dash",
    title: "Car Dashboard",
    description:
      "An experimental car dashboard interface built with Flutter. Features a sleek, modern design optimized for tablet/landscape displays.",
    date: "2024",
    githubUrl: "https://github.com/iamngoni/car_dash",
    type: "tablet",
    appPath: "/apps/cardash/index.html",
    color: "from-slate-500 to-zinc-500",
  },
  {
    id: "chef-tkay",
    title: "Chef TKay",
    description:
      "Portfolio website for Chef TKay, showcasing culinary expertise and services.",
    date: "2024",
    githubUrl: "https://cheftkay.com",
    type: "web",
    appPath: "https://cheftkay.com",
    color: "from-red-500 to-orange-500",
  },
  // CLI Tools
  {
    id: "gitwhisper",
    title: "GitWhisper",
    description:
      "AI-powered Git commit message generator that whispers the perfect commit message for your changes. Takes the guesswork out of writing meaningful commit messages.",
    date: "2024",
    githubUrl: "https://github.com/iamngoni/gitwhisper",
    type: "cli",
    cliDemo: [
      "# Stage your changes",
      "$ git add .",
      "",
      "# Let GitWhisper generate the perfect message",
      "$ gitwhisper",
      "",
      "✨ Analyzing changes...",
      "📝 Generated: feat(auth): add OAuth2 support with refresh tokens",
      "",
      '$ git commit -m "feat(auth): add OAuth2 support with refresh tokens"',
    ],
    color: "from-violet-500 to-purple-500",
  },
  // Libraries
  {
    id: "dart-packages",
    title: "Dart Packages",
    description:
      "14+ published packages on pub.dev including pesepay, handy_extensions, localregex, gitwhisper, vamboai, rope, wa_me, and more. Tools for payments, extensions, AI, and Flutter development.",
    date: "2021-2024",
    githubUrl: "https://github.com/iamngoni",
    type: "library",
    packageUrl: "https://pub.dev/publishers/iamngoni.co.zw/packages",
    installCommand: "flutter pub add <package_name>",
    usageCode: `// Some of my published packages:
// pesepay - African payment integration
// handy_extensions - Dart utility extensions
// localregex - Zimbabwean regex patterns
// gitwhisper - AI commit messages
// vamboai - Language translation
// rope - Immutable rope data structure
// wa_me - WhatsApp sharing
// modest_pagination - Simple pagination

// Visit pub.dev/publishers/iamngoni.co.zw`,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "emerald-night-theme",
    title: "Emerald Night Theme",
    description:
      "A beautiful dark color scheme for the Zed code editor. Easy on the eyes with carefully selected emerald accent colors.",
    date: "2024",
    githubUrl: "https://github.com/iamngoni/emerald-night-theme",
    type: "library",
    imagePreview: "/images/theme-preview.png",
    color: "from-emerald-500 to-green-500",
  },
  {
    id: "vamboai",
    title: "VamboAI",
    description:
      "A Dart package providing access to the Vambo AI API for language identification and translation. Supports a wide range of African languages and beyond, enabling seamless language processing in Dart/Flutter applications.",
    date: "2024",
    githubUrl: "https://github.com/iamngoni/vamboai",
    type: "library",
    packageUrl: "https://pub.dev/packages/vamboai",
    installCommand: "dart pub add vamboai",
    usageCode: `import 'package:vamboai/vamboai.dart';

// Initialize the client
final vambo = VamboAI(apiKey: 'your-api-key');

// Identify language in text
final identification = await vambo.identify(
  text: 'Mhoro, makadii?',
);

// Translate text between languages
final translation = await vambo.translate(
  text: 'Hello, how are you?',
  targetLanguage: 'sn', // Shona
);`,
    color: "from-yellow-500 to-amber-500",
  },
];

const typeIcons: Record<ProjectType, typeof Smartphone> = {
  mobile: Smartphone,
  tablet: Tablet,
  web: Globe,
  cli: Terminal,
  library: Package,
  contribution: GitPullRequest,
};

const typeLabels: Record<ProjectType, string> = {
  mobile: "Mobile App",
  tablet: "Tablet App",
  web: "Website",
  cli: "CLI / Tool",
  library: "Library",
  contribution: "Open Source",
};

interface ProjectsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobilePreview({ appPath }: { appPath: string }) {
  return (
    <div className="device-frame-small">
      <div className="device-screen-small">
        <iframe
          src={appPath}
          className="w-full h-full"
          title="App Preview"
          loading="lazy"
        />
      </div>
    </div>
  );
}

function TabletPreview({ appPath }: { appPath: string }) {
  return (
    <div className="tablet-frame">
      <div className="tablet-screen">
        <iframe
          src={appPath}
          className="w-full h-full"
          title="Tablet Preview"
          loading="lazy"
        />
      </div>
    </div>
  );
}

function WebPreview({ appPath }: { appPath: string }) {
  return (
    <div className="browser-frame">
      <div className="browser-header">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 mx-4">
          <div className="bg-zinc-800 rounded px-3 py-1 text-xs text-zinc-500 truncate">
            {appPath}
          </div>
        </div>
      </div>
      <div className="browser-content">
        <iframe
          src={appPath}
          className="w-full h-full"
          title="Web Preview"
          loading="lazy"
        />
      </div>
    </div>
  );
}

function CliPreview({ lines }: { lines: string[] }) {
  return (
    <div className="terminal-frame">
      <div className="terminal-header">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-zinc-500 ml-4">Terminal</span>
      </div>
      <div className="terminal-content font-mono text-sm">
        {lines.map((line, i) => (
          <div
            key={i}
            className={
              line.startsWith("#")
                ? "text-zinc-600"
                : line.startsWith("$")
                  ? "text-primary"
                  : "text-zinc-300"
            }
          >
            {line || "\u00A0"}
          </div>
        ))}
        <div className="flex items-center text-primary mt-2">
          <span>$</span>
          <span className="ml-2 w-2 h-4 bg-primary animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function LibraryPreview({
  installCommand,
  usageCode,
  imagePreview,
}: {
  installCommand?: string;
  usageCode?: string;
  imagePreview?: string;
}) {
  if (imagePreview) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4">
        <img
          src={imagePreview}
          alt="Preview"
          className="max-w-full max-h-full object-contain rounded-lg border border-zinc-800 shadow-2xl"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {installCommand && (
        <div className="terminal-frame">
          <div className="terminal-header">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs text-zinc-500 ml-4">Install</span>
          </div>
          <div className="terminal-content font-mono text-sm">
            <span className="text-primary">$</span>
            <span className="text-zinc-300 ml-2">{installCommand}</span>
          </div>
        </div>
      )}
      {usageCode && (
        <div className="code-frame">
          <div className="code-header">
            <span className="text-xs text-zinc-500">Usage Example</span>
          </div>
          <pre className="code-content font-mono text-xs text-zinc-300 overflow-x-auto">
            {usageCode}
          </pre>
        </div>
      )}
    </div>
  );
}

function ContributionPreview({
  prNumber,
  prStatus,
  prTitle,
  repoName,
}: {
  prNumber?: number;
  prStatus?: "merged" | "open" | "closed";
  prTitle?: string;
  repoName: string;
}) {
  const statusConfig = {
    merged: {
      icon: GitMerge,
      color: "text-purple-400",
      bg: "bg-purple-500/20",
      label: "Merged",
    },
    open: {
      icon: CircleDot,
      color: "text-green-400",
      bg: "bg-green-500/20",
      label: "Open",
    },
    closed: {
      icon: GitPullRequest,
      color: "text-red-400",
      bg: "bg-red-500/20",
      label: "Closed",
    },
  };

  const status = prStatus ? statusConfig[prStatus] : statusConfig.open;
  const StatusIcon = status.icon;

  return (
    <div className="pr-frame w-full max-w-[380px]">
      {/* GitHub-style PR header */}
      <div className="flex items-center gap-3 p-4 border-b border-zinc-800">
        <div className={`p-2 rounded-lg ${status.bg}`}>
          <StatusIcon className={`w-5 h-5 ${status.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${status.bg} ${status.color}`}
            >
              {status.label}
            </span>
            <span className="text-zinc-500 text-xs">#{prNumber}</span>
          </div>
        </div>
      </div>

      {/* PR Title */}
      <div className="p-4 border-b border-zinc-800">
        <h3 className="text-zinc-100 font-semibold text-sm mb-2">{prTitle}</h3>
        <div className="flex items-center gap-2 text-zinc-500 text-xs">
          <Github className="w-3 h-3" />
          <span>{repoName}</span>
        </div>
      </div>

      {/* Contribution stats mockup */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-500">Files changed</span>
          <span className="text-zinc-300 font-mono">~</span>
        </div>
        <div className="flex gap-1 h-2">
          <div className="flex-1 bg-green-500/60 rounded-l" />
          <div className="w-1/4 bg-red-500/60 rounded-r" />
        </div>
        <div className="flex justify-between text-xs font-mono">
          <span className="text-green-400">+additions</span>
          <span className="text-red-400">-deletions</span>
        </div>
      </div>

      {/* Zed logo/branding */}
      <div className="p-4 border-t border-zinc-800 flex items-center justify-center">
        <div className="flex items-center gap-2 text-zinc-400">
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
            <path d="M2 4l8.5 8.5L2 21h3l7-7 7 7h3l-8.5-8.5L20 4h-3l-7 7-7-7H2z" />
          </svg>
          <span className="text-sm font-semibold">Zed Editor</span>
        </div>
      </div>
    </div>
  );
}

export function ProjectsSidebar({ isOpen, onClose }: ProjectsSidebarProps) {
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);
  const TypeIcon = typeIcons[activeProject.type];

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
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full md:w-[85%] bg-background border-l border-primary/20 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <div>
                <span className="text-primary font-mono text-xs block mb-1">
                  // PROJECTS
                </span>
                <h2 className="text-2xl font-bold">
                  Show Me The <span className="gradient-text">Code</span>
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-primary transition-colors rounded-lg hover:bg-zinc-800/50"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex h-[calc(100%-88px)]">
              {/* Project list */}
              <div className="w-2/5 border-r border-zinc-800 overflow-y-auto p-4 space-y-2">
                {projects.map((project) => {
                  const Icon = typeIcons[project.type];
                  return (
                    <button
                      key={project.id}
                      onClick={() => setActiveProject(project)}
                      className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                        activeProject.id === project.id
                          ? "bg-surface border-primary/50 shadow-[0_0_20px_rgba(0,240,255,0.1)]"
                          : "bg-transparent border-zinc-800 hover:border-zinc-700"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.color}`}
                        />
                        <h3
                          className={`font-semibold text-sm flex-1 ${
                            activeProject.id === project.id
                              ? "text-primary"
                              : "text-zinc-100"
                          }`}
                        >
                          {project.title}
                        </h3>
                        <Icon className="w-4 h-4 text-zinc-500" />
                      </div>
                      <div className="flex items-center gap-2 text-zinc-500 text-xs ml-5">
                        <Calendar className="w-3 h-3" />
                        <span>{project.date}</span>
                        <span className="text-zinc-700">•</span>
                        <span>{typeLabels[project.type]}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Preview area */}
              <div className="w-3/5 flex flex-col">
                {/* Type badge */}
                <div className="px-6 pt-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface/50 border border-zinc-800 rounded-full text-xs text-zinc-400">
                    <TypeIcon className="w-3 h-3" />
                    {typeLabels[activeProject.type]}
                  </div>
                </div>

                {/* Preview */}
                <div
                  className={`flex-1 flex overflow-hidden ${activeProject.type === "web" || activeProject.type === "tablet" ? "p-4" : "items-center justify-center p-6"}`}
                >
                  {activeProject.type === "mobile" && activeProject.appPath && (
                    <MobilePreview appPath={activeProject.appPath} />
                  )}
                  {activeProject.type === "tablet" && activeProject.appPath && (
                    <TabletPreview appPath={activeProject.appPath} />
                  )}
                  {activeProject.type === "web" && activeProject.appPath && (
                    <WebPreview appPath={activeProject.appPath} />
                  )}
                  {activeProject.type === "cli" && activeProject.cliDemo && (
                    <CliPreview lines={activeProject.cliDemo} />
                  )}
                  {activeProject.type === "library" && (
                    <LibraryPreview
                      installCommand={activeProject.installCommand}
                      usageCode={activeProject.usageCode}
                      imagePreview={activeProject.imagePreview}
                    />
                  )}
                  {activeProject.type === "contribution" && (
                    <ContributionPreview
                      prNumber={activeProject.prNumber}
                      prStatus={activeProject.prStatus}
                      prTitle={activeProject.prTitle}
                      repoName="zed-industries/zed"
                    />
                  )}
                </div>

                {/* Project info */}
                <div className="p-4 border-t border-zinc-800 bg-surface/30">
                  <p className="text-zinc-400 text-sm mb-4 line-clamp-3">
                    {activeProject.description}
                  </p>
                  <div className="flex gap-3">
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-300 border border-zinc-700 rounded-lg hover:border-primary/50 hover:text-primary transition-all"
                    >
                      <Github className="w-4 h-4" />
                      Source
                    </a>
                    {(activeProject.type === "mobile" ||
                      activeProject.type === "tablet" ||
                      activeProject.type === "web") &&
                      activeProject.appPath && (
                        <a
                          href={activeProject.appPath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-background bg-primary rounded-lg hover:bg-primary/90 transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                          {activeProject.type === "mobile" ||
                          activeProject.type === "tablet"
                            ? "Full Screen"
                            : "Visit Site"}
                        </a>
                      )}
                    {activeProject.type === "library" &&
                      activeProject.packageUrl && (
                        <a
                          href={activeProject.packageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-background bg-primary rounded-lg hover:bg-primary/90 transition-all"
                        >
                          <Package className="w-4 h-4" />
                          View Package
                        </a>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
