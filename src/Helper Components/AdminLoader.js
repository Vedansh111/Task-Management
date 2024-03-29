import React from 'react'

function AdminLoader() {
    return (
        <div className='animate-pulse flex'>
            <div className='h-screen'>
                <div className='  w-[20rem] h-full bg-[#ecf1e8] border border-gray-400 border-t-0 flex flex-col items-center'>
                    <div class=" h-[5rem] my-[1.53rem] p-3 w-[13rem] bg-gray-300 rounded"></div>
                    <div className='w-full border border-gray-400 '></div>
                    <div className='flex flex-col justify-center items-center text-3xl w-full my-[1.5rem]'>
                        <div class=" h-[1rem] my-[1rem] p-3 w-[9rem] bg-gray-300 rounded col-span-2"></div>
                        <div class=" h-[1rem] m.5y-[1rem] p-3 w-[9rem] bg-gray-300 rounded col-span-2"></div>
                    </div>
                    <div className='w-full mt-[29rem] border border-gray-400'></div>

                </div>
            </div>
            <div className=' w-full'>
                <div className='h-[5rem] w-full bg-[#ecf1e8] flex items-center border-[2px] border-gray-400 border-x-0 border-t-0 border-s-0'>
                    <div class=" h-[1.4rem] ml-[3rem] w-[5.5rem] bg-gray-300 rounded "></div>
                    <div class=" h-[1.4rem] mx-[1.5rem] w-[5.5rem] bg-gray-300 rounded "></div>
                    <div className='mx-1 w-[6rem] flex justify-around items-center absolute right-5'>
                        <div className='flex items-center justify-between h-full'>
                            <div class="rounded-full bg-gray-300 h-[3rem] w-[3rem]"></div>
                            <div className='flex flex-col px-2'>
                                <div class=" h-[1rem] my-[0.3rem] w-[5rem] bg-gray-300 rounded col-span-2"></div>
                                <div class=" h-[0.9rem] my-[0.3rem] w-[9rem] bg-gray-300 rounded col-span-2"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center items-center max-h-[89.4vh]'>
                </div>
            </div>
        </div>
    )
}

export default AdminLoader