import { Dialog } from "@mui/material";
import React, { useState } from "react";
import { SecondaryButton } from "src/app/component/Buttons";
import CourseUploadDialog from "src/app/component/Dialogs/courseUploadDialog";

const CourseBuilder = () => {
  const courses = [
    {
      name: "Course A",
      code: "C001",
      level: "Intermediate",
      sector: "Learn",
      hours: 20,
    },
  ];
  const handleEdit = (course) => {
    console.log(`Editing course: ${course.name}`);
  };

  const handleDelete = (course) => {
    console.log(`Deleting course: ${course.name}`);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="m-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative flex items-center">
            <input
              className="p-4 pr-16 border border-gray-300 rounded h-24 sm:h-32 lg:h-40 w-full sm:w-auto"
              type="text"
              placeholder="Search by keyword"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg
                className="w-16 h-16 text-gray-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-5.2-5.2"></path>
                <circle cx="10" cy="10" r="8"></circle>
              </svg>
            </div>
          </div>

          <div className="relative flex items-center">
            <input
              className="p-4 pr-16 border border-gray-300 rounded h-24 sm:h-32 lg:h-40 w-full sm:w-auto"
              type="text"
              placeholder="Search by role"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg
                className="w-16 h-16 text-gray-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-5.2-5.2"></path>
                <circle cx="10" cy="10" r="8"></circle>
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <SecondaryButton
            name="Upload Files"
            startIcon={
              <img
                src="assets/images/svgimage/uploadfileicon.svg"
                alt="Create File"
                className="w-6 h-6 mr-2 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
              />
            }
            onClick={handleOpen}
          ></SecondaryButton>
          <SecondaryButton
            name="Create Course"
            startIcon={
              <img
                src="assets/images/svgimage/createcourseicon.svg"
                alt="Create File"
                className="w-6 h-6 mr-2 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
              />
            }
          ></SecondaryButton>
        </div>
      </div>

      <div className="m-4">
        <div className="grid grid-cols-6 gap-4 bg-[#F8F8F8] p-2">
          <h3 className="col-span-1 pl-4">Course Name</h3>
          <h3 className="col-span-1">Code</h3>
          <h3 className="col-span-1">Level</h3>
          <h3 className="col-span-1">Sector</h3>
          <h3 className="col-span-1">Learning Hours</h3>
          <h3 className="col-span-1 text-center">Actions</h3>
        </div>

        {courses.map((course, index) => (
          <div key={index} className="grid grid-cols-6 gap-4 items-center mt-2">
            <p className="col-span-1 pl-4">{course.name}</p>
            <p className="col-span-1">{course.code}</p>
            <p className="col-span-1">{course.level}</p>
            <p className="col-span-1">{course.sector}</p>
            <p className="col-span-1">{course.hours}</p>

            <div className="col-span-1 space-x-2 flex justify-center items-center">
              <button
                className="text-white px-3 py-1 rounded"
                onClick={() => handleEdit(course)}
              >
                <img
                  src="assets/images/svgimage/editicon.svg"
                  alt="Edit"
                  className="w-22 h-22"
                />
              </button>
              <button
                className="text-white px-3 py-1 rounded"
                onClick={() => handleDelete(course)}
              >
                <img
                  src="assets/images/svgimage/deleticon.svg"
                  alt="Delete"
                  className="w-22 h-22"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Dialog
        open={!open}
        onClose={handleClose}
        sx={{
          ".MuiDialog-paper": {
            borderRadius: "4px",
            padding: "1rem",
          },
        }}
      >
        <CourseUploadDialog />
      </Dialog>
    </>
  );
};

export default CourseBuilder;
