import { SVGProps } from "react"

export const TokenScriptIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={60}
    height={60}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="#fff" d="M0 0h60v60H0z" />
    <g clipPath="url(#a)">
      <path d="M57 11.563h-5.69v37.62H57v-37.62Z" fill="#0019FF" />
      <path
        d="M45.892 32.653v3.163l-18.818 9.7v-4.908l12.856-6.325-12.856-6.306V23.05l18.818 9.604ZM3 35.738v-3.163l18.837-9.701v4.928L8.962 34.108l12.875 6.325v4.909L3 35.738Z"
        fill="#000"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" transform="translate(3 11)" d="M0 0h54v38H0z" />
      </clipPath>
    </defs>
  </svg>
)
