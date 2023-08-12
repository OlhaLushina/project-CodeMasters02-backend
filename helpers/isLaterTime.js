const isLaterTime = (startTime, endTime) => {
  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);

  if (endHours > startHours) {
    return true;
  } else if (endHours === startHours && endMinutes > startMinutes) {
    return true;
  }

  return false;
};

module.exports = isLaterTime;
