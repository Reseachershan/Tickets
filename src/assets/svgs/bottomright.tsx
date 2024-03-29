
import React from "react"
import { SvgXml } from "react-native-svg"

export const Bottomright = ({ }) => {
    const xml = `
    <svg width="71" height="71" viewBox="0 0 71 71" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.830619 68.8355H63C66.3137 68.8355 69 66.1492 69 62.8355V0.666143" stroke="white" stroke-width="4"/>
    </svg>
    
  `
    return <SvgXml xml={xml} />
}
