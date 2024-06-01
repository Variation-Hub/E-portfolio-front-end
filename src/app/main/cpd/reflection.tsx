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
  id: "learningObjective" | "whatwentwell" | "differentlynexttime" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "learningObjective", label: "Learning Objective", minWidth: 10 },
  { id: "whatwentwell", label: "What went well", minWidth: 10 },
  {
    id: "differentlynexttime",
    label: "Differently next time",
    minWidth: 20,
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
  learningObjective: string;
  whatwentwell: string;
  differentlynexttime: string;
  action: number;
}

function createData(
  learningObjective: string,
  whatwentwell: string,
  differentlynexttime: string,
  action: number
): Data {
  return {
    learningObjective,
    whatwentwell,
    differentlynexttime,
    action,
  };
}

const rows = [
  createData("a", "b", "c", 5),
  createData("a", "b", "c", 5),
  createData("a", "b", "c", 5),
  createData("a", "b", "c", 5),
  createData("a", "b", "c", 5),
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

const Reflection = () => {
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
    <div>
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
                    //   key={row.whosupportyou}
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
    </div>
  );
};

export default Reflection;
