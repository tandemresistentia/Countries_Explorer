export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(num);
};

export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};