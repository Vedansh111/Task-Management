import React from 'react'

function Loader() {
    return (
        <div className='animate-pulse text-gray-800 font-inter font-sans tracking-wide'>
            {/* Sidebar */}
            <div className='fixed left-0 top-0 w-64 h-full bg-[#dfdbda] p-4 z-50 sidebar-menu transition-transform'>
                <div className="flex items-center pb-4 border-b border-b-gray-400">
                    <div className="flex items-center font-extrabold text-3xl text-transparent bg-slate-400 rounded-md">TaskNinja</div>
                </div>

                <ul className="mt-9 px-1">
                    <div className="bg-slate-400 w-[6rem]
                    font-bold mt-1 text-transparent rounded-md">ADMIN</div>
                    <li className="mb-1 group text-balance">
                        <div
                            className={`flex font-semibold items-center py-2 px-2 `}>
                            <i className="ri-home-2-line mr-3 text-lg"></i>
                            <span className="flex bg-slate-300 rounded-md h-[1rem] text-transparent">sd <span className='px-1'>asdasdasd</span></span>
                        </div>
                    </li >
                    <li className="mb-1 group text-balance">
                        <div
                            className={`flex font-semibold items-center py-2 px-2 `}>
                            <i className="ri-home-2-line mr-3 text-lg"></i>
                            <span className="flex bg-slate-300 rounded-md h-[1rem] text-transparent">sd <span className='px-1'>asdasdasd</span></span>
                        </div>
                    </li >

                    <div className="bg-slate-400 w-[6rem]
                    font-bold text-transparent rounded-md mt-5">ADMIN</div>
                    <li className="mb-1 group text-balance">
                        <div
                            className={`flex font-semibold items-center py-2 px-2 `}>
                            <i className="ri-home-2-line mr-3 text-lg"></i>
                            <span className="flex bg-slate-300 rounded-md h-[1rem] text-transparent">sd <span className='px-1'>asdasdasd</span></span>
                        </div>
                    </li >
                    <li className="mb-1 group text-balance">
                        <div
                            className={`flex font-semibold items-center py-2 px-2 `}>
                            <i className="ri-home-2-line mr-3 text-lg"></i>
                            <span className="flex bg-slate-300 rounded-md h-[1rem] text-transparent">sd <span className='px-1'>asdasdasd</span></span>
                        </div>
                    </li >
                </ul>
            </div>

            <main className={`w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-200 min-h-screen transition-all main `}>
                {/* Header */}
                <div
                    className="py-2 px-6 bg-[#f8f4f3] flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
                    <div
                        className="h-[2rem] text-lg border rounded-md p-1 text-gray-900 text-transparent bg-slate-200 font-semibold sidebar-toggle">
                        add
                    </div>

                    <ul className="ml-auto flex items-center">
                        <li className="dropdown ml-3">
                            <div
                                className="dropdown-toggle flex items-center">
                                <div className="flex-shrink-0 w-10 h-10 relative">
                                    <div className="p-1 bg-gray-300 rounded-full focus:outline-none w-10 h-10 focus:ring">
                                    </div>
                                </div>
                                <div className="p-2 md:block text-left">
                                    <h2 className="text-sm font-semibold rounded-md text-transparent bg-slate-200 w-[2rem] h-[1rem] mb-1">asd</h2>
                                    <p className="text-xs rounded-md text-transparent bg-slate-200">Administrator</p>
                                </div>
                            </div>

                        </li>
                    </ul>
                </div>
            </main>
        </div >
    )
}

export default Loader;