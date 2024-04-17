
import baguetteBox from 'baguettebox.js';




const ShowImge = ({
                      defaultValue
}:{
    defaultValue:string[]
})=>{
    baguetteBox.run('.gallery');
    return (
        <>
            <div className="gallery">
                <a href="img/2-1.jpg" data-caption="Image caption">
                    <img src="img/thumbnails/2-1.jpg" alt="First image"/>
                </a>
                <a href="img/2-2.jpg">
                    <img src="img/thumbnails/2-2.jpg" alt="Second image"/>
                </a>
                ...
            </div>
        </>
    )
}

export default ShowImge