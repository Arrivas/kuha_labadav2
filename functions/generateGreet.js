const greetings = () => {
  const today = new Date();
  const curHr = today.getHours();
  let greet = '';

  if (curHr < 12) greet = 'good morning';
  else if (curHr < 18) greet = 'good afternoon';
  else greet = 'good evening';
  return greet;
};

export default greetings;
