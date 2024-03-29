
import React from "react"
import { SvgXml } from "react-native-svg"

export const Next = ({ }) => {
    const xml = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.35" d="M20 5V19C20 20.657 18.657 22 17 22H7C5.343 22 4 20.657 4 19V5C4 3.343 5.343 2 7 2H17C18.657 2 20 3.343 20 5Z" fill="black"/>
<path d="M18 10H11C9.895 10 9 10.895 9 12C9 13.105 9.895 14 11 14H18V10Z" fill="black"/>
<path d="M16.579 16.131C16.579 16.902 17.509 17.29 18.057 16.747L21.95 12.891C22.445 12.4 22.445 11.6 21.95 11.109L18.057 7.25299C17.509 6.71099 16.579 7.09899 16.579 7.86899V16.131Z" fill="black"/>
</svg>
  `
    return <SvgXml xml={xml} />
}
