
import React from "react";
import SpeechIcon from "@/components/icons/SpeechIcon";
import {swal} from "@/Helpers/UIHelpers";
import { toast } from "react-toastify";


const AppointmentSpeechButton = ({ message, language }:{ message:string, language:string })=>{

    const speak = () => {
        if (!('speechSynthesis' in window)) {
            swal.fire("error" , "Sorry your browser doesn't support text to speech ! try updating your browser" , "error");
            return;
        }
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.lang = language;
        utterance.rate =0.8
        window.speechSynthesis.speak(utterance);
        return toast("Called!")
    };


    return (
        <button className="btn btn-sm btn-square">
            <SpeechIcon
                className="w-6 h-6 text-black"
                onClick={speak}
            />
        </button>
    )
}

export default AppointmentSpeechButton