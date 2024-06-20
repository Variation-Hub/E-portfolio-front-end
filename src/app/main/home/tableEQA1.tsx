import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Pagination, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";

function createData(
  avatarUrl: string,
  learnerName: string,
  course: string,
  trainerName: string,
  iqaName: string,
  status: string,
  iQAReports: string,
  samplingPlan: string
) {
  return {
    avatarUrl,
    learnerName,
    course,
    trainerName,
    iqaName,
    status,
    iQAReports,
    samplingPlan,
  };
}

const rows = [
  createData(
    "assets/images/svgImage/eqaAvtar.svg",
    "Frozen yoghurt",
    "A",
    "Frozen yoghurt",
    "Frozen yoghurt",
    "Frozen",
    "Frozen",
    "Frozen"
  ),
  createData(
    "assets/images/svgImage/eqaAvtar.svg",
    "Ice cream sandwich",
    "A",
    "Frozen yoghurt",
    "Frozen yoghurt",
    "Frozen",
    "Frozen",
    "Frozen"
  ),
  createData(
    "assets/images/svgImage/eqaAvtar.svg",
    "Eclair",
    "A",
    "Frozen yoghurt",
    "Frozen yoghurt",
    "Frozen",
    "Frozen",
    "Frozen"
  ),
  createData(
    "assets/images/svgImage/eqaAvtar.svg",
    "Cupcake",
    "A",
    "Frozen yoghurt",
    "Frozen yoghurt",
    "Frozen",
    "Frozen",
    "Frozen"
  ),
  createData(
    "assets/images/svgImage/eqaAvtar.svg",
    "Gingerbread",
    "A",
    "Frozen yoghurt",
    "Frozen yoghurt",
    "Frozen",
    "Frozen",
    "Frozen"
  ),
];

const TableEQA1 = (props) => {
  return (
    <>
      <div className="m-8">
        <TableContainer component={Paper} className="rounded-6">
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableHead className="bg-[#F8F8F8]">
              <TableRow>
                <TableCell>Learner Name</TableCell>
                <TableCell align="left">Course</TableCell>
                <TableCell align="left">Trainer Name&nbsp;</TableCell>
                <TableCell align="left">IQA Name&nbsp;</TableCell>
                <TableCell align="left">Status&nbsp;</TableCell>
                <TableCell align="left">IQA Reports&nbsp;</TableCell>
                <TableCell align="left">Sampling Plan&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.learnerName}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ borderBottom: "2px solid #F8F8F8" }}
                  >
                    <Box display="flex" alignItems="center">
                      <Avatar
                        className="mr-4"
                        alt={row.learnerName}
                        src={row.avatarUrl}
                        sx={{ width: 32, height: 32, marginRight: 1 }}
                      />
                      <Typography variant="body1">{row.learnerName}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ borderBottom: "2px solid #F8F8F8" }}
                  >
                    {row.course}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ borderBottom: "2px solid #F8F8F8" }}
                  >
                    {row.trainerName}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ borderBottom: "2px solid #F8F8F8" }}
                  >
                    {row.iqaName}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ borderBottom: "2px solid #F8F8F8" }}
                  >
                    {row.status}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ borderBottom: "2px solid #F8F8F8" }}
                  >
                    {row.iQAReports}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ borderBottom: "2px solid #F8F8F8" }}
                  >
                    {row.samplingPlan}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Stack
            spacing={2}
            className="flex justify-center items-center w-full my-12"
          >
            <Pagination count={3} variant="outlined" shape="rounded" />
          </Stack>
        </TableContainer>
      </div>
    </>
  );
};

export default TableEQA1;
