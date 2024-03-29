
import React from "react"
import { SvgXml } from "react-native-svg"

export const Error = ({ }) => {
    const xml = `
    <svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="28.5" cy="28.5" r="28.5" fill="#BA1A1A"/>
    <mask id="mask0_1_5956" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="8" y="9" width="40" height="40">
    <rect x="8" y="9" width="40" height="40" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_1_5956)">
    <path d="M18.6666 40.6667L16.3333 38.3333L25.6666 29L16.3333 19.6667L18.6666 17.3333L27.9999 26.6667L37.3333 17.3333L39.6666 19.6667L30.3333 29L39.6666 38.3333L37.3333 40.6667L27.9999 31.3333L18.6666 40.6667Z" fill="white"/>
    </g>
    </svg>
  `
    return <SvgXml xml={xml} />
}
