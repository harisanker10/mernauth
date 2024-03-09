import { apiSlice } from "../apiSlice";
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signup",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    adminLogin: builder.mutation({
      query: (credentials) => ({
        url: "/auth/admin/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useAdminLoginMutation, useSignupMutation, useLoginMutation } = authApiSlice;
