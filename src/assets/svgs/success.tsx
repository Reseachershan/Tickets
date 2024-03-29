import React from "react"
import { SvgXml } from "react-native-svg"

export const Success = ({ }) => {
    const xml = `
    <svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="28.5" cy="28.5" r="28.5" fill="#1EAE5F"/>
<mask id="mask0_1_5954" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="9" y="9" width="40" height="40">
<rect x="9" y="9" width="40" height="40" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_1_5954)">
<path d="M24.9165 39L15.4165 29.5L17.7915 27.125L24.9165 34.25L40.2082 18.9583L42.5832 21.3333L24.9165 39Z" fill="white"/>
</g>
</svg>
  `
    return <SvgXml xml={xml} />
}

