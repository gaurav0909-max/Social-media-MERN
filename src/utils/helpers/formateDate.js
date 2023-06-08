export const formateDate = (date) => {

    
  const updatedDate = date.slice(0, 10);
  const dateOptions = {
    timeZone: "UTC",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const myDate = new Date(updatedDate);

//   console.log(myDate)
  const finalDate = myDate.toLocaleDateString("en-US", dateOptions);
//   console.log(updatedDate)
  return finalDate;
};
