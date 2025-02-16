import React from 'react'

const Intro = () => {
    return (
        <div className='z-[40] w-full h-screen bg-zinc-900 pt-1'>
            <div className='IntroText mt-52 px-24 md:px-10 md:mt-[30vh]'>
                {["Learn by seeing", "not just reading", "See. Learn. Code."].map((item, index) => {
                    return (
                    <div key={index} className="masker">
                        <div className='w-fit flex items-end overflow-hidden'>
                            <h1 className="pt-[1.5vw] font-['SUSE SemiBold'] uppercase text-[8vw] leading-[.85] font-semibold">
                                {item}
                            </h1>
                        </div>
                    </div>
                    )
                })}

            </div>
            
        </div>

    )
}

export default Intro