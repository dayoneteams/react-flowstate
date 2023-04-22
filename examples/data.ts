const DELAY = 500;

const BLACKPINK_MEMBERS = [
  {
    name: 'Jisoo',
    birthYear: 1995,
    position: 'Vocalist, Visual',
  },
  {
    name: 'Jennie',
    birthYear: 1996,
    position: 'Main Rapper, Vocalist',
  },
  {
    name: 'Rosé',
    birthYear: 1997,
    position: 'Main Vocalist, Lead Dancer',
  },
  {
    name: 'Lisa',
    birthYear: 1997,
    position: 'Main Dancer, Lead Rapper, Sub-Vocalist',
  },
];

export const fetchData = () =>
  new Promise(resolve =>
    setTimeout(() => resolve(BLACKPINK_MEMBERS), DELAY)
  );
