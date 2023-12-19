import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Avatar, IconButton } from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Style from "./style.module.css";
import { useDispatch } from 'react-redux';
import { fetchUserAPI } from 'app/store/userManagement';

export default function UserManagementTable(props) {

    const { columns, rows, handleOpen, setUserData, setUpdateData } = props

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const dispatch: any = useDispatch();

    const handleChangePage = (event: unknown, newPage: number) => {
        dispatch(fetchUserAPI({ page: newPage, limit: rowsPerPage }))
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
        dispatch(fetchUserAPI({ page: 1, limit: +event.target.value }))
    };

    const editIcon = (id) => {
        setUpdateData(id);
        const {
            first_name,
            last_name,
            user_name,
            email,
            sso_id,
            mobile,
            phone,
            role,
            time_zone,
        } = rows.filter(item => item.user_id === id)[0];
        setUserData({
            first_name,
            last_name,
            user_name,
            email,
            sso_id,
            mobile,
            phone,
            role,
            time_zone
        })
        handleOpen();
    }
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', margin: "2rem 0rem" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns?.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    sx={{ backgroundColor: "#5B718F" }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.user_id}>
                                    {columns?.map((column) => {
                                        const value = row[column.id];
                                        if (column.id === "actions") {
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    <IconButton size="small" sx={{ color: "#5B718F", marginRight: "4px" }} onClick={() => editIcon(row.user_id)}>
                                                        <ModeEditOutlineOutlinedIcon fontSize='small' />
                                                    </IconButton>
                                                    <IconButton size="small" sx={{ color: "maroon", marginLeft: "4px" }}>
                                                        <DeleteOutlineOutlinedIcon fontSize='small' />
                                                    </IconButton>
                                                </TableCell>
                                            )
                                        }
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                <div className={Style.avatar}>
                                                    {column.id === "first_name" && <Avatar alt={value} src="/static/images/avatar/1.jpg" sx={{ marginRight: "8px" }} />}
                                                </div>
                                                {value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}