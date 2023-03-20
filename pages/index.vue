<template>
  <div>
    <button @click="() => handleLogout()">Logout</button>
    <p>secure page</p>
    <br />
    <p v-if="loading">Loading...</p>
    <p v-else>{{ result }}</p>
  </div>
</template>

<script lang="ts" setup>
import fetchSupplier from "@/apollo/query/fetchSuppliers.gql";
import logout from "@/apollo/mutation/logout.gql";
import { useApplicationStore } from "~~/store/store";

const { useCustomMutation, useCustomQuery } = useCustomApollo();

const {
  mutate: logOut,
  onError: onLogoutError,
  onDone: onLogoutResult,
} = await useCustomMutation(logout);

onLogoutResult((result) => {
  const { setUID, setToken } = useApplicationStore();
  setUID("");
  setToken("");
  const router = useRouter();
  router.push("/authentication/signIn");
});

onLogoutError((error) => {
  console.log("Log out Error: " + error);
});

const { result, onError, loading } = await useCustomQuery(fetchSupplier);

watchEffect(() => {
  result.value && console.log(result.value);
});

onError((error) => {
  console.log("Supplier Error: " + error);
});

const router = useRouter();

const handleLogout = async () => {
  const { uid } = useApplicationStore();
  logOut({ uid });
};

definePageMeta({
  middleware: "before-entry-client",
});
</script>
