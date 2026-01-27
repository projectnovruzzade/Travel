import { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} | Travel` : "Travel";
  }, [title]);
};

export default usePageTitle;
