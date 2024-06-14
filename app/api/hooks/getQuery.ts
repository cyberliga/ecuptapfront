const baseUrl = "https://9l5i5ge0o9.execute-api.us-east-1.amazonaws.com"


export const getHeaders = () => {
    return {
        "Content-Type": "application/json",
    };
};
type GetQueryType = {
    path: string;
    token?: boolean;
};

export const getQuery = <T>({ path, token }: GetQueryType) => {
    const endpoint = `${baseUrl}${path}`;
    const res = fetch(endpoint, {
        headers: getHeaders()
    });
    return res.then((r) => r.json() as T);
};