import React, { useState , useEffect } from 'react'
import { fetchTotalData } from '../../data'
import './style.scss'

const Total = () => {
  const [total, settotal] = useState({"TotalConfirmed":0, "TotalDeaths":0})

  useEffect(() => {
    const getTotalData = async () => {
      const data = await fetchTotalData();
      settotal(data)
    }
    
    getTotalData();
  }, [])
  
  return (
    <div className='main-container'>
      <div className='total-container'>
        <h1>TOTAL</h1>

        <div className='items'>
          <div className='item-box'>
            <h1 className='item-header'>Cases</h1>
            <h2 className='item-count'>{total.TotalConfirmed}</h2>
          </div>

          <div className='divider'></div>

          <div className='item-box'>
            <h1 className='item-header'>Deaths</h1>
            <h2 className='item-count'>{total.TotalDeaths}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Total