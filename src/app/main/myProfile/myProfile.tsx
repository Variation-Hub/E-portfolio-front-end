import React, { useState } from "react";

const MyProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("personalDetails");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="p-4 m-4 flex">
      <div className="mt-8 mb-6 ml-10 mr-10 p-6 border-r-2 border-gray-300 flex flex-col items-center rounded-lg shadow-md">
        <div className="w-80 h-80 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-gray-300 rounded-full overflow-hidden mb-6 mt-20">
          <img
            src="https://placekitten.com/1000/1000"
            alt="User Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="text-center mb-20 mx-20">
          <div className="text-[16] font-[500] mb-2">John Doe</div>
          <div className="text-[12] font-[400] text-gray-600">
            john.doe@example.com
          </div>
        </div>
      </div>

      {/* Right side: Personal Details / Change Password */}
      <div className="w-5/6 p-4 bg-white rounded-lg shadow-md">
        <div className="flex">
          <div
            className={`relative px-4 py-2 m-12 cursor-pointer text-black ${
              activeTab === "personalDetails" ? "bg-[#5B718F] text-white" : "bg-gray-200"
            }`}
            onClick={() => handleTabClick("personalDetails")}
          >
            Personal Details
            {activeTab === "personalDetails" && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#5B718F] text-white"></div>
            )}
          </div>

          <div
            className={`relative px-4 py-2 m-12 cursor-pointer text-black ${
              activeTab === "changePassword" ? "bg-[#5B718F] text-white" : "bg-gray-200"
            }`}
            onClick={() => handleTabClick("changePassword")}
          >
            Change Password
            {activeTab === "changePassword" && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#5B718F] text-white"></div>
            )}
          </div>
        </div>

        {activeTab === "personalDetails" && (
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block mb-2 text-sm">First Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md h-48"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm">Last Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md h-48"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm">Username</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md h-48"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-md h-48"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm">Phone</label>
                <input
                  type="tel"
                  className="w-full p-3 border border-gray-300 rounded-md h-48"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm">Mobile</label>
                <input
                  type="tel"
                  className="w-full p-3 border border-gray-300 rounded-md h-48"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm">Time Zone</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md h-48"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm">Role</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md h-48"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                className="px-4 py-2 mr-4 bg-[#FFFFFF] text-[#5B718F] border-1 rounded-md cursor-pointer m-10 w-200 h-48"
              >
                Cancel
              </button>

              <button
                type="button"
                className="px-4 py-2 bg-[#5B718F] text-white border-1 rounded-md cursor-pointer m-10 w-200 h-48"
              >
                Update
              </button>
            </div>
          </form>
        )}

        {activeTab === "changePassword" && (
          <form>
            <div className="flex items-center mb-4">
              <div className="mb-4 flex-grow">
                <label className="block mb-2">Currunt Password</label>
                <input
                  type="password"
                  placeholder="Enter currunt password"
                  className="w-full p-2 border border-gray-300 rounded-md h-48"
                />
              </div>
              <div className="mb-4 ml-4 flex-grow">
                <label className="block mb-2">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full p-2 border border-gray-300 rounded-md h-48"
                />
              </div>
              <div className="mb-4 ml-4 flex-grow">
                <label className="block mb-2">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Enter confirm password"
                  className="w-full p-2 border border-gray-300 rounded-md h-48"
                />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="button"
                className="px-4 py-2 mr-4 bg-[#FFFFFF] text-[#5B718F] border-1 rounded-md cursor-pointer m-10 w-200 h-48"
              >
                Cancel
              </button>

              <button
                type="button"
                className="px-4 py-2 bg-[#5B718F] text-white border-1 rounded-md cursor-pointe m-10 w-200 h-48"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
