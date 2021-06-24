<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>
<script lang="ts">
import { defineComponent, onUnmounted } from 'vue';
import mitt from 'mitt';
export const emitter = mitt();
type ValidateFunc = () => boolean;
type ClearFunc = () => void;
interface CallBackProps {
  validator: ValidateFunc;
  clearInput: ClearFunc;
}
export default defineComponent({
  emits: ['form-submit'],
  setup(props, context) {
    let funcArr: ValidateFunc[] = [];
    let clearArr: ClearFunc[] = [];
    const submitForm = () => {
      const result = funcArr.map((func) => func()).every((result) => result);
      context.emit('form-submit', result);
    };
    const callback = (obj: CallBackProps | undefined) => {
      if (obj) {
        funcArr.push(obj.validator);
        clearArr.push(obj.clearInput);
      }
    };
    const clearInputs = () => {
      clearArr.forEach((clear) => clear());
    };
    emitter.on('form-item-created', callback);
    onUnmounted(() => {
      emitter.off('form-item-created', callback);
      funcArr = [];
      clearArr = [];
    });
    return {
      submitForm,
      clearInputs,
    };
  },
});
</script>
