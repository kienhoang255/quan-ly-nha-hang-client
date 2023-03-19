import { Button, Box, Paper } from "@mui/material";
import logo from "../../assets/images/logo.webp";

interface Props {
  height?: string;
  width?: string;
  sx?: {};
}

const Logo: React.FC<Props> = ({ height = "40px", width = "40px", sx }) => {
  const styles = {
    logo: {
      height: { height },
      width: { width },
      backgroundImage: `url("${logo}")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
    },
  };

  return <Box sx={[styles.logo, { ...sx }]}></Box>;
};

export default Logo;
