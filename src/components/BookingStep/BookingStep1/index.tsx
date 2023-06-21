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
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
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
import {
  setDateCheckIn,
  setSelectedTable,
  setTimeCheckIn,
} from "../../../features/booking/bookingSlice";
import SearchMobile from "./SearchMobile";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

interface Props {
  step: number;
  slideDirection: any;
  // userInfo: any;
  // setUserInfo: any;
  handleNextStep: Function;
}

const BookingStep1: React.FC<Props> = ({
  step,
  slideDirection,
  // userInfo,
  // setUserInfo,
  handleNextStep,
}) => {
  const dispatch = useAppDispatch();
  const stage = useAppSelector((state) => state.table.stage);
  const options = useAppSelector((state) => state.table.options);
  const table = useAppSelector((state) => state.table.table);
  const tableImage = useAppSelector((state) => state.table.tableImage);
  const booking = useAppSelector((state) => state.booking);

  const [errorMessage, setErrorMessage] = useState({
    numOfPeople: { message: "", notification: false },
    timeCheckIn: { message: "", notification: false },
    dateCheckIn: { message: "", notification: false },
  });

  // Maximum & minimum for DesktopDatePicker (dateCheckIn)
  const minDate = moment([]).add(1, "day");
  const maxDate = moment([]).add(14, "day");

  // On fetching table unmount table item
  const [fetching, setFetching] = useState(true);
  const [disableOnChangeFilter, setDisableOnChangeFilter] = useState(false);
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

  const [filterSelected, setFilterSelected] = useState<any>({ options: [] });
  const [tableFilter, setTableFilter] = useState<any>([]);

  // Create options for auto complete 'timePickList'
  const timePickList = useMemo(() => {
    let result: any = [];
    let start = 9;
    let end = 18;
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
    const params = {
      timeCheckIn: booking.timeCheckIn,
      dateCheckIn: moment(booking.dateCheckIn).format("YYYY-MM-DD"),
      stage: formSearch.stage,
      numOfPeople: formSearch.numOfPeople,
    };
    services.searchTable(params).then((res) => {
      dispatch(setTable(res.data));
      setFetching(true);
      res.data.length == 0 ? setNotFoundTable(true) : setNotFoundTable(false);
    });
  }, [formSearch, table, booking]);

  // Handle filter
  const handleOnChangeFilter = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string | number
  ) => {
    if (filterSelected.options?.find((f: any) => f === value)) {
      setFilterSelected((prev: any) => ({
        ...prev,
        options: prev.options.filter((fil: any) => fil !== value),
      }));
    } else
      setFilterSelected((prev: any) => ({
        ...prev,
        options: [...prev?.options, value],
      }));
  };

  // Debounce on change filter
  useEffect(() => {
    // Function debounce handler
    const handler = setTimeout(() => {
      if (filterSelected.options.length > 0) {
        setFetching(false);
        setDisableOnChangeFilter(true);
        services.getTableByFilter(filterSelected.options).then((res) => {
          dispatch(setTable(res.data.data));
          setFetching(true);
          setDisableOnChangeFilter(false);
          res.data.data.length == 0
            ? setNotFoundTable(true)
            : setNotFoundTable(false);
        });
      }
      // Else get table by stage
      // Get table in first render
      else {
        handleOnSearch();
        setDisableOnChangeFilter(false);
      }
    }, 700);
    // Clear timeout by id handler
    return () => clearTimeout(handler);
  }, [filterSelected]);

  useEffect(() => {
    if (filterSelected?.options.length > 0) {
      let optionsNew: any = [];
      table.map((t) => {
        if (tableImage[t._id]) {
          optionsNew.push(...tableImage[t._id].options);
        }
      });
      const newOptions = new Set(optionsNew);
      if (optionsNew.length > 0) {
        dispatch(setOptions([...newOptions]));
      }
    } else {
      services.getOptions().then((res) => {
        dispatch(setOptions(res.data.data));
      });
    }
  }, [table, tableImage]);

  // Handle on select table
  const handleOnSelectedTable = (data: {}) => {
    // Set table selected to redux
    dispatch(setSelectedTable(data));

    // Check timeCheckIn selected
    if (!booking.timeCheckIn) {
      setErrorMessage((prev) => ({
        ...prev,
        timeCheckIn: {
          ...prev.timeCheckIn,
          message: "Cần chọn thời gian check in trước",
          notification: true,
        },
      }));
    } else {
      setErrorMessage((prev) => ({
        ...prev,
        timeCheckIn: {
          ...prev.timeCheckIn,
          message: "",
          notification: false,
        },
      }));
      handleNextStep();
    }
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
        {/* Format to moment provider by MUI */}
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Box sx={styles.left}>
            <SearchMobile
              // userInfo={userInfo}
              timePickList={timePickList}
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
                value={booking.timeCheckIn || null}
                isOptionEqualToValue={(option, value) => {
                  return value === option || option === booking.timeCheckIn;
                }}
                options={timePickList?.map((option: any) => option)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Thời gian CheckIn"
                    helperText={errorMessage.timeCheckIn.message}
                    error={errorMessage.timeCheckIn.notification}
                  />
                )}
                onChange={(event: any, newValue: string | null) => {
                  dispatch(setTimeCheckIn(newValue));
                }}
                sx={{ width: "100%" }}
              />

              <DesktopDatePicker
                label="Ngày CheckIn"
                inputFormat="DD/MM/YYYY"
                minDate={minDate}
                maxDate={maxDate}
                value={booking.dateCheckIn}
                onChange={(value: any) => {
                  dispatch(setDateCheckIn(value));
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <TextField
                id="numOfPeople"
                label="Chỗ ngồi"
                variant="outlined"
                type="text"
                helperText={errorMessage.numOfPeople.message}
                error={errorMessage.numOfPeople.notification}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  // Check value is existed
                  if (event.target.value.length > 0) {
                    // Value can't bigger 12 or value must be number
                    if (
                      +event.target.value > 30 ||
                      !Number(event.target.value)
                    ) {
                      // Set error message
                      setErrorMessage((prev) => ({
                        ...prev,
                        numOfPeople: {
                          message: "Chỗ ngồi phải là số và tối đa 30",
                          notification: true,
                        },
                      }));
                    } else {
                      // Set formSearch
                      setFormSearch((prev) => ({
                        ...prev,
                        numOfPeople: +event.target.value,
                      }));

                      // Set default
                      setErrorMessage((prev) => ({
                        ...prev,
                        numOfPeople: { message: "", notification: false },
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
                sx={{
                  height: "240px",
                  overflow: "hidden",
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {options.map((value: string | number, index: number) => {
                  return (
                    <FormControlLabel
                      key={index}
                      label={value}
                      sx={{
                        fontSize: {
                          xs: "20px",
                          sm: "25px",
                          md: "25px",
                          lg: "30px",
                        },
                      }}
                      control={
                        <Checkbox
                          disabled={disableOnChangeFilter}
                          checked={
                            !!filterSelected?.options?.find(
                              (e: any) => e === value
                            )
                          }
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setDisableOnChangeFilter(true);
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
            <Typography
              gutterBottom
              sx={{
                fontSize: { xs: "20px", sm: "25px", md: "25px", lg: "30px" },
                fontWeight: "400",
              }}
            >
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
                      <Typography
                        variant="h6"
                        sx={{
                          flexGrow: "1",
                          fontSize: {
                            xs: "13px",
                            sm: "15px",
                            md: "17px",
                            lg: "20px",
                          },
                        }}
                      >
                        Chúng tôi không thể tìm thấy bàn nào dựa trên tìm kiếm
                        của bạn!
                      </Typography>
                      <Button
                        sx={{ justifySelf: "end" }}
                        onClick={() => setNotFoundTable(false)}
                      >
                        <ClearIcon />
                      </Button>
                    </Box>
                  )}
                  {table?.map((e, key) => (
                    <TableItem
                      key={key}
                      tableInfo={e}
                      tableImage={tableImage[e?._id]}
                      handleGetTableImage={handleGetTableImage}
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
        </LocalizationProvider>
      </Box>
    </Slide>
  );
};

export default memo(BookingStep1);
