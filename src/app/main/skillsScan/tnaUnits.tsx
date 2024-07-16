import FuseLoading from '@fuse/core/FuseLoading'
import { Checkbox, FormControl, FormControlLabel, FormLabel, Grid, Pagination, Radio, RadioGroup, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { SecondaryButton } from 'src/app/component/Buttons'
import { dataBase } from './skillsScan';

const TNAUnits = () => {

    return (
        <Grid>
            <Grid className="m-10 px-10 pt-10 ">
                <Grid className="m-10 flex gap-10">
                    <Typography className='h1 '>Choose TNA units</Typography>
                    <SecondaryButton name="New Skill Scan" />
                </Grid>
                <Grid className="m-10 py-10 ">
                    <Typography className='pb-10'>Supply chain warehouse operative 111</Typography>
                    <Typography className='pb-10'>Candidates to complete the mandatory units.</Typography>
                </Grid>
            </Grid>
            <Grid className="mx-10 px-10 ">
                <FormControl className='flex-row items-center gap-96'>
                    <FormLabel component="legend">Order By</FormLabel>
                    <RadioGroup
                        aria-label="options"
                        defaultValue="outlined"
                        name="radio-buttons-group"
                        className='flex-row'
                    // orientation="vertical"
                    >
                        <FormControlLabel
                            value="Unit Number"
                            control={<Radio />}
                            label="Unit Number"
                        // onChange={handleRadioChange}
                        />
                        <FormControlLabel
                            value="Group"
                            control={<Radio />}
                            label="Group"
                        // onChange={handleRadioChange}
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid className="m-10 px-10 pt-10 ">
                <TableContainer sx={{ maxHeight: "auto" }} >
                    {/* {dataFetchLoading ? (
                            <FuseLoading />
                        ) : formdata.data.length ? ( */}
                    <Table
                        sx={{ minWidth: 650, heighFaddt: "100%" }}
                        size="small"
                        aria-label="simple table"
                    >
                        <TableHead className="bg-[#F8F8F8]">
                            <TableRow>
                                <TableCell>Group</TableCell>
                                <TableCell align="left">Select</TableCell>
                                <TableCell align="left">Standard Units</TableCell>
                                <TableCell align="left">Hours</TableCell>
                                <TableCell align="left">Points/Credits</TableCell>
                                <TableCell align="left">Level</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataBase?.map((row) => (
                                <TableRow
                                    key={row.group}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        sx={{ borderBottom: "2px solid #F8F8F8", width: "10%" }}
                                    >
                                        {row.group}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ borderBottom: "2px solid #F8F8F8", width: "10%" }}
                                    >
                                        <Checkbox
                                            checked={row.select}
                                            // onChange={handleCheckboxChange}
                                            name="declaration"
                                            color="primary"
                                        />
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ borderBottom: "2px solid #F8F8F8", width: "50%" }}
                                    >
                                        {row.standardUnits}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ borderBottom: "2px solid #F8F8F8", width: "10%" }}
                                    >
                                        {row?.hours}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ borderBottom: "2px solid #F8F8F8", width: "10%" }}
                                    >
                                        {row.pointsCredits}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ borderBottom: "2px solid #F8F8F8", width: "10%" }}
                                    >
                                        {row.level}
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
                            ))}
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
                    <Grid className="flex justify-center items-center w-full my-12">
                        <SecondaryButton name="Save" />
                    </Grid>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

export default TNAUnits