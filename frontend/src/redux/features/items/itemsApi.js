import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from '../../../utils/baseURL'

const itemsApi = createApi({
    reducerPath: 'itemsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/items`,
        credentials: 'include'
    }),
    tagTypes: ['Items'],
    endpoints: (builder) => ({
        fetchAllItems: builder.query({
            query: ({ category, color, minPurchasePrice, maxPurchasePrice, archived = null, page = 1, limit = 10 }) => {
                const queryParams = new URLSearchParams({
                    category: category || '',
                    color: color || '',
                    minPurchasePrice: minPurchasePrice || 0,
                    maxPurchasePrice: maxPurchasePrice || '',
                    archived: archived !== null ? archived : '',
                    page: page.toString(),
                    limit: limit.toString()
                }).toString()
                return `/?${queryParams}`
            },
            providesTags: ['Items']
        }),

        fetchItemById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: 'Items', id }]
        }),

        addItem: builder.mutation({
            query: (newItem) => ({
                url: '/create-item',
                method: 'POST',
                body: newItem,
                credentials: 'include'
            }),
            invalidatesTags: ['Items']
        }),

        fetchRelatedItems: builder.query({
            query: (id) => `/related/${id}`
        }),

        updateItem: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/update-item/${id}`,
                method: 'PATCH',
                body: rest,
                credentials: 'include',
            }),
            invalidatesTags: ['Items']
        }),

        deleteItem: builder.mutation({
            query: ({ id }) => ({
                url: `/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Items', id }]
        }),
    }),
})

export const { useFetchAllItemsQuery, useFetchItemByIdQuery, useAddItemMutation,
    useUpdateItemMutation, useDeleteItemMutation, useFetchRelatedItemsQuery } = itemsApi
export default itemsApi