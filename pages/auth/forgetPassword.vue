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

      <button type="submit">Send Reset Email Instructions</button>
      <NuxtLink to="/auth/signIn">Back To Sign In</NuxtLink>

      <p v-if="msg">{{ msg }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
const email = ref<string>("");
const msg = ref<string>("");

const handleLogin = async () => {
  const { sendUserPasswordResetEmail } = useFirebaseClient();
  const { success, message } = await sendUserPasswordResetEmail(email.value);
  msg.value = message;
};

definePageMeta({
  middleware: "before-forget-entry-client",
});
</script>
