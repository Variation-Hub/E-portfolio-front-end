import React from "react";

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
    // Add your edit logic here
    console.log(`Editing course: ${course.name}`);
  };

  const handleDelete = (course) => {
    // Add your delete logic here
    console.log(`Deleting course: ${course.name}`);
  };
  return (
    <>
      <div className="m-4 flex items-center justify-between">
        {/* Search box container */}
        <div className="flex items-center space-x-4">
          {/* First Search box with larger icon and more padding */}
          <div className="relative flex items-center">
            <input
              className="p-4 pr-16 border border-gray-300 rounded h-24 sm:h-32 lg:h-40 w-full sm:w-auto"
              type="text"
              placeholder="Search by keyword"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              {/* Larger Search icon on the right side */}
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

          {/* Second Search box with larger icon and more padding */}
          <div className="relative flex items-center">
            <input
              className="p-4 pr-16 border border-gray-300 rounded h-24 sm:h-32 lg:h-40 w-full sm:w-auto"
              type="text"
              placeholder="Search by role"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              {/* Larger Search icon on the right side */}
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

        {/* Buttons on the right side */}
        <div className="flex items-center space-x-4">
          <button className="flex items-center justify-center px-6 py-6 bg-[#5B718F] text-white border-1 rounded-md cursor-pointer h-24 sm:h-32 lg:h-40">
            {/* Button content */}
            <img
              src="assets/images/svgimage/uploadfileicon.svg"
              alt="Create File"
              className="w-6 h-6 mr-2 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
            />
            <span className="hidden sm:inline">Upload Files</span>
          </button>

          <button className="flex items-center justify-center px-6 py-6 bg-[#5B718F] text-white border-1 rounded-md cursor-pointer h-24 sm:h-32 lg:h-40">
            {/* Button content */}
            <img
              src="assets/images/svgimage/createcourseicon.svg"
              alt="Create Course"
              className="w-6 h-6 mr-2 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
            />
            <span className="hidden sm:inline">Create Course</span>
          </button>
        </div>
      </div>

      <div className="m-4">
        {/* Course list with headings and actions */}
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

            {/* Edit and Delete buttons */}
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
    </>
  );
};

export default CourseBuilder;
