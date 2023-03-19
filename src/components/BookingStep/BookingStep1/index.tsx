import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Slide,
  Autocomplete,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import TableItem from "../../TableItem";
import ClearIcon from "@mui/icons-material/Clear";

import styles from "./styles";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import services from "../../../services";
import {
  setOptions,
  setStage,
  setTable,
  setTableImage,
} from "../../../features/table/tableSlice";
import moment from "moment";
import TableItemSkeleton from "../../TableItem/TableItemSkeleton";
import { setSelectedTable } from "../../../features/booking/bookingSlice";
import SearchMobile from "./SearchMobile";

interface Props {
  step: number;
  slideDirection: any;
  userInfo: any;
  setUserInfo: any;
  handleNextStep: Function;
}

const BookingStep1: React.FC<Props> = ({
  step,
  slideDirection,
  userInfo,
  setUserInfo,
  handleNextStep,
}) => {
  const dispatch = useAppDispatch();
  const stage = useAppSelector((state) => state.table.stage);
  const options = useAppSelector((state) => state.table.options);
  const table = useAppSelector((state) => state.table.table);
  const tableImage = useAppSelector((state) => state.table.tableImage);

  const [errorMessage, setErrorMessage] = useState({
    numOfPeople: { message: "", notification: false },
  });

  // Maximum & minimum for DesktopDatePicker (dateCheckIn)
  const minDate = moment([]);
  const maxDate = moment([]).add(14, "day");

  // On fetching table unmount table item
  const [fetching, setFetching] = useState(true);

  const [notFoundTable, setNotFoundTable] = useState(false);

  type formSearchType = {
    stage?: string | null;
    timeCheckIn?: string | null;
    dateCheckIn?: string | null;
    numOfPeople?: number | null;
  };
  const [formSearch, setFormSearch] = useState<formSearchType>({
    stage: "1",
  });

  const [filterSelected, setFilterSelected] = useState<{
    [key: string]: boolean;
  }>({});

  // Create options for auto complete 'timePickList'
  const timePickList = useMemo(() => {
    let result: any = [];
    let start = 9;
    let end = 22;
    const timeZone: string[] = ["00", "30"];
    for (start; start <= end; start++) {
      timeZone.forEach((e) => {
        result.push(`${start}:${e}`);
      });
    }
    return result;
  }, []);

  // Do in first render
  useEffect(() => {
    // Get stage from API
    if (!stage[0]) {
      services.getStage().then((res) => {
        dispatch(setStage(res.data));
      });
    }
    // Get options/filters of Table Image from API
    if (!options[0]) {
      services.getOptions().then((res) => {
        dispatch(setOptions(res.data.data));
      });
    }
    // Get table from API
    // handleOnSearch();
  }, []);

  // Get image by id
  const handleGetTableImage = (_id: string) => {
    // If exist cancel call api
    if (!tableImage[_id]) {
      services.getTableImage(_id).then((res) => {
        // Check data exist
        if (res.data.data) dispatch(setTableImage(res.data.data));
      });
    }
  };

  const handleOnSearch = useCallback(() => {
    setFetching(false);
    services.getTableByStage(formSearch).then((res) => {
      dispatch(setTable(res.data));
      setFetching(true);
      res.data.length == 0 ? setNotFoundTable(true) : setNotFoundTable(false);
    });
  }, [formSearch, table]);

  // Handle filter
  const handleOnChangeFilter = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string | number
  ) => {
    setFilterSelected((prev) => ({
      ...prev,
      [value]: event.target.checked,
    }));
  };

  // Debounce on change filter
  useEffect(() => {
    let result: string[] = [];
    // Function debounce handler
    const handler = setTimeout(() => {
      for (const filter of Object.entries(filterSelected)) {
        // Add filter
        filter[1] && result.push(filter[0]);
      }
      // If exist client select filter
      if (result.length > 0) {
        setFetching(false);
        services.getTableByFilter(result).then((res) => {
          dispatch(setTable(res.data.data));
          setFetching(true);
          res.data.data.length == 0
            ? setNotFoundTable(true)
            : setNotFoundTable(false);
        });
      }
      // Else get table by stage
      // Get table in first render
      else {
        handleOnSearch();
      }
    }, 700);
    // Clear timeout by id handler
    return () => clearTimeout(handler);
  }, [filterSelected]);

  const handleOnSelectedTable = (data: {}) => {
    dispatch(setSelectedTable(data));
  };

  const direction =
    step === 0 ? slideDirection[0] : step === 1 && slideDirection[1];

  return (
    <Slide
      direction={direction}
      in={step === 0 ? true : false}
      mountOnEnter
      unmountOnExit
    >
      <Box sx={styles.container}>
        <Box sx={styles.left}>
          <SearchMobile
            userInfo={userInfo}
            timePickList={timePickList}
            setUserInfo={setUserInfo}
            minDate={minDate}
            maxDate={maxDate}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            setFormSearch={setFormSearch}
            formSearch={formSearch}
            stage={stage}
            handleOnSearch={handleOnSearch}
            styles={styles}
          />
          <Box sx={styles.contentSearch}>
            <Typography variant="h6">Tìm</Typography>
            <Autocomplete
              id="time"
              value={userInfo.timeCheckIn}
              isOptionEqualToValue={(option, value) => {
                return value === option || option === "09:00";
              }}
              options={timePickList?.map((option: any) => option)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Thời gian CheckIn"
                  // helperText={errorMessage.errTimeCheckIn.msg}
                  // error={errorMessage.errTimeCheckIn.notification}
                />
              )}
              onChange={(event: any, newValue: string | null) => {
                setUserInfo((prev: any) => ({
                  ...prev,
                  timeCheckIn: newValue,
                }));
              }}
              sx={{ width: "100%" }}
            />

            <DesktopDatePicker
              label="Ngày CheckIn"
              inputFormat="DD/MM/YYYY"
              minDate={minDate}
              maxDate={maxDate}
              value={minDate}
              onChange={() => {}}
              renderInput={(params) => (
                <TextField
                  {...params}
                  // helperText={errorMessage.errDateCheckIn.msg}
                  // error={errorMessage.errDateCheckIn.notification}
                />
              )}
            />
            <TextField
              id="numOfPeople"
              label="Số lượng người"
              variant="outlined"
              type="text"
              helperText={errorMessage.numOfPeople.message}
              error={errorMessage.numOfPeople.notification}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                // Check value is existed
                if (event.target.value.length > 0) {
                  // Value can't bigger 12 or value must be number
                  if (+event.target.value > 12 || !Number(event.target.value)) {
                    // Set error message
                    setErrorMessage((prev) => ({
                      ...prev,
                      numOfPeople: {
                        message: "Tầng phải là số và tối đa 12",
                        notification: true,
                      },
                    }));
                  } else {
                    // Set formSearch
                    setFormSearch((prev) => ({
                      ...prev,
                      numOfPeople: +event.target.value,
                    }));
                  }
                }
                // Set default
                else {
                  setErrorMessage((prev) => ({
                    ...prev,
                    numOfPeople: { message: "", notification: false },
                  }));

                  // Remove numOfPeople
                  setFormSearch((prev) => {
                    const { numOfPeople, ...rest } = prev;
                    return rest;
                  });
                }
              }}
            />
            <Autocomplete
              id="stage"
              value={formSearch.stage}
              isOptionEqualToValue={(option, value) => {
                return value === option || option === "1";
              }}
              options={stage?.map((option) => option.toString())}
              renderInput={(params) => <TextField {...params} label="Tầng" />}
              onChange={(event: any, newValue: string | null) => {
                setFormSearch((prev) => ({ ...prev, stage: newValue }));
              }}
              sx={{ width: "100%" }}
            />
            <Button
              sx={styles.btnSearch}
              variant="contained"
              onClick={handleOnSearch}
            >
              Tìm
            </Button>
          </Box>
          <Box sx={styles.contentFilter}>
            <Typography variant="h6" gutterBottom>
              Lọc
            </Typography>
            <Box
              sx={{ height: "240px", overflow: "hidden", overflowY: "auto" }}
            >
              {options.map((value: string | number, index: number) => {
                return (
                  <FormControlLabel
                    key={index}
                    label={value}
                    control={
                      <Checkbox
                        checked={!!filterSelected[value]}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          handleOnChangeFilter(event, value);
                        }}
                      />
                    }
                  />
                );
              })}
            </Box>
          </Box>
        </Box>
        <Box sx={styles.containerFound}>
          <Typography gutterBottom sx={{ fontSize: "30px", fontWeight: "400" }}>
            Tìm thấy {table.length} bàn
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "820px",
              overflow: "hidden",
              overflowY: "auto",
              gap: "12px",
            }}
          >
            {fetching ? (
              <>
                {notFoundTable && (
                  <Box
                    sx={{
                      padding: "0 0 0 20px",
                      height: "50px",
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                      border: "1px solid rgba(0, 0, 0, 0.2)",
                      borderRadius: "6px",
                    }}
                  >
                    <Typography variant="h6" sx={{ flexGrow: "1" }}>
                      Dựa vào tìm kiếm của bạn chúng tôi không thể tìm thấy bất
                      cứ bàn nào
                    </Typography>
                    <Button
                      sx={{ justifySelf: "end" }}
                      onClick={() => setNotFoundTable(false)}
                    >
                      <ClearIcon />
                    </Button>
                  </Box>
                )}
                {table.map((e, key) => (
                  <TableItem
                    key={key}
                    tableInfo={e}
                    tableImage={tableImage[e?._id]}
                    handleGetTableImage={handleGetTableImage}
                    handleNextStep={handleNextStep}
                    handleOnSelectedTable={handleOnSelectedTable}
                  />
                ))}
              </>
            ) : (
              <>
                <TableItemSkeleton />
                <TableItemSkeleton />
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Slide>
  );
};

export default memo(BookingStep1);
