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

      <button type="submit">Register</button>
      <NuxtLink to="/login">Log In</NuxtLink>
      <p>{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
const email = ref<string>("");
const password = ref<string>("");
const error = ref<string>("");
const handleRegister = async () => {
  const router = useRouter();
  const { signUpUser } = useFirebaseClient();
  const response = await signUpUser(email.value, password.value);
  if (response.success) {
    router.push("/login");
  }
  if (response.error) {
    error.value = response.error;
  }
};
</script>
