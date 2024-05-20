import { Avatar } from "@mui/material";
import React, { useState } from "react";

const Forum = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);

  const messages = [
    {
      id: 1,
      name: "Course 1",
      message: "Lorem ipsum is just dummy context",
      profilePic: "assets/images/svgImage/foremIcon.svg",
      time: "10:00 AM",
    },
    {
      id: 2,
      name: "Deidre T. Catalano",
      message: "Lorem ipsum is just dummy context",
      profilePic: "assets/images/svgImage/foremIcon.svg",
      time: "10:05 AM",
    },
    {
      id: 3,
      name: "Course 2",
      message: "Lorem ipsum is just dummy context",
      profilePic: "assets/images/svgImage/foremIcon.svg",
      time: "10:00 AM",
    },
    {
      id: 4,
      name: "Elaine S. McCoy",
      message: "Lorem ipsum is just dummy context",
      profilePic: "assets/images/svgImage/foremIcon.svg",
      time: "10:05 AM",
    },
    {
      id: 5,
      name: "Elizabeth J. Hartley",
      message: "Lorem ipsum is just dummy context",
      profilePic: "assets/images/svgImage/foremIcon.svg",
      time: "10:05 AM",
    },
    {
      id: 6,
      name: "Kevin N. Lewis",
      message: "Lorem ipsum is just dummy context",
      profilePic: "assets/images/svgImage/foremIcon.svg",
      time: "10:05 AM",
    },
    {
      id: 7,
      name: "Fred J. Leach",
      message: "Lorem ipsum is just dummy context",
      profilePic: "assets/images/svgImage/foremIcon.svg",
      time: "10:05 AM",
    },
    {
      id: 8,
      name: "Debbie M. White",
      message: "Lorem ipsum is just dummy context",
      profilePic: "assets/images/svgImage/foremIcon.svg",
      time: "10:05 AM",
    },
  ];

  const handleSelectMessage = (messageId) => {
    const selected = messages.find((msg) => msg.id === messageId);
    setSelectedMessage(selected);
  };

  return (
    <div className="flex">
      <div className="w-30 p-4 m-16 rounded-md shadow-2">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between p-2">
            <input
              type="text"
              placeholder="Search contacts..."
              className="px-10 py-6 border border-gray-300 rounded-md w-full m-6"
            />
          </div>
          <div className="border-t border-gray-300 mt-auto"></div>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="flex items-start cursor-pointer bg-white rounded-md p-2 hover:bg-gray-100 m-10"
              onClick={() => handleSelectMessage(msg.id)} 
            >
              <Avatar className="mr-4" alt="Cindy Baker" src={msg.profilePic} />
              {/* <img
                src={msg.profilePic}
                alt="Profile"
                className="w-10 h-10 rounded-full mr-4"
              /> */}
              <div className="flex flex-col m-5">
                <div className="font-semibold">{msg.name}</div>
                <div className="text-sm">{msg.message}</div>
              </div>
              <div className="text-xs text-gray-500">{msg.time}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-70 p-4">
        {selectedMessage && (
          <div className="bg-white rounded-md p-4">
            {/* <Avatar alt="Cindy Baker" src={selectedMessage.profilePic} /> */}
            <div className="font-semibold">{selectedMessage.name}</div>
            <div className="text-sm">{selectedMessage.message}</div>
            <div className="text-xs text-gray-500">{selectedMessage.time}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forum;
