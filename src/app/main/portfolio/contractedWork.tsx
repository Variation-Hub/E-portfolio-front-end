import { AddIcCallOutlined } from '@mui/icons-material'
import { Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { SecondaryButton } from 'src/app/component/Buttons'

const ContractedWorkHours = () => {
    return (
        <div>
            <div>
                <div>
                    <h1 className='font-semibold'>Contracted Work Hours</h1>
                </div>
                <div className='flex justify-center mt-32'>
                    <h5 className='font-normal w-[80%]'><strong>Please note: </strong>as this learner's expected off the job hours have been set as a fixed value, the contracted work hours and yearly holiday entitlement will not impact the off the job calculation for this learner.</h5>
                </div>
            </div>

            <div className='w-full flex justify-end my-20'>
                <SecondaryButton
                    name="Set New Hours"
                    className="py-6 px-12 mb-10"
                // onClick={() => handleClickOpen("add")}
                />
            </div>

            <TableContainer sx={{ minHeight: 550, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                {/* {dataFetchLoading ? (
                    <FuseLoading />
                ) : innovation.data.length ? ( */}
                <Table
                    sx={{ minWidth: 650, height: "100%" }}
                    size="small"
                    aria-label="simple table"
                >
                    <TableHead className="bg-[#F8F8F8]">
                        <TableRow>
                            <TableCell align="left">
                                Company
                            </TableCell>
                            <TableCell align="left">
                                Employment Contract Start
                            </TableCell>
                            <TableCell align="left">
                                Employment Contract End
                            </TableCell>
                            <TableCell align="left">
                                Contracted Work Hours per Week
                            </TableCell>
                            <TableCell align="left">
                                Yearly Holiday Entitlement in Hours
                            </TableCell>
                            <TableCell align="left">
                                Last Edited By
                            </TableCell>
                            <TableCell align="left">
                                Last Edited
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {/* <TableBody>
                            {innovation?.data?.map((row) => (
                                <TableRow
                                    key={row.topic}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        sx={{
                                            borderBottom: "2px solid #F8F8F8",
                                            maxWidth: "4rem",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {row.topic}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{
                                            borderBottom: "2px solid #F8F8F8",
                                            maxWidth: "9rem",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {row?.description}
                                    </TableCell>
                                    {data?.role === "Admin" &&
                                        <>
                                            <TableCell
                                                align="left"
                                                sx={{
                                                    width: "15rem",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                }}>
                                                {row?.innovation_propose_by_id?.email}
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                                sx={{ borderBottom: "2px solid #F8F8F8", width: "15rem" }}
                                            >
                                                {row?.innovation_propose_by_id?.user_name}
                                            </TableCell>
                                        </>
                                    }
                                    <TableCell
                                        align="left"
                                        sx={{ borderBottom: "2px solid #F8F8F8", width: "15rem" }}
                                    >
                                        {formatDate(row.created_at)}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ borderBottom: "2px solid #F8F8F8", width: "15rem" }}
                                    >
                                        {row.status}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ borderBottom: "2px solid #F8F8F8", width: "15rem" }}
                                    >
                                        <IconButton
                                            size="small"
                                            sx={{ color: "#5B718F", marginRight: "4px" }}
                                            onClick={(e) => handleClick(e, row)}
                                        >
                                            <MoreHorizIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody> */}
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
                )}
                <CustomPagination
                    pages={meta_data?.pages}
                    page={meta_data?.page}
                    handleChangePage={handleChangePage}
                    items={meta_data?.items}
                /> */}
            </TableContainer>
        </div>
    )
}

export default ContractedWorkHours