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

      <button type="submit">Log in</button>
      <NuxtLink to="/signup">Sign Up</NuxtLink>

      <p v-if="errorMsg">{{ errorMsg }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import userLogin from "@/apollo/mutation/userLogin.gql";
import storeUserSession from "@/apollo/mutation/storeUserSession.gql";
const email = ref<string>("");
const password = ref<string>("");
const errorMsg = ref<string>("");

const {
  onDone: onLoginResult,
  onError: onLoginError,
  mutate: logIn,
} = useMutation(userLogin);
const {
  onDone: onStoreSessionResult,
  onError: onStoreSessionError,
  mutate: storeSession,
} = useMutation(storeUserSession);

onStoreSessionResult(async (result) => {
  const router = useRouter();
  const { uid } = result.data.user;
  const expiresIn = 5 * 60 * 60 * 24;
  useCookie("__current_user", { maxAge: expiresIn }).value = uid;
  router.push("/");
});

onStoreSessionError((error) => {
  errorMsg.value = "onStoreSession Error: " + error;
});
onLoginResult(async (result) => {
  const { signInUserWithCustomToken } = useFirebaseClient();
  const { customToken } = result.data.userLogin;
  const { idToken, error } = await signInUserWithCustomToken(customToken);
  if (error) {
    errorMsg.value = "signInUserWithCustomToken Error: " + error;
  }
  if (idToken) {
    storeSession({ idToken });
  }
});

onLoginError((error) => {
  errorMsg.value = "onLogin Error: " + error;
});

const handleLogin = async () => {
  const { signInUser } = useFirebaseClient();
  const { idToken, error } = await signInUser(email.value, password.value);
  if (error) {
    errorMsg.value = "signInUser Error: " + error;
  }
  if (idToken) {
    logIn({ idToken });
  }
};
</script>
