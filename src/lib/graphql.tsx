import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  PropsWithChildren,
  useCallback,
} from 'react';
import {ExecutionResult, GraphQLError} from 'graphql';

import mergeDeepLeft from './mergeDeepLeft';

export const gql = String.raw;
export type GraphQLQuery = string;
export type GraphQLVariables = {[key: string]: any};

// Apollo uses observables and has structure too complex for the matter
// Simplier client is simplier to expand

export interface GraphQLCache {
  set: (
    query: GraphQLQuery,
    variables: {[key: string]: any},
    result: ExecutionResult,
  ) => any;
  get: (
    query: GraphQLQuery,
    variables: {[key: string]: any},
  ) => ExecutionResult | undefined;
}

export interface GraphQLClient {
  query: (query: GraphQLQuery, variables: GraphQLVariables) => any;
  mutate: (query: GraphQLQuery, variables: {[key: string]: any}) => any;
  cache?: GraphQLCache;
}

export function client(
  url: string,
  options: {
    fetchOptions?: (
      query: GraphQLQuery,
      variables: {[key: string]: any},
    ) => Partial<Request>;
    cache?: GraphQLCache;
  } = {},
) {
  const execute = async (
    query: GraphQLQuery,
    variables: {[key: string]: any},
  ): Promise<ExecutionResult> => {
    const cachedResult = await options.cache?.get(query, variables);
    if (cachedResult) return cachedResult;
    const makeOptions = (
      query: GraphQLQuery,
      variables: {[key: string]: any},
    ) => {
      const defaultOptions = {
        method: 'POST',
        body: JSON.stringify({query, variables}),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      if (!options.fetchOptions) return defaultOptions;
      return mergeDeepLeft(
        defaultOptions,
        options.fetchOptions(query, variables),
      );
    };
    return fetch(url, makeOptions(query, variables)).then(async (res) => {
      const result = await res.json();
      options.cache?.set(query, variables, result);
      return result;
    });
  };

  const query = execute;
  const mutate = execute;

  return {
    query,
    mutate,
    cache: options.cache,
  };
}

//TODO: add subscription
//TODO: observe and update changes by id - if one of the queries returned updated result it should update everywhere

export class QueryCache implements GraphQLCache {
  store = new Map<string, any>();
  set(
    query: GraphQLQuery,
    variables: {[key: string]: any},
    result: ExecutionResult,
  ) {
    this.store.set(JSON.stringify({query, variables}), result);
  }
  get(
    query: GraphQLQuery,
    variables: {[key: string]: any},
  ): ExecutionResult | undefined {
    return this.store.get(JSON.stringify({query, variables}));
  }
}

export const GraphQLContext = createContext<GraphQLClient>({
  query: () => {},
  mutate: () => {},
});

export const useQuery = (
  query: GraphQLQuery,
  options?: {variables?: GraphQLVariables},
) => {
  const {query: runQuery, cache} = useContext(GraphQLContext);

  const defaultState: any = {loading: true};
  if (cache) {
    // Try to get Server cache
    const data = cache.get(query, options?.variables || {});
    if (data && data.data) {
      defaultState.loading = false;
      defaultState.data = data.data;
    }
  }
  const [state, setState] = useState<{
    data?: any;
    errors?: readonly GraphQLError[];
    loading: boolean;
  }>(defaultState);

  const optionsChanged = JSON.stringify(options);

  const refetch = useCallback(
    async (params?: GraphQLVariables) => {
      setState({data: undefined, errors: undefined, loading: true});
      return runQuery(query, mergeDeepLeft(params, options?.variables)).then(
        ({data, errors}: ExecutionResult) => {
          setState({data, errors, loading: false});
          return {data, errors};
        },
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query, runQuery, optionsChanged],
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {...state, refetch};
};

export const useLazyQuery = (
  query: GraphQLQuery,
  options: {variables: GraphQLVariables},
) => {
  const [state, setState] = useState<{
    data?: any;
    errors?: readonly GraphQLError[];
    loading: boolean;
  }>({loading: true});
  const {query: performQuery} = useContext(GraphQLContext);
  const defaultVariables = options.variables;

  const fetchData = useCallback(
    (params?: GraphQLVariables) => {
      performQuery(query, mergeDeepLeft(params, defaultVariables)).then(
        ({data, errors}: ExecutionResult) => {
          setState({data, errors, loading: false});
        },
      );
    },
    [defaultVariables, performQuery, query],
  );
  return [fetchData, state];
};

export type OperationState = {
  data?: any;
  errors?: readonly GraphQLError[];
  loading: boolean;
};

export const useMutation = (
  query: GraphQLQuery,
  variables: GraphQLVariables,
): [
  (params?: GraphQLVariables) => Promise<{data?: any; errors?: string[]}>,
  OperationState,
] => {
  const [state, setState] = useState<OperationState>({loading: true});
  const client = useContext(GraphQLContext);
  const mutate = (params?: GraphQLVariables) => {
    return client
      .mutate(query, mergeDeepLeft(params, variables))
      .then(({data, errors}: ExecutionResult) => {
        setState({data, errors, loading: false});
        return {data, errors};
      });
  };

  return [mutate, state];
};

export function GraphQLProvider({
  children,
  client,
  cache,
}: PropsWithChildren<{
  client: GraphQLClient;
  cache?: GraphQLCache;
}>) {
  return (
    <GraphQLContext.Provider value={{...client, cache}}>
      {children}
    </GraphQLContext.Provider>
  );
}
export type Mocks = {[query: string]: (variables: any) => any};

export function mockClient(
  mocks: Mocks,
  options: {
    cache?: GraphQLCache;
  } = {},
) {
  const exec = async (query: GraphQLQuery, variables: {[key: string]: any}) => {
    const cached = await options.cache?.get(query, variables);

    if (cached) return cached;
    if (!mocks[query]) {
      console.warn(`Operation is not mocked`, query);
      return {data: undefined};
    }

    const result = mocks[query](variables);
    options.cache?.set(query, variables, result);
    return result;
  };

  return {query: exec, mutate: exec, cache: options?.cache};
}

export class Cache implements GraphQLCache {
  store = new Map<string, any>();
  set(
    query: GraphQLQuery,
    variables: {[key: string]: any},
    result: ExecutionResult,
  ) {
    // try {
    //   const t = parse(query);
    //   console.log(t);
    // } catch (error) {
    //   console.error(error);
    // }
  }
  get(
    query: GraphQLQuery,
    variables: {[key: string]: any},
  ): ExecutionResult | undefined {
    return undefined;
  }
}
