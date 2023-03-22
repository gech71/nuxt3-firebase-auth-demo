<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <form class="w-full max-w-[27rem] p-5" @submit.prevent="handleRegister">
      <h1 class="text-3xl font-bold mb-3 text-gray-700">Register</h1>
      <h1 class="text-sm text-gray-500 mb-3">
        Sign up and join our linked best market.
      </h1>
      <div>
        <HTextField
          name="FirstName"
          placeholder="First Name"
          rules="required"
        />

        <HTextField name="LastName" placeholder="Last Name" rules="required" />

        <HTextField
          name="Email"
          placeholder="Email Address"
          rules="required|email"
        />

        <HTextField
          name="Password"
          type="password"
          placeholder="Password"
          rules="required|password"
          trailing-icon="mdi:eye-outline"
        />

        <HTextField
          name="ConfirmPassword"
          type="password"
          placeholder="Confirm Password"
          rules="required|confirmPassword:Password"
          trailing-icon="mdi:eye-outline"
        />
      </div>

      <br />
      <HButton
        btn-class="w-full"
        title="Sign Up"
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
    <p class="mt-1 text-sm text-gray-500">
      Already have an account?
      <NuxtLink
        to="/auth/signIn"
        class="font-bold text-blue-500 hover:text-blue-800"
        >Sign In</NuxtLink
      >
    </p>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";

const loading = ref<boolean>(false);

const { handleSubmit, resetForm } = useForm();

const handleRegister = handleSubmit(async (value) => {
  loading.value = true;
  const {
    FirstName: firstName,
    LastName: lastName,
    Email: email,
    Password: password,
  } = value;

  const { signUpUser } = useFirebaseClient();
  const { success, message } = await signUpUser(
    firstName,
    lastName,
    email,
    password
  );

  loading.value = false;
});

const handleLoginWithGoogle = () => {};

definePageMeta({
  middleware: "before-sign-in-client",
});
</script>
