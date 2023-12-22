import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Avatar, IconButton, Pagination } from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Style from "./style.module.css";
import { useDispatch } from 'react-redux';
import { deleteUserHandler, fetchUserAPI } from 'app/store/userManagement';
import { userTableMetaData } from 'src/app/contanst/metaData';
import AlertDialog from '../Dialogs/AlertDialog';
import { DangerButton, LoadingButton, SecondaryButtonOutlined } from '../Buttons';

export default function UserManagementTable(props) {

    const { columns,
        rows,
        handleOpen,
        setUserData,
        setUpdateData,
        meta_data,
        dataUpdatingLoadding,
        search_keyword = "",
        search_role = "" } = props

    const [deleteId, setDeleteId] = useState("");
    const dispatch: any = useDispatch();

    const handleChangePage = (event: unknown, newPage: number) => {
        dispatch(fetchUserAPI({ page: newPage, page_size: userTableMetaData.page_size }))
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

    const deleteIcon = (id) => {
        setDeleteId(id);
    }

    const deleteConfromation = async () => {
        await dispatch(deleteUserHandler(deleteId, meta_data, search_keyword, search_role));
        setDeleteId("");
    }
    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: "1rem", borderRadius: "4px" }}>
                <TableContainer sx={{ maxHeight: 480, minHeight: 480 }}>
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
                                                        <IconButton size="small" sx={{ color: "maroon", marginLeft: "4px" }} onClick={() => deleteIcon(row.user_id)}>
                                                            <DeleteOutlineOutlinedIcon fontSize='small' />
                                                        </IconButton>
                                                    </TableCell>
                                                )
                                            }
                                            return (
                                                <TableCell key={column.id} align={column.align} >
                                                    <div className={Style.avatar}>
                                                        {column.id === "first_name" && <Avatar alt={value} src={row?.avatar?.url} sx={{ marginRight: "8px" }} />}
                                                        {value}
                                                    </div>
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="flex justify-center p-8">
                    <Pagination
                        page={meta_data.page}
                        count={Math.ceil(meta_data?.items / userTableMetaData.page_size)}
                        showFirstButton
                        showLastButton
                        onChange={handleChangePage}
                    />
                </div>
            </Paper>
            <AlertDialog
                open={Boolean(deleteId)}
                close={() => deleteIcon("")}
                title="Delete user"
                content="Deleting this user will also remove all associated data and relationships. Proceed with deletion?"
                actionButton={dataUpdatingLoadding ? <LoadingButton /> : <DangerButton onClick={deleteConfromation} name="Delete user" />}
                cancelButton={<SecondaryButtonOutlined onClick={() => deleteIcon("")} name="Cancel" />}
            />
        </>
    );
}