import React, { ChangeEvent, memo } from "react";
import {
  Slide,
  Paper,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
} from "@mui/material";

interface Props {
  step: Number;
  slideDirection: any;
  userInfo: any;
  handleChangeLicenseCancel: any;
  handleChangeLicensePrivacy: any;
  license: {
    cancel: boolean;
    privacy: boolean;
  };
}

const BookingStep3: React.FC<Props> = ({
  step,
  slideDirection,
  userInfo,
  handleChangeLicenseCancel,
  handleChangeLicensePrivacy,
  license,
}) => {
  const styles = {
    container: {
      height: "600px",
      width: "970px",
      display: "grid",
      gridTemplateColumns: { xs: "1fr", lg: "1fr 60%" },
      justifyItems: "center",
      alignItems: "center",
    },
    title: {
      fontWeight: "bold",
    },
    sub: {
      color: "gray",
    },
    left: {
      width: "80%",
    },
    detailBooking: {
      display: "flex",
      flexDirection: "column",
      padding: "20px",
      gap: "10px",
    },
    warning: { color: "red" },
    license: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    },
    licenseContent: {
      width: "100%",
      height: { xs: "200px", lg: "500px" },
      overflow: "hidden",
      overflowY: "auto",
    },
  };

  const direction =
    step === 2 ? slideDirection[0] : step === 3 ? slideDirection[1] : "left";
  return (
    <Slide
      direction={direction}
      in={step === 2 ? true : false}
      mountOnEnter
      unmountOnExit
    >
      <Paper sx={styles.container} elevation={3}>
        <Box sx={styles.left}>
          <Paper sx={styles.detailBooking} elevation={2}>
            <Typography sx={styles.title} variant="h6" color="text.primary">
              Chi tiết đặt bàn
            </Typography>
            <Box sx={styles.sub}>Ban</Box>
            <Box sx={styles.title}>{userInfo.dateCheckIn}</Box>
            <Box sx={styles.title}>{userInfo.timeCheckIn}</Box>
            <Box sx={styles.warning}>
              Cảnh báo bàn sẽ bị huỷ khi check in muộn, thời gian tối đa là 45
              phút
            </Box>
          </Paper>
        </Box>
        <Box sx={styles.license}>
          <Paper sx={styles.licenseContent} elevation={2}>
            <Typography sx={styles.title} variant="h6" color="text.primary">
              Chính sách An toàn và Bảo mật
            </Typography>
            <Typography
              sx={styles.title}
              variant="caption"
              color="text.primary"
            >
              Trước hết, sự riêng tư của bạn có ý nghĩa quan trọng đối với chúng
              tôi. Có lẽ bạn đã nghe câu này rất nhiều, nhưng chúng tôi thực sự
              quan tâm tới quyền riêng tư của bạn. Bằng việc sử dụng dịch vụ của
              Booking.com, bạn đã đặt lòng tin vào chúng tôi và chúng tôi trân
              trọng sự tin tưởng đó. Điều này đồng nghĩa với việc chúng tôi cam
              kết giữ gìn và bảo vệ dữ liệu cá nhân của bạn. Chúng tôi hành động
              vì quyền lợi tốt nhất của khách hàng và luôn minh bạch trong việc
              xử lý dữ liệu cá nhân của bạn. Văn bản này (“Chính sách Bảo mật
              này” hoặc “Chính sách Bảo mật của chúng tôi”) mô tả cách chúng tôi
              sử dụng và xử lý dữ liệu cá nhân của bạn, được viết một cách dễ
              hiểu và minh bạch.Ngoài ra, văn bản này cũng cho bạn biết mình có
              những quyền gì liên quan đến dữ liệu cá nhân của bản thân và làm
              cách nào để liên hệ với chúng tôi. Vui lòng đọc Chính sách Cookie
              của chúng tôi để biết cách thức Booking.com sử dụng cookie và
              những công nghệ theo dõi tương tự khác. Nếu đã từng dùng dịch vụ
              của chúng tôi, bạn sẽ biết rằng Booking.com cung cấp dịch vụ du
              lịch trực tuyến qua trang web và ứng dụng di động riêng của chúng
              tôi, cũng như qua các nền tảng trực tuyến khác như trang web của
              đối tác và mạng xã hội. Chúng tôi muốn chỉ ra rằng tất cả các
              thông tin bạn sắp sửa đọc được áp dụng không chỉ với một hay hai
              mà tất cả các kênh này. Thực tế là chính sách bảo mật duy nhất này
              được áp dụng cho bất cứ loại thông tin nào của khách hàng mà chúng
              tôi thu thập thông qua tất cả các nền tảng kể trên hoặc qua các
              phương tiện khác được kết nối với các kênh này (như liên hệ với
              đội ngũ dịch vụ khách hàng của chúng tôi qua email). Nếu bạn là
              một trong các đối tác kinh doanh của chúng tôi, vui lòng đọc Chính
              sách Bảo mật dành cho Đối tác Kinh doanh để hiểu dữ liệu cá nhân
              được xử lý thêm ra sao trong mối quan hệ hợp tác kinh doanh. Tùy
              từng thời điểm, chúng tôi có thể sửa đổi Chính sách Bảo mật này.
              Do đó, bạn nên truy cập vào trang này thường xuyên để nắm được
              thông tin. Nếu chúng tôi cập nhật bất kỳ nội dung nào trong Chính
              sách Bảo mật này có ảnh hưởng đáng kể đến bạn, chúng tôi sẽ thông
              báo cho bạn về những thay đổi đó trước khi bắt đầu bất kỳ hoạt
              động mới nào.
            </Typography>
          </Paper>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleChangeLicenseCancel}
                  checked={license.cancel}
                />
              }
              label="Có, đồng ý huỷ bàn khi check in muộn"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleChangeLicensePrivacy}
                  checked={license.privacy}
                />
              }
              label="Có, đồng ý với điều kiện đặt phòng, điều khoản chung và chính sách bảo mật"
            />
          </Box>
        </Box>
      </Paper>
    </Slide>
  );
};

export default memo(BookingStep3);
