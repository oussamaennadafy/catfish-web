import * as React from "react";
import { SVGProps } from "react";

const PlusThreePersonsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="M11 5.042a3.208 3.208 0 1 1 0 6.416 3.208 3.208 0 0 1 0-6.416ZM4.583 7.333c.514 0 .99.138 1.403.385a5.075 5.075 0 0 0 1.036 3.63 2.747 2.747 0 0 1-5.189-1.265 2.75 2.75 0 0 1 2.75-2.75Zm12.834 0a2.75 2.75 0 0 1 0 5.5 2.748 2.748 0 0 1-2.439-1.485 5.079 5.079 0 0 0 1.036-3.63c.413-.247.89-.385 1.403-.385ZM5.042 16.73c0-1.897 2.667-3.437 5.958-3.437 3.29 0 5.958 1.54 5.958 3.437v1.604H5.042V16.73ZM0 18.333v-1.375c0-1.274 1.732-2.346 4.08-2.658-.542.623-.872 1.485-.872 2.43v1.603H0Zm22 0h-3.208V16.73c0-.944-.33-1.806-.871-2.429 2.346.312 4.079 1.384 4.079 2.658v1.375Z"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      d="M17.417 4.583h3.666M19.25 6.417V2.75"
    />
  </svg>
)
export default PlusThreePersonsIcon
