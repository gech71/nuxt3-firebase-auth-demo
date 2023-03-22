import graphql from "@rollup/plugin-graphql";
export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt", "nuxt-icon"],
  vite: {
    plugins: [graphql()],
  },
  build: {
    transpile: ["graphql", "@apollo/client", "@vue/apollo-composable"],
  },

  css: ["~/assets/css/tailwind.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    // The private keys which are only available within server-side
    FIREBASE_API_KEY: "AIzaSyD5i395x7PyZQDBPSpdrzpzDPQDAAyc4MU",
    FIREBASE_AUTH_DOMAIN: "hibirbitshibirlink.firebaseapp.com",
    FIREBASE_PROJECT_ID: "hibirbitshibirlink",
    FIREBASE_STORAGE_PACKET: "hibirbitshibirlink.appspot.com",
    FIREBASE_MESSAGE_SENDER_ID: 1077830998369,
    FIREBASE_APP_ID: "1:1077830998369:web:369007817624495d9d8d20",
    GRAPHQL_URL: "https://hibirlink.hasura.app/v1/graphql",
    BACKEND_URL: "https://express-backend.up.railway.app",

    public: {
      FIREBASE_API_KEY: "AIzaSyD5i395x7PyZQDBPSpdrzpzDPQDAAyc4MU",
      FIREBASE_AUTH_DOMAIN: "hibirbitshibirlink.firebaseapp.com",
      FIREBASE_PROJECT_ID: "hibirbitshibirlink",
      FIREBASE_STORAGE_PACKET: "hibirbitshibirlink.appspot.com",
      FIREBASE_MESSAGE_SENDER_ID: 1077830998369,
      FIREBASE_APP_ID: "1:1077830998369:web:369007817624495d9d8d20",
      GRAPHQL_URL: "https://hibirlink.hasura.app/v1/graphql",
      BACKEND_URL: "https://express-backend.up.railway.app",
    },
  },
});
