import FacebookIcon from "@/components/icons/FacebookIcon";
import InstagramIcon from "@/components/icons/instaIcon";
import TwitterIcon from "@/components/icons/TwitarIcon";


const EndLine = ()=>{



    return (
        <div className={'border-t-2 border-[#013567] flex justify-around'}>
            <div className={'flex my-6'}>
                <h2 className={'text-[20px] font-bold'}>Planet of Medicine</h2>
                <p className={'text-[20px] font-light'}> - All rights reserved.</p>
            </div>
            <div className={'flex gap-3 my-6'}>
                <FacebookIcon/>
                <InstagramIcon/>
                <TwitterIcon />
            </div>
        </div>
    )
}

export default EndLine