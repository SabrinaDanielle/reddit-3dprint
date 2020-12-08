const createdAt = (utc) => {
  const date = new Date(utc * 1000);
  const dateString = date.toLocaleString();
  return dateString;
};

export default createdAt;
