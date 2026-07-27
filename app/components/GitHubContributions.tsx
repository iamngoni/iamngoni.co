import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionWeek {
  days: ContributionDay[];
}

interface ContributionCache {
  savedAt: number;
  contributions: ContributionDay[];
}

interface ActiveCell {
  day: ContributionDay;
  x: number;
  y: number;
}

const USERNAME = "iamngoni";
const CONTRIBUTIONS_ENDPOINT = `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`;
const CACHE_KEY = `github-contributions:${USERNAME}:last`;
const CACHE_TTL = 15 * 60 * 1000;

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
});

function isContributionDay(value: unknown): value is ContributionDay {
  if (!value || typeof value !== "object") return false;

  const day = value as Partial<ContributionDay>;
  return (
    typeof day.date === "string" &&
    typeof day.count === "number" &&
    typeof day.level === "number"
  );
}

function readCachedContributions(): ContributionDay[] | null {
  try {
    const rawCache = window.localStorage.getItem(CACHE_KEY);
    if (!rawCache) return null;

    const cache = JSON.parse(rawCache) as Partial<ContributionCache>;
    if (
      typeof cache.savedAt !== "number" ||
      Date.now() - cache.savedAt > CACHE_TTL ||
      !Array.isArray(cache.contributions) ||
      !cache.contributions.every(isContributionDay)
    ) {
      return null;
    }

    return cache.contributions;
  } catch {
    return null;
  }
}

function cacheContributions(contributions: ContributionDay[]) {
  try {
    window.localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ savedAt: Date.now(), contributions }),
    );
  } catch {
    // Storage is an enhancement. The live field still works without it.
  }
}

async function fetchGitHubContributions(signal: AbortSignal) {
  const response = await fetch(CONTRIBUTIONS_ENDPOINT, { signal });
  if (!response.ok) {
    throw new Error(`GitHub activity request failed with ${response.status}`);
  }

  const payload = (await response.json()) as { contributions?: unknown[] };
  const contributions = (payload.contributions ?? []).filter(isContributionDay);

  if (contributions.length === 0) {
    throw new Error("GitHub activity response did not contain contribution days");
  }

  return contributions.map((day) => ({
    ...day,
    level: Math.max(0, Math.min(4, day.level)),
  }));
}

function groupIntoWeeks(contributions: ContributionDay[]) {
  const weeks: ContributionWeek[] = [];

  for (let index = 0; index < contributions.length; index += 7) {
    weeks.push({ days: contributions.slice(index, index + 7) });
  }

  return weeks;
}

function formatContributionLabel(day: ContributionDay) {
  const date = dateFormatter.format(new Date(`${day.date}T12:00:00`));
  const contributionLabel = day.count === 1 ? "contribution" : "contributions";
  return `${date} · ${day.count} ${contributionLabel}`;
}

export function GitHubContributions() {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [status, setStatus] = useState<"loading" | "live" | "stale">("loading");
  const [activeCell, setActiveCell] = useState<ActiveCell | null>(null);
  const [rovingIndex, setRovingIndex] = useState(0);
  const fieldRef = useRef<HTMLElement>(null);
  const cellRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const controller = new AbortController();
    const cached = readCachedContributions();

    if (cached) {
      setContributions(cached);
      setRovingIndex(cached.length - 1);
      setStatus("live");
    }

    fetchGitHubContributions(controller.signal)
      .then((days) => {
        setContributions(days);
        setRovingIndex(days.length - 1);
        setStatus("live");
        cacheContributions(days);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setStatus(cached ? "stale" : "loading");
      });

    return () => controller.abort();
  }, []);

  const weeks = useMemo(() => groupIntoWeeks(contributions), [contributions]);

  const showTooltip = useCallback(
    (day: ContributionDay, cell: HTMLButtonElement) => {
      const field = fieldRef.current;
      if (!field) return;

      const fieldRect = field.getBoundingClientRect();
      const cellRect = cell.getBoundingClientRect();
      const rawX = cellRect.left - fieldRect.left + cellRect.width / 2;

      setActiveCell({
        day,
        x: Math.max(112, Math.min(fieldRect.width - 112, rawX)),
        y: Math.max(72, cellRect.top - fieldRect.top - 12),
      });
    },
    [],
  );

  const moveFocus = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      const keyOffsets: Record<string, number> = {
        ArrowLeft: -7,
        ArrowRight: 7,
        ArrowUp: -1,
        ArrowDown: 1,
      };
      const offset = keyOffsets[event.key];
      if (!offset) return;

      event.preventDefault();
      const nextIndex = Math.max(
        0,
        Math.min(contributions.length - 1, index + offset),
      );
      setRovingIndex(nextIndex);
      cellRefs.current[nextIndex]?.focus();
    },
    [contributions.length],
  );

  return (
    <>
      <section
        ref={fieldRef}
        className="contribution-field"
        aria-label="Live GitHub contribution activity"
      >
        <div className="contribution-field__label" aria-hidden="true">
          <span className={`contribution-field__pulse is-${status}`} />
          <span>{status === "stale" ? "CACHED" : "LIVE"}</span>
          <span aria-hidden="true">/</span>
          <span>GITHUB ACTIVITY</span>
        </div>

        <span className="sr-only" aria-live="polite">
          {status === "live"
            ? "Live GitHub activity loaded"
            : status === "stale"
              ? "Showing cached GitHub activity"
              : "Loading GitHub activity"}
        </span>

        <div className="contribution-field__viewport">
          {weeks.length > 0 ? (
            <div
              className="contribution-field__plane"
              role="grid"
              aria-label="One year of GitHub contributions. Use arrow keys to explore."
            >
              {weeks.map((week, weekIndex) => (
                <div
                  className="contribution-field__week"
                  role="row"
                  key={week.days[0]?.date ?? weekIndex}
                >
                  {week.days.map((day, dayIndex) => {
                    const index = weekIndex * 7 + dayIndex;
                    const label = formatContributionLabel(day);

                    return (
                      <button
                        ref={(cell) => {
                          cellRefs.current[index] = cell;
                        }}
                        type="button"
                        role="gridcell"
                        key={day.date}
                        tabIndex={index === rovingIndex ? 0 : -1}
                        className={`contribution-field__cell level-${day.level}`}
                        aria-label={label}
                        onMouseEnter={(event) =>
                          showTooltip(day, event.currentTarget)
                        }
                        onMouseLeave={() => setActiveCell(null)}
                        onFocus={(event) => {
                          setRovingIndex(index);
                          showTooltip(day, event.currentTarget);
                        }}
                        onBlur={() => setActiveCell(null)}
                        onClick={(event) =>
                          showTooltip(day, event.currentTarget)
                        }
                        onKeyDown={(event) => moveFocus(event, index)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          ) : (
            <div className="contribution-field__skeleton" aria-hidden="true">
              {Array.from({ length: 212 }, (_, index) => (
                <span key={index} />
              ))}
            </div>
          )}
        </div>

        {activeCell ? (
          <div
            className="contribution-field__tooltip"
            role="tooltip"
            style={{ left: activeCell.x, top: activeCell.y }}
          >
            {formatContributionLabel(activeCell.day)}
          </div>
        ) : null}
      </section>
    </>
  );
}
