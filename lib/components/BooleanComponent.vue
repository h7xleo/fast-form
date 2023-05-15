<template>
  <BooleanWidget
    :schema="schema!"
    :value="value"
    :onChange="handleChange"
    :erros="errorSchema.__errors"
    v-bind="widgetOptionsRef"
  ></BooleanWidget>
</template>

<script lang="ts" setup>
import { CommonWigetNames, ComponentPropsDefault } from "../types";
import { computed, defineProps } from "vue";
import { getWidget } from "../theme";

const props = defineProps(ComponentPropsDefault);
const BooleanWidgetRef = computed(() => {
  const widgetRef = getWidget(CommonWigetNames.BooleanWidget, props);
  return widgetRef.value;
});
const widgetOptionsRef = computed(() => {
  const { widget, properties, items, ...rest } = props.uiSchema!;
  return rest;
});
const handleChange = (v: boolean) => {
  props.onChange(v);
};
const BooleanWidget = BooleanWidgetRef.value;
</script>
