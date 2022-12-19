import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userIpCheck = createApi({
  reducerPath: "userIpCheck",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/fetchdata/",
  }),

  endpoints: (builder) => ({
    getDataFromState: builder.query({
      query: (token) => {
        return {
          url: `fetchData`,
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const { useGetDataFromStateQuery } = userIpCheck;
