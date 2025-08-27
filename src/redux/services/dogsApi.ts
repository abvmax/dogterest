import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dogsHost = "https://random.dog/";
export const dogsApi = createApi({
  reducerPath: "dogsApi",
  baseQuery: fetchBaseQuery({ baseUrl: dogsHost }),
  endpoints: (build) => ({
    getDogs: build.query<string[], void>({
      query: () => ({
        url: `doggos`,
        providesTags: ["dogsApi"],
      }),
    }),
  }),
});

/* 
interface DogQueryParams {
  page: number;
  count: number;
}

export const amweraHost = "http://localhost:4200/api/dog/";
export const dogsApi = createApi({
  reducerPath: "dogsApi",
  baseQuery: fetchBaseQuery({ baseUrl: amweraHost }),
  endpoints: (build) => ({
    getDogs: build.query<string[], DogQueryParams>({
      query: ({ page, count }) => ({
        url: `dogs`,
        params: {
          page: page,
          count: count,
        },
        providesTags: ["dogsApi"],
      }),
    }),
  }),
}); */
