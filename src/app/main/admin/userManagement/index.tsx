import React, { useState } from "react";
import Breadcrumb from "src/app/component/Breadcrumbs";
import { SecondaryButton } from "src/app/component/Buttons";
import DataNotFound from "src/app/component/Pages/dataNotFound";
import { AdminRedirect } from "src/app/contanst";
import Style from './style.module.css'
import { useSelector } from "react-redux";
import { selectUserManagement } from "app/store/userManagement";
import UserManagementTable from "src/app/component/Table/UserManagementTable";
import { userManagementTableColumn } from "src/app/contanst";
import { Drawer } from "@mui/material";
import UserDetails from "./usetDetails";

const Index = () => {

  const { data } = useSelector(selectUserManagement)
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="p-12">
      <Breadcrumb linkData={[AdminRedirect]} currPage="User" />
      <div className={Style.create_user}>
        <SecondaryButton name="Create user" onClick={handleOpen} />
      </div>
      {data.length ?
        <UserManagementTable columns={userManagementTableColumn} rows={data} handleOpen={handleOpen} />
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
                xs:"90vw",
                sm:"50vw",
                md:"50vw"
              },
            },
          }}
        >
         <UserDetails handleClose={handleClose}/>
        </Drawer>
    </div>
  );
};

export default Index;
