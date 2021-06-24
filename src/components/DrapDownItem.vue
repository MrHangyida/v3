<template>
  <li class="dropdown-option" :class="{ 'is-disabled': disabled }">
    <slot name="drapDownItemName"></slot>
  </li>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'DrapDownItem',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    // console.log(props);
  },
});
</script>

<style lang="scss">
.dropdown-option.is-disabled * {
  color: '#6c757d';
  pointer-events: none;
  background-color: transparent;
}
</style>
