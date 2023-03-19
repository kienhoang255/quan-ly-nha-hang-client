import React from "react";
import {
  Box,
  Slide,
  Typography,
  TextField,
  Divider,
  Button,
  Chip,
} from "@mui/material";
import { useAppSelector } from "../../../store/hooks";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import styles from "./styles";
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
  const booking = useAppSelector((state) => state.booking);
  const tableImage = useAppSelector(
    (state) => state.table.tableImage[booking.table?._id!]
  );
  const direction =
    step === 1 ? slideDirection[0] : step === 2 ? slideDirection[1] : "left";
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
                  Nhận phòng
                </Typography>
                <Typography sx={styles.leftDetail.content.wrap.text}>
                  T3, 14 tháng 3 2023
                </Typography>
              </Box>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ height: "70px" }}
              />
              <Box>
                <Typography sx={styles.leftDetail.content.wrap.text}>
                  12:30
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
              />
              <TextField
                sx={styles.box.input}
                id="phoneNumber"
                label="Số điện thoại*"
                variant="outlined"
              />
              <TextField
                sx={styles.box.input}
                id="email"
                label="Email*"
                variant="outlined"
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
          onClick={() => handleNextStep()}
        >
          Tiếp theo &gt;
        </Button>
      </Box>
    </Slide>
    // </Box>
  );
};

export default BookingStep2;
