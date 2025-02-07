import * as React from "react";
import { SVGProps } from "react";

const TwoPersonsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="M14.667 15.583v1.834H1.833v-1.834s0-3.666 6.417-3.666 6.417 3.666 6.417 3.666Zm-3.209-8.708a3.209 3.209 0 1 0-6.417 0 3.209 3.209 0 0 0 6.417 0Zm3.154 5.042a4.878 4.878 0 0 1 1.888 3.666v1.834h3.667v-1.834s0-3.327-5.555-3.666Zm-.862-8.25a3.116 3.116 0 0 0-1.77.54 4.583 4.583 0 0 1 0 5.335 3.116 3.116 0 0 0 1.77.541 3.208 3.208 0 1 0 0-6.416Z"
    />
  </svg>
)
export default TwoPersonsIcon
