const increaseDate = (type: string, date: Date, amount = 1) => {
  if (type === "year") {
    date.setDate(date.getFullYear() + amount);
  }
  if (type === "month") {
    date.setDate(date.getMonth() + amount);
  }
  if (type === "week") {
    date.setDate(date.getDate() + amount * 7);
  } else {
    date.setDate(date.getDate() + amount);
  }
  return date;
};

const increaseHour = (date: Date, amount: number) => {
  return date.setHours(date.getHours() + amount);
};

const validateName = (data: string) => {
  if (data.length > 1 && !Number(data)) {
    return true;
  }
  return false;
};

const validateEmail = (email: any) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return email.match(regex);
};

const validatePhoneNumber = (phone: any) => {
  let result;
  if (Number(phone)) {
    result =
      phone.match(/\d/g).length === 10 || phone.match(/\d/g).length === 11;
  } else result = false;
  return result;
};

const validateNull = (data: any) => {
  let result;
  if (data === null || data === undefined || data === "") {
    result = false;
  } else result = true;
  return result;
};

const numberWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const formatVND = (number: number) => {
  return new Intl.NumberFormat("vi-VI", {
    style: "currency",
    currency: "VND",
  }).format(number);
};

export default {
  increaseDate,
  validatePhoneNumber,
  validateEmail,
  validateName,
  increaseHour,
  validateNull,
  numberWithCommas,
  formatVND,
};
