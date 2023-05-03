import ICharacter from '../../components/CharacterCard/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IResponse {
  info: {
    count: number;
    pages: number;
  };
  results: ICharacter[];
}

export const characterApi = createApi({
  reducerPath: 'characterApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/character' }),
  endpoints: (build) => ({
    fetchAllCharacters: build.query<IResponse, { searchValue?: string }>({
      query: ({ searchValue = '' }) => ({
        url: `/?name=${searchValue}`,
      }),
    }),
  }),
});
