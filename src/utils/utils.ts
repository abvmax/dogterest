export function generateRandomNumbers(
  count: number,
  min: number,
  max: number
): number[] {
  const numbers: number[] = [];
  for (let i = 0; i < count; i++) {
    numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return numbers;
}

export const handlerTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
