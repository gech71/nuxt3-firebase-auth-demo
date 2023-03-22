<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <form class="w-full max-w-[27rem] p-5" @submit.prevent="handleLogin">
      <h1 class="text-3xl font-bold mb-3 text-gray-700">Welcome Back</h1>
      <h1 class="text-sm text-gray-500 mb-5">Sign In to continue</h1>
      <div>
        <HTextField
          name="Email"
          placeholder="Email Address"
          rules="required|email"
        >
        </HTextField>

        <HTextField
          name="Password"
          type="password"
          placeholder="Password"
          rules="required|password"
          trailing-icon="mdi:eye-outline"
        >
        </HTextField>
      </div>

      <div class="flex items-center justify-between">
        <NuxtLink
          to="/auth/forgetPassword"
          class="inline-block ml-auto align-baseline font-semibold text-sm text-blue-500 hover:text-blue-800"
        >
          Forgot Password?
        </NuxtLink>
      </div>

      <br />
      <HButton
        btn-class="w-full"
        title="Sign In"
        type="submit"
        :is-loading="loading"
      />

      <div class="max-w-[27rem] w-full flex gap-2 items-center my-3 mx-auto">
        <span class="flex-1 h-[1px] bg-black/10"></span>
        <p class="text-black/10 text-sm">OR</p>
        <span class="flex-1 h-[1px] bg-black/10"></span>
      </div>

      <HButton
        @click="handleLoginWithGoogle"
        btn-class="w-full"
        title="Continue with Google"
        type="button"
      />
    </form>
    <p class="mt-1 text-sm">
      Don't have an account?
      <NuxtLink
        to="/auth/signUp"
        class="font-bold text-blue-500 hover:text-blue-800"
        >Sign up</NuxtLink
      >
    </p>
  </div>
</template>

<script setup lang="ts">
import userLogin from "@/apollo/mutation/userLogin.gql";
import { useApplicationStore } from "@/store/store";
import { useForm } from "vee-validate";

const loading = ref<boolean>(false);
const signInMessage = ref<string>("");
const { useCustomMutation } = useCustomApollo();

const {
  onDone: onLoginResult,
  onError: onLoginError,
  mutate: logIn,
} = await useCustomMutation(userLogin);

const { handleSubmit, resetForm } = useForm();

onLoginResult(async (result) => {
  loading.value = false;
  const { signUserOut } = useFirebaseClient();
  const { accessToken, uid } = result.data.userLogin;
  const { setToken, setUID, toSignInPageFrom } = useApplicationStore();
  const router = useRouter();
  await signUserOut();
  setToken(accessToken);
  setUID(uid);
  resetForm();
  if (toSignInPageFrom.startsWith("/auth")) router.push("/");
  else router.back();
});

onLoginError((error) => {
  loading.value = false;
  if (error.graphQLErrors && error.graphQLErrors[0]?.extensions?.internal) {
    const { response } = error.graphQLErrors[0].extensions.internal as {
      response: { status: number };
    };

    signInMessage.value =
      "onLogin Error: " +
      (response.status === 403 ? "Email Not Verified." : error + "");
    return;
  }
  signInMessage.value = error + "";
});

const handleLogin = handleSubmit(async (value) => {
  loading.value = true;
  const { Email: email, Password: password } = value;
  const { signInUser } = useFirebaseClient();
  const { idToken, error } = await signInUser(email, password);
  if (error) {
    loading.value = false;
    signInMessage.value = "signInUser Error: " + error;
  }
  if (idToken) {
    logIn({ idToken });
  }
});

const handleLoginWithGoogle = () => {};

definePageMeta({
  middleware: "before-sign-in-client",
});
</script>

<!--  -->
