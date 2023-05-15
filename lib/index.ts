import FastForm from "./SchemaForm";
import NumberComponent from "./components/NumberComponent.vue";
import StringComponent from "./components/StringComponent.vue";
import ArrayComponent, { ArrayItemWrapper } from "./components/ArrayComponent";
import BooleanComponent from "./components/BooleanComponent.vue";
import IntegerComponent from "./components/IntegerComponent.vue";
import Selection from "./widgets/Selection";
import ThemeProvider from "./theme";
export * from "./types";
export default FastForm;
export {
  NumberComponent,
  StringComponent,
  ArrayComponent,
  BooleanComponent,
  IntegerComponent,
  ArrayItemWrapper,
  Selection,
  ThemeProvider,
};
