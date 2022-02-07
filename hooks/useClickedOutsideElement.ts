import { useEffect, useState } from "react";

type IProps = {
  ref: any;
  ifShouldCheck: boolean;
};
const useOutsideClickDetector = ({ ref, ifShouldCheck }: IProps): boolean => {
  const [ClickDetectedOutside, setClickDetectedOutside] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        if (ifShouldCheck) setClickDetectedOutside(true);
      } else {
        setClickDetectedOutside(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return ClickDetectedOutside;
};

export default useOutsideClickDetector;