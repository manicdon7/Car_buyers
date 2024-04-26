import React from 'react'


const Card = (props) => {
  return (
    <div className='pt-10 pl-10'>
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Card Title</h2>
        <img src={props.Image} alt="Car" className="w-40 h-40 ml-9" /> <br />
        <p className='pt-2 text-gray-700'>Company_Name: {props.Company}</p>
        <p className='pt-2 text-gray-700'>Model_Name: {props.Model}</p>
        <p className='pt-2 text-gray-700'>year : {props.year}</p>
        <p className='pt-2 text-gray-700'>price : {props.price}</p>
        
        {/* <p className='pt-2'>image : {props.image}</p> */}
    </div>
    </div>
  )
}

export default Card;

