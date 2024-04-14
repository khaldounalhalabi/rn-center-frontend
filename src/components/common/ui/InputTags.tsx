
import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import {useFormContext} from "react-hook-form";




const InputTags = ({
    name,
                       label,
                       defaultValue
                   }:{
    name:string
    label?:string
    defaultValue?:string[]
})=>{
    const [selected, setSelected] = useState<string[]>(defaultValue?defaultValue:[]);

    const {
        setValue,
        formState: { errors },
    } = useFormContext();
    setValue(name,selected)
    return (
        <div>
            {label? <label className='label'>{label}</label>:false}
            <TagsInput
                value={selected}
                onChange={setSelected}
                name="fruits"
                placeHolder="enter fruits"

            />
        </div>
    )
}

export default InputTags