const arrayRand = (arr: number[], l: number): number[] => {
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, l);
};

const mapRange = (
  x: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) => ((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

export { arrayRand, mapRange };
