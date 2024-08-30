import React, { useEffect, useState } from "react";
import Breadcrumb from "src/app/component/Breadcrumbs";
import { SecondaryButton } from "src/app/component/Buttons";
import DataNotFound from "src/app/component/Pages/dataNotFound";
import { AdminRedirect, learnerManagementTableColumn } from "src/app/contanst";
import Style from '../style.module.css'
import { useSelector } from "react-redux";
import { Autocomplete, Card, Dialog, IconButton, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import UserDetails from "./usetDetails";
import { useDispatch } from "react-redux";
import Close from "@mui/icons-material/Close";
import SearchIcon from '@mui/icons-material/Search';
import { emailReg, mobileReg, nameReg, passwordReg, usernameReg } from "src/app/contanst/regValidation";
import { createLearnerAPI, fetchLearnerAPI, getRoleAPI, selectLearnerManagement, updateLearnerAPI } from "app/store/learnerManagement";
import LearnerManagementTable from "src/app/component/Table/LearnerManagementTable";
import { fetchCourseAPI, selectCourseManagement } from "app/store/courseManagement";
import { getEmployerAPI, selectEmployer } from "app/store/employer";
import { DownloadLearnerExcel } from "app/store/globalUser";

const Index = () => {

  const { data, dataFetchLoading, dataUpdatingLoadding, meta_data } = useSelector(selectLearnerManagement)
  const dispatch: any = useDispatch();
  const course = useSelector(selectCourseManagement)?.data
  const employer = useSelector(selectEmployer)?.data

  const [open, setOpen] = useState(false);
  const [updateData, setUpdateData] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [courseId, setCourseId] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [employerId, setEmployereId] = useState("");
  const [searchEmployer, setSearchEmployer] = useState("");

  useEffect(() => {
    dispatch(fetchLearnerAPI())
    dispatch(fetchCourseAPI())
    dispatch(getEmployerAPI())
  }, [dispatch])

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    confrimpassword: "",
    mobile: "",
    employer_id: "",
    funding_body: "",
    national_ins_no: ""
  })

  const [userDataError, setUserDataError] = useState({
    first_name: false,
    last_name: false,
    user_name: false,
    email: false,
    password: false,
    confrimpassword: false,
    mobile: false,
    employer_id: false,
    funding_body: false,
  })

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    resetValue();
    setUpdateData("");
    setOpen(false);
  };

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }))
    setUserDataError((prev) => ({ ...prev, [name]: false }))
  }

  const resetValue = () => {
    setUserData({
      first_name: "",
      last_name: "",
      user_name: "",
      email: "",
      password: "",
      confrimpassword: "",
      mobile: "",
      employer_id: "",
      funding_body: "",
      national_ins_no: ""
    });
    setUserDataError({
      first_name: false,
      last_name: false,
      user_name: false,
      email: false,
      password: false,
      confrimpassword: false,
      mobile: false,
      employer_id: false,
      funding_body: false
    })
  }

  const createUserHandler = async () => {
    if (validation()) {
      const response = await dispatch(createLearnerAPI(userData));
      if (response) {
        resetValue();
        setOpen(false);
      }
    }
  }

  const updateUserHandler = async () => {
    const response = await dispatch(updateLearnerAPI(updateData, userData));
    if (response) {
      handleClose();
      setUpdateData("");
      setOpen(false);
    }
  }

  const searchByKeywordUser = (e) => {
    if (e.key === "Enter") {
      searchAPIHandler();
    }
  }

  const searchHandler = (e) => {
    setSearchKeyword(e.target.value);
  }

  const filterHandler = (e, value) => {
    const selectedCourse = course.find(course => course.course_name === value);
    setCourseId(selectedCourse ? selectedCourse.course_id : "");
    setFilterValue(value);
    dispatch(fetchLearnerAPI({ page: 1, page_size: 10 }, searchKeyword, selectedCourse ? selectedCourse.course_id : "", employerId));
  };

  const searchEmployerHandler = (e, value) => {
    const selectedEmployer = employer.find(employer => employer.employer_name === value);
    setEmployereId(selectedEmployer ? selectedEmployer.employer_id : "");
    setSearchEmployer(value);
    dispatch(fetchLearnerAPI({ page: 1, page_size: 10 }, searchKeyword, courseId, selectedEmployer ? selectedEmployer.employer_id : ""));
  };

  const searchAPIHandler = () => {
    dispatch(fetchLearnerAPI({ page: 1, page_size: 10 }, searchKeyword, courseId, employerId));
  }

  useEffect(() => {
    dispatch(getRoleAPI("Trainer"));
    dispatch(getRoleAPI("IQA"));
    dispatch(getRoleAPI("EQA"));
    dispatch(getRoleAPI("Employer"));
    dispatch(getRoleAPI("LIQA"));
    dispatch(getEmployerAPI());
  }, []);

  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
  ]

  const validation = () => {

    setUserDataError({
      first_name: !nameReg.test(userData?.first_name),
      last_name: !nameReg.test(userData?.last_name),
      user_name: !usernameReg.test(userData?.user_name),
      email: !emailReg.test(userData?.email),
      password: !passwordReg.test(userData?.password),
      confrimpassword: userData?.password !== userData?.confrimpassword || !passwordReg.test(userData?.password),
      mobile: !mobileReg.test(userData.mobile),
      employer_id: userData?.employer_id === "",
      funding_body: userData?.funding_body === "",
    })
    if (nameReg.test(userData?.first_name) &&
      nameReg.test(userData?.last_name) &&
      usernameReg.test(userData?.user_name) &&
      emailReg.test(userData?.email) &&
      passwordReg.test(userData?.password) &&
      userData?.password === userData?.confrimpassword &&
      mobileReg.test(userData.mobile) &&
      userData?.employer_id !== "",
      userData?.funding_body !== "") {
      return true;
    }
    return false
  }

  return (
    <Card className="m-12 rounded-6" style={{ height: "87.9vh" }}>
      <div className="w-full h-full">
        <Breadcrumb linkData={[AdminRedirect]} currPage="Learner" />

        <div className={Style.create_user}>
          <div className={Style.search_filed}>
            <TextField
              label="Search by keyword"
              fullWidth
              size="small"
              onKeyDown={searchByKeywordUser}
              onChange={searchHandler}
              value={searchKeyword}
              InputProps={{
                endAdornment:
                  <InputAdornment position="end" >
                    {
                      searchKeyword ? (
                        <Close
                          onClick={() => {
                            setSearchKeyword("");
                            dispatch(fetchLearnerAPI({ page: 1, page_size: 10 }, "", courseId));
                          }}
                          sx={{
                            color: "#5B718F",
                            fontSize: 18,
                            cursor: "pointer",
                          }}
                        />
                      ) :
                        <IconButton
                          id="dashboard-search-events-btn"
                          disableRipple
                          sx={{ color: "#5B718F" }}
                          onClick={() => searchAPIHandler()}
                          size="small"
                        >
                          <SearchIcon fontSize="small" />
                        </IconButton>
                    }
                  </InputAdornment>
              }}
            />
            <Autocomplete
              fullWidth
              size="small"
              value={filterValue}
              options={course.map((option) => option.course_name)}
              renderInput={(params) => (
                <TextField {...params} label="Search by course" />
              )}
              onChange={filterHandler}
              sx={{
                ".MuiAutocomplete-clearIndicator": {
                  color: "#5B718F",
                },
                ".muiltr-1okx3q8-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-popupIndicator": { color: "black" }
              }}
              PaperComponent={({ children }) => (
                <Paper style={{ borderRadius: "4px" }}>{children}</Paper>
              )}
            />
            <Autocomplete
              fullWidth
              size="small"
              value={searchEmployer}
              options={employer.map((option) => option.employer_name)}
              renderInput={(params) => (
                <TextField {...params} label="Search by employer" />
              )}
              onChange={searchEmployerHandler}
              sx={{
                ".MuiAutocomplete-clearIndicator": {
                  color: "#5B718F",
                },
                ".muiltr-1okx3q8-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-popupIndicator": { color: "black" }
              }}
              PaperComponent={({ children }) => (
                <Paper style={{ borderRadius: "4px" }}>{children}</Paper>
              )}
            />
          </div>
          <div className="flex gap-10">
            <SecondaryButton name="Export Report" onClick={() => { dispatch(DownloadLearnerExcel()) }} startIcon={
              <img
                src="assets/images/svgimage/uploadfileicon.svg"
                alt="Export Report"
                className="w-6 h-6 mr-2 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
              />
            } />
            <SecondaryButton name="Create learner" onClick={handleOpen} startIcon={
              <img
                src="assets/images/svgimage/createcourseicon.svg"
                alt="Create user"
                className="w-6 h-6 mr-2 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
              />
            } />
          </div>
        </div>
        {
          data.length ?
            <LearnerManagementTable
              columns={learnerManagementTableColumn}
              rows={data}
              handleOpen={handleOpen}
              setUserData={setUserData}
              setUpdateData={setUpdateData}
              meta_data={meta_data}
              dataUpdatingLoadding={dataUpdatingLoadding}
              search_keyword={searchKeyword}
            />
            :
            <div className="flex flex-col justify-center items-center gap-10 " style={{ height: "94%" }}>
              <DataNotFound width="25%" />
              <Typography variant="h5">No data found</Typography>
              <Typography variant="body2" className="text-center">It is a long established fact that a reader will be <br />distracted by the readable content.</Typography>
            </div>

        }
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          sx={{
            '.MuiDialog-paper': {
              borderRadius: "4px",
              padding: "1rem"
            }
          }}
        >
          <UserDetails
            handleClose={handleClose}
            updateData={Boolean(updateData)}
            userData={userData}
            handleUpdate={handleUpdate}
            createUserHandler={createUserHandler}
            updateUserHandler={updateUserHandler}
            dataUpdatingLoadding={dataUpdatingLoadding}
            userDataError={userDataError}
            search_course={filterValue}
            search_employer={searchEmployer}
          />
        </Dialog>
      </div >
    </Card>
  );
};

export default Index;

