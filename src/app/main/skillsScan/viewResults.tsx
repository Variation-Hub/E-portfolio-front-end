import { Card, FormControl, Grid, MenuItem, Select, Typography } from '@mui/material'
import { selectSkillsScan } from 'app/store/skillsScan';
import React from 'react'
import { useSelector } from 'react-redux';
import { dataBase } from './skillsScan';
import { SecondaryButton } from 'src/app/component/Buttons';

const ViewResults = () => {

    const { data, singleData } = useSelector(selectSkillsScan);

    return (
        <Grid className=' m-10 px-10 pt-10'>
            <Grid >
                <Typography className='h3'>Results chart for Daniel Stefan Ciapa</Typography>
            </Grid>
            <Grid className=' flex gap-28'>
                <Grid className='w-1/2'>
                    <FormControl fullWidth size="small" className='pt-20'>
                        <Select
                            labelId="year-select-label"
                            id="year-select"
                            name="year"
                        // value={data?.standardUnits}
                        // onChange={handleChangeYear}
                        // disabled={edit === "view" || edit === "edit"}
                        >
                            {data?.map((row) => (
                                <MenuItem key={row} value={row?.standardUnits}>
                                    {row?.standardUnits}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Card className=' mt-20 rounded-0 p-10 bg-grey-200'>
                        <Typography className='h4 font-600'>Gap Analysis</Typography>
                    </Card>
                </Grid>
                <Grid className='w-1/2' >
                    <Grid className="flex justify-start items-end my-20 mr-24 gap-10">
                        <Grid>
                            <SecondaryButton name="Save" />
                        </Grid>
                        <Grid>
                            <SecondaryButton name="Next" />
                        </Grid>
                    </Grid>
                    <Card className=' mt-20 rounded-0 p-10 bg-grey-200'>
                        <Typography className='h4 font-600'>Resources</Typography>
                    </Card>
                    <Grid>
                        <Card className=' mt-20 rounded-0 p-10 bg-grey-200'>
                            <Typography className='h4 font-600'>Legend</Typography>
                        </Card>
                        <Card className='rounded-0 p-10'>
                            <Grid>
                                <Typography>Skills</Typography>
                            </Grid>
                            <Grid>
                                <Typography>Knowledge</Typography>
                            </Grid>
                            <Grid>
                                <Typography>Behaviour</Typography>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ViewResults