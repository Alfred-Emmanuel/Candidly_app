import React from 'react'

function Insights({messages}) {
  return (
    <div className='border shadow-lg rounded-lg w-full px-5 py-5'>
        <h1 className='text-[1.2rem] md:text-[1.35rem] font-semibold mb-5 '>Your Insights</h1>
        <div className='bg-gray-50 rounded w-full border h-5/6 py-5 px-5'>
            <h1 className='text-[1.1rem] md:text-[1.2rem] font-semibold border-b py-2 mb-4'>Responses</h1>
            <div className='flex flex-wrap gap-[3%]'>
                <div className='border px-3 py-2 rounded-md mb-4 md:mb-0'>
                    <h1 className='mb-1 text-[1.1rem] font-semibold'>Total number of responses</h1>
                    <p className='text-[1rem]'>{messages.length}</p>
                </div>
                <div className='border px-3 py-2 rounded-md'>
                    <h1 className='mb-1 text-[1.1rem] font-semibold'>Average response per rate</h1>
                    <p className='text-[1rem]'>20</p>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Insights