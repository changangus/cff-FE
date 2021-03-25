
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { Provider, createClient, dedupExchange, fetchExchange } from 'urql';
import { cacheExchange, QueryInput, Cache } from '@urql/exchange-graphcache';
import Navbar from '../components/Navbar';
import { theme } from '../styles/globalTheme';
import { LoginMutation, MeQuery, MeDocument, RegisterMutation } from '../generated/graphql';

function typedUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query 
){
  return cache.updateQuery(qi, (data) =>  fn(result, data as any) as any)
};

const client = createClient({ 
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include'
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
            })
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
            })
        }
      }
    }
  }), fetchExchange], // used to update cache in urql
});

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>

    )
}

export default MyApp
