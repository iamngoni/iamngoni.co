import { motion, AnimatePresence, useDragControls } from "framer-motion";
import {
  X,
  Github,
  ExternalLink,
  Calendar,
  AppWindow,
  Terminal,
  Package,
  Globe,
  Monitor,
  Server,
  Smartphone,
  Tablet,
  GitPullRequest,
  GitMerge,
  CircleDot,
  ChevronDown,
  Eye,
} from "lucide-react";
import { useState, useEffect } from "react";

type ProjectType =
  | "mobile"
  | "tablet"
  | "web"
  | "desktop"
  | "service"
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
  // For repo overview previews
  stack?: string[];
  highlights?: string[];
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
    color: "from-portfolio-copper to-amber-600",
  },
  // Recent Builds
  {
    id: "heimdall",
    title: "Heimdall",
    description:
      "An agentic, context-aware security scanner for source code repositories. It builds a threat model, reasons over the codebase, validates findings in a sandbox, and returns ranked vulnerabilities with patches and proof-of-concept exploits.",
    date: "2026",
    githubUrl: "https://github.com/iamngoni/heimdall",
    type: "service",
    stack: ["Rust", "AI Agents", "Security", "Postgres"],
    highlights: [
      "Threat-model-first repository scanning",
      "Sandboxed exploit validation pipeline",
      "Ranked findings with suggested patches",
    ],
    color: "from-red-700 to-portfolio-copper",
  },
  {
    id: "montr",
    title: "Montr",
    description:
      "A macOS menu bar app for controlling built-in and external display brightness, color temperature, and display profiles from a compact native popover.",
    date: "2026",
    githubUrl: "https://github.com/iamngoni/Montr-Control-Your-Displays",
    type: "desktop",
    stack: ["Swift", "macOS", "DDC/CI", "Sparkle"],
    highlights: [
      "Per-display brightness controls",
      "Night Shift-style color temperature",
      "Profiles and quick menu bar actions",
    ],
    color: "from-portfolio-moss to-portfolio-forest",
  },
  {
    id: "pastr",
    title: "Pastr",
    description:
      "A native macOS clipboard manager and free alternative for keeping clipboard history close at hand.",
    date: "2026",
    githubUrl: "https://github.com/iamngoni/Pastr",
    type: "desktop",
    stack: ["Swift", "macOS", "Clipboard", "Xcode"],
    highlights: [
      "Native desktop clipboard workflow",
      "Focused replacement for paid clipboard tools",
      "Dedicated app, test, and script structure",
    ],
    color: "from-rose-600 to-portfolio-copper",
  },
  {
    id: "nexus",
    title: "Nexus",
    description:
      "A modern homelab dashboard built with Rust, Actix Web, HTMX, and Tailwind. It brings service health, system vitals, downloads, weather, and container logs into one live dashboard.",
    date: "2026",
    githubUrl: "https://github.com/iamngoni/nexus",
    type: "service",
    stack: ["Rust", "Actix Web", "HTMX", "Tailwind"],
    highlights: [
      "Live-refreshing homelab widgets",
      "Docker and qBittorrent integrations",
      "System vitals and service health checks",
    ],
    color: "from-portfolio-copperDark to-portfolio-copper",
  },
  {
    id: "mimir",
    title: "Mimir",
    description:
      "An MCP server that lets AI coding agents share session context. It parses Claude Code, Codex, and Gemini session files into structured summaries without storing extra data.",
    date: "2026",
    githubUrl: "https://github.com/iamngoni/mimir",
    type: "service",
    stack: ["Rust", "MCP", "Codex", "Claude Code"],
    highlights: [
      "Cross-agent session discovery",
      "Structured summaries from local session files",
      "No storage layer and no LLM calls",
    ],
    color: "from-slate-600 to-portfolio-forest",
  },
  {
    id: "what-the-load",
    title: "WhatTheLoad",
    description:
      "A macOS menu bar diagnostics app for fast system visibility across network throughput, CPU, memory, Wi-Fi, disk, processes, timeline history, and battery.",
    date: "2026",
    githubUrl: "https://github.com/iamngoni/WhatTheLoad",
    type: "desktop",
    stack: ["Swift", "macOS", "Diagnostics", "Menu Bar"],
    highlights: [
      "Live menu bar network telemetry",
      "System health tabs and smart alerts",
      "Diagnostics bundle export",
    ],
    color: "from-portfolio-forest to-portfolio-moss",
  },
  {
    id: "emufleet",
    title: "EmuFleet",
    description:
      "A Swift/Xcode desktop app exploring emulator fleet management, with dedicated app, unit test, and UI test targets.",
    date: "2026",
    githubUrl: "https://github.com/iamngoni/EmuFleet",
    type: "desktop",
    stack: ["Swift", "macOS", "Xcode", "Emulators"],
    highlights: [
      "Native Swift app structure",
      "Unit and UI test targets",
      "Focused emulator fleet workflow",
    ],
    color: "from-slate-600 to-portfolio-moss",
  },
  {
    id: "memorai",
    title: "Memorai",
    description:
      "A local-first AI memory system with semantic search. It stores memories locally, exposes a REST API and CLI, and uses local embeddings through Ollama.",
    date: "2026",
    githubUrl: "https://github.com/iamngoni/memorai",
    type: "service",
    stack: ["Rust", "SurrealDB", "Ollama", "Semantic Search"],
    highlights: [
      "Local-first semantic memory store",
      "REST API and CLI access",
      "Profile generation from stored memories",
    ],
    color: "from-emerald-700 to-portfolio-moss",
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
    color: "from-slate-600 to-portfolio-copper",
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
    color: "from-rose-600 to-portfolio-copper",
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
    color: "from-portfolio-forest to-portfolio-copper",
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
    color: "from-portfolio-moss to-portfolio-forest",
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
    color: "from-portfolio-copper to-orange-600",
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
    color: "from-portfolio-forest to-emerald-600",
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
    color: "from-portfolio-moss to-slate-600",
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
    color: "from-orange-700 to-portfolio-copper",
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
    color: "from-portfolio-moss to-portfolio-forest",
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
    color: "from-portfolio-forest to-portfolio-moss",
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
    color: "from-slate-600 to-stone-500",
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
    color: "from-red-700 to-portfolio-copper",
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
    color: "from-slate-600 to-portfolio-forest",
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
    color: "from-portfolio-forest to-portfolio-moss",
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
    color: "from-portfolio-forest to-emerald-600",
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
    color: "from-portfolio-copper to-amber-600",
  },
];

