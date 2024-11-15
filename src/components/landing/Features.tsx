


const Features = ()=>{


    return (
        <div className={'w-full my-6 flex flex-col items-center gap-12'}>
            <div className={'w-full flex flex-col gap-2 items-center'}>
                <p className={'opacity-60 text-[20px] lg:text-[20px] md:text-[15px] 2xl:text-[20px]'}>Introducing some</p>
                <div className={'text-[20px] lg:text-[20px] md:text-[15px] 2xl:text-[20px] flex gap-1'}><h2 className={'font-bold'}>POM</h2><h3>Features</h3></div>
            </div>
            <div className={' w-[95%] md:w-[90%] lg:w-[80%] flex flex-col gap-12 text-[20px] lg:text-[20px] md:text-[15px] 2xl:text-[20px]'}>
                <div className={'flex gap-6 justify-between'}>
                    <img src={'/tab2.png'} alt={'..'} className={'hidden md:block object-contain w-[40%]'}/>
                    <div className={'flex flex-col gap-6 w-full md:w-1/2'}>
                        <img src={'/nots.png'} alt={'..'} className={'w-[50px] h-[50px] '}/>
                        <h2>Full patient record</h2>
                        <p className={' text-[15px] opacity-80 font-extralight'}>Access detailed patient histories, treatment plans, and notes all in one place for better care and quicker decision-making.</p>
                    </div>
                </div>
                <div className={'flex gap-6 justify-between'}>
                    <img src={'/tab1.png'} alt={'..'} className={'hidden md:block object-contain w-[40%]'}/>
                    <div className={'flex flex-col gap-6 w-full md:w-1/2'}>
                        <img src={'/calender.png'} alt={'..'} className={'w-[50px] h-[50px] '}/>
                        <h2>Control all
                            appointments</h2>
                        <p className={' text-[15px] opacity-80 font-extralight'}>Easily manage patient appointments, reduce wait times, and ensure a smooth schedule with just a few clicks.</p>
                    </div>
                </div>
                <div className={'flex gap-6 justify-between'}>
                    <img src={'/tab3.png'} alt={'..'} className={'hidden md:block object-contain w-[40%]'}/>
                    <div className={'flex flex-col gap-6 w-full md:w-1/2'}>
                        <img src={'/balanc.png'} alt={'..'} className={'w-[50px] h-[50px] '}/>
                        <h2>Financial transactions
                            tracking</h2>
                        <p className={' text-[15px] opacity-80 font-extralight'}>Keep track of all clinic transactions, from billing to payments, in real-time to ensure financial clarity and control.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features