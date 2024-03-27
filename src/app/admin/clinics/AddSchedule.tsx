
import React, { HTMLProps } from "react";

interface GridProps extends HTMLProps<HTMLDivElement> {
    md?: string |number;
    sm?: string |number;
    lg?: string |number;
    className?: string;
    gap?: string;
    children?: React.ReactNode;
}

const Grid:React.FC<GridProps> = ({
    md ,
    sm ,
    lg ,
    className,
    gap ,
    children,
    ...props
}) =>{
    const small:string = `${sm?`grid-cols-${sm}`:''}`

    const gp :string =`gap-${gap}`
    const medium:string = `${md?`md:grid-cols-${md}`:''}`
    const large :string = `${lg?`lg:grid-cols-${lg}`:''}`

    return (
        <div className={`grid    w-full ${sm?`grid-cols-${sm}`:''} ${md?`md:grid-cols-${md}`:''} ${lg?`lg:grid-cols-${lg}`:''} ${className ?? ''} my-3`} {...props}>
            {children}
        </div>
    )
}

export default Grid











