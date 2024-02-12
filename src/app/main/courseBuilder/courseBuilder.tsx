import { Dialog } from "@mui/material";
import React, { useState } from "react";
import { SecondaryButton } from "src/app/component/Buttons";
import CourseUploadDialog from "src/app/component/Dialogs/courseUploadDialog";
import { courseManagementTableColumn } from "src/app/contanst";
import { selectUserManagement } from "app/store/userManagement";
import { useSelector } from "react-redux";
import ManagementTable from "src/app/component/Table/ManagementTable";
import CourseBuilderComponent from "src/app/component/Courses";

const CourseBuilder = () => {
  const courses = [
    {
      course_name: "Course A",
      code: "C001",
      level: "Intermediate",
      sector: "Learn",
      learning_hours: 20,
    },
  ];

  const { dataUpdatingLoadding, meta_data } = useSelector(selectUserManagement)


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

      {/* <CourseBuilderComponent /> */}


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

      {courses.length ?
        <ManagementTable
          columns={courseManagementTableColumn}
          rows={courses}
          meta_data={meta_data}
          dataUpdatingLoadding={dataUpdatingLoadding}
        />
        :
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
      }
    </>
  );
};

export default CourseBuilder;
