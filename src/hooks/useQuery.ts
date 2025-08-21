import {useEffect, useReducer} from "react";

interface UseQueryOptions<TData> {
    initialData?: TData;
}

export function useQuery<TData = unknown, TError = unknown>(
    queryFn: () => Promise<TData>,
    options?: UseQueryOptions<TData>
) {
    const [state, dispatch] = useReducer<
        QueryState<TData, TError>,
        [QueryAction<TData, TError>]
    >(dataFetchReducer, {
        data: options?.initialData,
        status: "idle",
        error: undefined,
    });

    useEffect(() => {
        async function fetchData() {
            dispatch({type: "FETCH_START"});
            try {
                const result = await queryFn();
                dispatch({type: "FETCH_SUCCESS", payload: result});
            } catch (error) {
                dispatch({type: "FETCH_FAILED", payload: error as TError});
            }
        }

        fetchData();
    }, [queryFn]);


    return {
        ...state,
        isLoading: state.status === "loading",
        isError: state.status === "error",
        isSuccess: state.status === "success"
    };
}

type Status = "idle" | "loading" | "error" | "success"

interface QueryState<TData, TError> {
    data: TData | undefined;
    status: Status
    error: TError | undefined;
}

type QueryAction<TData, TError> =
    | { type: "FETCH_START" }
    | { type: "FETCH_SUCCESS"; payload: TData }
    | { type: "FETCH_FAILED"; payload: TError };

function dataFetchReducer<TData, TError>(
    state: QueryState<TData, TError>,
    action: QueryAction<TData, TError>
): QueryState<TData, TError> {
    switch (action.type) {
        case "FETCH_START":
            return {...state, status: "loading", error: undefined};
        case "FETCH_SUCCESS":
            return {
                ...state,
                data: action.payload,
                status: "success",
                error: undefined,
            };
        case "FETCH_FAILED":
            return {...state, status: "error", error: action.payload};
        default:
            return state;
    }
}
