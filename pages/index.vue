<template>
  <div>
    <button @click="() => handleLogout()">Logout</button>
    <p>secure page</p>
  </div>
</template>

<script lang="ts" setup>
import fetchSupplier from "@/apollo/query/fetchSuppliers.gql";
import logout from "@/apollo/mutation/logout.gql";

const { useCustomMutation, useCustomQuery } = useCustomApollo();

const {
  mutate: logOut,
  onError: onLogoutError,
  onDone: onLogoutResult,
} = await useCustomMutation(logout);

onLogoutResult((result) => {
  const router = useRouter();
  useCookie("__current_user").value = null;
  router.push("/authentication/signIn");
});

onLogoutError((error) => {
  console.log("Log out Error: " + error);
});

const { onResult, onError } = await useCustomQuery(fetchSupplier);

onResult((result) => {
  console.log(result.data);
});

onError((error) => {
  console.log("Supplier Error: " + error);
});

const router = useRouter();

const handleLogout = async () => {
  useCookie("__current_user").value = null;
  logOut();
};

definePageMeta({
  middleware: "before-entry-client",
});
</script>
