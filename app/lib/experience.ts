const EXPERIENCE_START_YEAR = 2019;

export function getExperienceYears() {
  return new Date().getFullYear() - EXPERIENCE_START_YEAR;
}

export function getExperienceYearsLabel() {
  return `${getExperienceYears()}+`;
}
