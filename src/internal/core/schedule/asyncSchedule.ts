const asyncSchedule = (schedule: () => void, ms: number) => {
  const id = setInterval(schedule, ms);
  return () => clearInterval(id);
};

export default asyncSchedule;
