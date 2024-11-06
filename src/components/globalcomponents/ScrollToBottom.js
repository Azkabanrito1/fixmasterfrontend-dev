import React, { useEffect, useRef } from "react";

function ScrollToBottom() {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
}

export default ScrollToBottom;
