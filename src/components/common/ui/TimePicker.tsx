

type TimePicker={
    lable?:string,
    id:string,
    register:any,
    errors?:any
}


const TimePicker = (props:TimePicker)=>{


    return (
        <div className='flex flex-col pl-2'>
            <label className='label'>{props.lable}</label>
            <input id={props.id} type='time' {...props.register(props.id)} className='w-32 px-3 rounded-2xl outline-0 focus:outline-blue-500'/>
        </div>
    )
}

export default TimePicker