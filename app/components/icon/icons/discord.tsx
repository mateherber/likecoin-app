import * as React from "react"
import { Svg, SvgProps, Path } from "react-native-svg"

export function DiscordIcon(props: SvgProps) {
  return (
    <Svg 
      viewBox="0 0 24 24"
      {...props}
    >
      <Path
        fill={props.color}
        d="M14.48 16c.35.45.77.95.77.95a4.28 4.28 0 003.58-1.78 15.59 15.59 0 00-1.69-6.81 5.8 5.8 0 00-3.28-1.23l-.17.19a7.93 7.93 0 012.92 1.48 9.7 9.7 0 00-3.52-1.12 10.27 10.27 0 00-2.36 0 1.38 1.38 0 00-.2 0 8.54 8.54 0 00-2.66.73c-.43.2-.69.34-.69.34a7.93 7.93 0 013.08-1.53l-.12-.14a5.8 5.8 0 00-3.28 1.24 15.59 15.59 0 00-1.69 6.81 4.25 4.25 0 003.57 1.78l.78-1a3.66 3.66 0 01-2-1.38s.11.08.32.2l.11.06a6.43 6.43 0 00.85.4 9.64 9.64 0 001.72.5 8 8 0 003 0 7.24 7.24 0 001.7-.5 6.35 6.35 0 001.34-.69 3.65 3.65 0 01-2.08 1.5zm-4.67-1.95a1.31 1.31 0 010-2.6 1.3 1.3 0 010 2.6zm4.27 0a1.26 1.26 0 01-1.19-1.3 1.19 1.19 0 111.19 1.3z"
      />
    </Svg>
  )
}

