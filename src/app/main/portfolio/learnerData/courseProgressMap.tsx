import { getLearnerDetailsReturn } from 'app/store/learnerManagement';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const CourseProgressMap = () => {
  
  const dispatch: any = useDispatch();

  const [learnerDetails, setLearnerDetails] = useState(undefined)
  const [course, setCourse] = useState([]);

  useEffect(() => {
    async function fetchLearner() {
      const user = JSON.parse(sessionStorage.getItem('learnerToken'))?.user;
      if (user) {
        setLearnerDetails(user)
        const data = await dispatch(getLearnerDetailsReturn(user?.learner_id))
        if (data) {
          setCourse(data?.course)
        }
      }
    }
    fetchLearner();
  }, [])

  return (
    <div>Progress Map</div>
  )
}

export default CourseProgressMap