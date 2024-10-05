import { Box, Card, LinearProgress, Stack, Typography } from '@mui/material';
import { getLearnerDetailsReturn } from 'app/store/learnerManagement';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { SecondaryButtonOutlined } from 'src/app/component/Buttons';

function LinearProgressWithLabel(props) {
  const { color, value } = props;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Stack sx={{ width: '100%', mr: 1, color: color, backgroundColor: 'lightgray', borderRadius: "10px" }}>
        <LinearProgress className='h-20' variant="determinate" value={value} sx={{ height: '10px', backgroundColor: '#e5e7eb', borderRadius: "10px", '& .MuiLinearProgress-bar': { backgroundColor: color, borderRadius: "5px" } }} />
      </Stack>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

const ProgressWidget = () => {

  const dispatch: any = useDispatch();

  const [learnerDetails, setLearnerDetails] = useState(undefined)
  const [course, setCourse] = useState([]);

  useEffect(() => {
    async function fetchLearner() {
      const user = JSON.parse(sessionStorage.getItem('learnerToken'))?.user;
      if (user) {
        setLearnerDetails(user)
        const data = await dispatch(getLearnerDetailsReturn(user?.learner_id))
        if (data) {
          setCourse(data?.course)
        }
      }
    }
    fetchLearner();
  }, [])

  console.log(course.map((course) => (course)));

  return (
    <div>
      <div>
        <div className='p-10 border-b-1 !border-grey-400'>
          <Typography className='capitalize text-lg font-semibold'>Welcome,  {learnerDetails?.displayName}</Typography>
        </div>

        <div className='m-14'>
          <Typography className='py-8 capitalize text-2xl font-normal'>Overall Progress</Typography>
          <div className='flex gap-8 justify-start items-end'>
            <Card className='p-14 w-2/5 rounded-0 bg-grey-100 flex flex-col gap-8'>
              <div>
                <Typography className='pb-6 text-sm'>Actual Course Progress 3 % (<span className='text-green'>Green</span>) / 45 % Criteria with evidence attached (<span className=' text-[coral] '>Orange</span>)</Typography>
                <LinearProgressWithLabel color="green" value={10} />
              </div>
              <div>
                <LinearProgressWithLabel color="coral" value={50} />
              </div>
              <div>
                <Typography className='pb-6 text-sm'>Course duration 08/08/2024 to 09/07/2026</Typography>
                <LinearProgressWithLabel color="dodgerblue" value={20} />
              </div>

            </Card>
            <div>
              <Link to="/portfolio">
                <SecondaryButtonOutlined name="Go to dashboard" />
              </Link>
            </div>
          </div>

        </div>

        <div className='m-14 '>
          {course.map((course) => (
            <>
          <Typography className='py-8 capitalize text-2xl font-normal'>{course.course.course_name}</Typography>
          <div className='flex w-4/5 gap-8 justify-start items-center 0 bg-grey-100 border-b-3 !border-grey-300'>
            <Card className='bg-grey-100 w-full p-14 rounded-0 flex flex-col gap-8'>
              <div>
                <Typography className='pb-6 text-sm'>Actual Course Progress 0 % (<span className='text-green'>Green</span>) / 80 % Criteria with evidence attached (<span className=' text-[coral] '>Orange</span>)</Typography>
                <LinearProgressWithLabel color="green" value={0} />
              </div>
              <div>
                <LinearProgressWithLabel color="coral" value={80} />
              </div>
              <div>
                <Typography className='pb-6 text-sm'>Course duration 08/08/2024 to 09/02/2026</Typography>
                <LinearProgressWithLabel color="dodgerblue" value={30} />
              </div>

            </Card>
            <div className='w-1/4 flex flex-col justify-center items-center gap-6 '>
              <Link to="/portfolio">
                <SecondaryButtonOutlined name="Go to dashboard" />
              </Link>
              <Typography className='text-sm'>Assessor: Michelle Parris</Typography>
            </div>
          </div>
          </>
          ))}
        </div>

        <div className='m-14'>
          <Card className=' w-1/2 rounded-6 bg-grey-200 p-10 flex gap-40'>
            <div className='w-2/5'>
              <div className='py-10 border-b-1 !border-grey-600 mb-16 '>
                <strong>Progress Bars</strong>
              </div>
              <div className='flex flex-col gap-7'>
                <Typography className='text-sm'><span className='inline-block h-6 w-20 mr-8 bg-[#ff6c00]'></span>
                  Learner progress, assessed evidence mapped to requirements</Typography>
                <Typography className='text-sm'><span className='inline-block h-6 w-20 mr-8 bg-[#008000]'></span>
                  Assessor signed off requirements</Typography>
                <Typography className='text-sm'><span className='inline-block h-6 w-20 mr-8 bg-[#0000FF]'></span>
                  Time elapsed</Typography>
                <Typography className='text-sm'><span className='inline-block h-6 w-20 mr-8 bg-[#FF0000]'></span>
                  Past end of course</Typography>
                <Typography className='text-sm'><span className='inline-block h-6 w-20 mr-8 bg-[#808080]'></span>
                  Missing start/end date or learner not in training</Typography>
                <Typography className='text-sm'><span className='inline-block h-6 w-20 mr-8 bg-[#00008B]'></span>
                  Past end date, in extension period</Typography>

              </div>
            </div>
            <div className='w-2/5'>
              <div className='py-10 border-b-1 !border-grey-600 mb-16 '>
                <strong>Course Data</strong>
              </div>
              <div>
                <div className='flex items-center gap-4'>
                  <img className='w-20 h-20' src="./assets/icons/ic-2.png" alt="ic-2" />
                  <Typography className='text-sm'>Secondary Assessor</Typography>
                </div>
                <div className='flex items-center gap-4 mt-7'>
                  <img className='w-20 h-20' src="./assets/icons/LeadAssessor.jpg" alt="LeadAssessor" />
                  <Typography className='text-sm'>Lead Assessor</Typography>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ProgressWidget