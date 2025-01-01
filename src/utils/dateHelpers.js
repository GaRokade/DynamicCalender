export const getDaysInMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const days = [];
  for (let i = 1; i <= new Date(year, month + 1, 0).getDate(); i++) {
    days.push(new Date(year, month, i));
  }
  return days;
};

export const isToday = (date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const formatDate = (date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
