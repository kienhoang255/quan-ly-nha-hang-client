import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { decodeToken } from "react-jwt";
import services from "../../services";
import { setUser } from "../../features/user/userSlice";
import { Box } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const Fetching: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    // Get cookie
    let cookie;
    document.cookie
      .split(";")
      .map((e) => e.split("="))
      .forEach((e) =>
        e[0].trim() === "token_cus" ? (cookie = e[1]) : (cookie = undefined)
      );
    // Check cookie exist
    if (!cookie) {
      setFetching(false);
    } else {
      try {
        const decodedToken: any = decodeToken(cookie);
        services
          .getClient(decodedToken._id)
          .then((res) => {
            console.log(res.data);
            dispatch(setUser({ ...res.data, _id: decodedToken._id }));
          })
          .catch((err) => err);
        setFetching(false);
      } catch {
        setFetching(true);
        // show Error
      }
    }
  }, []);
  return <>{fetching ? <Box>123</Box> : <>{children}</>}</>;
};

export default Fetching;
