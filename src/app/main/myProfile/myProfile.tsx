import { Avatar, Box, CircularProgress, IconButton, Paper, TextField, Typography } from "@mui/material";
import { selectUser } from "app/store/userSlice";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { SecondaryButton, SecondaryButtonOutlined } from "src/app/component/Buttons";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { selectUserManagement, uploadAvatar } from "app/store/userManagement";
import { useDispatch } from "react-redux";

const CustomInputField = ({ label, name, placeholder, value }) => {
  return (
    <div className='w-1/2'>
      <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>{label}</Typography>
      <TextField
        name={name}
        size="small"
        placeholder={placeholder}
        fullWidth
        value={value}
        disabled
      />
    </div>
  );
};

const MyProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("personalDetails");

  const { data } = useSelector(selectUser)
  const { dataUpdatingLoadding } = useSelector(selectUserManagement)
  const fileInputRef: any = useRef();

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const dispatch: any = useDispatch();

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];

    console.log(selectedImage)
    dispatch(uploadAvatar(selectedImage));
  };

  const handleButtonClick = () => {
    // Trigger click on file input
    fileInputRef.current.click();
  };


  return (
    <div className="p-4 m-4 flex">
      <Box
        sx={{
          ".MuiDialog-paper": {
            padding: "1rem",
          },
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            borderRadius: "4px",
            width: 250,
            height: 250,
          }
        }}
      >
        <Paper sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
          <div style={{ position: "relative" }}>
            {dataUpdatingLoadding ?
              <CircularProgress />
              :
              <>
                <Avatar sx={{ width: "120px", height: "120px" }} src={data?.avatar?.url} />
                <IconButton
                  onClick={handleButtonClick}
                  sx={{
                    position: "absolute",
                    width: "24px",
                    height: "24px",
                    backgroundColor: "white",
                    top: 20,
                    right: -10,
                    color: "var(--primary)",
                    '&:hover': {
                      backgroundColor: "white"
                    }
                  }}>
                  <ModeEditOutlineOutlinedIcon sx={{ fontSize: "16px" }} />
                </IconButton>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                />
              </>
            }
          </div>
          <Typography sx={{ fontWeight: "bold", textTransform: "capitalize" }}>{data?.displayName}</Typography>
          <Typography>{data?.email}</Typography>
        </Paper>
      </Box>

      <div className="w-5/6 p-4 bg-white rounded-lg shadow-md h-fit">
        <div className="flex">
          <div
            className={`relative px-4 py-2 m-12 cursor-pointer text-black 
          
            `}
            onClick={() => handleTabClick("personalDetails")}
          >
            Personal Details
            {activeTab === "personalDetails" && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#5B718F] text-white"></div>
            )}
          </div>

          {/* <div
            className={`relative px-4 py-2 m-12 cursor-pointer text-black `}
            onClick={() => handleTabClick("changePassword")}
          >
            Change Password
            {activeTab === "changePassword" && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#5B718F] text-white"></div>
            )}
          </div> */}
        </div>

        {activeTab === "personalDetails" && (
          <div>
            <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
              <CustomInputField value={data?.first_name} label="First Name" name="first_name" placeholder="Enter first name" />
              <CustomInputField value={data?.last_name} label="Last Name" name="last_name" placeholder="Enter last name" />
            </Box>

            <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
              <CustomInputField value={data?.user_name} label="Username" name="user_name" placeholder="Enter username" />
              <CustomInputField value={data?.email} label="Email" name="email" placeholder="Enter email" />
            </Box>

            <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
              <CustomInputField value={data?.mobile} label="Mobile" name="mobile" placeholder="Enter mobile" />
              <CustomInputField value={data?.time_zone} label="Timezone" name="timezone" placeholder="Enter timezone" />
            </Box>

            {/* <Box style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem", marginRight: "1rem" }}>
              <SecondaryButtonOutlined name="Cancel" style={{ width: "10rem", marginRight: "2rem" }} />
              <SecondaryButton name="Save" style={{ width: "10rem" }} />
            </Box> */}
          </div>
        )}

        {/* {activeTab === "changePassword" && (
          <div>
            <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
              <CustomInputField label="Current password" name="old_password" placeholder="Enter current password" />
              <CustomInputField label="New password" name="new_password" placeholder="Enter new password" />
              <CustomInputField label="Confirm password" name="confirm_password" placeholder="Enter confirm password" />
            </Box>
            <Box style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem", marginRight: "1rem" }}>
              <SecondaryButtonOutlined name="Cancel" style={{ width: "10rem", marginRight: "2rem" }} />
              <SecondaryButton name="Save" style={{ width: "10rem" }} />
            </Box>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default MyProfile;
