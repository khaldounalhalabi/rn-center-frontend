'use client'
import {SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import {AuthService} from "@/services/AuthService";
import {ScheduleService} from "@/services/ScheduleService";
import TimePicker from "@/components/common/ui/TimePicker";
import FormContainer from "@/components/common/ui/FormContenar";
import {useState} from "react";

type FormType = {
    clinic_id:string
    date:FormTime[]
}
type DayOfWeek = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat" ; // Added type alias for weekdays

type FormTime = {
    day: DayOfWeek; // Ensures day is one of the weekdays
    time:[
        {
            start_time: string;
            end_time: string;
        }
    ]
};
const page = ()=>{

    const form = useForm<FormType>({
        defaultValues: {
            clinic_id:'',
            date:[
                {
                    day:'sun',
                    time:[
                        {
                            start_time:'00:00',
                            end_time:'00:00'
                        }
                    ]
                },
                {
                    day:'mon',
                    time:[
                        {
                            start_time:'00:00',
                            end_time:'00:00'
                        }
                    ]
                },
                {
                    day:'tue',
                    time:[
                        {
                            start_time:'00:00',
                            end_time:'00:00'
                        }
                    ]
                },
                {
                    day:'wed',
                    time:[
                        {
                            start_time:'00:00',
                            end_time:'00:00'
                        }
                    ]
                },
                {
                    day:'thu',
                    time:[
                        {
                            start_time:'00:00',
                            end_time:'00:00'
                        }
                    ]
                },
                {
                    day:'fri',
                    time:[
                        {
                            start_time:'00:00',
                            end_time:'00:00'
                        }
                    ]
                },
                {
                    day:'sat',
                    time:[
                        {
                            start_time:'00:00',
                            end_time:'00:00'
                        }
                    ]
                },
            ]
        },
    });
    const days = [ "sun" , "mon" , "tue" , "wed" ,"thu" ,"fri" , "sat"  ]
    const [selectTime , setSelectTime] = useState(0)

    const { formState, register,control, handleSubmit } = form;
    const { errors } = formState;
    const { fields, append, remove } = useFieldArray(
        { name:`date.${selectTime}.time`,control});
    const { mutate, isPending, data } = useMutation({
        mutationKey: ['Schedule'],
        mutationFn: async (dataForm: FormType) => {
            return await ScheduleService.make().store(dataForm)
        },
    });
    const onSubmit: SubmitHandler<FormType> = (dataForm: FormType) => {
        console.log(dataForm)
        // mutate(dataForm);
    };

    return (
        <div>
            <div>
                <h2>Add Doctor Schedule</h2>
            </div>

            <div className='w-full'>
                <div className='card m-3 p-5 bg-white rounded-2xl'>
                    <div className='w-full h-24 flex justify-start'>
                        <img src='' alt='' className='w-16 h-16 mr-2'/>
                        <h4>Mohammad</h4>
                    </div>
                    <FormContainer
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-full flex flex-col "
                        noValidate
                    >
                        {
                            days.map((e,index)=>{

                                return (
                                    <div key={index} className='w-full h-16'>
                                        <p>{e}</p>
                                        <div>
                                            {fields.map((e,index)=>{
                                                return (
                                                    <div key={e.id} className='flex flex-col'>
                                                        <TimePicker id={`date.${selectTime}.start_time`} register={register}/>
                                                        <TimePicker id={`date.${selectTime}.end_time`} register={register}/>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </FormContainer>
                </div>
            </div>

        </div>
    )


}

export default page