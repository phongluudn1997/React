import { useCallback, useReducer } from "react";

export const useMutation = <
  TData = unknown,
  TVariables = unknown,
  TError = unknown
>(
  mutationFn: (variables: TVariables) => Promise<TData>
) => {
  const [state, dispatch] = useReducer<
    MutationState<TData, TError>,
    [MutationAction<TData, TError>]
  >(mutationReducer, {
    data: undefined,
    error: undefined,
    status: "idle",
  });

  const mutate = useCallback(
    async (variables: TVariables): Promise<TData> => {
      try {
        dispatch({ type: "MUTATION_STARTED" });
        const result = await mutationFn(variables);
        dispatch({ type: "MUTATION_SUCCESS", payload: result });
        return result;
      } catch (error) {
        dispatch({ type: "MUTATION_ERROR", payload: error as TError });
        throw error;
      }
    },
    [mutationFn]
  );

  return {
    ...state,
    mutate,
    isLoading: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
  };
};

interface MutationState<TData, TError> {
  data: TData | undefined;
  error: TError | undefined;
  status: "idle" | "pending" | "success" | "error";
}

type MutationAction<TData, TError> =
  | { type: "MUTATION_STARTED" }
  | { type: "MUTATION_SUCCESS"; payload: TData }
  | { type: "MUTATION_ERROR"; payload: TError };

const mutationReducer = <TData, TError>(
  prevState: MutationState<TData, TError>,
  action: MutationAction<TData, TError>
): MutationState<TData, TError> => {
  switch (action.type) {
    case "MUTATION_STARTED":
      return { ...prevState, status: "pending" };
    case "MUTATION_SUCCESS":
      return {
        ...prevState,
        status: "success",
        data: action.payload,
        error: undefined,
      };
    case "MUTATION_ERROR":
      return {
        ...prevState,
        status: "error",
        data: undefined,
        error: action.payload,
      };
  }
};
