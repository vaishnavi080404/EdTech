// src/components/common/ScrollToTop.jsx

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  // Extracts the pathname from the current location object
  const { pathname } = useLocation();

  useEffect(() => {
   
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  
  return null;
}