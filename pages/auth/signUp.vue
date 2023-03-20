<template>
  <div>
    <form
      @submit.prevent="handleRegister"
      style="
        display: flex;
        flex-direction: column;
        width: fit-content;
        gap: 5px;
      "
    >
      <input type="email" name="email" id="email" v-model="email" />
      <input type="password" name="password" id="password" v-model="password" />
      <input type="text" name="firstName" id="firstName" v-model="firstName" />
      <input type="text" name="lastName" id="lastName" v-model="lastName" />

      <button type="submit">Register</button>
      <NuxtLink to="/auth/signIn">Log In</NuxtLink>
      <p style="font-size: large">{{ signUpMessage }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
const email = ref<string>("");
const password = ref<string>("");
const firstName = ref<string>("");
const lastName = ref<string>("");
const signUpMessage = ref<string>("");
const handleRegister = async () => {
  const { signUpUser } = useFirebaseClient();
  const { success, message } = await signUpUser(
    email.value.trim(),
    password.value.trim(),
    firstName.value.trim(),
    lastName.value.trim()
  );

  signUpMessage.value = message;
};
</script>
