import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from '../store/slices/authSlice';
import type { RootState } from '../store';
import { IRestResponse, IRestResponseError } from '../core/interfaces/restResponse';
import { StatusCodes } from '../core/enums/statusCodes';
import { IAuthResponse } from '../types';


const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.accessToken;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithRefreshToken = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error) {
        const status = (result.error as FetchBaseQueryError).status;
        const error = (result.error as FetchBaseQueryError).data as IRestResponseError;
        if (status === StatusCodes.Unauthorized) {
            const refreshToken = (api.getState() as RootState).auth.refreshToken;
            if (refreshToken) {
                const refreshResult = await baseQuery(
                    {
                        url: '/users/actions/refresh-token',
                        method: 'POST',
                        body: { refreshToken }
                    },
                    api,
                    extraOptions
                )
                if (refreshResult?.data) {
                    api.dispatch(setCredentials((refreshResult.data as IRestResponse<IAuthResponse>).Data));
                    result = await baseQuery(args, api, extraOptions); // Retry original request
                } else {
                    api.dispatch(logout());
                    return { error: { status, message: error.message } };
                }
            } else {
                api.dispatch(logout());
                return { error: { status, message: error.message } };
            }
        } else {
            return { error: { status, message: error.message } };
        }
    }

    return result;
};
export default baseQueryWithRefreshToken;

export const apiSlice = createApi({
    baseQuery: baseQueryWithRefreshToken,
    endpoints: () => ({}),
});
