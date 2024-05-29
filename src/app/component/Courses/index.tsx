import { Autocomplete, Box, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { LoadingButton, SecondaryButton, SecondaryButtonOutlined } from '../Buttons'
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
            unitType: unitData.unitType || (unit === 'M' ? true : false),
            subTitle: unitData.subTitle || "",
            level: unitData.level || 0,
            glh: unitData.glh || 0,
            credit_value: unitData.credit_value || 0,
            subUnit: unitData.subUnit || [],
            subTopic: unitData.subTopic || []
        };
    });
    return unitObject;
};

function formatText(text = "") {
    let formattedText = text.replace(/\n/g, ' ');
    return formattedText;
}

const inputStyle = {
    borderRadius: 0,
    borderBottom: '1px solid lightgray',
    padding: "1rem",
}

const CourseBuilder = (props) => {

    const { edit = false, handleClose = () => { } } = props;

    const navigate = useNavigate();
    const dispatch: any = useDispatch();
    const { preFillData } = useSelector(selectCourseManagement)
    const [loading, setLoading] = useState(false);

    const [courseData, setCourseData] = useState(() => {
        return {
            brand_guidelines: formatText(preFillData?.brand_guidelines) || "",
            course_code: preFillData?.course_code || "",
            course_name: preFillData?.course_name || "",
            guided_learning_hours: preFillData?.guided_learning_hours || "",
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

    const [mandatoryUnit, setMandatoryUnit] = useState(generateUnitObject(preFillData?.mandatory_units, 'M'));

    const [optionalUnit, setOptionalUnit] = useState(generateUnitObject(preFillData?.optional_units, 'O'));

    const courseHandler = (event) => {
        if (edit) {
            return;
        }
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
                    mandatory: unitType === "M" ? true : false,
                    level: null,
                    glh: null,
                    credit_value: null,
                    subUnit: []
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

    const addSubUnitHandler = (unitId) => {
        if (mandatoryUnit[unitId]) {
            const subData = mandatoryUnit[unitId].subUnit;
            // const obj = subData.find(a => a.id === unitId);

            const newTopicData = {
                id: Date.now() + Number((Math.random() * 10).toFixed(0)),
                description: "",
            }

            const newSubData = {
                id: Date.now(),
                subTitle: "",
                subTopic: [newTopicData],
            }
            // console.log(newSubData);
            subData.push(newSubData);
            setMandatoryUnit((prev) => ({
                ...prev,
                [unitId]: {
                    ...prev[unitId],
                    subUnit: subData,
                }
            }))
        }
    }

    const addTopicHandler = (unitId, subUnit) => {
        if (mandatoryUnit[unitId]) {
            const topicData = mandatoryUnit[unitId].subUnit.find(a => a.id === subUnit)?.subTopic;
            const newTopicData = {
                id: Date.now(),
                description: "",
            }
            topicData.push(newTopicData);
            // console.log(mandatoryUnit)
            setMandatoryUnit(JSON.parse(JSON.stringify(mandatoryUnit)))
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
        if (edit) {
            return;
        }

        setMandatoryUnit({
            ...mandatoryUnit,
            [unitId]: {
                ...mandatoryUnit[unitId],
                [data.name]: data.value
            }
        })
    };

    console.log(mandatoryUnit);

    const setSubUnitData = (unitId, subUnitId, data) => {
        if (edit) {
            return;
        }

        setMandatoryUnit((mandatoryUnit) => ({
            ...mandatoryUnit,
            [unitId]: {
                ...mandatoryUnit[unitId],
                subUnit: mandatoryUnit[unitId].subUnit.map(subUnit =>
                    subUnit.id === subUnitId ? { ...subUnit, [data.name]: data.value } : subUnit
                )
            }
        }))
        console.log(mandatoryUnit);
    };

    const setSubTopicData = (unitId, subUnitId, subTopicId, data) => {
        if (edit) {
            return;
        }

        setMandatoryUnit((mandatoryUnit) => {
            const unit = mandatoryUnit[unitId];
            if (!unit) return mandatoryUnit;

            return {
                ...mandatoryUnit,
                [unitId]: {
                    ...unit,
                    subUnit: unit.subUnit.map(subUnit =>
                        subUnit.id === subUnitId ? {
                            ...subUnit,
                            subTopic: subUnit.subTopic.map(subTopic =>
                                subTopic.id === subTopicId ? { ...subTopic, [data.name]: data.value } : subTopic
                            )
                        } : subUnit
                    )
                }
            }
        });

        console.log(mandatoryUnit);
    };


    const cancleCourseHandler = () => {
        navigate("/courseBuilder")
    }

    const createCouserHandler = async () => {

        const mandatory_units = Object.values(mandatoryUnit).map((item: any) => {
            return {
                unit_ref: item.unit_ref,
                title: item.title,
                mandatory: item.mandatory,
                level: item.level,
                glh: item.glh,
                credit_value: item.credit_value,
                subUnit: item.subUnit
            }
        });

        setLoading(true);
        console.log(mandatory_units);
        // const response = await dispatch(createCourseAPI({ data: { ...courseData, mandatory_units, optional_units } }));
        // if (response) {
        //     navigate("/courseBuilder")
        // }
        setLoading(false)
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
            </Box>

            <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
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
                <div className='w-1/2'>
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
                <div className='w-1/2'>
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
                    <Typography>Units</Typography>
                    {!edit &&
                        <SecondaryButton name="Add New Unit" onClick={() => addUnitHandler("M")} />
                    }
                </Box>
                {
                    Object.values(mandatoryUnit).length ?
                        Object.values(mandatoryUnit)?.map((item: any) => {

                            return (
                                <div>
                                    <div className='w-full flex gap-24'>
                                        <input
                                            type="text"
                                            value={item.unit_ref}
                                            name="unit_ref"
                                            placeholder={`Enter a Unint Ref`}
                                            onChange={(e) => setUnitData(item.id, e.target)}
                                            className=' w-1/3'
                                            style={inputStyle}
                                        />
                                        <input
                                            type="text"
                                            value={item.title}
                                            name="title"
                                            placeholder={`Enter a title`}
                                            onChange={(e) => setUnitData(item.id, e.target)}
                                            className='w-2/3'
                                            style={inputStyle}
                                        />
                                        {/* <Select
                                            name="mandatory"
                                            onChange={(e) => setUnitData(item.id, e.target)}
                                            value={item.mandatory}
                                            className='w-1/5 p-7 '
                                            variant="standard"
                                        >
                                            <MenuItem value="True">Mandatory Unit</MenuItem>
                                            <MenuItem value="False">Optional Unit</MenuItem>
                                        </Select> */}

                                        <Autocomplete
                                            // disableClearable
                                            className='w-1/5'
                                            options={[{ value: true, name: "Mandatory Unit" }, { value: false, name: "Optional Unit" }]}
                                            getOptionLabel={(option) => option.name}
                                            renderInput={(params) => <TextField variant="standard" {...params} placeholder="Mandatory"
                                                value={item.mandatory}
                                                name="mandatory" />}
                                            onChange={(e, value) => setUnitData(item.id, { name: "mandatory", value: value.value })}
                                        // sx={{
                                        //     '.MuiAutocomplete-clearIndicator': {
                                        //         color: "#5B718F"
                                        //     }
                                        // }}
                                        // PaperComponent={({ children }) => (
                                        //     <Paper style={{ borderRadius: "4px" }}>{children}</Paper>
                                        // )}
                                        />
                                    </div>
                                    <div className='w-full flex gap-24'>
                                        <input
                                            type="number"
                                            className='w-1/3'
                                            value={item.level}
                                            name="level"
                                            placeholder={`Enter a Level`}
                                            onChange={(e) => setUnitData(item.id, e.target)}
                                            style={inputStyle} />

                                        <input
                                            type="number"
                                            className='w-1/3'
                                            value={item.credit_value}
                                            name="credit_value"
                                            placeholder={`Enter a credit value`}
                                            onChange={(e) => setUnitData(item.id, e.target)}
                                            style={inputStyle} />

                                        <input
                                            type="number"
                                            className='w-1/3'
                                            value={item.glh}
                                            name="glh"
                                            placeholder={`Enter a GLH`}
                                            onChange={(e) => setUnitData(item.id, e.target)}
                                            style={inputStyle} />

                                        <Box className="flex items-center justify-between">
                                            {!edit &&
                                                <SecondaryButton name="Add Sub Unit" className="min-w-112" onClick={() => addSubUnitHandler(item.id)} />
                                            }
                                        </Box>
                                    </div>
                                    {
                                        item.subUnit?.length > 0 && item.subUnit.map((subItem: any) => {
                                            return (
                                                <>
                                                    <div className='w-full flex gap-24'>
                                                        <div className='w-full'>
                                                            <input
                                                                type="text"
                                                                className='w-full'
                                                                name="subTitle"
                                                                placeholder={`Enter a sub-title`}
                                                                value={subItem.subTitle}
                                                                onChange={(e) => setSubUnitData(item.id, subItem?.id, e.target)}
                                                                style={inputStyle} />
                                                        </div>

                                                        <div className='w-full flex flex-col'>
                                                            {
                                                                subItem.subTopic?.length > 0 && subItem.subTopic?.map((topicItem: any) => {
                                                                    return (
                                                                        <>
                                                                            <div className='w-full flex flex-col gap-24'>

                                                                                <input
                                                                                    type="text"
                                                                                    className='w-full'
                                                                                    name="description"
                                                                                    placeholder={`Enter a description`}
                                                                                    value={topicItem.description}
                                                                                    onChange={(e) => setSubTopicData(item.id, subItem?.id, topicItem?.id, e.target)}
                                                                                    style={inputStyle} />
                                                                            </div>
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </div>

                                                        <Box className="flex items-center justify-between">
                                                            {!edit &&
                                                                <SecondaryButton name="+" className="min-w-112" onClick={() => addTopicHandler(item.id, subItem?.id)} />
                                                            }
                                                        </Box>
                                                    </div>

                                                </>
                                            )
                                        })
                                    }
                                </div>

                            )
                        })
                        // <UnitManagementTable columns={courseManagementUnitColumn} edit={edit} setUnitData={setUnitData} removeUnitHandler={removeUnitHandler} rows={Object.values(mandatoryUnit)} />
                        :
                        <div className=' text-center opacity-50 mt-10 mb-10'>
                            Mandatory units have not been included.
                        </div>
                }

            </Box>


            {/* <Box className="m-12">
                <Box className="flex items-center justify-between">
                    <Typography>Optional Units</Typography>
                    {!edit &&
                        <SecondaryButton name="Add New" onClick={() => addUnitHandler("O")} />
                    }
                </Box>
                {Object.values(optionalUnit).length ?
                    <UnitManagementTable columns={courseManagementUnitColumn} edit={edit} setUnitData={setUnitData} removeUnitHandler={removeUnitHandler} rows={Object.values(optionalUnit)} />
                    :
                    <div className=' text-center opacity-50 mt-10 mb-10'>
                        Optional units have not been included.
                    </div>
                }
            </Box> */}
            <Box className="flex items-center justify-end m-12 mt-24">
                {loading ? <LoadingButton className="w-1/12" /> :
                    <>
                        <SecondaryButtonOutlined name="Close" className=" w-1/12" onClick={edit ? handleClose : cancleCourseHandler} />
                        {!edit &&
                            <SecondaryButton name={edit ? "Update" : "Create"} className=" w-1/12 ml-10" onClick={createCouserHandler} />
                        }
                    </>
                }
            </Box>
        </div>
    )
}

export default CourseBuilder