import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Stack } from "@mui/system";
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, FormControl, IconButton, Menu, MenuItem, Pagination, Select, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import { createEvaluationAPI, createReflectionAPI, deleteReflectionHandler, getCpdPlanningAPI, selectCpdPlanning, slice, updateEvaluationAPI, updateReflectionsAPI, uploadImages } from "app/store/cpdPlanning";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Cpd from "./cpd";
import AlertDialog from "src/app/component/Dialogs/AlertDialog";
import { DangerButton, LoadingButton, SecondaryButton, SecondaryButtonOutlined } from "src/app/component/Buttons";
import { Link } from "react-router-dom";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { FileUploader } from "react-drag-drop-files";


interface Column {
    id:
    | "learning_objective"
    | "what_went_well"
    | "differently_next_time"
    | "feedback"
    | "files"
    | "added_by"
    | "action"
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: "learning_objective", label: "Learning Objective", minWidth: 10 },
    { id: "what_went_well", label: "What went well", minWidth: 10 },
    { id: "differently_next_time", label: "What would you do differently", minWidth: 10 },
    { id: "feedback", label: "How could i share this learning", minWidth: 10 },
    { id: "files", label: "Files", minWidth: 10 },
    { id: "added_by", label: "Added by", minWidth: 10 },
    { id: "action", label: "Action", minWidth: 10 },
];

