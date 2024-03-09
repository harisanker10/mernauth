import { apiSlice } from "../apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    editProfile: builder.mutation({
      query: (body) => {
        return {
          url: "/user/profile",
          method: "PUT",
          body,
          formDate: true,
        };
      },
    }),
  }),
});

export const { useEditProfileMutation } = userApiSlice;
