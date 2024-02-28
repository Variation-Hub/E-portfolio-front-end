import FuseLoading from '@fuse/core/FuseLoading'
import { Avatar } from '@mui/material'
import { getLearnerDetails, selectLearnerManagement } from 'app/store/learnerManagement'
import { selectUser } from 'app/store/userSlice'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { PortfolioCard } from 'src/app/component/Cards'
import DoughnutChart from 'src/app/component/Chart/doughnut'
import { portfolioCard } from 'src/app/contanst'

const Portfolio = () => {

  const { learner, dataUpdatingLoadding } = useSelector(selectLearnerManagement);
  const { data } = useSelector(selectUser);


  const dispatch: any = useDispatch();

  useEffect(() => {
    if (data.id)
      dispatch(getLearnerDetails())
  }, [data]);

  return (
    <div>
      <div className='m-10 flex flex-wrap justify-evenly gap-10'>
        {portfolioCard?.map(value => <PortfolioCard data={value} key={value.id} />)}
      </div>
      {dataUpdatingLoadding ?
        <FuseLoading />
        :
        <div className='m-24 flex items-center border-1 rounded-8 py-12'>
          <div className='flex flex-col w-1/6 justify-center items-center border-r-1'>
            <Avatar sx={{ width: 100, height: 100 }} src="">{learner?.first_name.charAt(0)}{learner?.last_name.charAt(0)}</Avatar>
            <div className='mt-10' >{learner?.first_name} {learner?.last_name}</div>
          </div>
          <div className='p-4 flex flex-col items-center w-full'>
            {learner.courses.length ?
              <>
                <div className="text-center text-xl border-b-1 w-4/5 pb-4">Courses</div>
                <div className="mt-12 ml-12 mr-auto flex items-center gap-12">
                  {learner.courses.map(value => <div className=" w-fit">
                    <DoughnutChart />
                  </div>
                  )}
                </div>
              </>
              :
              <div className='flex items-center justify-center opacity-50'>No courses assigned
              </div>
            }
          </div>
        </div>
      }
    </div>
  )
}

export default Portfolio