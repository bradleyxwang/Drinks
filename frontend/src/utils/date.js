export const renderDateStr = (dateStr) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = (1 + date.getMonth()).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${month}/${day}/${year}`;
};

export const getAge = (date) => {
  const today = new Date();
  const dob = new Date(date);
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  const d = today.getDate() - dob.getDate();
  if (m < 0 || (m === 0 && d < 0)) {
      age -= 1;
  }
  return age;
};

export const getBirthday = (date) => {
  const dob = new Date(date);
  const birthday = dob.toLocaleString('en-us', { month: 'long', day: "numeric" });
  return birthday;
};
