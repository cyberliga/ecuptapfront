import {
    useQuery as useReactQuery,
    useMutation as useMutatuinReactQuery,
    useQueryClient,
} from "@tanstack/react-query";
const baseUrl = "https://9l5i5ge0o9.execute-api.us-east-1.amazonaws.com"


export const getHeaders = () => {
    return {
        "Content-Type": "application/json",
    };
};

type MethodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type MutationType = {
    path?: string;
    method: MethodType;
    queryKeyRefetch?: string[];
    token?: boolean;
};
type FetcherType<T> = {
    args?: T;
    path?: string;
    method: MethodType;
    token?: boolean;
};


export const getQuery = async <T>(path: string) => {

    const endpoint = `${baseUrl}${path}`;
    const res = await fetch(endpoint, {
        headers: getHeaders()
    });
    console.log(res)
    if (res.status !== 204) {
        return res.json().then((r) => r);
    }
};


export const useQuery = <T>(path: string, skip?: boolean) => {
    const { data, isLoading, refetch } = useReactQuery<T>({
        queryKey: [path],
        queryFn: () => getQuery<T>(path),
        refetchInterval: Infinity,
        staleTime: Infinity,
        enabled: skip,
    });
    return { data, isLoading, refetch };
};



export const fetcher = async <T>(
    config: FetcherType<{ args?: T; pathWithParams?: string }>,
) => {
    const { method, path, args, token } = config;
    // const { args: mutationArgs, pathWithParams } = args;
    return await fetch(`${baseUrl}${args?.pathWithParams ? args?.pathWithParams : path}`, {
        method,
        headers: token ? getHeaders() : { "Content-Type": "application/json" },
        body: JSON.stringify(args?.pathWithParams),
    });
};

export const useMutation = <T>(config: MutationType) => {
    const { path, method, token, queryKeyRefetch } = config;
    const queryClient = useQueryClient();
    const {
        mutateAsync: mutate,
        isPending: loading,
        data,
        error,
        status,
    } = useMutatuinReactQuery({
        mutationFn: (args?: { args: T; pathWithParams?: string }) =>
            fetcher<T>({ path, method, args, token }),
        onError: (error) => {
            console.log(error);
        },
        onSuccess: () => {
            queryKeyRefetch?.forEach((f) =>
                queryClient.invalidateQueries({ queryKey: [f] }),
            );
        },
    });
    return {
        mutate,
        loading,
        data,
        error,
        status,
    };
};