const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const deadLineMonth = (deadline) => {
  if (deadline.split("-")[1].charAt(1) === 0) {
    return deadline.split("-")[1].charAt(1);
  } else {
    return deadline.split("-")[1];
  }
};

function getMonthName(deadline) {
  const month = deadLineMonth(deadline);
  return months[month - 1];
}
export default getMonthName;
