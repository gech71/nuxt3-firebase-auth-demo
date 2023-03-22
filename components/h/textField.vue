<script setup lang="ts">
import { useField } from "vee-validate";

interface Props {
  modelValue?: string | number;
  name: string;
  id?: string;
  type?: string;
  placeholder?: string;
  label?: string;
  labelClass?: string;
  hideDetail?: boolean;
  trailingIcon?: string | number | (string & {});
  autocomplete?: string;
  leadingIcon?: String;
  leadingText?: string;
  min?: string;
  max?: string;
  rules?: string;
  disabled?: boolean;
  class?: string;
  iconLeadingClass?: string;
  leadingTextClass?: string;
  placeholderStyle?: string;
  clearable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  type: "text",
  hideDetail: false,
  rules: "",
  disabled: false,
});

const emit = defineEmits(["update:modelValue"]);

const {
  errorMessage,
  value: inputValue,
  meta,
} = useField(props.name, props.rules, {
  initialValue: props.modelValue,
});

const type = ref(props.type);
const trailingIcon = ref(props.trailingIcon);

const set = (event: any) => {
  emit("update:modelValue", event?.target?.value);
};

const togglePassword = () => {
  if (type.value === "password") {
    type.value = "text";
    trailingIcon.value = "mdi:eye-off-outline";
    return;
  }
  if (type.value === "text") {
    type.value = "password";
    trailingIcon.value = "mdi:eye-outline";
    return;
  }
};

watch(
  () => props.modelValue,
  (newVal) => {
    inputValue.value = newVal;
  }
);

const clear = () => {
  inputValue.value = "";
  emit("update:modelValue", undefined);
};
</script>

<template>
  <div class="w-full">
    <slot name="label"
      ><label
        :class="props.labelClass"
        class="block text-gray-600 font-semibold mb-1 text-sm"
        :for="name"
      >
        {{ label }}
      </label></slot
    >

    <div
      class="relative group flex items-center justify-center transition-all ease-in-out duration-300"
      :class="props.class"
    >
      <div
        v-if="props.leadingIcon || props.leadingText"
        class="h-full w-[4rem] absolute top-0 left-0 bottom-0 flex items-center justify-evenly pointer-events-none bg-transparent"
      >
        <component
          class="h-5 w-5 text-green100 hover:cursor-pointer"
          :class="[
            errorMessage ? 'text-red-400' : 'text-green200',
            props.iconLeadingClass,
          ]"
          :is="props.leadingIcon"
        ></component>
        <p
          v-if="props.leadingText && !props.leadingIcon"
          class="font-medium"
          :class="[
            errorMessage
              ? //  'text-red-400'
                ''
              : 'text-green200',
            props.leadingTextClass,
          ]"
        >
          {{ leadingText }}
        </p>
        <div
          class="w-[1px] h-[60%] bg-gray-light self-end my-auto group-hover:bg-green400 transition-all ease-in-out duration-300"
        ></div>
      </div>

      <input
        v-model="inputValue"
        @input="set($event)"
        @change="set($event)"
        :autocomplete="props.autocomplete"
        :min="min"
        :max="max"
        :type="type"
        :name="props.name"
        step="any"
        :id="props.name"
        :class="[
          errorMessage
            ? // ? 'focus:border-red-500 hover:border-red border-red'
              ''
            : 'focus:border-green400 hover:border-green400 border-gray-light',
          props.iconLeadingClass ? props.iconLeadingClass : '',
          props.trailingIcon ? 'pr-0' : '',
          props.class ? props.class : '',
          props.placeholderStyle
            ? props.placeholderStyle
            : ' placeholder-[#9a9a9a] font-medium',
          props.leadingIcon || props.leadingText ? 'pl-16' : '',
          props.trailingIcon ? 'pr-9' : '',
        ]"
        class="appearance-none text-sm text-gray-500 border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-gray-300 hover:border-gray-300 transition-colors duration-300 ease-in-out"
        :placeholder="props.placeholder"
        aria-invalid="true"
        aria-describedby="email-error"
        :disabled="props.disabled"
      />
      <!-- icon -->
      <div
        v-if="clearable"
        @click="clear"
        class="absolute inset-y-0 right-0 pr-2 flex items-center"
      >
        <Icon
          name="uil:cancel-outline"
          class="h-5 w-5 text-gray-light hover:text-red-400 cursor-pointer transition-all ease-in-out duration-300"
        />
      </div>
      <div
        v-if="trailingIcon"
        class="absolute inset-y-0 right-0 pr-2 flex items-center hover:cursor-pointer"
        @click="props.type == 'password' ? togglePassword() : () => {}"
      >
        <Icon
          :name="trailingIcon"
          size="16"
          class="text-blue-500 hover:text-blue-700"
        />
      </div>
    </div>
    <p
      v-if="!props.hideDetail"
      :visible="errorMessage"
      class="px-1 text-xs text-red-400 mb-1"
      id="email-error"
    >
      {{ errorMessage || "" }} &nbsp;
    </p>
  </div>
</template>
