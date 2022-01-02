import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key": "937bec4bf0msh83f9e3d0dad17fdp11a0bcjsn40209f624f65",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({
  url,
  headers: cryptoApiHeaders,
});
export const cryptoApi = {
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coindId, timeperiod }) =>
        createRequest(`/coin/${coindId}/history/${timeperiod}`),
    }),
  }),
};

export const {
  useGetCryptoQuery,
  useGetCryptoDetailsQuery,
  useCryptoHistoryQuery,
} = cryptoApi;

// var options = {
//   method: "GET",
//   url: "https://coinranking1.p.rapidapi.com/exchanges",
//   params: {
//     referenceCurrencyUuid: "yhjMzLPhuIDl",
//     uuids: "-zdvbieRdZ",
//     limit: "50",
//     offset: "0",
//     orderBy: "24hVolume",
//     orderDirection: "desc",
//   },
//   headers: {
//     "x-rapidapi-host": "coinranking1.p.rapidapi.com",
//     "x-rapidapi-key": "937bec4bf0msh83f9e3d0dad17fdp11a0bcjsn40209f624f65",
//   },
// };
