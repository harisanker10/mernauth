import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { removeToken, setToken, setUser } from "./auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 403) {
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    console.log("sending refresh token");
    if (refreshResult.data) {
      api.dispatch(setToken(refreshResult.data.token));
    } else {
      api.dispatch(removeToken());
      api.dispatch(setUser(null));
    }
    result = await baseQuery(args, api, extraOptions);
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: (build) => ({}),
});
