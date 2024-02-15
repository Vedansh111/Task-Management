import React from 'react'

function EventsLoader() {
    const tasks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <div className="animate-pulse w-[85%] h-[35rem] rounded-md sm:rounded-lg border shadow-lg mt-8">
            <div class="rounded-sm bg-gray-200 h-[3rem] w-[8rem] mb-[8px]"></div>
            <table className="w-full bg-[#ecf1e8]  text-center">
                <thead className=" bg-[#d5d7d3]">
                    <tr>
                        <td className='h-[3rem] w-[8rem] text-lg px-4 py-3'></td>
                        <td className='h-[3rem] w-[8rem] text-lg px-4 py-3'></td>
                        <td className='h-[3rem] w-[8rem] text-lg px-4 py-3'></td>
                        <td className='h-[3rem] w-[8rem] text-lg px-4 py-3'></td>
                        <td className='h-[3rem] w-[8rem] text-lg px-4 py-3'></td>
                        <td className='h-[3rem] w-[8rem] text-lg px-4 py-3'></td>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((val) => {
                        return (
                            <tr key={val.id} >
                                <td className=" h-[3rem] w-[8rem] px-4 py-4 text-lg font-semibold whitespace-nowrap"></td>
                                <td className="px-4 py-4 text-lg font-semibold whitespace-nowrap"></td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default EventsLoader