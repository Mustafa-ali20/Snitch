import { useState } from "react";
import { loaderState } from "../utils/loaderState";

export function useLoader() {
  const [isLoading] = useState(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (!hasVisited) {
      sessionStorage.setItem("hasVisited", "true");
      loaderState.setPlayed();
      return true;
    }
    return false;
  });

  return { isLoading };
}
