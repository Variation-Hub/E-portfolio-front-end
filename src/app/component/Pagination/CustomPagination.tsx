import { FormControl, Grid, MenuItem, Pagination, Select, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

export default function CustomPagination(props) {
  const { page, pages, handleChangePage, items } = props
  const [pageSize, setPageSize] = useState(10);

  const handleChange = (e) => {
    setPageSize(e.target.value);
  };

  return (
    <>
      <Grid className="flex justify-between items-center p-8 mb-14 w-full font-500">
        <Typography className="w-1/3">Showing {((page - 1)  * pageSize) + 1} to {page + 1 * pageSize} of {items} entries</Typography>
        <Grid className="w-1/3 flex justify-center ">
          <Stack
            spacing={2}
            className="flex justify-center items-center w-full mt-12 bg-white"
          >
            <Pagination
              count={pages}
              page={page}
              variant="outlined"
              onChange={handleChangePage}
              shape="rounded"
              siblingCount={1}
              boundaryCount={1}
            />
          </Stack>
        </Grid>
        <Grid className="w-1/3 flex justify-end items-center gap-10 font-500">
          Show
          <FormControl size="small">
            <Select
              value={pageSize}
              size="small"
              onChange={handleChange}
              className="leading-[inherit] min-h-0"
              sx={{
                ".muiltr-156t61m-MuiSvgIcon-root-MuiSelect-icon": {
                  color: "black"
                }
              }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>25</MenuItem>
              <MenuItem value={30}>50</MenuItem>
              <MenuItem value={30}>100</MenuItem>
            </Select>
          </FormControl>
          entries
        </Grid>
      </Grid>
    </>
  );
}
