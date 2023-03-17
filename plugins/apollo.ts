import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client/core";
import { ApolloClients } from "@vue/apollo-composable";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public;
  const httpLink = createHttpLink({
    uri: config.GRAPHQL_URL,
    credentials: "include",
  });

  const apolloClient = new ApolloClient({
    link: from([httpLink]),
    cache: new InMemoryCache(),
  });
  nuxtApp.vueApp.provide(ApolloClients, { default: apolloClient });
});
