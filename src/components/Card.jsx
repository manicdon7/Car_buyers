import React from 'react'


const Card = (props) => {
  return (
    <div className='pt-10 pl-10'>
    <div className='bg-gradient-to-t from-yellow-200 via-pink-200 to-pink-400 pl-10 pr-16 pb-10 pt-5 rounded-lg h-96 w-80'>
        <h1 className='font-bold text-center pb-4'>Details</h1>
        <img src={props.Image} alt="Car" className="w-40 h-40 ml-9" /> <br />
        <p className='pt-2'>Company_Name: {props.Company}</p>
        <p className='pt-2'>Model_Name: {props.Model}</p>
        <p className='pt-2'>year : {props.year}</p>
        <p className='pt-2'>price : {props.price}</p>
        
        {/* <p className='pt-2'>image : {props.image}</p> */}
    </div>
    </div>
  )
}
  
export default Card;
