import { dedupExchange, fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { LoginMutation, MeQuery, MeDocument, RegisterMutation, LogoutMutation, DeleteUserMutation } from '../generated/graphql';
import { SSRExchange } from "next-urql";
import { typedUpdateQuery } from './typedUpdateQuery';

export const createUrqlClient = (ssrExchange: SSRExchange) => ({ 
  url: process.env.API_URL as string,
  fetchExchange: {
    credentials: "include" as const
  },
  exchanges: [dedupExchange, cacheExchange({
    updates: {
      Mutation: {
        login: (_result, args, cache, info) => {
          typedUpdateQuery<LoginMutation, MeQuery>(
            cache, 
            {query: MeDocument}, 
            _result, 
            (result, query) => {
              if(result.login.errors) {
                return query
              } else {
                return {
                  me: result.login.user
                };
              }
            }
          )
        },
        logout: (_result, args, cache, info) => {
          typedUpdateQuery<LogoutMutation, MeQuery>(
            cache,
            {query: MeDocument},
            _result,
            () => ({me: null})
          )
        },
        deleteUser: (_result, args, cache, info) => {
          typedUpdateQuery<DeleteUserMutation, MeQuery>(
            cache,
            {query: MeDocument},
            _result,
            () => ({me: null})
          )
        },
        register: (_result, args, cache, info) => {
          typedUpdateQuery<RegisterMutation, MeQuery>(
            cache, 
            {query: MeDocument}, 
            _result, 
            (result, query) => {
              if(result.register.errors) {
                return query
              } else {
                return {
                  me: result.register.user
                };
              }
            }
          )
        },  
      }
    }
  }),
  ssrExchange,
  fetchExchange], // used to update cache in urql
});