import { SVGProps } from "react"

export const PolygonIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={252}
    height={252}
    viewBox="0 0 252 252"
    fill="none"
    {...props}
  >
    <mask
      id="a"
      style={{
        maskType: "luminance",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={252}
      height={252}
    >
      <path
        d="M125.999 251.394c69.254 0 125.394-56.141 125.394-125.394 0-69.253-56.14-125.394-125.394-125.394C56.746.606.605 56.746.605 126c0 69.253 56.141 125.394 125.394 125.394Z"
        fill="#fff"
      />
    </mask>
    <g mask="url(#a)">
      <path
        d="M263.267-11.267H-11.268v274.534h274.535V-11.267Z"
        fill="url(#b)"
      />
    </g>
    <path
      d="m162.264 153.059 35.477-20.485a6.099 6.099 0 0 0 3.041-5.273V86.335a6.116 6.116 0 0 0-3.041-5.273l-35.477-20.485a6.109 6.109 0 0 0-6.087 0L120.7 81.062a6.106 6.106 0 0 0-3.041 5.273v73.211l-24.878 14.362-24.878-14.362v-28.728l24.878-14.362 16.41 9.472v-19.271l-13.369-7.716a6.1 6.1 0 0 0-6.087 0l-35.477 20.485a6.1 6.1 0 0 0-3.041 5.274v40.965a6.116 6.116 0 0 0 3.041 5.273l35.477 20.485a6.119 6.119 0 0 0 6.087 0l35.477-20.48a6.104 6.104 0 0 0 3.041-5.273V92.459l.451-.256 24.427-14.106 24.878 14.362v28.728l-24.878 14.362-16.384-9.462v19.272l13.343 7.705a6.118 6.118 0 0 0 6.087 0v-.005Z"
      fill="#fff"
    />
    <defs>
      <linearGradient
        id="b"
        x1={-61.438}
        y1={11.297}
        x2={221.974}
        y2={184.732}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#A229C5" />
        <stop offset={1} stopColor="#7B3FE4" />
      </linearGradient>
    </defs>
  </svg>
)
