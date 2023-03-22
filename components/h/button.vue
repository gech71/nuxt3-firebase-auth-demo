<template>
  <div>
    <button
      :type="type"
      :disabled="isLoading ? true : false"
      :class="[
        isLoading ? 'cursor-wait' : 'cursor-pointer',
        btnClass ? btnClass : '',
      ]"
      class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 ease-in-out"
    >
      <div v-if="isLoading" class="flex justify-center items-center gap-2">
        <div
          class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        ></div>
        <span class="text-sm">Loading...</span>
      </div>

      <div v-else class="flex justify-center items-center gap-2 text-sm">
        <Icon size="16" v-if="leadingIcon" :name="leadingIcon" />
        <p>{{ title }}</p>
        <Icon size="16" v-if="trailingIcon" :name="trailingIcon" />
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
interface PropsInterface {
  title: string;
  isLoading?: boolean;
  type: "button" | "submit" | "reset";
  leadingIcon?: string;
  trailingIcon?: string;
  btnClass?: string;
}
const props = defineProps<PropsInterface>();
</script>
