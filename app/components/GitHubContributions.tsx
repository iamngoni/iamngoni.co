import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0-4
}

interface ContributionWeek {
  days: ContributionDay[];
}

// Fetch real GitHub contributions
async function fetchGitHubContributions(
  username: string,
): Promise<ContributionWeek[]> {
  try {
    // Use GitHub's GraphQL API via a proxy or public endpoint
    // We'll scrape the contribution calendar from the GitHub profile page
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch contributions");
    }

    const data = await response.json();

    // Transform the API response into our format
    const weeks: ContributionWeek[] = [];
    let currentWeek: ContributionDay[] = [];

    // The API returns contributions array with date, count, level
    const contributions = data.contributions || [];

    contributions.forEach(
      (
        contrib: { date: string; count: number; level: number },
        index: number,
      ) => {
        currentWeek.push({
          date: contrib.date,
          count: contrib.count,
          level: contrib.level,
        });

        // Every 7 days, start a new week
        if (currentWeek.length === 7) {
          weeks.push({ days: currentWeek });
          currentWeek = [];
        }
      },
    );

    // Add any remaining days as the last week
    if (currentWeek.length > 0) {
      weeks.push({ days: currentWeek });
    }

    return weeks;
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    return [];
  }
}

// Color levels, faint so the grid stays a background texture
const levelColors = [
  "hsl(220 9% 70% / 0.10)",
  "hsl(152 30% 45% / 0.16)",
  "hsl(152 35% 35% / 0.24)",
  "hsl(152 45% 22% / 0.32)",
  "hsl(18 70% 46% / 0.40)",
];

export function GitHubContributions() {
  const [contributions, setContributions] = useState<ContributionWeek[]>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    fetchGitHubContributions("iamngoni").then(setContributions);
  }, []);

  if (contributions.length === 0) return null;

  return (
    <div className="absolute inset-0 hidden items-center justify-center overflow-hidden pointer-events-none sm:flex">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.2, delay: 0.6 }}
        className="mt-28"
      >
        {/* Slow drift on one transform: GPU-composited, no per-frame React renders */}
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : { x: [0, 36, -24, 0], y: [0, -18, 14, 0], rotate: [0, 0.6, -0.4, 0] }
          }
          transition={{ duration: 28, ease: "easeInOut", repeat: Infinity }}
          className="flex gap-[3px]"
        >
        {contributions.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[3px]">
            {week.days.map((day) => (
              <div
                key={day.date}
                className="h-[10px] w-[10px] rounded-sm"
                style={{ backgroundColor: levelColors[day.level] }}
                title={`${day.date}: ${day.count} contributions`}
              />
            ))}
          </div>
        ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
