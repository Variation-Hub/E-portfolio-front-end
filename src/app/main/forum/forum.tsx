import { Avatar, Box, Grid, IconButton, InputAdornment, TextField, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import EmojiPicker from 'emoji-picker-react';
import { SecondaryButton } from "src/app/component/Buttons";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from "react-redux";
import { fetchCourseAPI, selectCourseManagement } from "app/store/courseManagement";
import { useSelector } from "react-redux";
import { getChatListAPI, getMessageAPI, selectForumData, sendMessageAPI, slice } from "app/store/forum";
import { getRandomColor } from "src/utils/randomColor";
import { selectUser } from "app/store/userSlice";
import DataNotFound from "src/app/component/Pages/dataNotFound";
import AttachFileIcon from '@mui/icons-material/AttachFile';


const timeAgo = (timestamp) => {
  if (!timestamp) return '';

  const now: any = new Date();
  const past: any = new Date(timestamp);
  const diffInSeconds = Math.floor((now - past) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / 86400);
  const weeks = Math.floor(diffInSeconds / 604800);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} sec${diffInSeconds !== 1 ? 's' : ''} ago`;
  } else if (minutes < 60) {
    return `${minutes} min${minutes !== 1 ? 's' : ''} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else if (days < 7) {
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  } else {
    return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
  }
};


const Forum = () => {

  const forumData = useSelector(selectForumData);
  const user = useSelector(selectUser);

  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(getChatListAPI());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getMessageAPI({ page: 1, page_size: 10 }, forumData?.message?.course_id));
  // }, [dispatch]);

  const [sendMessage, setSendMessage] = useState({
    course_id: forumData?.message?.course_course_id,
    message: "",
    // file
  });

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSendMessage = (event, row) => {
    // const selected = data.find((msg) => msg.course_id === messageId);
    dispatch(slice.setMessage(row));
    setSendMessage(pre => ({
      ...pre,
      course_id: row.course_course_id
    }))
    dispatch(getMessageAPI({ page: 1, page_size: 10 }, row?.course_course_id));
  };

  const handleEmojiClick = (event) => {
    setSendMessage(prevState => ({
      ...prevState,
      course_id: forumData?.message?.course_course_id,
      message: prevState.message + event.emoji,
    }));
  };

  const handleSendChatMessage = async () => {
    try {
      let response;
      response = await dispatch(sendMessageAPI(sendMessage));
      dispatch(getMessageAPI({ page: 1, page_size: 10 }, forumData?.message?.course_course_id))
    } catch (err) {
      console.log(err);
    } finally {
      // handleCloseDialog();
      handleCloseEmoji();
    }
    setSendMessage({
      course_id: forumData?.message?.course_course_id,
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

  const handleFileUploadClick = () => {
    document.getElementById('fileUpload').click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle file upload logic here
      console.log('File selected:', file);
    }
  };

  return (
    <div className="flex w-full h-[100%]">
      <div className="w-1/4 p-4 m-16 rounded-md shadow-2 overflow-hidden">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between p-2">
            <input
              type="text"
              placeholder="Search contacts..."
              className="px-10 py-6 border border-gray-300 rounded-md w-full m-6"
            />
          </div>
          <div className="border-t border-gray-300 mt-auto"></div>
          {forumData.courseData.map((msg) => (
            <div
              key={msg.course_course_id}
              className="flex items-center cursor-pointer bg-white rounded-md p-2 hover:bg-gray-100 m-10 gap-10"
              onClick={(e) => handleSendMessage(e, msg)}
            >
              <Avatar className="mr-4" alt={msg.course_course_name?.toUpperCase().charAt(0)} src="../" /* sx={{ bgcolor: getRandomColor() }} */ />
              <div className="flex flex-col w-10/12 ">
                <div className="flex justify-between flex-row m-5 ">
                  <div className="font-semibold">{msg.course_course_name}</div>
                  <div className="text-xs text-gray-500">{timeAgo(msg.latest_forum_created_at)}</div>
                </div>
                <Tooltip title={msg.brand_guidelines}>
                  <div className="text-sm text-justify overflow-hidden text-ellipsis whitespace-nowrap ">{msg.course_course_code}</div>
                </Tooltip>
              </div>

            </div>
          ))}
        </div>
      </div>

      {(Object.keys(forumData.message).length > 0) ?
        <div className="w-3/4 p-4 max-h-fit">
          {forumData && (
            <div className="flex items-start bg-white rounded-md p-2 border-b border-gray-200 m-10 gap-10">
              <Avatar className="mr-4" alt={forumData?.course_course_name?.toUpperCase().charAt(0)} src="../" />
              <div className="flex  flex-col pr-10 ">
                <div className="flex justify-between flex-row m-5">
                  <div className="font-semibold  text-lg">{forumData?.message?.course_course_name}</div>
                  {/* <div className="text-xs text-gray-500">{selectedMessage.time}</div> */}
                </div>
                <div className="text-justify text-sm pr-10 ">{forumData?.message?.course_course_code}</div>
              </div>
            </div>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '90%', justifyContent: "space-between" }}>

            <Box className="flex overflow-y-scroll flex-col max-w-full gap-10 h-full">
              {forumData.data?.map((message) => (
                <>
                  {console.log(user, message)}
                  {user.data.user_id === message.sender.user_id ?
                    <Typography className="flex  ml-auto text-justify justify-end bg-[#5B718F] p-10 rounded-md text-base text-white pr-10 ">
                      {message?.message}
                    </Typography>
                    :
                    <Grid >
                      {sendMessage && (
                        <div className="flex items-start justify-start bg-[#F4F6F8] rounded-md m-10 gap-10 w-11/12 p-10">
                          {<Avatar className="mr-4" alt="Cindy Baker" src={message.sender?.avatar?.url} />}
                          <div className="flex flex-col w-full ">
                            <div className="flex justify-between flex-row m-5 pr-10 ">
                              <div className="font-semibold  text-base">{message.sender?.user_name}</div>
                              <div className="text-xs text-gray-500">{timeAgo(message.created_at)}</div>
                            </div>
                            <div className="text-justify text-base pr-10 ">{message.message}</div>
                          </div>
                        </div>
                      )}
                    </Grid>}
                </>
              ))}
            </Box>
            <Box p={2} mt="auto">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Start your chat..."
                  value={sendMessage.message}
                  onChange={(e) => setSendMessage({
                    ...sendMessage,
                    message: e.target.value
                  })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                          <EmojiEmotionsIcon style={{ fill: "#5B718F" }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleFileUploadClick}>
                          <AttachFileIcon style={{ fill: "#5B718F" }} />
                        </IconButton>
                        <input
                          type="file"
                          id="fileUpload"
                          style={{ display: 'none' }}
                          onChange={handleFileChange}
                        />
                      </InputAdornment>
                    )
                  }}
                />
                <SecondaryButton
                  disable={!sendMessage.message}
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
        : (
          <div
            className="flex flex-col justify-center items-center gap-10 w-full "
            style={{ height: "94%" }}
          >
            <DataNotFound width="25%" />
            <Typography variant="h5">No data found</Typography>
            <Typography variant="body2" className="text-center">
              It is a long established fact that a reader will be <br />
              distracted by the readable content.
            </Typography>
          </div>
        )
      }

    </div>
  );
};

export default Forum;
