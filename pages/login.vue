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
    </form>
  </div>
</template>

<script setup lang="ts">
const email = ref<string>("");
const password = ref<string>("");
const handleLogin = async () => {
  const { signInUser } = useFirebaseClient();
  await signInUser(email.value, password.value);
};
</script>
