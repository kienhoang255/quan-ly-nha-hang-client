import React, { useState } from "react";
import {
  Box,
  Slide,
  Typography,
  TextField,
  Divider,
  Button,
  Chip,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import styles from "./styles";
import moment from "moment";
import { setSpecialRequired } from "../../../features/booking/bookingSlice";
import {
  setEmail,
  setPhone,
  setUser,
  setUsername,
} from "../../../features/user/userSlice";
import utils from "../../../utils";
interface Props {
  step: Number;
  slideDirection: any;
  handleNextStep: Function;
  handleBackStep: Function;
}

const BookingStep2: React.FC<Props> = ({
  step,
  slideDirection,
  handleNextStep,
  handleBackStep,
}) => {
  const dispatch = useAppDispatch();
  const booking = useAppSelector((state) => state.booking);
  const user = useAppSelector((state) => state.user);
  const [messageError, setMessageError] = useState<any>({
    username: { message: "", notification: false },
    email: { message: "", notification: false },
    phone: { message: "", notification: false },
  });
  const tableImage = useAppSelector(
    (state) => state.table.tableImage[booking.table?._id!]
  );
  const direction =
    step === 1 ? slideDirection[0] : step === 2 ? slideDirection[1] : "left";

  const handleValidateNextStep = () => {
    let phoneCorrect = false;
    let emailCorrect = false;
    let usernameCorrect = false;
    if (!utils.validatePhoneNumber(user.phone)) {
      setMessageError((prev: any) => ({
        ...prev,
        phone: {
          ...prev.phone,
          message: "Đây không phải số điện thoại",
          notification: true,
        },
      }));
      phoneCorrect = true;
    } else {
      setMessageError((prev: any) => ({
        ...prev,
        phone: {
          ...prev.phone,
          message: "",
          notification: false,
        },
      }));
      phoneCorrect = false;
    }

    if (!utils.validateEmail(user.email!)) {
      setMessageError((prev: any) => ({
        ...prev,
        email: {
          ...prev.email,
          message: "Đây không phải email",
          notification: true,
        },
      }));
      emailCorrect = true;
    } else {
      setMessageError((prev: any) => ({
        ...prev,
        email: {
          ...prev.email,
          message: "",
          notification: false,
        },
      }));
      emailCorrect = false;
    }

    if (!utils.validateNull(user.username!)) {
      setMessageError((prev: any) => ({
        ...prev,
        username: {
          ...prev.username,
          message: "Không được để trống",
          notification: true,
        },
      }));
      usernameCorrect = true;
    } else {
      setMessageError((prev: any) => ({
        ...prev,
        username: {
          ...prev.username,
          message: "",
          notification: false,
        },
      }));
      usernameCorrect = false;
    }
    if (!phoneCorrect && !emailCorrect && !usernameCorrect) {
      handleNextStep();
    }
  };
  return (
    // <Box sx={{ display: "flex", alignItems: "center" }}>
    <Slide
      direction={direction}
      in={step === 1 ? true : false}
      mountOnEnter
      unmountOnExit
    >
      <Box sx={styles.container}>
        <Box sx={styles.leftContainer}>
          <Box sx={styles.leftDetail}>
            <Typography gutterBottom sx={styles.leftDetail.title}>
              Chi tiết đặt bàn của bạn
            </Typography>
            <Box sx={styles.leftDetail.content}>
              <Box>
                <Typography
                  sx={styles.leftDetail.content.wrap.titleWrap}
                  gutterBottom
                >
                  Check in
                </Typography>
                <Typography sx={styles.leftDetail.content.wrap.text}>
                  {moment(booking?.dateCheckIn).format(
                    "ddd, DD [tháng] MM YYYY "
                  )}
                </Typography>

                <Typography sx={styles.leftDetail.content.wrap.titleWrap}>
                  Từ {booking.timeCheckIn}
                </Typography>
              </Box>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ height: "110px" }}
              />
              <Box>
                <Typography
                  sx={styles.leftDetail.content.wrap.titleWrap}
                  gutterBottom
                >
                  Check out
                </Typography>
                <Typography sx={styles.leftDetail.content.wrap.text}>
                  {moment(booking?.dateCheckIn).format(
                    "ddd, DD [tháng] MM YYYY "
                  )}
                </Typography>

                <Typography sx={styles.leftDetail.content.wrap.titleWrap}>
                  Cho đến{" "}
                  {`${Number(booking.timeCheckIn?.split(":")[0]) + 4}:${
                    booking.timeCheckIn?.split(":")[1]
                  }`}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="text"
              sx={styles.leftDetail.btn}
              onClick={() => handleBackStep()}
            >
              Đổi lựa chọn của bạn
            </Button>
          </Box>
        </Box>
        <Box sx={styles.rightContainer}>
          <Box sx={styles.rightDetailTable}>
            <Box
              sx={{
                width: "160px",
                height: "160px",
                backgroundColor: "black",
                backgroundImage: `url(${tableImage?.image1})`,
                backgroundSize: "cover",
              }}
            ></Box>
            <Box sx={{ margin: "0 0 0 16px" }}>
              <Typography variant="h6" sx={styles.rightDetailTable.name}>
                Bàn {booking.table?.name}
              </Typography>
              <Typography sx={styles.rightDetailTable.numOfPeople}>
                Số người {booking.table?.numOfPeople}
                <PeopleAltIcon sx={styles.rightDetailTable.numOfPeople.icon} />
              </Typography>
              <Box sx={styles.rightDetailTable.numOfPeople.detail}>
                <Divider orientation="vertical" flexItem />
                <Box>
                  {tableImage?.options?.map((e: string, key: number) => (
                    <Box key={key}>{e}</Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={styles.box}>
            <Typography sx={styles.box.title}>
              Nhập thông tin chi tiết của bạn
            </Typography>
            <Chip
              sx={styles.box.chip}
              label="Gần xong rồi! Chỉ cần điền phần thông tin * bắt buộc"
            />
            <Box sx={styles.box.content}>
              <TextField
                sx={styles.box.input}
                id="username"
                label="Họ tên*"
                variant="outlined"
                value={user.username}
                onChange={(e) => {
                  dispatch(setUsername(e.target.value));
                }}
                error={messageError?.username?.notification}
                helperText={messageError?.username?.message}
              />
              <TextField
                sx={styles.box.input}
                id="phoneNumber"
                label="Số điện thoại*"
                variant="outlined"
                value={user.phone}
                onChange={(e) => {
                  dispatch(setPhone(e.target.value));
                }}
                error={messageError?.phone?.notification}
                helperText={messageError?.phone?.message}
              />
              <TextField
                sx={styles.box.input}
                id="email"
                label="Email*"
                variant="outlined"
                value={user.email}
                onChange={(e) => {
                  dispatch(setEmail(e.target.value));
                }}
                error={messageError?.email?.notification}
                helperText={messageError?.email?.message}
              />
            </Box>
          </Box>
          <Box sx={styles.box}>
            <Typography sx={styles.box.title}>Các Yêu Cầu Đặc Biệt</Typography>
            <Typography sx={styles.box.subTitle}>
              Các yêu cầu đặc biệt không đảm bảo sẽ được đáp ứng – tuy nhiên,
              chỗ nghỉ sẽ cố gắng hết sức để thực hiện.
            </Typography>
            <TextField
              sx={styles.box.field}
              id="specialRequired"
              label="Vui lòng ghi yêu cầu của bạn tại đây. (không bắt buộc)"
              multiline
              rows={4}
              value={booking?.specialRequired}
              onChange={(e) => {
                dispatch(setSpecialRequired(e.target.value));
              }}
            />
          </Box>
        </Box>
        <Button
          sx={{
            color: "white",
            backgroundColor: "#ff720d",
            "&:hover": {
              backgroundColor: "#231f20",
              color: "#ff720d ",
            },
            gridColumn: "span 2",
            justifySelf: "end",
            margin: "0 12px 0 0",
          }}
          onClick={handleValidateNextStep}
        >
          Tiếp theo &gt;
        </Button>
      </Box>
    </Slide>
    // </Box>
  );
};

export default BookingStep2;
