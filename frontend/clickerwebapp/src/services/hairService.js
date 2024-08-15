const MAX_DAILY_REMOVAL = 5000;
const REGROWTH_TIME = 2 * 60 * 60 * 1000; 

export const canRemoveHair = (currentCount) => {
  return currentCount < MAX_DAILY_REMOVAL;
};

export const calculateRegrowthTime = (lastRemovalTime) => {
  const now = Date.now();
  const timePassed = now - lastRemovalTime;
  return Math.max(0, REGROWTH_TIME - timePassed);
};

export const removeHair = (currentCount) => {
  if (canRemoveHair(currentCount)) {
    return currentCount + 1;
  }
  return currentCount;
};a