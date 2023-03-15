export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "@nuxtjs/apollo"],
  apollo: {
    clients: {
      default: {
        authType: "__session=",
        authHeader: "Cookie",
        httpEndpoint: "https://hibirlink.hasura.app/v1/graphql",
        httpLinkOptions: {
          credentials: "include",
        },
      },
    },
  },
});
