import { Box, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { SecondaryButton, SecondaryButtonOutlined } from '../Buttons'
import UnitManagementTable from '../Table/UnitManagementTable'
import { courseManagementUnitColumn } from 'src/app/contanst'

const CourseBuilder = () => {

    const [mandatoryUnit, setMandatoryUnit] = useState({})

    const [optionalUnit, setOptionalUnit] = useState({})

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
                    />
                </div>
                <div className='w-1/3'>
                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Internal/External</Typography>
                    <TextField
                        name="internal_external"
                        size="small"
                        placeholder='Enter Internal/External'
                        fullWidth
                    />
                </div>
                <div className='w-1/3'>
                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Qualification Type</Typography>
                    <TextField
                        name="qualification_type"
                        size="small"
                        placeholder='Enter Qualification Type'
                        fullWidth
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
                    />
                </div>
                <div className='w-1/3'>
                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Recommended Minimum age</Typography>
                    <TextField
                        name="min_age"
                        size="small"
                        placeholder='Enter Recommended Minimum age'
                        fullWidth
                    />
                </div>
                <div className='w-1/3'>
                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Total Credits</Typography>
                    <TextField
                        name="total_credits"
                        size="small"
                        placeholder='Enter Total Credits'
                        fullWidth
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
                    />
                </div>
                <div className='w-1/3'>
                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Assessment methods</Typography>
                    <TextField
                        name="assessment_methods"
                        size="small"
                        placeholder='Enter Assessment methods'
                        fullWidth
                    />
                </div>
                <div className='w-1/3'>
                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Qualification status</Typography>
                    <TextField
                        name="qualification_status"
                        size="small"
                        placeholder='Enter Qualification status'
                        fullWidth
                    />
                </div>
            </Box>

            <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                <div className='w-1/3'>
                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Permitted Delivery Types</Typography>
                    <TextField
                        name="delivery_types"
                        size="small"
                        placeholder='Enter Permitted Delivery Types'
                        fullWidth
                    />
                </div>
                <div className='w-1/3'>
                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Guided Learning Hours</Typography>
                    <TextField
                        name="guided_learning_hours"
                        size="small"
                        placeholder='Enter Guided Learning Hours'
                        fullWidth
                    />
                </div>
                <div className='w-1/3'>
                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Overall Grading Type</Typography>
                    <TextField
                        name="grading_type"
                        size="small"
                        placeholder='Enter Overall Grading Type'
                        fullWidth
                    />
                </div>
            </Box>

            <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                <div className='w-full'>
                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Course Guidelines</Typography>
                    <TextField
                        name="course_guidelines"
                        size="small"
                        placeholder='Enter Course Guidelines'
                        fullWidth
                        multiline
                        rows={3}
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
                <SecondaryButtonOutlined name="Cancle" className=" w-1/12"/>
                <SecondaryButton name="Create" className=" w-1/12 ml-10"/>
            </Box>
        </div>
    )
}

export default CourseBuilder