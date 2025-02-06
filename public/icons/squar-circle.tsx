import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <circle cx={10} cy={10} r={9.4} stroke="#fff" strokeWidth={1.2} />
    <mask id="a" fill="#fff">
      <rect width={8} height={8} x={6} y={6} rx={1} />
    </mask>
    <rect
      width={8}
      height={8}
      x={6}
      y={6}
      stroke="#fff"
      strokeWidth={2.4}
      mask="url(#a)"
      rx={1}
    />
  </svg>
)
export default SvgComponent
