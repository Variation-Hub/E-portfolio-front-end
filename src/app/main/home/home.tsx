import React from 'react'
import { Card } from 'src/app/component/Cards'
import { HomePageData } from 'src/app/contanst'
import Style from './style.module.css';

const Home = () => {
  return (
    <div className={Style.home_card}>
      {HomePageData?.map((item, index) => (
        <Card name={item?.name} isIcon={item?.isIcon} title={item?.title} color={item?.color}key={index.toString()}/>
      ))}
    </div>
  )
}

export default Home