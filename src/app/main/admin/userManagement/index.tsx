import React, { useEffect, useState } from "react";
import Breadcrumb from "src/app/component/Breadcrumbs";
import { SecondaryButton } from "src/app/component/Buttons";
import DataNotFound from "src/app/component/Pages/dataNotFound";
import { AdminRedirect, roles } from "src/app/contanst";
import Style from './style.module.css'
import { useSelector } from "react-redux";
import { createUserAPI, fetchUserAPI, selectUserManagement, updateUserAPI } from "app/store/userManagement";
import UserManagementTable from "src/app/component/Table/UserManagementTable";
import { userManagementTableColumn } from "src/app/contanst";
import { Autocomplete, Drawer, IconButton, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import UserDetails from "./usetDetails";
import { useDispatch } from "react-redux";
import FuseLoading from '@fuse/core/FuseLoading';
import Close from "@mui/icons-material/Close";
import SearchIcon from '@mui/icons-material/Search';
import { emailReg, mobileReg, nameReg, passwordReg, usernameReg } from "src/app/contanst/regValidation";

const Index = () => {

  const { data, dataFetchLoading, dataUpdatingLoadding, meta_data } = useSelector(selectUserManagement)
  const dispatch: any = useDispatch();

  const [open, setOpen] = useState(false);
  const [updateData, setUpdateData] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    dispatch(fetchUserAPI())
  }, [dispatch])

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    sso_id: "",
    confrimpassword: "",
    mobile: "",
    phone: "",
    role: "",
    time_zone: ""
  })

  const [userDataError, setUserDataError] = useState({
    first_name: false,
    last_name: false,
    user_name: false,
    email: false,
    password: false,
    sso_id: false,
    confrimpassword: false,
    mobile: false,
    phone: false,
    role: false,
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
      sso_id: "",
      mobile: "",
      phone: "",
      role: "",
      time_zone: "",
    });
    setUserDataError({
      first_name: false,
      last_name: false,
      user_name: false,
      email: false,
      password: false,
      sso_id: false,
      confrimpassword: false,
      mobile: false,
      phone: false,
      role: false,
    })
  }

  const createUserHandler = async () => {
    if (validation()) {
      const response = await dispatch(createUserAPI(userData));
      if (response) {
        resetValue();
      }
    }
  }

  const updateUserHandler = async () => {
    const response = await dispatch(updateUserAPI(updateData, userData));
    if (response) {
      handleClose();
      setUpdateData("");
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
    setFilterValue(value);
    dispatch(fetchUserAPI({ page: 1, page_size: 10 }, searchKeyword, value));
  }

  const searchAPIHandler = () => {
    dispatch(fetchUserAPI({ page: 1, page_size: 10 }, searchKeyword, filterValue));
  }

  const validation = () => {

    setUserDataError({
      first_name: !nameReg.test(userData?.first_name),
      last_name: !nameReg.test(userData?.last_name),
      user_name: !usernameReg.test(userData?.user_name),
      email: !emailReg.test(userData?.email),
      password: !passwordReg.test(userData?.password),
      sso_id: userData?.sso_id.length <= 2,
      confrimpassword: userData?.password !== userData?.confrimpassword || !passwordReg.test(userData?.password),
      mobile: !mobileReg.test(userData.mobile),
      phone: !mobileReg.test(userData.phone),
      role: userData?.role === "",
    })
    if (nameReg.test(userData?.first_name) &&
      nameReg.test(userData?.last_name) &&
      usernameReg.test(userData?.user_name) &&
      emailReg.test(userData?.email) &&
      passwordReg.test(userData?.password) &&
      userData?.sso_id.length > 2 &&
      userData?.password === userData?.confrimpassword &&
      mobileReg.test(userData.mobile) &&
      mobileReg.test(userData.phone) &&
      userData?.role !== "") {
      return true;
    }
    return false
  }

  return (
    <div className="p-12">
      <Breadcrumb linkData={[AdminRedirect]} currPage="User" />
      <div className={Style.create_user}>
        <div className={Style.search_filed}>
          <TextField
            label="Search by keyword"
            fullWidth size="small"
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
                          dispatch(fetchUserAPI({ page: 1, page_size: 10 }, "", filterValue));
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
            freeSolo
            fullWidth
            size="small"
            value={filterValue}
            options={roles.map((option) => option.label)}
            renderInput={(params) => <TextField {...params} label="Search by role" />}
            onChange={filterHandler}
            sx={{
              '.MuiAutocomplete-clearIndicator': {
                color: "#5B718F"
              }
            }}
          />
        </div>
        <SecondaryButton name="Create user" onClick={handleOpen} />
      </div>

      {
        dataFetchLoading ? <FuseLoading /> :
          data.length ?
            <UserManagementTable
              columns={userManagementTableColumn}
              rows={data}
              handleOpen={handleOpen}
              setUserData={setUserData}
              setUpdateData={setUpdateData}
              meta_data={meta_data}
              dataUpdatingLoadding={dataUpdatingLoadding}
              search_keyword={searchKeyword}
              search_role={filterValue}
            />
            :
            <div className="flex justify-center">
              <DataNotFound width="15%" />
            </div>

      }
      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDrawer-paper": {
            width: {
              xs: "90vw",
              sm: "50vw",
              md: "50vw"
            },
          },
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
        />
      </Drawer>
    </div >
  );
};

export default Index;