const AddReflectionDialogContent = (props) => {

    const { edit = "Save", formData, setReflectionData, reflectionData = {}, handleChangeYear } = props;

    const currentYear = new Date().getFullYear();

    const years = [
        `${currentYear - 1}-${currentYear.toString().slice(-2)}`,
        `${currentYear}-${(currentYear + 1).toString().slice(-2)}`,
        `${currentYear + 1}-${(currentYear + 2).toString().slice(-2)}`,
    ];

    const handleReflectionChange = (e) => {
        const { name, value } = e.target;
        setReflectionData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const fileTypes = ["PDF"];
    const [files, setFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleFileChange = (newFiles) => {
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const dispatch: any = useDispatch();

    const handleUploadButtonClick = async () => {
        setUploadedFiles(files);
        const data = await dispatch(uploadImages(files));

        console.log(data);

        setReflectionData(prevData => ({
            ...prevData,
            files: [...prevData.files, ...data.data]
        }));

    };

    const handleDelete = (fileToDelete) => () => {

        setReflectionData(prevData => ({
            ...prevData,
            files: prevData.files.filter(file => file !== fileToDelete)
        }));
    };


    return (
        <>
            <div>
                <Box className="flex flex-col justify-between gap-12">
                    <div className="flex flex-row justify-between gap-12 w-full">
                        <div className="w-full">
                            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
                                Year
                            </Typography>
                            <FormControl fullWidth size="small">
                                <Select

                                    labelId="year-select-label"
                                    id="year-select"
                                    name="year"
                                    value={formData?.year}
                                    onChange={handleChangeYear}
                                    disabled={edit === "view"}
                                >
                                    {years?.map((year) => (
                                        <MenuItem key={year} value={year}>
                                            {year}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="w-full">
                            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
                                Learning Objective
                            </Typography>
                            <TextField
                                name="learning_objective"
                                size="small"
                                placeholder="lorent's learning"
                                fullWidth
                                value={reflectionData.learning_objective}
                                onChange={handleReflectionChange}
                                disabled={edit === "view"}
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
                            What Went Well
                        </Typography>
                        <TextField
                            name="what_went_well"
                            value={reflectionData.what_went_well}
                            onChange={handleReflectionChange}
                            fullWidth
                            size="small"
                            placeholder="What Went Well"
                            disabled={edit === "view"}
                        >
                        </TextField>
                    </div>
                    <div className="w-full">
                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
                            What would you do differently next time
                        </Typography>
                        <TextField
                            name="differently_next_time"
                            size="small"
                            placeholder="Lorem ipsum is just dummy context....."
                            fullWidth
                            multiline
                            rows={3}
                            value={reflectionData.differently_next_time}
                            onChange={handleReflectionChange}
                            disabled={edit === "view"}
                        />
                    </div>
                    <div className="w-full">
                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
                            How could you share this learning
                        </Typography>
                        <TextField
                            name="feedback"
                            size="small"
                            placeholder="Lorem ipsum dolor sit..."
                            fullWidth
                            value={reflectionData.feedback}
                            onChange={handleReflectionChange}
                            disabled={edit === "view"}
                        />
                    </div>
                    <Box className="flex justify-between gap-12 sm:flex-row">
                        <div className='w-full'>
                            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Choose resource for reflection</Typography>

                            <FileUploader
                                multiple={true}
                                children={
                                    <div
                                        style={{
                                            border: "1px dotted lightgray",
                                            padding: "1rem",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <div className="flex justify-center mt-8">
                                            <img
                                                src="assets/images/svgImage/uploadimage.svg"
                                                alt="Upload"
                                                className="w-64 pb-8"
                                            />
                                        </div>
                                        {files.length > 0 ? (
                                            files.map((file, index) => (
                                                <p className="text-center mb-4" key={index}>{file.name}</p>
                                            ))
                                        ) : (
                                            <>
                                                <p className="text-center mb-4">
                                                    Drag and drop your files here or{" "}
                                                    <a className="text-blue-500 font-500 ">Browse</a>
                                                </p>
                                                <p className="text-center mb-4">Max 10MB files are allowed</p>
                                            </>
                                        )}
                                    </div>
                                }
                                handleChange={handleFileChange}
                                name="file"
                                types={fileTypes}
                                disabled={edit === "view"}
                            />
                        </div>
                    </Box>
                    <div style={{ marginTop: '16px' }}>
                        {reflectionData.files.map((file, index) => (
                            <Chip
                                key={index}
                                icon={<FileCopyIcon />}
                                label={file.key}
                                onDelete={handleDelete(file)}
                                style={{ margin: '4px' }}
                                disabled={edit === "view"}
                            />
                        ))}
                    </div>
                    <div className="w-full mt-4">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleUploadButtonClick}
                            disabled={files.length === 0}
                        >
                            Upload
                        </Button>
                    </div>
                </Box>
            </div>
        </>
    );
};

const Reflection = (props) => {
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

    const {
        setUpdateData = () => { },
        dataUpdatingLoadding,
        dialogType,
        setDialogType,
        setFormData = () => { },
    } = props;

    const { singleData } = useSelector(selectCpdPlanning)

    const [reflectionData, setReflectionData] = useState({
        cpd_id: singleData?.cpdId || null,
        learning_objective: singleData?.learning_objective || "",
        what_went_well: singleData?.what_went_well || "",
        differently_next_time: singleData?.differently_next_time || "",
        feedback: singleData?.feedback || "",
        files: singleData?.files || [],
    });

    const [deleteId, setDeleteId] = useState("");
    const [openMenuDialog, setOpenMenuDialog] = useState<any>({});
    const [edit, setEdit] = useState("save");

    const [open, setOpen] = useState(false);

    const dispatch: any = useDispatch();
    const { data } = useSelector(selectUser);
    const cpdPlanningData = useSelector(selectCpdPlanning);

    const handleChange = () => {
        setFormData(prevFormData => ({
            ...prevFormData,
            reflections: [...prevFormData.reflections, reflectionData]
        }));
    };

    useEffect(() => {
        dispatch(getCpdPlanningAPI(data.user_id, "reflections"));
    }, [dispatch]);

    // console.log(cpdPlanningData.data.map(item => item.activities));

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const oopen = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const editIcon = (edit, value) => {
        setEdit(edit)
        setUpdateData(openMenuDialog);
        setOpen(true);
        // const data = cpdPlanningData?.data?.find((item) => item.id === openMenuDialog);
        const singleData = {
            id: openMenuDialog?.id || "",
            completed: openMenuDialog?.completed || "",
            learning_objective: openMenuDialog?.learning_objective || "",
            what_went_well: openMenuDialog?.what_went_well || "",
            differently_next_time: openMenuDialog?.differently_next_time || "",
            feedback: openMenuDialog?.feedback || "",
            files: openMenuDialog?.files || [],
        };
        dispatch(slice.setCpdSingledata(singleData));
        dispatch(slice.setDialogType(value));
        console.log(data);
        console.log(singleData);
    };

    const [cpdId, setcpdId] = useState("");

    const handleChangeYear = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

        if (name == "year") {
            setcpdId(data.data?.find(item => item.year === value).id);
        }
    };

    const handleSubmit = async () => {
        try {
            let response;
            let id = singleData.id;
            if (dialogType === "addReflection")
                response = await dispatch(createReflectionAPI({ ...reflectionData, cpd_id: cpdId }));
            else if (edit == "edit")
                response = await dispatch(updateReflectionsAPI(id, reflectionData));

        } catch (error) {
            console.error("Error during submission:", error);
        } finally {
            handleClose();
        }

    };

    const deleteIcon = (id) => {
        setDeleteId(id.id);
    };

    const openMenu = (e, id) => {
        handleClick(e);
        setOpenMenuDialog(id);
    };

    const deleteConfromation = async () => {
        await dispatch(
            deleteReflectionHandler(deleteId)
        );
        setDeleteId("");
    };


    const handleClose = () => {
        dispatch(slice.setCpdSingledata({}));
        setOpen(false);
        setAnchorEl(null);
        setDialogType("")
        setEdit("");

        setReflectionData({
            cpd_id: cpdId || null,
            learning_objective: "",
            what_went_well: "",
            differently_next_time: "",
            feedback: "",
            files: [],
        });
    };

    console.log(cpdPlanningData.data);

    return (
        <>
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
                            {cpdPlanningData?.data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((item) => (
                                item?.reflections?.map(row => {
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
                                                    <TableCell key={column.id} align={column.align}
                                                        style={{
                                                            minWidth: column.minWidth,
                                                            backgroundColor: "#F8F8F8",
                                                        }}>
                                                        {column.format && typeof value === "number"
                                                            ? column.format(value)
                                                            : column.id === "action" ?
                                                                <IconButton
                                                                    size="small"
                                                                    sx={{ color: "#5B718F", marginRight: "4px" }}
                                                                    onClick={(e) => openMenu(e, row)}
                                                                >
                                                                    <MoreHorizIcon fontSize="small" />
                                                                </IconButton>
                                                                : column.id === "files" ? (
                                                                    <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: 'auto auto auto' }}>
                                                                        {value.map((file, index) => (
                                                                            <Link to={file.url} target="_blank" rel="noopener" style={{ border: '0px', backgroundColor: 'unset' }}>
                                                                                <Chip
                                                                                    key={index}
                                                                                    icon={<FileCopyIcon />}
                                                                                    style={{ margin: '4px', backgroundColor: 'unset' }}
                                                                                />
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                )
                                                                    : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })
                            ))
                            }
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
            <AlertDialog
                open={Boolean(deleteId)}
                close={() => deleteIcon("")}
                title="Delete Reflection?"
                content="Deleting this reflection will also remove all associated data and relationships. Proceed with deletion?"
                className="-224 "
                actionButton={
                    dataUpdatingLoadding ? (
                        <LoadingButton />
                    ) : (
                        <DangerButton onClick={deleteConfromation} name="Delete Reflection" />
                    )
                }
                cancelButton={
                    <SecondaryButtonOutlined
                        className="px-24"
                        onClick={() => deleteIcon("")}
                        name="Cancel"
                    />
                }
            />
            <Menu
                id="long-menu"
                MenuListProps={{
                    "aria-labelledby": "long-addReflection",
                }}
                anchorEl={anchorEl}
                open={oopen}
                onClose={handleClose}
            >
                <MenuItem
                    onClick={() => {
                        handleClose();
                        editIcon("view", "addReflection");
                    }}
                >
                    View
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleClose();
                        editIcon("edit", "addReflection");
                    }}
                >
                    Edit
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleClose();
                        deleteIcon(openMenuDialog);
                    }}
                >
                    Delete
                </MenuItem>
            </Menu>

            <Dialog
                open={open || dialogType == "addReflection"}
                onClose={handleClose}
                sx={{
                    ".MuiDialog-paper": {
                        borderRadius: "4px",
                        width: "100%",
                    },
                }}
            >
                <DialogContent >
                    <AddReflectionDialogContent
                        edit={edit}
                        setReflectionData={setReflectionData}
                        reflectionData={reflectionData}
                        // formData={formData}
                        handleChange={handleChange}
                        handleChangeYear={handleChangeYear}
                    />
                </DialogContent>

                <Box className="flex items-center justify-end m-12 mt-24">
                    <DialogActions>
                        <>
                            {edit === "view" ?
                                <SecondaryButtonOutlined name="Cancel" className=" w-1/12" onClick={handleClose} />
                                :
                                <SecondaryButtonOutlined name="Cancel" className=" w-1/12" onClick={handleClose} />
                            }
                            {edit !== "view" &&
                                <SecondaryButton name={edit === "edit" ? "Update" : "Save"} className=" w-1/12 ml-10" onClick={handleSubmit} />
                            }
                        </>
                    </DialogActions>
                </Box>
            </Dialog >
        </>
    );
};

export default Reflection;
