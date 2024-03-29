import React from "react"
import { SvgXml } from "react-native-svg"

export const Flash = ({ }) => {
    const xml = `
  <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 20V9L0 6V0H12V6L10 9V20H2ZM6 13.5C5.58333 13.5 5.22917 13.3542 4.9375 13.0625C4.64583 12.7708 4.5 12.4167 4.5 12C4.5 11.5833 4.64583 11.2292 4.9375 10.9375C5.22917 10.6458 5.58333 10.5 6 10.5C6.41667 10.5 6.77083 10.6458 7.0625 10.9375C7.35417 11.2292 7.5 11.5833 7.5 12C7.5 12.4167 7.35417 12.7708 7.0625 13.0625C6.77083 13.3542 6.41667 13.5 6 13.5ZM2 3H10V2H2V3ZM10 5H2V5.4L4 8.4V18H8V8.4L10 5.4V5Z" fill="#1C1B1F"/>
  </svg>
  `
    return <SvgXml xml={xml} />
}
