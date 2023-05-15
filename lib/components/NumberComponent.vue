<template>
  <NumberWidget
    :schema="schema!"
    :value="value"
    :onChange="handleChange"
    :errors="errorSchema.__errors"
    v-bind="widgetOptionsRef"
  ></NumberWidget>
</template>
<script lang="ts" setup>
import { computed, defineProps } from "vue";
import { ComponentPropsDefault, CommonWigetNames } from "../types";
import { getWidget } from "../theme";
const props = defineProps(ComponentPropsDefault);
const NumberWidgetRef = computed(() => {
  const widgetRef = getWidget(CommonWigetNames.NumberWidget, props);
  return widgetRef.value;
});
const widgetOptionsRef = computed(() => {
  const { widget, properties, items, ...rest } = props.uiSchema!;
  return rest;
});
const NumberWidget = NumberWidgetRef.value;

const handleChange = (v: number) => {
  props.onChange(v);
};
</script>
