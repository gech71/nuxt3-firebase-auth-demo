<!-- <template>
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

      <p v-if="signInMessage">{{ signInMessage }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import userLogin from "@/apollo/mutation/userLogin.gql";
import storeUserSession from "@/apollo/mutation/storeUserSession.gql";
const email = ref<string>("");
const password = ref<string>("");
const signInMessage = ref<string>("");

const handleLogin = async () => {
  const { signInUser } = useFirebaseClient();
  const { idToken, error } = await signInUser(email.value, password.value);
  if (error) {
    signInMessage.value = "signInUser Error: " + error;
  }
  if (idToken) {
    // logIn({ idToken });

    // TEST USING USE_FETCH
    const { data, error } = await useFetch("http://localhost:5000/auth/login", {
      method: "POST",
      body: { input: { token: idToken } },
    });

    if (data.value) {
      const { customToken } = data.value as { customToken: string };
      const { signInUserWithCustomToken } = useFirebaseClient();
      const { idToken, error } = await signInUserWithCustomToken(customToken);
      const { data: sessionData, error: sessionError } = await useFetch(
        "http://localhost:5000/auth/setSessionCookie",
        {
          method: "POST",
          credentials: "include",
          body: { input: { token: idToken } },
        }
      );

      if (sessionData.value) {
        const router = useRouter();
        const { uid } = sessionData.value as { uid: string };
        const expiresIn = 5 * 60 * 60 * 24;
        useCookie("__current_user", { maxAge: expiresIn }).value = uid;
        router.push("/");
      }

      sessionError.value && console.log(sessionError.value);
    }

    error.value && console.log(error.value);
  }
};
</script> -->

<!--  -->

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
      <NuxtLink to="/authentication/forget-password">
        <button>Forget password</button></NuxtLink
      >
      <button type="submit">Log in</button>
      <NuxtLink to="/authentication/signUp">Sign Up</NuxtLink>

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
const {
  onDone: onStoreSessionResult,
  onError: onStoreSessionError,
  mutate: storeSession,
} = await useCustomMutation(storeUserSession);

onStoreSessionResult(async (result) => {
  const { signUserOut } = useFirebaseClient();
  const router = useRouter();
  const { uid } = result.data.user;
  const expiresIn = 7 * 60 * 60 * 24;
  useCookie("__current_user", { maxAge: expiresIn }).value = uid;
  await signUserOut();
  const { toSignInPageFrom } = useApplicationStore();

  if (toSignInPageFrom.startsWith("/authentication")) router.push("/");
  else router.back();
});

onStoreSessionError((error) => {
  signInMessage.value = "onStoreSession Error: " + error;
});
onLoginResult(async (result) => {
  const { signInUserWithCustomToken } = useFirebaseClient();
  const { customToken } = result.data.userLogin;
  const { idToken, error } = await signInUserWithCustomToken(customToken);
  if (error) {
    signInMessage.value = "signInUserWithCustomToken Error: " + error;
  }
  if (idToken) {
    storeSession({ idToken });
  }
});

onLoginError((error) => {
  const { response } = error.graphQLErrors[0].extensions.internal as {
    response: { status: number };
  };
  signInMessage.value =
    "onLogin Error: " +
    (response.status === 403 ? "Email Not Verified." : error);
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
