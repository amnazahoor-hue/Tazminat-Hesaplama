"use client";

import Tilt from "react-parallax-tilt";
import { useMotionPrefs } from "../motion/useMotionPrefs";

export default function TiltCard({
  children,
  className = "",
  tiltMax = 8,
  scale = 1.03,
  glare = false,
  ...props
}) {
  const { enableTilt } = useMotionPrefs();

  if (!enableTilt) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <Tilt
      className={className}
      tiltMaxAngleX={tiltMax}
      tiltMaxAngleY={tiltMax}
      scale={scale}
      glareEnable={glare}
      perspective={1000}
      transitionSpeed={1200}
      {...props}
    >
      {children}
    </Tilt>
  );
}
