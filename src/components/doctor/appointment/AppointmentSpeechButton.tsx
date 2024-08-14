'use client'
import React from "react";
import SpeechIcon from "@/components/icons/SpeechIcon";
import {swal} from "@/Helpers/UIHelpers";
import {toast} from "react-toastify";
import Swal from "sweetalert2";


const AppointmentSpeechButton = ({message, language}: { message: string, language: string }) => {
    const voices = window.speechSynthesis.getVoices();

    const speak = () => {
        const hasArabicVoice = voices.some(voice => voice.lang.startsWith('ar-SA'));
        if (!hasArabicVoice && language == "ar-SA") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "ليس لديك اللغة العربية على جهازك!" +
                    " يرجى اتباع الخطوات التي في " +
                    "الرابط لأضافة اللغة العربية" ,
                footer: '<a href="https://support.microsoft.com/en-us/topic/download-languages-and-voices-for-immersive-reader-read-mode-and-read-aloud-4c83a8d8-7486-42f7-8e46-2b0fdf753130#:~:text=change%20voice%20settings%3A-,Open%20the%20Start%20menu%20on%20your%20Windows%20device%20and%20select,to%20choose%20your%20desired%20language.">Add Arabic Lang</a>'
            });
            Swal.fire("ليس لديك اللغة العربية على جهازك!" +
                "يرجى اتباع الخطوات التي في " +
                "الرابط لأضافة اللغة العربية" +
                "");
        }
        if (!('speechSynthesis' in window)) {
            swal.fire("error", "Sorry your browser doesn't support text to speech ! try updating your browser", "error");
            return;
        }
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.lang = language;
        utterance.rate = 0.8
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