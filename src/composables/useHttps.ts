import type { UseFetchOptions, AsyncData } from "nuxt/app";
import type { FetchError, FetchResponse, SearchParameters } from "ofetch";
import { hash } from "ohash";

export interface AxiosResponse<T> {
  data?: T;
  status: number;
  message: string;
  isSuccess: boolean;
}

type KeysOf<T> = Array<
  T extends T ? (keyof T extends string ? keyof T : never) : never
>;
// type PickFrom<T, K extends Array<string>> = T extends Array<any>
//   ? T
//   : T extends Record<string, any>
//   ? keyof T extends K[number]
//     ? T
//     : K[number] extends never
//     ? T
//     : Pick<T, K[number]>
//   : T;

type UrlType =
  | string
  | Request
  | Ref<string | Request>
  | (() => string | Request);
type $TSFixed = any; // Fix the TypeScript error

interface ResOptions<T> {
  data?: T;
  status: number;
  message: string;
  isSuccess: boolean;
}

export type HttpOption<T> = UseFetchOptions<
  ResOptions<T>,
  T,
  KeysOf<T>,
  $TSFixed
>;

function handleError<T>(
  _method: string | undefined,
  _response: FetchResponse<ResOptions<T>> & FetchResponse<ResponseType>
) {
  // Handle the error
}

function checkRef(obj: Record<string, any>) {
  return Object.keys(obj).some((key) => isRef(obj[key]));
}
function fetch<T>(url: UrlType, opts: HttpOption<T>) {
  // Check the `key` option
  const { key, params, watch } = opts;
  if (!key && ((params && checkRef(params)) || (watch && checkRef(watch))))
    console.error(
      "\x1B[31m%s\x1B[0m %s",
      "[useHttp] [error]",
      "The `key` option is required when `params` or `watch` has ref properties, please set a unique key for the current request."
    );

  const options = opts as UseFetchOptions<ResOptions<T>>;
  options.lazy = options.lazy ?? true;

  // const { apiBase } = useRuntimeConfig().public;

  return useFetch<ResOptions<T>>(url, {
    // Request interception
    onRequest({ options }) {
      // Set the base URL
      const {
        public: { apiBase },
      } = useRuntimeConfig();

      if (apiBase && typeof apiBase === "string") options.baseURL = apiBase;
      // Set the request headers
      // const { $i18n } = useNuxtApp()
      // const locale = $i18n.locale.value
      options.headers = {
        "Content-Type": "application/json",
      };
      options.headers = new Headers(options.headers);
      // options.headers.set('Content-Language', locale)
    },
    // Response interception
    onResponse(_context) {
      // Handle the response
    },
    // Error interception
    onResponseError({ response, options: { method } }) {
      handleError<T>(method, response);
    },
    // Set the cache key
    key: key ?? hash(["api-fetch", url, JSON.stringify(options)]),
    // Merge the options
    ...options,
  }) as AsyncData<ResOptions<T>, FetchError<ResOptions<T>> | null>;
}
const baseUrl = "/api";
export const useHttp = {
  get: <T>(url: UrlType, params?: SearchParameters, option?: HttpOption<T>) => {
    url = baseUrl + url;
    let str = "";
    Object.entries(params as object).forEach(function ([key, value], index) {
      if (index === 0) str += `${key}=${value}`;
      else str += `&${key}=${value}`;
    });
    // console.log(
    //   "method:" +
    //     "get" +
    //     " || url:" +
    //     `${url}?${str}` +
    //     " || data:" +
    //     JSON.stringify(params)
    // );

    return fetch<T>(`${url}?${str}`, {
      method: "get",
      params,
      ...option,
    });
  },

  post: <T>(
    url: UrlType,
    body?: RequestInit["body"] | Record<string, any>,
    option?: HttpOption<T>
  ) => {
    return fetch<T>(url, { method: "post", body, ...option });
  },

  patch: <T>(
    url: UrlType,
    body?: RequestInit["body"] | Record<string, any>,
    option?: HttpOption<T>
  ) => {
    return fetch<T>(url, { method: "patch", body, ...option });
  },

  delete: <T>(
    url: UrlType,
    body?: RequestInit["body"] | Record<string, any>,
    option?: HttpOption<T>
  ) => {
    return fetch<T>(url, { method: "delete", body, ...option });
  },
};
