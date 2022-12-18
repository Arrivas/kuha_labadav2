export const filterLaundryServices = (laundryArray, selectedService) => {
  const filteredLaundry = [];
  laundryArray?.filter((item) =>
    item?.servicesOffered.forEach((element) => {
      if (element.value === selectedService && element.offering)
        filteredLaundry.push(item);
    })
  );
  return filteredLaundry;
};
