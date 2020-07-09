import { Standing, Team } from '../../types';

const getCompareFn = (compareField: string) => (a: Standing, b: Standing) => {
  const numberOfGoalsForA =
    a.leagueAwayStats[compareField] + a.leagueHomeStats[compareField];
  const numberOfGoalsForB =
    b.leagueAwayStats[compareField] + b.leagueHomeStats[compareField];
  if (numberOfGoalsForA > numberOfGoalsForB) {
    return -1;
  }
  if (numberOfGoalsForA < numberOfGoalsForB) {
    return 1;
  }
  return 0;
};

const compareByGoalsAgainst = (a: Standing, b: Standing) =>
  getCompareFn('goalsAgainst')(a, b);

const compareByGoalsFor = (a: Standing, b: Standing) =>
  getCompareFn('goalsFor')(a, b);

const TOP = 3;

const getLastFn = (
  last: number,
  compareFn: (a: Standing, b: Standing) => number,
) => (standings: Standing[]) => {
  return standings
    .sort(compareFn)
    .slice(standings.length - last, standings.length);
};

const getFirstFn = (
  last: number,
  compareFn: (a: Standing, b: Standing) => number,
) => (standings: Standing[]) => {
  return standings.sort(compareFn).slice(0, last);
};

const isOneOfBestDefenses = (team: Team, standings: Standing[]): boolean => {
  const getLast = getLastFn(TOP, compareByGoalsAgainst);
  return getLast(standings).some((standing) => standing.teamId === team.teamId);
};

const isOneOfBestAttacks = (team: Team, standings: Standing[]): boolean => {
  const getFirst = getFirstFn(TOP, compareByGoalsFor);
  return getFirst(standings).some(
    (standing) => standing.teamId === team.teamId,
  );
};

const isOneOfWorstDefenses = (team: Team, standings: Standing[]): boolean => {
  const getFirst = getFirstFn(TOP, compareByGoalsAgainst);
  return getFirst(standings).some(
    (standing) => standing.teamId === team.teamId,
  );
};

const isOneOfWorstAttacks = (team: Team, standings: Standing[]): boolean => {
  const getLast = getLastFn(TOP, compareByGoalsFor);
  return getLast(standings).some((standing) => standing.teamId === team.teamId);
};

const SPECIAL_POINT = 0.05;

const getTeamExtraPoints = (team: Team, standings: Standing[]): number => {
  let extraPoints = 0;

  const oneOfBestDefenses = isOneOfBestDefenses(team, standings);
  const oneOfBestAttacks = isOneOfBestAttacks(team, standings);
  const oneOfWorstDefenses = isOneOfWorstDefenses(team, standings);
  const oneOfWorstAttacks = isOneOfWorstAttacks(team, standings);

  if (oneOfBestDefenses) {
    extraPoints += SPECIAL_POINT;
  }

  if (oneOfBestAttacks) {
    extraPoints += SPECIAL_POINT;
  }

  if (oneOfWorstDefenses) {
    extraPoints -= SPECIAL_POINT;
  }

  if (oneOfWorstAttacks) {
    extraPoints -= SPECIAL_POINT;
  }

  return extraPoints;
};

export {
  getTeamExtraPoints,
  isOneOfBestDefenses,
  isOneOfBestAttacks,
  isOneOfWorstDefenses,
  isOneOfWorstAttacks,
};

// TODO: best players in/out