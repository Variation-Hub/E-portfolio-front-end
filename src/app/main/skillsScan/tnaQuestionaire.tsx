import { Card, CardContent, Checkbox, Grid, Radio, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { selectSkillsScan, slice } from "app/store/skillsScan";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SecondaryButton } from "src/app/component/Buttons";
import { dataBase } from "./skillsScan";

const TNAQuestionaire = () => {

    const { data, singleData } = useSelector(selectSkillsScan);

    const dispatch: any = useDispatch();

    const [sampleData, setSampleData] = useState(dataBase);
    // const [database, setDatabase] = useState();

    const handleClick = (event, row) => {
        dispatch(slice.setSingleData(row));
    };

    return (
        <Grid>
            <Grid className="flex items-center pl-28">
                <Checkbox
                    // checked={row.select}
                    // onChange={handleCheckboxChange}
                    name="declaration"
                    color="primary"
                />
                <Typography>
                    Highlight Blanks
                </Typography>
            </Grid>
            <Grid className="w-full flex" >
                <Grid className="w-1/4 p-20">
                    {sampleData?.map((row) => (
                        <Card
                            variant="outlined"
                            className="rounded-0 hover:bg-grey-100 cursor-pointer"
                            elevation={0}
                            onClick={(e) => handleClick(e, row)}
                        >
                            <CardContent>
                                {/* <Typography level="title-md">Outlined card (default)</Typography> */}
                                <Typography className="text-12 ">{row.standardUnits}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>
                <Grid className="w-full border-grey-600 border-2 h-fit my-20">
                    <Card
                        variant="outlined"
                        className="rounded-0 bg-grey-200 border-b-grey-600 border-b-2 "
                        elevation={0}
                    >
                        <CardContent>
                            {/* <Typography level="title-md">Outlined card (default)</Typography> */}
                            <Typography className="font-500 text-center">{singleData.standardUnits}</Typography>
                        </CardContent>
                    </Card>
                    <Grid className="flex">
                        <Grid className="flex justify-center items-center w-full my-12 border-grey-600 border-2 ml-[30%] gap-20 p-20">
                            <Typography className="text-15">☹️ - Not sure</Typography>
                            <Typography className="text-15">😖 - Never</Typography>
                            <Typography className="text-15">🙂 - Sometimes</Typography>
                            <Typography className="text-15">😁 - Always</Typography>
                        </Grid>
                        <Grid className="flex justify-end items-start w-1/2 mt-10 mr-24">
                            <SecondaryButton name="Save" />
                        </Grid>
                    </Grid>
                    <TableContainer sx={{ maxHeight: "auto" }} >
                        {/* {dataFetchLoading ? (
                            <FuseLoading />
                        ) : formdata.data.length ? ( */}
                        <Table
                            sx={{ minWidth: 650, heighFaddt: "100%" }}
                            size="small"
                            aria-label="simple table"
                        >
                            <TableHead className="bg-grey-300 ">
                                <TableRow >
                                    <TableCell >Topic</TableCell>
                                    <TableCell align="left">Skill To Be Demonstrated</TableCell>
                                    <TableCell align="left">☹️</TableCell>
                                    <TableCell align="left">😖</TableCell>
                                    <TableCell align="left">🙂</TableCell>
                                    <TableCell align="left">😁</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* {data?.map((row) => ( */}
                                    <TableRow
                                        // key={row.group}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            sx={{ borderBottom: "2px solid #F8F8F8", width: "26%" }}
                                        >
                                            {/* {"Duty 3 - Move and store goods safely, securely and efficiently to the designated location, utilising mechanical handling equipment, (MHE) and personal protective equipment (PPE) in line with organisational procedures when required. When using any MHE, ensure that safety checks are conducted before use to ensure that it is fit for purpose.	"} */}
                                            {singleData?.group}
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{ borderBottom: "2px solid #F8F8F8", width: "70%" }}
                                        >
                                            {"Apply safe working practices in line with associated health and safety legislation and company policy."}
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{ borderBottom: "2px solid #F8F8F8", width: "1%" }}
                                        >
                                            <Radio />
                                            {/* {singleData?.standardUnits} */}
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{ borderBottom: "2px solid #F8F8F8", width: "1%" }}
                                        >
                                            <Radio />
                                            {/* {row?.hours} */}
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{ borderBottom: "2px solid #F8F8F8", width: "1%" }}
                                        >
                                            <Radio />
                                            {/* {row.pointsCredits} */}
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{ borderBottom: "2px solid #F8F8F8", width: "1%" }}
                                        >
                                            <Radio />
                                            {/* {row.level} */}
                                        </TableCell>
                                        {/* <TableCell
                                    align="left"
                                    sx={{ borderBottom: "2px solid #F8F8F8" }}
                                >
                                    <IconButton
                                        size="small"
                                        sx={{ color: "#5B718F", marginRight: "4px" }}
                                        onClick={(e) => handleApply(e, row, "view")}
                                    >
                                        <NorthEastIcon fontSize="small" />
                                    </IconButton>
                                </TableCell> */}
                                    </TableRow>
                                {/* ))} */}
                            </TableBody>
                        </Table>
                        {/* ) : (
                            <div
                                className="flex flex-col justify-center items-center gap-10 "
                                style={{ height: "94%" }}
                            >
                                <DataNotFound width="25%" />
                                <Typography variant="h5">No data found</Typography>
                                <Typography variant="body2" className="text-center">
                                    It is a long established fact that a reader will be <br />
                                    distracted by the readable content.
                                </Typography>
                            </div>
                        )} */}
                    </TableContainer>
                    <Grid className="flex justify-end items-end my-20 mr-24 gap-10">
                        <Grid>
                            <SecondaryButton name="Save" />
                        </Grid>
                        <Grid>
                            <SecondaryButton name="Next" />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default TNAQuestionaire