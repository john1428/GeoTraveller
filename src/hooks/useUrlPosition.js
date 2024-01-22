import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat") || 0;
  const lng = searchParams.get("lng") || 0;

  return [lat, lng];
}
