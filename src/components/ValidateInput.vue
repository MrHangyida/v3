<template>
  <div class="validate-input-container pb-3">
    <input v-if="tag !== 'textarea'"
           class="form-control"
           :class="{ 'is-invalid': inputRef.error }"
           :value="inputRef.val"
           @blur="validateInput"
           @input="updateValue"
           v-bind="$attrs" />
    <textarea v-else
              class="form-control"
              :class="{ 'is-invalid': inputRef.error }"
              :value="inputRef.val"
              @blur="validateInput"
              @input="updateValue"
              v-bind="$attrs">
    </textarea>
    <span class="invalid-feedback"
          v-if="inputRef.error">
      {{ inputRef.message }}
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, PropType, onMounted, toRefs } from 'vue';
import { emitter } from './ValidateInputForm.vue';
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
interface RuleProp {
  type: 'required' | 'email' | 'custom';
  message: string;
  validater?: () => boolean;
}
export type RulesProp = RuleProp[];
export type TagType = 'input' | 'textarea';
export default defineComponent({
  name: 'ValidateInput',
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: 'input',
    },
  },
  inheritAttrs: false,
  setup(props, context) {
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: '',
    });
    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value;
      inputRef.val = targetValue;
      context.emit('update:modelValue', targetValue);
    };
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every((rule) => {
          let passed = true;
          inputRef.message = rule.message;
          switch (rule.type) {
            case 'required':
              passed = inputRef.val.trim() !== '';
              break;
            case 'email':
              passed = emailReg.test(inputRef.val);
              break;
            case 'custom':
              passed = rule.validater ? rule.validater() : true;
              break;
            default:
              break;
          }
          return passed;
        });
        inputRef.error = !allPassed;
        return allPassed;
      }
      return true;
    };
    const clearInput = () => {
      inputRef.val = '';
      context.emit('update:modelValue', inputRef.val);
    };
    onMounted(() => {
      emitter.emit('form-item-created', {
        validator: validateInput,
        clearInput,
      });
    });
    const inputRefOne = toRefs(inputRef);
    return {
      ...inputRefOne,
      inputRef,
      validateInput,
      updateValue,
    };
  },
});
</script>
