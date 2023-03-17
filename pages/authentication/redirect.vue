<template>
  <div v-if="_route.query.mode === 'verifyEmail' && loading">
    <h1>Verifying...</h1>
  </div>
  <div
    v-if="_route.query.mode === 'verifyEmail' && !loading"
    class="w-full flex flex-col items-center justify-center"
  >
    <h1>
      {{
        emailVerificationResult?.success
          ? "Verification Success"
          : "Try verifying your email again"
      }}
    </h1>
    <h1>
      {{ emailVerificationResult?.message }}
    </h1>

    <NuxtLink to="/authentication/signIn">
      <button>Back to login</button>
    </NuxtLink>
  </div>

  <div v-if="$route.query.mode === 'resetPassword'">
    <h1>Reset Your Password</h1>
    <h1>Please set your new password.</h1>

    <input
      type="text"
      name="password"
      id="password"
      placeholder="new password"
      v-model="password"
    /><br />

    <NuxtLink to="/authentication/signIn"
      ><button>Back To Login</button></NuxtLink
    >
    <button @click="handleResetPassword">Reset Password</button>
    <br />
    <p>{{ passwordResetMessage }}</p>
  </div>
</template>

<script lang="ts" setup>
const _route = useRoute();

const emailVerificationResult = ref<{ success: boolean; message: string }>();
const password = ref<string>("");
const passwordResetMessage = ref("");

const loading = ref(true);
onMounted(async () => {
  if (_route.query.mode === "verifyEmail") {
    const { applyUserActionCode } = useFirebaseClient();
    emailVerificationResult.value = await applyUserActionCode(
      _route.query.oobCode as string
    );
    loading.value = false;
  }
});

const handleResetPassword = async () => {
  const { confirmUserPasswordReset } = useFirebaseClient();
  const { message, success } = await confirmUserPasswordReset(
    _route.query.oobCode as string,
    password.value
  );
  passwordResetMessage.value = message;
};

definePageMeta({
  validate(route) {
    return (
      (route.query.mode === "verifyEmail" ||
        route.query.mode === "resetPassword") &&
      route.query.apiKey === useRuntimeConfig().public.FIREBASE_API_KEY &&
      (route.query.oobCode as string).length > 10
    );
  },
});
</script>
