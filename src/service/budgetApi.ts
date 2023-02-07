import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const budgetApi = createApi({
  reducerPath: "budgetApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
  }),
  endpoints: (builder) => ({
    getBudget: builder.mutation({
      query: (body: { email: string }) => {
        return {
          url: "/getBudget",
          method: "post",
          body,
        };
      },
    }),
    findUsers: builder.mutation({
      query: (body: { email: string }) => {
        return {
          url: "/users",
          method: "post",
          body,
        };
      },
    }),
  }),
});

export const { useFindUsersMutation, useGetBudgetMutation } = budgetApi;
