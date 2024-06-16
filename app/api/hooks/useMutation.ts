import { baseUrl, getHeaders } from "./utils";
import {
    useQuery as useReactQuery,
    useMutation as useMutatuinReactQuery,
    useQueryClient,
} from "@tanstack/react-query";

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

export const fetcher = async <T>(
    config: FetcherType<{ args?: T; pathWithParams?: string }>,
) => {
    const { method, path, args, token } = config;
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