<template>
  <div>
    <form
      @submit.prevent="handleLogin"
      style="
        display: flex;
        flex-direction: column;
        width: fit-content;
        gap: 5px;
      "
    >
      <input type="email" name="email" id="email" v-model="email" />
      <input type="password" name="password" id="password" v-model="password" />
      <NuxtLink to="/auth/forgetPassword">
        <button>Forget password</button></NuxtLink
      >
      <button type="submit">Log in</button>
      <NuxtLink to="/auth/signUp">Sign Up</NuxtLink>

      <p v-if="signInMessage">{{ signInMessage }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import userLogin from "@/apollo/mutation/userLogin.gql";
import storeUserSession from "@/apollo/mutation/storeUserSession.gql";
import { useApplicationStore } from "@/store/store";
const email = ref<string>("");
const password = ref<string>("");
const signInMessage = ref<string>("");
const { useCustomMutation } = useCustomApollo();

const {
  onDone: onLoginResult,
  onError: onLoginError,
  mutate: logIn,
} = await useCustomMutation(userLogin);

onLoginResult(async (result) => {
  const { signUserOut } = useFirebaseClient();
  const { accessToken, uid } = result.data.userLogin;
  const { setToken, setUID, toSignInPageFrom } = useApplicationStore();
  const router = useRouter();
  await signUserOut();
  setToken(accessToken);
  setUID(uid);
  if (toSignInPageFrom.startsWith("/auth")) router.push("/");
  else router.back();
});

onLoginError((error) => {
  if (error.graphQLErrors && error.graphQLErrors[0]?.extensions?.internal) {
    const { response } = error.graphQLErrors[0].extensions.internal as {
      response: { status: number };
    };

    signInMessage.value =
      "onLogin Error: " +
      (response.status === 403 ? "Email Not Verified." : error + "");
  }
  signInMessage.value = error + "";
});

const handleLogin = async () => {
  const { signInUser } = useFirebaseClient();
  const { idToken, error } = await signInUser(email.value, password.value);
  if (error) {
    signInMessage.value = "signInUser Error: " + error;
  }
  if (idToken) {
    logIn({ idToken });
  }
};

definePageMeta({
  middleware: "before-sign-in-client",
});
</script>

<!--  -->
