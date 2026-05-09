import { useState } from "react";

export function useLoader() {
  const [isLoading] = useState(true); // always plays on mount/reload
  return { isLoading };
}
