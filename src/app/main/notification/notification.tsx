import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { SecondaryButton } from "src/app/component/Buttons";

interface Column {
  id:
  | "title"
  | "description"
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "title", label: "Title", minWidth: 10 },
  { id: "description", label: "Description", minWidth: 10 }
];


const Activity = () => {

  const [notifications, setNotifications] = React.useState([
    { id: 1, type: 'info', title: 'Notification 1', description: 'This is the first notification', read: false },
    { id: 2, type: 'alert', title: 'Notification 2', description: 'This is the second notification', read: true },
    { id: 3, type: 'message', title: 'Notification 3', description: 'This is the third notification', read: false },
    { id: 4, type: 'info', title: 'Notification 4', description: 'This is the forth notification', read: false },
    { id: 5, type: 'info', title: 'Notification 5', description: 'This is the fifth notification', read: true },
    { id: 6, type: 'info', title: 'Notification 6', description: 'This is the sixth notification', read: false },
  ]);

  const handleRemoveAll = () => {
    setNotifications([]);
  };

  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };
  return (
    <>
      <TableContainer sx={{ maxHeight: 440, padding: 1 }}>
        <div className="flex space-x-4 mt-4 mb-10 mr-5 justify-end  ">
          <SecondaryButton name="Delete All" onClick={handleRemoveAll} />
        </div>
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
            {notifications
              ?.map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    // key={row.endDate}
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
    </>
  );
};

export default Activity;
