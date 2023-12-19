import React, { useEffect, useState } from "react";
import Breadcrumb from "src/app/component/Breadcrumbs";
import { SecondaryButton } from "src/app/component/Buttons";
import DataNotFound from "src/app/component/Pages/dataNotFound";
import { AdminRedirect } from "src/app/contanst";
import Style from './style.module.css'
import { useSelector } from "react-redux";
import { createUserAPI, fetchUserAPI, selectUserManagement, updateUserAPI } from "app/store/userManagement";
import UserManagementTable from "src/app/component/Table/UserManagementTable";
import { userManagementTableColumn } from "src/app/contanst";
import { Drawer } from "@mui/material";
import UserDetails from "./usetDetails";
import { useDispatch } from "react-redux";
import FuseLoading from '@fuse/core/FuseLoading';

const Index = () => {

  const { data, dataFetchLoading, dataUpdatingLoadding } = useSelector(selectUserManagement)
  const dispatch: any = useDispatch();

  const [open, setOpen] = useState(false);
  const [updateData, setUpdateData] = useState("");

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }))
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
  }

  const createUserHandler = () => {
    dispatch(createUserAPI(userData));
    resetValue();

  }

  const updateUserHandler = () => {
    dispatch(updateUserAPI(updateData, userData));
    setUpdateData("");
    resetValue();
  }
  return (
    <div className="p-12">
      <Breadcrumb linkData={[AdminRedirect]} currPage="User" />
      <div className={Style.create_user}>
        <SecondaryButton name="Create user" onClick={handleOpen} />
      </div>

      {dataFetchLoading ? <FuseLoading /> :
        data.length ?
          <UserManagementTable columns={userManagementTableColumn} rows={data} handleOpen={handleOpen} setUserData={setUserData} setUpdateData={setUpdateData} />
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
        />
      </Drawer>
    </div>
  );
};

export default Index;
