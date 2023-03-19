import { SetStateAction } from "react";
import utils from "../../utils";

const fullNameErr = "Họ tên không hợp lệ";
const phoneNumErr = "Đây không phải số điện thoại";
const EmailErr = "Đây không phải email";
const NoPErr = "Số người không hợp lệ";
const TimeErr = "Chưa chọn thời gian";
const DateErr = "Chưa chọn ngày";

function checkFullName(
  setErrorMessage: React.SetStateAction<any>,
  userInfo: any
): any {
  let result = false;
  if (!utils.validateName(userInfo.fullName)) {
    setErrorMessage((prev: any) => ({
      ...prev,
      errFullName: { msg: fullNameErr, notification: true },
    }));
    result = false;
  } else {
    setErrorMessage((prev: any) => ({
      ...prev,
      errFullName: { msg: "", notification: false },
    }));
    result = true;
  }
  return result;
}

function checkPhoneNumber(
  setErrorMessage: React.SetStateAction<any>,
  userInfo: any
): any {
  let result = false;
  if (!utils.validatePhoneNumber(userInfo.phoneNumber)) {
    setErrorMessage((prev: any) => ({
      ...prev,
      errPhoneNumber: { msg: phoneNumErr, notification: true },
    }));
    result = false;
  } else {
    setErrorMessage((prev: any) => ({
      ...prev,
      errPhoneNumber: { msg: "", notification: false },
    }));
    result = true;
  }
  return result;
}

function checkEmail(
  setErrorMessage: React.SetStateAction<any>,
  userInfo: any
): any {
  let result = false;
  if (!utils.validateEmail(userInfo.email)) {
    setErrorMessage((prev: any) => ({
      ...prev,
      errEmail: { msg: EmailErr, notification: true },
    }));
    result = false;
  } else {
    setErrorMessage((prev: any) => ({
      ...prev,
      errEmail: { msg: "", notification: false },
    }));
    result = true;
  }
  return result;
}

function checkNumberOfPeople(
  setErrorMessage: React.SetStateAction<any>,
  userInfo: any
): any {
  let result = false;
  if (!Number(userInfo.numberOfPeople)) {
    setErrorMessage((prev: any) => ({
      ...prev,
      errNumberOfPeople: { msg: NoPErr, notification: true },
    }));
    result = false;
  } else {
    setErrorMessage((prev: any) => ({
      ...prev,
      errNumberOfPeople: { msg: "", notification: false },
    }));
    result = true;
  }
  return result;
}

function checkTimeCheckIn(
  setErrorMessage: React.SetStateAction<any>,
  userInfo: any
): any {
  let result = false;
  if (userInfo.timeCheckIn === null || userInfo.timeCheckIn?.length === 0) {
    setErrorMessage((prev: any) => ({
      ...prev,
      errTimeCheckIn: { msg: TimeErr, notification: true },
    }));
    result = false;
  } else {
    setErrorMessage((prev: any) => ({
      ...prev,
      errTimeCheckIn: { msg: "", notification: false },
    }));
    result = true;
  }
  return result;
}

function checkDateCheckIn(
  setErrorMessage: React.SetStateAction<any>,
  userInfo: any
): any {
  let result = false;
  if (userInfo.dateCheckIn.length === 0) {
    setErrorMessage((prev: any) => ({
      ...prev,
      errDateCheckIn: { msg: DateErr, notification: true },
    }));
    result = false;
  } else {
    setErrorMessage((prev: any) => ({
      ...prev,
      errDateCheckIn: { msg: "", notification: false },
    }));
    result = true;
  }
  return result;
}

export {
  checkPhoneNumber,
  checkEmail,
  checkFullName,
  checkNumberOfPeople,
  checkTimeCheckIn,
  checkDateCheckIn,
};
