import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const budgetApi = createApi({
  reducerPath: "budgetApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.0.102:5000/api",
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
      query: (body: { email: string; emailFrom: string }) => {
        return {
          url: "/users",
          method: "post",
          body,
        };
      },
    }),
    createBudget: builder.mutation({
      query: (body: {
        emailFrom: string;
        emailTo: string;
        theme: object;
        expens: object;
      }) => {
        return {
          url: "/newAlertFromUser",
          method: "post",
          body,
        };
      },
    }),
    anser: builder.mutation({
      query: (body: {
        anser: {
          fromUser: string;
          anser: "Yes" | "No";
        };
      }) => {
        return {
          url: "/anserFromUser",
          method: "post",
          body,
        };
      },
    }),
  }),
});

export const {
  useAnserMutation,
  useCreateBudgetMutation,
  useFindUsersMutation,
  useGetBudgetMutation,
} = budgetApi;
