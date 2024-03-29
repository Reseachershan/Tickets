
import React from "react"
import { SvgXml } from "react-native-svg"

export const Bottomleft = ({ }) => {
    const xml = `
    <svg width="71" height="71" viewBox="0 0 71 71" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M70.1694 68.8355H8C4.68629 68.8355 2 66.1492 2 62.8355V0.666143" stroke="white" stroke-width="4"/>
    </svg>
  `
    return <SvgXml xml={xml} />
}
