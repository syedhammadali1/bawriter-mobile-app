  import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
  import AuthService from '../services/AuthService'

  const apiService = createApi({
    reducerPath: 'apiService',
    baseQuery: fetchBaseQuery({
      baseUrl: 'http://dashboard.bestassignmentwriters.co.uk/api',
      prepareHeaders: async (headers) => {
        const token = await AuthService.getTokenExist();
        // console.log('Retrieved token:', token); // Debug log
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        headers.set('Content-Type', 'application/json');
        // console.log('Headers:', headers); // Debug log
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
          url: '/auth/register',
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
        query: () => '/order/datatable',
      }),
      getOrderDetail: builder.query({
        query: (id) => `/order/detail/${id}`,
      }),
      downloadAttachment: builder.query({
        query: (attachmentId) => ({
          url: `/order/attachment_download/${attachmentId}`,
          responseType: 'blob',
        }),
      }),
      getCreateOrder: builder.query({
        query: () => '/order/create',
      }),
      uploadFile: builder.mutation({
        query: (file) => {
          const formData = new FormData();
          formData.append('file', {
            uri: file.uri,
            name: file.name,
            type: file.type,
          });
  
          return {
            url: '/attachments/upload',
            method: 'POST',
            body: formData,
          };
        },
      }),
    }),
  });

  export const {
    useForgotMutation,
    useLoginMutation,
    useRegisterMutation,
    useVerifyOtpMutation,
    useResetPasswordMutation,
    useGetOrderDetailsQuery,
    useGetOrderDetailQuery,
    useDownloadAttachmentQuery,
    useGetCreateOrderQuery,
    useUploadFileMutation 
  } = apiService;
  export default apiService;
