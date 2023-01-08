import { useState } from "react";

const useComerse = () => {
  //!Filters
  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState(true);
  return { open1, open2, setOpen1, setOpen2 };
};

export default useComerse;
