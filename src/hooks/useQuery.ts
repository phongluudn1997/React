import {useEffect, useReducer} from "react";

interface UseQueryOptions<TData> {
    initialData?: TData
}

export function useQuery<TData = unknown, TError = unknown>(
    queryFn: () => Promise<TData>,
    options?: UseQueryOptions<TData>
) {
    const [state, dispatch] = useReducer<QueryState<TData, TError>, [QueryAction<TData, TError>]>(dataFetchReducer, {
        data: options?.initialData,
        loading: false,
        error: undefined
    })

    useEffect(() => {
        async function fetchData() {
            dispatch({type: "FETCH_START"})
            try {
                const result = await queryFn()
                dispatch({type: "FETCH_SUCCESS", payload: result})
            } catch (error) {
                dispatch({type: "FETCH_FAILED", payload: error as TError})
            }
        }

        fetchData();
    }, [queryFn]);

    return state
};

interface QueryState<TData, TError> {
    data: TData | undefined;
    loading: boolean;
    error: TError | undefined
}

type QueryAction<TData, TError> =
    { type: "FETCH_START" } |
    { type: "FETCH_SUCCESS", payload: TData } |
    { type: "FETCH_FAILED", payload: TError }

function dataFetchReducer<TData, TError>(state: QueryState<TData, TError>, action: QueryAction<TData, TError>): QueryState<TData, TError> {
    switch (action.type) {
        case "FETCH_START":
            return {...state, loading: true, error: undefined};
        case "FETCH_SUCCESS":
            return {...state, data: action.payload, loading: false, error: undefined};
        case "FETCH_FAILED":
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}
