import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  getProductsByIds,
  getUserProducts,
  updateUserCartOrWhitelist,
} from "../lib/data-service";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["UserCart", "UserWhitelist", "Products"],
  endpoints: (builder) => ({
    getProductsByIds: builder.query({
      queryFn: async (productIds) => {
        try {
          const data = await getProductsByIds(productIds);
          return { data };
        } catch (error) {
          return { error: error.message };
        }
      },
      providesTags: ["Products"],
    }),

    getUserCart: builder.query({
      queryFn: async (email) => {
        try {
          const data = await getUserProducts({ email, key: "cart" });
          return { data };
        } catch (error) {
          return { error: error.message };
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "UserCart", id })),
              { type: "UserCart", id: "LIST" },
            ]
          : [{ type: "UserCart", id: "LIST" }],
    }),

    addToUserCart: builder.mutation({
      queryFn: async ({ email, productId, count }) => {
        try {
          const data = await updateUserCartOrWhitelist({
            email,
            item: { id: productId, count },
            key: "cart",
            action: "addItem",
          });
          return { data };
        } catch (error) {
          return { error: error.message };
        }
      },
      // Optimistic update
      async onQueryStarted(
        { email, productId, count },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          api.util.updateQueryData("getUserCart", email, (draft) => {
            const existing = draft.find((item) => item.id === productId);
            if (existing) {
              existing.count += count;
            } else {
              draft.push({ id: productId, count });
            }
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: "UserCart", id: "LIST" }],
    }),

    updateCartItem: builder.mutation({
      queryFn: async ({ email, productId, count }) => {
        try {
          const data = await updateUserCartOrWhitelist({
            email,
            item: { id: productId, count },
            key: "cart",
            action: "updateItem",
          });
          return { data };
        } catch (error) {
          return { error: error.message };
        }
      },
      async onQueryStarted(
        { email, productId, count },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          api.util.updateQueryData("getUserCart", email, (draft) => {
            const existing = draft.find((item) => item.id === productId);
            if (existing) {
              existing.count = count;
            }
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { productId }) => [
        { type: "UserCart", id: productId },
      ],
    }),

    removeFromUserCart: builder.mutation({
      queryFn: async ({ email, productId }) => {
        try {
          const data = await updateUserCartOrWhitelist({
            email,
            item: { id: productId },
            key: "cart",
            action: "removeItem",
          });
          return { data };
        } catch (error) {
          return { error: error.message };
        }
      },
      async onQueryStarted({ email, productId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getUserCart", email, (draft) => {
            return draft.filter((item) => item.id !== productId);
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { productId }) => [
        { type: "UserCart", id: productId },
      ],
    }),

    syncCartToUser: builder.mutation({
      queryFn: async ({ email, items }) => {
        try {
          const data = await updateUserCartOrWhitelist({
            email,
            items,
            key: "cart",
            action: "mergeItems",
          });
          return { data };
        } catch (error) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["UserCart"],
    }),
  }),
});

export const {
  useGetUserCartQuery,
  useAddToUserCartMutation,
  useGetProductsByIdsQuery,
  useRemoveFromUserCartMutation,
  useUpdateCartItemMutation,
  useSyncCartToUserMutation,
} = api;