const typeIcons: Record<ProjectType, typeof Smartphone> = {
  mobile: Smartphone,
  tablet: Tablet,
  web: Globe,
  desktop: Monitor,
  service: Server,
  cli: Terminal,
  library: Package,
  contribution: GitPullRequest,
};

const typeLabels: Record<ProjectType, string> = {
  mobile: "Mobile App",
  tablet: "Tablet App",
  web: "Website",
  desktop: "Desktop App",
  service: "Backend / Service",
  cli: "CLI / Tool",
  library: "Library",
  contribution: "Open Source",
};

const appLabUrl = "https://apps.iamngoni.dev";

// Hook to detect mobile viewport
function useIsMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
}

interface ProjectsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function FlutterBadge() {
  return (
    <div className="flex items-center justify-center gap-2 mt-3 text-xs text-portfolio-soft">
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 text-portfolio-copper"
        fill="currentColor"
      >
        <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z" />
      </svg>
      <span>Built with Flutter</span>
    </div>
  );
}

function MobilePreview({ appPath }: { appPath: string }) {
  return (
    <div className="flex flex-col items-center">
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
      <FlutterBadge />
    </div>
  );
}

function TabletPreview({
  appPath,
  rotated = false,
}: {
  appPath: string;
  rotated?: boolean;
}) {
  if (rotated) {
    // Rotated tablet - iframe is rotated -90deg to show landscape content
    return (
      <div className="flex flex-col items-center">
        <div className="tablet-frame-rotated">
          <div className="tablet-screen-rotated">
            <iframe
              src={appPath}
              className="tablet-iframe-rotated"
              title="Tablet Preview"
              loading="lazy"
            />
          </div>
        </div>
        <FlutterBadge />
      </div>
    );
  }

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
          <div className="rounded border border-portfolio-line bg-portfolio-paper px-3 py-1 text-xs text-portfolio-soft truncate">
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
        <span className="text-xs text-portfolio-soft ml-4">Terminal</span>
      </div>
      <div className="terminal-content font-mono text-sm">
        {lines.map((line, i) => (
          <div
            key={i}
            className={
              line.startsWith("#")
                ? "text-[#778277]"
                : line.startsWith("$")
                  ? "text-portfolio-copper"
                  : "text-[#d4ded0]"
            }
          >
            {line || "\u00A0"}
          </div>
        ))}
        <div className="flex items-center text-portfolio-copper mt-2">
          <span>$</span>
          <span className="ml-2 w-2 h-4 bg-portfolio-copper animate-pulse" />
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
          className="max-w-full max-h-full object-contain rounded-lg border border-portfolio-line shadow-[0_18px_45px_hsl(148_42%_18%/0.16)]"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full max-w-md">
      {installCommand && (
        <div className="terminal-frame">
          <div className="terminal-header">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs text-portfolio-soft ml-4">Install</span>
          </div>
          <div className="terminal-content font-mono text-sm">
            <span className="text-portfolio-copper">$</span>
            <span className="text-[#d4ded0] ml-2">{installCommand}</span>
          </div>
        </div>
      )}
      {usageCode && (
        <div className="code-frame">
          <div className="code-header">
            <span className="text-xs text-portfolio-soft">Usage Example</span>
          </div>
          <pre className="code-content font-mono text-xs text-[#d4ded0] overflow-x-auto">
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
      color: "text-portfolio-copperDark",
      bg: "bg-portfolio-copper/15",
      label: "Merged",
    },
    open: {
      icon: CircleDot,
      color: "text-portfolio-forest",
      bg: "bg-portfolio-moss/20",
      label: "Open",
    },
    closed: {
      icon: GitPullRequest,
      color: "text-red-700",
      bg: "bg-red-700/10",
      label: "Closed",
    },
  };

  const status = prStatus ? statusConfig[prStatus] : statusConfig.open;
  const StatusIcon = status.icon;

  return (
    <div className="pr-frame w-full max-w-[380px]">
      {/* GitHub-style PR header */}
      <div className="flex items-center gap-3 p-4 border-b border-portfolio-line">
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
            <span className="text-portfolio-soft text-xs">#{prNumber}</span>
          </div>
        </div>
      </div>

      {/* PR Title */}
      <div className="p-4 border-b border-portfolio-line">
        <h3 className="text-portfolio-ink font-semibold text-sm mb-2">{prTitle}</h3>
        <div className="flex items-center gap-2 text-portfolio-soft text-xs">
          <Github className="w-3 h-3" />
          <span>{repoName}</span>
        </div>
      </div>

      {/* Contribution stats mockup */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-portfolio-soft">Files changed</span>
          <span className="text-portfolio-ink font-mono">~</span>
        </div>
        <div className="flex gap-1 h-2">
          <div className="flex-1 bg-portfolio-forest/65 rounded-l" />
          <div className="w-1/4 bg-portfolio-copper/70 rounded-r" />
        </div>
        <div className="flex justify-between text-xs font-mono">
          <span className="text-portfolio-forest">+additions</span>
          <span className="text-portfolio-copperDark">-deletions</span>
        </div>
      </div>

      {/* Zed logo/branding */}
      <div className="p-4 border-t border-portfolio-line flex items-center justify-center">
        <div className="flex items-center gap-2 text-portfolio-soft">
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
            <path d="M2 4l8.5 8.5L2 21h3l7-7 7 7h3l-8.5-8.5L20 4h-3l-7 7-7-7H2z" />
          </svg>
          <span className="text-sm font-semibold">Zed Editor</span>
        </div>
      </div>
    </div>
  );
}

function RepoPreview({ project }: { project: Project }) {
  const TypeIcon = typeIcons[project.type];

  return (
    <div className="pr-frame w-full max-w-[440px]">
      <div className="p-5 border-b border-portfolio-line">
        <div className="flex items-start gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${project.color} text-portfolio-ivory shadow-[0_14px_28px_hsl(148_42%_18%/0.16)]`}
          >
            <TypeIcon className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-portfolio-paper text-portfolio-soft border border-portfolio-line">
                {typeLabels[project.type]}
              </span>
              <span className="text-xs font-mono text-portfolio-soft">
                {project.date}
              </span>
            </div>
            <h3 className="text-lg font-bold text-portfolio-ink">
              {project.title}
            </h3>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        <p className="text-sm leading-relaxed text-portfolio-soft">
          {project.description}
        </p>

        {project.stack && (
          <div className="flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="px-2.5 py-1 text-xs font-mono text-portfolio-soft bg-portfolio-paper border border-portfolio-line rounded-full"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        {project.highlights && (
          <div className="space-y-2">
            {project.highlights.map((highlight) => (
              <div
                key={highlight}
                className="flex items-start gap-3 rounded-lg border border-portfolio-line bg-portfolio-paper/55 px-3 py-2"
              >
                <div
                  className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r ${project.color}`}
                />
                <span className="text-xs leading-relaxed text-portfolio-soft">
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 rounded-lg border border-portfolio-line bg-portfolio-paper/70 px-3 py-2 text-xs text-portfolio-soft">
          <Github className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{project.githubUrl}</span>
        </div>
      </div>
    </div>
  );
}

// Preview content component used in both desktop and bottom sheet
function ProjectPreviewContent({
  project,
  isMobile,
}: {
  project: Project;
  isMobile: boolean;
}) {
  return (
    <>
      {project.type === "mobile" && project.appPath && (
        <MobilePreview appPath={project.appPath} />
      )}
      {project.type === "tablet" && project.appPath && (
        <TabletPreview appPath={project.appPath} rotated={isMobile} />
      )}
      {project.type === "web" && project.appPath && (
        <WebPreview appPath={project.appPath} />
      )}
      {project.type === "cli" && project.cliDemo && (
        <CliPreview lines={project.cliDemo} />
      )}
      {project.type === "library" && (
        <LibraryPreview
          installCommand={project.installCommand}
          usageCode={project.usageCode}
          imagePreview={project.imagePreview}
        />
      )}
      {project.type === "contribution" && (
        <ContributionPreview
          prNumber={project.prNumber}
          prStatus={project.prStatus}
          prTitle={project.prTitle}
          repoName="zed-industries/zed"
        />
      )}
      {project.type !== "mobile" &&
        project.type !== "tablet" &&
        project.type !== "web" &&
        project.type !== "cli" &&
        project.type !== "library" &&
        project.type !== "contribution" && <RepoPreview project={project} />}
    </>
  );
}

// Bottom Sheet Component for mobile preview
function PreviewBottomSheet({
  isOpen,
  onClose,
  project,
}: {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}) {
  const dragControls = useDragControls();
  const TypeIcon = typeIcons[project.type];

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
            className="fixed inset-0 bg-portfolio-ink/35 backdrop-blur-sm z-[60]"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            drag="y"
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100 || info.velocity.y > 500) {
                onClose();
              }
            }}
            className="fixed inset-0 z-[70] bg-portfolio-ivory text-portfolio-ink overflow-hidden flex flex-col"
          >
            {/* Drag Handle */}
            <div
              className="flex justify-center py-3 cursor-grab active:cursor-grabbing"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className="w-12 h-1.5 bg-portfolio-line rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 pb-3 border-b border-portfolio-line">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full bg-gradient-to-r ${project.color}`}
                />
                <div>
                  <h3 className="font-semibold text-portfolio-ink">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-portfolio-soft">
                    <TypeIcon className="w-3 h-3" />
                    <span>{typeLabels[project.type]}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-portfolio-soft hover:text-portfolio-copper transition-colors rounded-lg hover:bg-portfolio-paper"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-y-auto p-4 flex items-center justify-center">
              <ProjectPreviewContent project={project} isMobile={true} />
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-portfolio-line bg-portfolio-paper/55 flex gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm text-portfolio-ink border border-portfolio-moss/45 rounded-lg hover:border-portfolio-copper/70 hover:text-portfolio-copper transition-all"
              >
                <Github className="w-4 h-4" />
                Source
              </a>
              {(project.type === "mobile" ||
                project.type === "tablet" ||
                project.type === "web") &&
                project.appPath && (
                  <a
                    href={project.appPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm text-portfolio-ivory bg-portfolio-forest rounded-lg hover:bg-portfolio-moss transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {project.type === "web" ? "Visit" : "Full Screen"}
                  </a>
                )}
              {project.type === "library" && project.packageUrl && (
                <a
                  href={project.packageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm text-portfolio-ivory bg-portfolio-forest rounded-lg hover:bg-portfolio-moss transition-all"
                >
                  <Package className="w-4 h-4" />
                  Package
                </a>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function ProjectsSidebar({ isOpen, onClose }: ProjectsSidebarProps) {
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);
  const [showPreview, setShowPreview] = useState(false);
  const isMobile = useIsMobile(1024); // lg breakpoint
  const TypeIcon = typeIcons[activeProject.type];

  const handleProjectClick = (project: Project) => {
    setActiveProject(project);
    if (isMobile) {
      setShowPreview(true);
    }
  };

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
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full lg:w-[85%] bg-portfolio-ivory text-portfolio-ink border-l border-portfolio-line z-50 overflow-hidden shadow-[-24px_0_60px_hsl(148_42%_18%/0.14)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 lg:p-6 border-b border-portfolio-line bg-portfolio-paper/45">
              <div>
                <span className="text-portfolio-copper font-mono text-xs block mb-1">
                  // PROJECTS
                </span>
                <h2 className="font-display text-3xl leading-none lg:text-4xl">
                  Show Me The <span className="gradient-text">Code</span>
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={appLabUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-semibold text-portfolio-forest border border-portfolio-moss/45 rounded-lg hover:border-portfolio-copper/70 hover:text-portfolio-copper hover:bg-portfolio-ivory/70 transition-all"
                >
                  <AppWindow className="w-4 h-4" />
                  Visit my apps
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href={appLabUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:hidden p-2 text-portfolio-forest border border-portfolio-moss/45 rounded-lg hover:bg-portfolio-ivory/70 transition-colors"
                  aria-label="Visit my apps"
                >
                  <AppWindow className="w-5 h-5" />
                </a>
                <button
                  onClick={onClose}
                  className="p-2 text-portfolio-soft hover:text-portfolio-copper transition-colors rounded-lg hover:bg-portfolio-ivory/70"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex h-[calc(100%-72px)] lg:h-[calc(100%-88px)]">
              {/* Project list - full width on mobile, 2/5 on desktop */}
              <div
                className={`${isMobile ? "w-full" : "w-2/5"} border-r border-portfolio-line overflow-y-auto p-4 space-y-2`}
              >
                {projects.map((project) => {
                  const Icon = typeIcons[project.type];
                  const isActive = activeProject.id === project.id;
                  return (
                    <div
                      key={project.id}
                      className={`w-full rounded-lg border transition-all duration-300 ${
                        isActive
                          ? "bg-portfolio-paper/70 border-portfolio-copper/65 shadow-[0_16px_36px_hsl(148_42%_18%/0.10)]"
                          : "bg-transparent border-portfolio-line hover:border-portfolio-moss/60"
                      }`}
                    >
                      <button
                        onClick={() => handleProjectClick(project)}
                        className="w-full p-4 text-left"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.color}`}
                          />
                          <h3
                            className={`font-semibold text-sm flex-1 ${
                              isActive ? "text-portfolio-copper" : "text-portfolio-ink"
                            }`}
                          >
                            {project.title}
                          </h3>
                          <Icon className="w-4 h-4 text-portfolio-soft" />
                        </div>
                        <div className="flex items-center gap-2 text-portfolio-soft text-xs ml-5">
                          <Calendar className="w-3 h-3" />
                          <span>{project.date}</span>
                          <span className="text-portfolio-copper/60">•</span>
                          <span>{typeLabels[project.type]}</span>
                        </div>
                      </button>

                      {/* Mobile: Show description and preview button for active item */}
                      {isMobile && isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mx-4 mb-4 pt-3 border-t border-portfolio-line"
                        >
                          <p className="text-portfolio-soft text-xs mb-3 line-clamp-2">
                            {project.description}
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowPreview(true);
                            }}
                            className="flex items-center gap-2 px-3 py-2 text-xs text-portfolio-forest border border-portfolio-moss/45 rounded-lg hover:border-portfolio-copper/70 hover:text-portfolio-copper hover:bg-portfolio-ivory/70 transition-all w-full justify-center"
                          >
                            <Eye className="w-3 h-3" />
                            View Preview
                          </button>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Preview area - desktop only */}
              {!isMobile && (
                <div className="w-3/5 flex flex-col">
                  {/* Type badge */}
                  <div className="px-6 pt-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-portfolio-paper/65 border border-portfolio-line rounded-full text-xs text-portfolio-soft">
                      <TypeIcon className="w-3 h-3" />
                      {typeLabels[activeProject.type]}
                    </div>
                  </div>

                  {/* Preview */}
                  <div
                    className={`flex-1 flex overflow-hidden ${activeProject.type === "web" || activeProject.type === "tablet" ? "p-4" : "items-center justify-center p-6"}`}
                  >
                    <ProjectPreviewContent
                      project={activeProject}
                      isMobile={false}
                    />
                  </div>

                  {/* Project info */}
                  <div className="p-4 border-t border-portfolio-line bg-portfolio-paper/55">
                    <p className="text-portfolio-soft text-sm mb-4 line-clamp-3">
                      {activeProject.description}
                    </p>
                    <div className="flex gap-3">
                      <a
                        href={activeProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-portfolio-ink border border-portfolio-moss/45 rounded-lg hover:border-portfolio-copper/70 hover:text-portfolio-copper transition-all"
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
                            className="flex items-center gap-2 px-4 py-2 text-sm text-portfolio-ivory bg-portfolio-forest rounded-lg hover:bg-portfolio-moss transition-all"
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
                            className="flex items-center gap-2 px-4 py-2 text-sm text-portfolio-ivory bg-portfolio-forest rounded-lg hover:bg-portfolio-moss transition-all"
                          >
                            <Package className="w-4 h-4" />
                            View Package
                          </a>
                        )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Mobile Preview Bottom Sheet */}
          {isMobile && (
            <PreviewBottomSheet
              isOpen={showPreview}
              onClose={() => setShowPreview(false)}
              project={activeProject}
            />
          )}
        </>
      )}
    </AnimatePresence>
  );
}
