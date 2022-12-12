const generateWeek = () => {
  const name = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const now = Date.now();
  const date = new Date();
  const DAY = 60 * 60 * 24 * 1000;
  const today = new Date(now).getDay();
  const dayNumber = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  // day
  const getDayToday = `${month}, ${dayNumber} ${year}`;
  // start of week days
  const weekDays = [];

  for (let i = today; i >= 0; i--) {
    const date = new Date(now - DAY * i);
    weekDays.push({
      dayWeek: name[date.getDay()],
      dayNumber: date.getDate(),
      actualDate: date.toLocaleDateString('en-US'),
    });
    //   daysWeekWords.push();
    //   daysWeekNumbers.push();
  }
  for (let i = 1; i < 7 - today; i++) {
    const date = new Date(now + DAY * i);
    weekDays.push({
      dayWeek: name[date.getDay()],
      dayNumber: date.getDate(),
      actualDate: date.toLocaleDateString('en-US'),
    });
  }
  return {
    weekDays,
    getDayToday,
  };
};

const getAvailableDateWeek = () => {
  const daysInWeek = generateWeek().weekDays;
  const dateNow = new Date();
  dateNow.setHours(0, 0, 0, 0);
  const availableDate = [];
  daysInWeek.forEach((day) => {
    if (new Date(day.actualDate) < dateNow)
      availableDate.push({
        dayWeek: day.dayWeek,
        dayNumber: day.dayNumber,
        available: false,
        actualDate: day.actualDate,
      });
    else
      availableDate.push({
        dayWeek: day.dayWeek,
        dayNumber: day.dayNumber,
        available: true,
        actualDate: day.actualDate,
      });
  });
  return availableDate;
};

export default {
  generateWeek,
  getAvailableDateWeek,
};
