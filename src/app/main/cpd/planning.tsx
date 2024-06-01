import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Stack } from "@mui/system";
import { Pagination } from "@mui/material";

interface Column {
  id:
    | "startDate"
    | "endDate"
    | "CPDPlan"
    | "onYou"
    | "colleagues"
    | "managers"
    | "organization"
    | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "startDate", label: "Start Date", minWidth: 10 },
  { id: "endDate", label: "End Date", minWidth: 10 },
  {
    id: "CPDPlan",
    label: "CPD Plan",
    minWidth: 20,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "onYou",
    label: "On You",
    minWidth: 20,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "colleagues",
    label: "Colleagues",
    minWidth: 20,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "managers",
    label: "Managers",
    minWidth: 70,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "organization",
    label: "Organization",
    minWidth: 70,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 70,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
];

interface Data {
  startDate: number;
  endDate: number;
  CPDPlan: string;
  onYou: number;
  colleagues: number;
  managers: number;
  organization: number;
  action: number;
}

function createData(
  startDate: number,
  endDate: number,
  CPDPlan: string,
  onYou: number,
  colleagues: number,
  managers: number,
  organization: number,
  action: number
): Data {
  return {
    startDate,
    endDate,
    CPDPlan,
    onYou,
    colleagues,
    managers,
    organization,
    action,
  };
}

const rows = [
  createData(59, 2, "Abc", 3287263, 1, 65, 8, 80),
  createData(8, 2, "A", 9596961, 5, 65, 5, 58),
  createData(8, 2, "A", 301340, 5, 6, 5, 52),
  createData(4, 2, "a", 9833520, 4, 6, 5, 5),
  createData(5, 5, "a", 9984670, 5, 6, 5, 42),
  // createData(4, 5, "a", 7692024),
  // createData(8, 5, "d", 357578),
  // createData(54, 5, "d", 70273),
  // createData(5, 5, "s", 1972550),
  // createData(6, 5, "d", 377973),
  // createData(5, 5, "ds", 640679),
  // createData(55, 5, "d", 242495),
  // createData(8, 5, "a", 17098246),
  // createData(8, 5, "ef", 923768),
  // createData(1, 5, "df", 8515767),
];

const Activity = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <TableContainer sx={{ maxHeight: 440 }} className="-m-12">
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "#F8F8F8",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.endDate}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <div className="fixed bottom-0 left-0 w-full flex justify-center py-4 mb-14">
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div> */}
      <div className="fixed bottom-0 left-0 w-full flex justify-center py-4 mb-14">
        <Stack spacing={2}>
          <Pagination count={3} variant="outlined" shape="rounded" />
        </Stack>
      </div>
    </>
  );
};

export default Activity;
