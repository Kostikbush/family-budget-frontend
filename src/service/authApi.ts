import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.0.102:5000/api",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: { email: string; password: string }) => ({
        url: "/login",
        method: "post",
        body,
      }),
    }),
    registUser: builder.mutation({
      query: (body: { email: string; name: string; password: string }) => {
        return {
          url: "/registration",
          method: "post",
          body,
        };
      },
    }),
    getImages: builder.mutation<any, void>({
      query: () => {
        return {
          url: "/images",
          method: "get",
        };
      },
    }),
    setImages: builder.mutation({
      query: (body: { avatar: string; email: string }) => {
        return {
          url: "/setAvatar",
          method: "post",
          body,
        };
      },
    }),
    getComment: builder.mutation<any, void>({
      query: () => {
        return {
          url: "/comments",
          method: "get",
        };
      },
    }),
    addComment: builder.mutation({
      query: (body: { smile: string; email: string; comment: string }) => {
        return {
          url: "/addComment",
          method: "post",
          body,
        };
      },
    }),
    deleteAccount: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: "/deletUser",
          method: "delete",
          body,
        };
      },
    }),
    getOpponent: builder.mutation({
      query: (body: { budgetId: string }) => {
        return {
          url: "/getOpponent",
          method: "post",
          body,
        };
      },
    }),
    checkBack: builder.mutation<any, void>({
      query: () => {
        return {
          url: "/checkBack",
          method: "get",
        };
      },
    }),
    getUser: builder.mutation({
      query: (body: { email: string }) => {
        return {
          url: "/getUser",
          method: "post",
          body,
        };
      },
    }),
    changeName: builder.mutation({
      query: (body: { email: string; name: string }) => {
        return {
          url: "/changeName",
          method: "post",
          body,
        };
      },
    }),
  }),
});

export const {
  useChangeNameMutation,
  useGetUserMutation,
  useCheckBackMutation,
  useGetOpponentMutation,
  useDeleteAccountMutation,
  useAddCommentMutation,
  useGetCommentMutation,
  useSetImagesMutation,
  useGetImagesMutation,
  useLoginUserMutation,
  useRegistUserMutation,
} = authApi;
