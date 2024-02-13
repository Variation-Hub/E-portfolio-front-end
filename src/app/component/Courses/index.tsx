import { Box, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { SecondaryButton, SecondaryButtonOutlined } from '../Buttons'
import UnitManagementTable from '../Table/UnitManagementTable'
import { courseManagementUnitColumn } from 'src/app/contanst'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createCourseAPI, selectCourseManagement } from 'app/store/courseManagement'
import { useSelector } from 'react-redux'

const generateUnitObject = (unitDataArray = [], unit = '') => {
    const unitObject = {};
    unitDataArray.forEach((unitData, index) => {
        const id = Date.now() + index + unit; // Generate unique ID for each unit
        unitObject[id] = {
            id,
            unit_ref: unitData.unit_ref || "",
            title: unitData.title || "",
            level: unitData.level || 0,
            glh: unitData.glh || 0,
            credit_value: unitData.credit_value || 0
        };
    });
    return unitObject;
};

function formatText(text = "") {
    let formattedText = text.replace(/\n/g, ' ');
    return formattedText;
}

const CourseBuilder = () => {

    const navigate = useNavigate();
    const dispatch: any = useDispatch();
    const { preFillData } = useSelector(selectCourseManagement)

    const [courseData, setCourseData] = useState(() => {
        return {
            assessment_language: preFillData?.assessment_language || "",
            assessment_methods: preFillData?.assessment_methods || "",
            brand_guidelines: formatText(preFillData?.brand_guidelines) || "",
            course_code: preFillData?.course_code || "",
            course_name: preFillData?.course_name || "",
            guided_learning_hours: preFillData?.guided_learning_hours || "",
            internal_external: preFillData?.internal_external || "",
            level: preFillData?.level || "",
            operational_start_date: preFillData?.operational_start_date || "",
            overall_grading_type: preFillData?.overall_grading_type || "",
            permitted_delivery_types: preFillData?.permitted_delivery_types || "",
            qualification_status: preFillData?.qualification_status || "",
            qualification_type: preFillData?.qualification_type || "",
            recommended_minimum_age: preFillData?.recommended_minimum_age || "",
            sector: preFillData?.sector || "",
            total_credits: preFillData?.total_credits || "",
        }
    })

    const [mandatoryUnit, setMandatoryUnit] = useState(generateUnitObject(preFillData?.mandatory_units, 'M'))

    const [optionalUnit, setOptionalUnit] = useState(generateUnitObject(preFillData?.optional_units, 'O'))

    const courseHandler = (event) => {
        const { name, value } = event.target;
        setCourseData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const addUnitHandler = (unitType) => {
        const id = Date.now();
        if (unitType === "M") {
            setMandatoryUnit((prev) => ({
                ...prev,
                [id]: {
                    id,
                    unit_ref: "",
                    title: "",
                    level: null,
                    glh: null,
                    credit_value: null
                }
            }))
        } else {
            setOptionalUnit((prev) => ({
                ...prev,
                [id]: {
                    id,
                    unit_ref: "",
                    title: "",
                    level: null,
                    glh: null,
                    credit_value: null
                }
            }))
        }
    }

    const removeUnitHandler = (unitId) => {
        if (mandatoryUnit[unitId]) {
            delete mandatoryUnit[unitId]
            setMandatoryUnit({ ...mandatoryUnit })
        } else if (optionalUnit[unitId]) {
            delete optionalUnit[unitId]
            setOptionalUnit({ ...optionalUnit })
        }
    }

    const setUnitData = (unitId, data) => {
        if (mandatoryUnit[unitId]) {
            setMandatoryUnit({
                ...mandatoryUnit,
                [unitId]: {
                    ...mandatoryUnit[unitId],
                    [data.name]: data.value
                }
            })
        } else if (optionalUnit[unitId]) {
            setOptionalUnit({
                ...optionalUnit,
                [unitId]: {
                    ...optionalUnit[unitId],
                    [data.name]: data.value
                }
            })
        }
    };

    const cancleCourseHandler = () => {
        navigate("/courseBuilder")
    }

    const createCouserHandler = () => {

        const mandatory_units = Object.values(mandatoryUnit).map((item: any) => {
            return {
                unit_ref: item.unit_ref,
                title: item.title,
                level: item.level,
                glh: item.glh,
                credit_value: item.credit_value
            }
        });

        const optional_units = Object.values(optionalUnit).map((item: any) => {
            return {
                unit_ref: item.unit_ref,
                title: item.title,
                level: item.level,
                glh: item.glh,
                credit_value: item.credit_value
            }
        });

        dispatch(createCourseAPI({ data: { ...courseData, mandatory_units, optional_units } }));
    }
    return (
        <div className='p-12'>
            <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                <div className='w-1/3'>
                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Course Name<sup>*</sup></Typography>
                    <TextField
                        name="course_name"
                        size="small"
                        placeholder='Enter Course Name'
                        required
                        fullWidth
                        value={courseData.course_name}
                        onChange={courseHandler}
                    />
                </div>
                <div className='w-1/3'>
                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Course Code<sup>*</sup></Typography>
                    <TextField
                        name="course_code"
                        size="small"
                        placeholder='Enter Course Code'
                        required
                        fullWidth
                        value={courseData.course_code}
                        onChange={courseHandler}
                    />
                </div>
                <div className='w-1/3'>
                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Level<sup>*</sup></Typography>
                    <TextField
                        name="level"
                        size="small"
                        placeholder='Enter Level'
                        required
                        fullWidth
                        value={courseData.level}
                        onChange={courseHandler}
                    />
                </div>
            </Box>

            <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                <div className='w-1/3'>
                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Sector</Typography>
                    <TextField
                        name="sector"
                        size="small"
                        placeholder='Enter Sector'
                        fullWidth
                        value={courseData.sector}
                        onChange={courseHandler}
                    />
                </div>
                <div className='w-1/3'>
                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Internal/External</Typography>
                    <TextField
                        name="internal_external"
                        size="small"
                        placeholder='Enter Internal/External'
                        fullWidth
                        value={courseData.internal_external}
                        onChange={courseHandler}
                    />
                </div>
                <div className='w-1/3'>
                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Qualification Type</Typography>
                    <TextField
                        name="qualification_type"
                        size="small"
                        placeholder='Enter Qualification Type'
                        fullWidth
                        value={courseData.qualification_type}
                        onChange={courseHandler}
                    />
                </div>
            </Box>

            <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                <div className='w-1/3'>
                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Assessment Language</Typography>
                    <TextField
                        name="assessment_language"
                        size="small"
                        placeholder='Enter Assessment Language'
                        fullWidth
                        value={courseData.assessment_language}
                        onChange={courseHandler}
                    />
                </div>
                <div className='w-1/3'>
                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Recommended Minimum age</Typography>
                    <TextField
                        name="recommended_minimum_age"
                        size="small"
                        placeholder='Enter Recommended Minimum age'
                        fullWidth
                        value={courseData.recommended_minimum_age}
                        onChange={courseHandler}
                    />
                </div>
                <div className='w-1/3'>
                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Total Credits</Typography>
                    <TextField
                        name="total_credits"
                        size="small"
                        placeholder='Enter Total Credits'
                        fullWidth
                        value={courseData.total_credits}
                        onChange={courseHandler}
                    />
                </div>
            </Box>

            <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                <div className='w-1/3'>
                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Operational start date</Typography>
                    <TextField
                        name="operational_start_date"
                        size="small"
                        placeholder='Enter Operational start date'
                        fullWidth
                        value={courseData.operational_start_date}
                        onChange={courseHandler}
                    />
                </div>
                <div className='w-1/3'>
                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Assessment methods</Typography>
                    <TextField
                        name="assessment_methods"
                        size="small"
                        placeholder='Enter Assessment methods'
                        fullWidth
                        value={courseData.assessment_methods}
                        onChange={courseHandler}
                    />
                </div>
                <div className='w-1/3'>
                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Qualification status</Typography>
                    <TextField
                        name="qualification_status"
                        size="small"
                        placeholder='Enter Qualification status'
                        fullWidth
                        value={courseData.qualification_status}
                        onChange={courseHandler}
                    />
                </div>
            </Box>

            <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                <div className='w-1/3'>
                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Permitted Delivery Types</Typography>
                    <TextField
                        name="permitted_delivery_types"
                        size="small"
                        placeholder='Enter Permitted Delivery Types'
                        fullWidth
                        value={courseData.permitted_delivery_types}
                        onChange={courseHandler}
                    />
                </div>
                <div className='w-1/3'>
                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Guided Learning Hours</Typography>
                    <TextField
                        name="guided_learning_hours"
                        size="small"
                        placeholder='Enter Guided Learning Hours'
                        fullWidth
                        value={courseData.guided_learning_hours}
                        onChange={courseHandler}
                    />
                </div>
                <div className='w-1/3'>
                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Overall Grading Type</Typography>
                    <TextField
                        name="overall_grading_type"
                        size="small"
                        placeholder='Enter Overall Grading Type'
                        fullWidth
                        value={courseData.overall_grading_type}
                        onChange={courseHandler}
                    />
                </div>
            </Box>

            <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                <div className='w-full'>
                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Course Guidelines</Typography>
                    <TextField
                        name="brand_guidelines"
                        size="small"
                        placeholder='Enter Course Guidelines'
                        fullWidth
                        multiline
                        rows={5}
                        value={courseData.brand_guidelines}
                        onChange={courseHandler}
                    />
                </div>
            </Box>

            <Box className="m-12">
                <Box className="flex items-center justify-between">
                    <Typography>Mandatory Units</Typography>
                    <SecondaryButton name="Add New" onClick={() => addUnitHandler("M")} />
                </Box>
                {
                    Object.values(mandatoryUnit).length ?
                        <UnitManagementTable columns={courseManagementUnitColumn} setUnitData={setUnitData} removeUnitHandler={removeUnitHandler} rows={Object.values(mandatoryUnit)} />
                        :
                        <div className=' text-center opacity-50 mt-10 mb-10'>
                            Mandatory units have not been included.
                        </div>
                }
            </Box>

            <Box className="m-12">
                <Box className="flex items-center justify-between">
                    <Typography>Optional Units</Typography>
                    <SecondaryButton name="Add New" onClick={() => addUnitHandler("O")} />
                </Box>
                {Object.values(optionalUnit).length ?
                    <UnitManagementTable columns={courseManagementUnitColumn} setUnitData={setUnitData} removeUnitHandler={removeUnitHandler} rows={Object.values(optionalUnit)} />
                    :
                    <div className=' text-center opacity-50 mt-10 mb-10'>
                        Optional units have not been included.
                    </div>
                }
            </Box>

            <Box className="flex items-center justify-end m-12 mt-24">
                <SecondaryButtonOutlined name="Cancle" className=" w-1/12" onClick={cancleCourseHandler} />
                <SecondaryButton name="Create" className=" w-1/12 ml-10" onClick={createCouserHandler} />
            </Box>
        </div>
    )
}

export default CourseBuilder