const formattedDate = (pickupDate, pickupTime) =>
  new Date(`${pickupDate} ${pickupTime}`);

export default formattedDate;
