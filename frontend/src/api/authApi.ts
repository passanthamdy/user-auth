import { IAuth } from '../core/interfaces/auth';
import { IAuthRequest } from '../core/interfaces/authRequest';
import { IRestResponse } from '../core/interfaces/restResponse';
import { ISignupRequest } from '../core/interfaces/signupRequest';
import { IUser } from '../types';
import { apiSlice } from './apiSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    singup: builder.mutation<IRestResponse<void>, ISignupRequest>({
        query: (credentials) => ({
          url: '/users/actions/signup',
          method: 'POST',
          body: credentials,
        })
      }),
    authenticateUser: builder.mutation<IRestResponse<IAuth>, IAuthRequest>({
      query: (credentials) => ({
        url: '/users/actions/login',
        method: 'POST',
        body: credentials,
      })
    }),
    me: builder.query<IRestResponse<IUser>, void>({
      query: () =>({
        url: '/users/actions/me',
        method: 'GET'
      }),
    }),
    refresh: builder.mutation({
      query: (refreshToken) => ({
        url: '/users/actions/refresh-token',
        method: 'POST',
        body: { refreshToken },
      })
    })
  }),
});

export const { useSingupMutation, useAuthenticateUserMutation, useMeQuery, useRefreshMutation } = authApi;
