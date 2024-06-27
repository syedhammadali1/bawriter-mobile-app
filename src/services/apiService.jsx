import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; 
import { setToken, clearToken } from '../redux/authReducer';


const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://dashboard.bestassignmentwriters.co.uk/api',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  
  endpoints: (builder) => ({
    forgot: builder.mutation({
      query: (forgotPassword) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: forgotPassword,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/registerr',
        method: 'POST',
        body: userData,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ email, password, password_confirmation }) => ({
        url: '/auth/password/reset',
        method: 'POST',
        body: { email, password, password_confirmation },
      }),
    }),
    verifyOtp: builder.mutation({
      query: ({ email, token }) => ({
        url: '/auth/verify-otp',
        method: 'POST',
        body: { email, token },
      }),
    }),
    getOrderDetails: builder.query({
      query: () => `/order/datatable`,
      
    }),
    getOrderDetail: builder.query({
      query: (id) => `/order/detail/${id}`,
    }),
    downloadAttachment: builder.query({
      query: (attachmentId) => ({
        url: `/order/attachment_download/${attachmentId}`,
        responseType: 'blob', // Ensure the response type is set correctly for file downloads
      }),
    }),
    getCreateOrder: builder.query({
      query: () => `/order/create`
    })
  }),
});

export const { useForgotMutation, useLoginMutation, useRegisterMutation, useVerifyOtpMutation, useResetPasswordMutation,
   useGetOrderDetailsQuery, useGetOrderDetailQuery, useDownloadAttachmentQuery, useGetCreateOrderQuery } = api;
export default api;




