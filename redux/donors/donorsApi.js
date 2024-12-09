import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../utils/baseURL'

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}api/donors`, // Remove extra slash
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if(token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
})

const donorsApi = createApi({
    reducerPath: 'donorApi',
    baseQuery,
    tagTypes: ['Donors'],
    endpoints: (builder) => ({
        fetchAllDonors: builder.query({
            query: () => "/",
            providesTags: ["Donors"]
        }),
        createDonor: builder.mutation({
            query: (newDonor) => ({
                url: "/create-donor",
                method: "POST",
                body: newDonor
            }),
            invalidatesTags: ["Donors"]
        })
    })
})

export const { 
    useFetchAllDonorsQuery,
    useCreateDonorMutation 
} = donorsApi
export default donorsApi