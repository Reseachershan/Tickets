

import React from "react"
import { SvgXml } from "react-native-svg"

export const Topleft = ({ }) => {
    const xml = `
    <svg width="71" height="71" viewBox="0 0 71 71" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M70.1694 2.0961H8C4.68629 2.0961 2 4.78239 2 8.0961V70.2655" stroke="white" stroke-width="4"/>
    </svg>
    
  `
    return <SvgXml xml={xml} />
}
