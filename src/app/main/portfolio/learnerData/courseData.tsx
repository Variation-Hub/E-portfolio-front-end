import { selectCourseManagement } from 'app/store/courseManagement';
import React from 'react'
import { useSelector } from 'react-redux';

const CourseData = () => {

    const { singleData } = useSelector(selectCourseManagement);

    return (
        <>
            <h3>{singleData?.course?.course_name}</h3>
            <h3>{singleData?.course?.course_code}</h3>
            <h3>{singleData?.course?.level}</h3>
            <h3>{singleData?.course?.sector}</h3>
            <h3>{singleData?.course?.qualification_type}</h3>
            <h3>{singleData?.course?.recommended_minimum_age}</h3>
            <h3>{singleData?.course?.total_credits}</h3>
            <h3>{singleData?.course?.operational_start_date}</h3>
            <h3>{singleData?.course?.guided_learning_hours}</h3>
            <h3>{singleData?.course?.brand_guidelines}</h3>
            <h3>{singleData?.course?.qualification_status}</h3>
            <h3>{singleData?.course?.overall_grading_type}</h3>
        </>
    )
}

export default CourseData