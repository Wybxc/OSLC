import { useEffect, useState } from 'react';

export default function useFetch<T>(
  api: string,
  parse?: (data: any) => T
): T | null {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then(({ data }) => setData(parse ? parse(data) : data));
  }, [api, parse]);
  return data;
}
