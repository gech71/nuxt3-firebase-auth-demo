import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from "@apollo/client/core";
import { ApolloClients } from "@vue/apollo-composable";
import { useApplicationStore } from "~~/store/store";
import { storeToRefs } from "pinia";
import { setContext } from "@apollo/client/link/context";
import jwtDecode from "jwt-decode";

const withToken = setContext(async (_, { headers }) => {
  const store = useApplicationStore();
  const { token, uid } = storeToRefs(store);

  if (token.value) {
    const { exp } = jwtDecode(token.value) as {
      name: string;
      metadata: { roles: Array<string>; user_id: string };
      exp: number;
      iat: number;
    };

    // token Expired
    if (Date.now() >= exp * 1000) {
      const config = useRuntimeConfig().public;
      await $fetch(config.BACKEND_URL + "/auth/refresh", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          uid: uid.value,
        }),
      })
        .then((value) => {
          const { accessToken } = value as { accessToken: string };
          store.setToken(accessToken);
        })
        .catch((err) => {
          // refresh token expires
          if (err.statusCode === 440) {
            store.setToken("");
            store.setUID("");
            const router = useRouter();
            router.push("/auth/rul");
          }
        });
    }
  }

  if (token.value)
    return {
      headers: {
        authorization: token ? `Bearer ${token.value}` : "",
      },
    };
});

const timeStartLink = new ApolloLink((operation, forward) => {
  
  operation.setContext({ start: new Date() });
  return forward(operation);
});

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public;
  const httpLink = createHttpLink({
    uri: config.GRAPHQL_URL,
    credentials: "include",
  });

  const apolloClient = new ApolloClient({
    link: withToken.concat(httpLink),
    cache: new InMemoryCache(),
  });

  nuxtApp.vueApp.provide(ApolloClients, { default: apolloClient });
});
