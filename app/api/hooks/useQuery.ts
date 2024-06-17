import { useQuery as useReactQuery } from "@tanstack/react-query";
import { baseUrl, getHeaders } from "./utils";


export const getQuery = async <T>(path: string) => {
    const endpoint = `${baseUrl}${path}`;
    const res = await fetch(endpoint, {
        headers: getHeaders()
    });
    if (res.status !== 204) {
        return res.json().then((r) => r);
    }
};

export const useQuery = <T>(path: string, skip?: boolean) => {
    const { data, isLoading, refetch, error } = useReactQuery<T>({
        queryKey: [path],
        queryFn: () => getQuery<T>(path),
        enabled: skip,
    });
    return { data, isLoading, refetch, error };
};