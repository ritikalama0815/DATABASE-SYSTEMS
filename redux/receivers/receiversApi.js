import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../utils/baseURL'

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}api/receivers`, // Match donors format without trailing slash
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if(token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
})

const receiversApi = createApi({
    reducerPath: 'receiverApi',
    baseQuery,
    tagTypes: ['Receivers'],
    endpoints: (builder) => ({
        fetchAllReceivers: builder.query({
            query: () => "/",
            providesTags: ["Receivers"]
        }),
        createReceiver: builder.mutation({
            query: (newReceiver) => ({
                url: "/create-receiver",
                method: "POST",
                body: newReceiver
            }),
            invalidatesTags: ["Receivers"]
        }),
        findMatchingDonors: builder.query({
            query: (criteria) => ({
                url: `matching-donors?type=${criteria.type}&blood_type=${criteria.blood_type}`,
                method: "GET"
            }),
            providesTags: ["Donors"]
        }),
    })
})

export const { 
    useFetchAllReceiversQuery,
    useCreateReceiverMutation,
    useFindMatchingDonorsQuery
} = receiversApi;
export default receiversApi;