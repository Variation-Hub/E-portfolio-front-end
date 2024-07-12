import { Avatar, Box, Grid, IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import EmojiPicker from 'emoji-picker-react';
import { SecondaryButton } from "src/app/component/Buttons";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from "react-redux";
import { fetchCourseAPI, selectCourseManagement } from "app/store/courseManagement";
import { useSelector } from "react-redux";

const Forum = () => {

  const { data } = useSelector(selectCourseManagement);
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(fetchCourseAPI());
  }, [dispatch]);

  const [selectedMessage, setSelectedMessage] = useState({
    message: "",
  });

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSelectMessage = (messageId) => {
    const selected = data.find((msg) => msg.course_id === messageId);
    setSelectedMessage(selected || {
      message: "",
    });
  };

  const handleEmojiClick = (event) => {
    setSelectedMessage(prevState => ({
      ...prevState,
      message: prevState.message + event.emoji,
    }));
  };

  const handleSendChatMessage = () => {
    console.log(selectedMessage); // Log the selected message before clearing
    // Logic to send message (dispatch action, etc.)
    setSelectedMessage({
      message: "",
    });
  };

  const handleCloseEmoji = () => {
    setShowEmojiPicker(false);
  };

  const formatTime = (time) => {
    if (!time) return '';
    const formattedTime = time.substr(11, 16);
    return formattedTime;
  };

  return (
    <div className="flex w-full h-[98%]">
      <div className="w-1/4 p-4 m-16 rounded-md shadow-2">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between p-2">
            <input
              type="text"
              placeholder="Search contacts..."
              className="px-10 py-6 border border-gray-300 rounded-md w-full m-6"
            />
          </div>
          <div className="border-t border-gray-300 mt-auto"></div>
          {data.map((msg) => (
            <div
              key={msg.course_id}
              className="flex items-center cursor-pointer bg-white rounded-md p-2 hover:bg-gray-100 m-10 gap-10"
              onClick={() => handleSelectMessage(msg?.course_id)}
            >
              <Avatar className="mr-4" alt={msg.course_name.toUpperCase().charAt(0)} src="../" />
              <div className="flex flex-col w-10/12 ">
                <div className="flex justify-between flex-row m-5 ">
                  <div className="font-semibold">{msg.course_name}</div>
                  <div className="text-xs text-gray-500">{formatTime(msg.time)}</div>
                </div>
                <Tooltip title={msg.brand_guidelines}>
                  <div className="text-sm text-justify overflow-hidden text-ellipsis whitespace-nowrap ">{msg.brand_guidelines}</div>
                </Tooltip>
              </div>

            </div>
          ))}
        </div>
      </div>
      <div className="w-3/4 p-4 overflow-hidden">
        {selectedMessage && (
          <div className="flex items-start bg-white rounded-md p-2 border-b border-gray-200 m-10 gap-10">
            {/* <Avatar className="mr-4" alt="Cindy Baker" src={selectedMessage.profilePic} /> */}
            <div className="flex  flex-col pr-10 ">
              <div className="flex justify-between flex-row m-5">
                {/* <div className="font-semibold  text-lg">{selectedMessage.name}</div> */}
                {/* <div className="text-xs text-gray-500">{selectedMessage.time}</div> */}
              </div>
              {/* <div className="text-justify text-sm pr-10 ">{selectedMessage.message}</div> */}
            </div>
          </div>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '95%' }}>
          <Grid>
            {selectedMessage && (
              <div className="flex items-start bg-[#F4F6F8] rounded-md m-10 gap-10 w-11/12 p-10">
                {/* <Avatar className="mr-4" alt="Cindy Baker" src={selectedMessage.profilePic} /> */}
                <div className="flex flex-col w-full ">
                  <div className="flex justify-between flex-row m-5 pr-10 ">
                    {/* <div className="font-semibold  text-base">{selectedMessage.name}</div> */}
                    {/* <div className="text-xs text-gray-500">{selectedMessage.time}</div> */}
                  </div>
                  {/* <div className="text-justify text-base pr-10 ">{selectedMessage.message}</div> */}
                </div>
              </div>
            )}
          </Grid>
          <Grid className="flex justify-end bg-[#5B718F] p-2 rounded-md ml-auto w-max max-w-[90%] items-center">
            {selectedMessage && (
              <>
                <div className="text-justify text-base text-white m-10 pr-10 ">{selectedMessage.message}</div>
                {/* <div className="text-xs text-white
                 pr-10">{selectedMessage.time}</div> */}
              </>
            )}
          </Grid>
          <Grid>
            {selectedMessage && (
              <div className="flex items-start bg-[#F4F6F8] rounded-md m-10 gap-10 w-11/12 p-10">
                {/* <Avatar className="mr-4" alt="Cindy Baker" src={selectedMessage.profilePic} /> */}
                <div className="flex flex-col w-full ">
                  <div className="flex justify-between flex-row m-5 pr-10 ">
                    {/* <div className="font-semibold  text-base">{selectedMessage.name}</div> */}
                    {/* <div className="text-xs text-gray-500">{selectedMessage.time}</div> */}
                  </div>
                  {/* <div className="text-justify text-base pr-10 ">{selectedMessage.message}</div> */}
                </div>
              </div>
            )}
          </Grid>
          <Box p={2} mt="auto">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Start your chat..."
                value={selectedMessage.message}
                onChange={(e) => setSelectedMessage({
                  ...selectedMessage,
                  message: e.target.value
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)} >
                        <EmojiEmotionsIcon style={{ fill: "#5B718F" }} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <SecondaryButton
                sx={{ ml: 2 }}
                className="ml-10 flex justify-end"
                onClick={handleSendChatMessage}
                startIcon={<SendIcon style={{ fontSize: "30px", margin: "auto", padding: "5px" }} />}
              />
            </Box>
            {showEmojiPicker && (
              <Box sx={{ position: 'absolute', bottom: '10%', left: '30%' }}>
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </Box>
            )}
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Forum;
