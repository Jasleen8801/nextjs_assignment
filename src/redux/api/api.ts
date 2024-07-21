import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetChartValuesResponse,
  GetCoinDataByIdResponse,
  GetCoinDataResponse,
  GetTrendingCoinsResponse,
} from "@/redux/api/types";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.BASE_URL || "https://api.coingecko.com/api/v3",
    headers: {
      Accept: "application/json",
      "x-cg-pro-api-ke": process.env.COIN_GECKO_API_KEY || "",
    },
    // mode: "no-cors",
  }),
  reducerPath: "main",
  tagTypes: ["ChartValues"],
  endpoints: (build) => ({
    getChartValues: build.query<
      GetChartValuesResponse,
      { productId: string; days: number }
    >({
      query: ({ productId, days }) =>
        `/coins/${productId}/market_chart?vs_currency=usd&days=${days}`,
      providesTags: ["ChartValues"],
    }),
    getTrendingCoins: build.query<GetTrendingCoinsResponse, void>({
      query: () => "/search/trending",
    }),
    getCoinList: build.query<Array<GetCoinDataResponse>, void>({
      query: () => "/coins/markets?vs_currency=usd",
    }),
    getCoinData: build.query<GetCoinDataByIdResponse, string>({
      query: (productId) => `/coins/${productId}`,
    }),
  }),
});

export const {
  useGetChartValuesQuery,
  useGetTrendingCoinsQuery,
  useGetCoinListQuery,
  useGetCoinDataQuery,
} = api;
