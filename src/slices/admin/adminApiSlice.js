import { apiSlice } from "../apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.mutation({
      query: () => ({
        url: "/admin/users",
        method: "GET",
      }),
    }),
    blockUser: builder.mutation({
      query: (users) => ({
        url: "/admin/users/block",
        method: "POST",
        body: { users },
      }),
    }),
    unBlockUser: builder.mutation({
      query: (users) => ({
        url: "/admin/users/unblock",
        method: "POST",
        body: { users },
      }),
    }),
    searchUser: builder.mutation({
      query: (query) => ({
        url: "/admin/users/query",
        method: "POST",
        body: { query },
      }),
    }),
  }),
});

export const {
  useGetUsersMutation,
  useBlockUserMutation,
  useUnBlockUserMutation,
  useSearchUserMutation
} = adminApiSlice;
