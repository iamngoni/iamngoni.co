import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0-4
}

interface ContributionWeek {
  days: ContributionDay[];
}

// Generate realistic contribution pattern
function generateMockContributions(): ContributionWeek[] {
  const weeks: ContributionWeek[] = [];
  const today = new Date();

  for (let week = 51; week >= 0; week--) {
    const days: ContributionDay[] = [];
    for (let day = 0; day < 7; day++) {
      const date = new Date(today);
      date.setDate(date.getDate() - (week * 7 + (6 - day)));

      const isWeekend = day === 0 || day === 6;
      const baseChance = isWeekend ? 0.3 : 0.7;
      const hasContribution = Math.random() < baseChance;

      let count = 0;
      let level = 0;

      if (hasContribution) {
        const rand = Math.random();
        if (rand < 0.4) {
          count = Math.floor(Math.random() * 3) + 1;
          level = 1;
        } else if (rand < 0.7) {
          count = Math.floor(Math.random() * 5) + 3;
          level = 2;
        } else if (rand < 0.9) {
          count = Math.floor(Math.random() * 8) + 5;
          level = 3;
        } else {
          count = Math.floor(Math.random() * 15) + 10;
          level = 4;
        }
      }

      days.push({
        date: date.toISOString().split("T")[0],
        count,
        level,
      });
    }
    weeks.push({ days });
  }

  return weeks;
}

// Color levels - base and bright versions
const levelColors = {
  base: [
    "rgba(123, 47, 255, 0.03)",
    "rgba(123, 47, 255, 0.15)",
    "rgba(123, 47, 255, 0.30)",
    "rgba(123, 47, 255, 0.50)",
    "rgba(123, 47, 255, 0.75)",
  ],
  bright: [
    "rgba(123, 47, 255, 0.15)",
    "rgba(123, 47, 255, 0.40)",
    "rgba(123, 47, 255, 0.60)",
    "rgba(123, 47, 255, 0.80)",
    "rgba(123, 47, 255, 1)",
  ],
};

interface GridCellProps {
  day: ContributionDay;
  mouseX: any;
  mouseY: any;
  gridRef: React.RefObject<HTMLDivElement | null>;
}

function GridCell({ day, mouseX, mouseY, gridRef }: GridCellProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cellRef = useRef<HTMLDivElement>(null);

  // Calculate distance from mouse to create ripple effect
  const x = useTransform(mouseX, (val: number) => {
    if (!cellRef.current || !gridRef.current) return 0;
    const rect = cellRef.current.getBoundingClientRect();
    const gridRect = gridRef.current.getBoundingClientRect();
    const cellCenterX = rect.left + rect.width / 2 - gridRect.left;
    return (val - cellCenterX) / 50;
  });

  const y = useTransform(mouseY, (val: number) => {
    if (!cellRef.current || !gridRef.current) return 0;
    const rect = cellRef.current.getBoundingClientRect();
    const gridRect = gridRef.current.getBoundingClientRect();
    const cellCenterY = rect.top + rect.height / 2 - gridRect.top;
    return (val - cellCenterY) / 50;
  });

  const springConfig = { stiffness: 150, damping: 15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  return (
    <motion.div
      ref={cellRef}
      style={{
        x: springX,
        y: springY,
      }}
      animate={{
        backgroundColor: isHovered
          ? levelColors.bright[day.level]
          : levelColors.base[day.level],
        scale: isHovered ? 1.5 : 1,
        boxShadow: isHovered
          ? "0 0 20px rgba(123, 47, 255, 0.6)"
          : "0 0 0px rgba(123, 47, 255, 0)",
      }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-[10px] h-[10px] rounded-sm cursor-pointer"
      title={`${day.date}: ${day.count} contributions`}
    />
  );
}

export function GitHubContributions() {
  const [contributions, setContributions] = useState<ContributionWeek[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);

  // Mouse position relative to grid
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Floating animation offset - much larger range now
  const [floatOffset, setFloatOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setContributions(generateMockContributions());
  }, []);

  // Handle mouse move for parallax effect
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!gridRef.current) return;
      const rect = gridRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY],
  );

  // Floating animation - moves across a large portion of the screen
  useEffect(() => {
    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.002; // Slower movement

      // Large floating range: ~300px in X, ~200px in Y
      // Multiple sine waves at different frequencies for organic movement
      const x =
        Math.sin(time) * 150 +
        Math.sin(time * 0.7) * 80 +
        Math.sin(time * 0.3) * 50;

      const y =
        Math.cos(time * 0.8) * 100 +
        Math.cos(time * 0.5) * 60 +
        Math.sin(time * 0.2) * 40;

      setFloatOffset({ x, y });
      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  if (contributions.length === 0) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
      <motion.div
        ref={gridRef}
        animate={{
          x: floatOffset.x,
          y: floatOffset.y,
        }}
        transition={{ type: "tween", duration: 0.1, ease: "linear" }}
        onMouseMove={handleMouseMove}
        className="flex gap-[3px] opacity-25 pointer-events-auto"
      >
        {contributions.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[3px]">
            {week.days.map((day) => (
              <GridCell
                key={day.date}
                day={day}
                mouseX={mouseX}
                mouseY={mouseY}
                gridRef={gridRef}
              />
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
