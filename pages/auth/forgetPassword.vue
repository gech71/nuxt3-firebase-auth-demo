<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <form
      class="w-full max-w-[27rem] p-5"
      @submit.prevent="handleForgetPassword"
    >
      <h1 class="text-3xl font-bold mb-3 text-gray-700">Forgot Password</h1>
      <h1 class="text-sm text-gray-500 mb-5">
        Enter the email associated with your account and we will send an email
        with instructions to reset your password.
      </h1>
      <div>
        <HTextField
          name="Email"
          placeholder="Email Address"
          rules="required|email"
        >
        </HTextField>
      </div>

      <br />

      <div class="flex gap-4">
        <NuxtLink to="/auth/signIn" class="flex-1">
          <HButton btn-class="w-full" title="Back to Login" type="button" />
        </NuxtLink>
        <HButton
          class="flex-1"
          btn-class="w-full"
          title="Send Instructions"
          type="submit"
          :is-loading="loading"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
const loading = ref<boolean>(false);

const { handleSubmit, resetForm } = useForm();

const handleForgetPassword = handleSubmit(async (value) => {
  loading.value = true;
  const { Email: email } = value;
  const { sendUserPasswordResetEmail } = useFirebaseClient();
  const { success, message } = await sendUserPasswordResetEmail(email);
  loading.value = false;
});

definePageMeta({
  middleware: "before-forget-entry-client",
});
</script>
