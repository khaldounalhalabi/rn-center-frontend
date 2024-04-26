import React from "react";

interface SVGPropsWithRef extends React.SVGProps<SVGSVGElement> {
  ref?: React.Ref<SVGSVGElement>;
}

export interface IconAttributes extends SVGPropsWithRef {
  className?: string;
}
