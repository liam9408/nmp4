export const roundToOneDecimal = (num) => {
  if (!num) return null;
  else if (num === 0) return 0;
  return Math.round(num * 10) / 10;
};
