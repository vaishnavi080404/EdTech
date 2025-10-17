// src/components/common/ScrollToTop.jsx

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  // Extracts the pathname from the current location object
  const { pathname } = useLocation();

  // This useEffect hook will run every time the pathname changes
  useEffect(() => {
    // "document.documentElement.scrollTo" is the key to the solution
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Optional: Use "auto" or "instant" for abrupt scrolling
    });
  }, [pathname]);

  // This component does not render anything to the DOM
  return null;
}