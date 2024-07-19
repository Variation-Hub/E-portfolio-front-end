import { getAssignmentByCourseAPI, selectAssignment } from "app/store/assignment";
import { selectCourseManagement } from "app/store/courseManagement";
import { selectUser } from "app/store/userSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const AssignmentData = () => {

  const dispatch: any = useDispatch();
  const user = useSelector(selectUser).data;
  const { singleData } = useSelector(selectCourseManagement)
  const {singleAssignmentData} = useSelector(selectAssignment)


  useEffect(() => {
    dispatch(getAssignmentByCourseAPI(singleData.course.course_id, user?.user_id));
  }, [dispatch]);
  return (
    <>
    {singleAssignmentData.map((row) => (
      <div>
        {/* <h3>{row.name}</h3>
        <h3>{row.description}</h3>
        <h3>{row.hours}</h3>
        <h3>{row.minute}</h3>
        <h3>{row.job_type}</h3> */}
      </div>
    ))}
  </>
  )
}

export default AssignmentData