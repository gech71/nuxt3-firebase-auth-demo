<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div class="w-full max-w-[27rem] p-5">
      <h1 class="text-2xl font-bold mb-3 text-gray-700">
        Your Session has Expired.
      </h1>
      <h1 class="text-sm text-gray-500 mb-4">Please sign in again.</h1>

      <NuxtLink to="/auth/signIn" class="w-full mt-4">
        <HButton btn-class="w-full" title="Sign In" type="button" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "before-rul-entry-client",
});
</script>
