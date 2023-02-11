export const parseGridDimension = (input: string): number | undefined => {
  return isNaN(parseInt(input)) ? undefined : parseInt(input);
};
