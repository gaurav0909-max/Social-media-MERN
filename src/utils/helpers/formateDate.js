export const formateDate = (date) => {
  const dateOptions = {
    timeZone: "UTC",
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const myDate = new Date(date);

  const finalDate = myDate.toLocaleDateString("en-US", dateOptions);

  return finalDate;
};
