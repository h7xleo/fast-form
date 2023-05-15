<template>
  <TextWidget
    :schema="schema!"
    :value="value"
    :onChange="handleChange"
    :errors="errorSchema.__errors"
    v-bind="widgetOptionsRef"
  ></TextWidget>
</template>
<script lang="ts" setup>
import { computed, defineProps } from "vue";
import { ComponentPropsDefault, CommonWigetNames } from "../types";
import { getWidget } from "../theme";
const props = defineProps(ComponentPropsDefault);

const textWigetRef = computed(() => {
  const widgetRef = getWidget(CommonWigetNames.TextWidget, props);
  return widgetRef.value;
});

const widgetOptionsRef = computed(() => {
  const { widget, properties, items, ...rest } = props.uiSchema!;
  return rest;
});
const TextWidget = textWigetRef.value;

const handleChange = (v: string) => {
  props.onChange(v);
};
</script>
