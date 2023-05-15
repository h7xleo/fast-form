<template>
  <IntegerWidget
    :schema="schema!"
    :value="value"
    :onChange="handleChange"
    :errors="errorSchema.__errors"
    v-bind="widgetOptionsRef"
  ></IntegerWidget>
</template>

<script lang="ts" setup>
import { getWidget } from "../theme";
import { CommonWigetNames, ComponentPropsDefault } from "../types";
import { defineProps, computed } from "vue";

const props = defineProps(ComponentPropsDefault);
const IntegerWidgetRef = computed(() => {
  const widget = getWidget(CommonWigetNames.IntegerWidget, props);
  return widget.value;
});
const widgetOptionsRef = computed(() => {
  const { widget, properties, items, ...rest } = props.uiSchema!;
  return rest;
});
const IntegerWidget = IntegerWidgetRef.value;

const handleChange = (v: number) => {
  props.onChange(v);
};
</script>
