<template>
  <div class="dropdown" ref="drapDownRef">
    <a
      href="#"
      class="btn btn-outline-light my-2 dropdown-toggle"
      @click.prevent="toggleOpen"
      >{{ title }}</a
    >
    <ul
      class="dropdown-menu"
      aria-labelledby="dropdownMenuLink"
      :style="{ display: 'block' }"
      v-if="isOpen"
    >
      <slot></slot>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import useClickOutside from '../hooks/useClickOutside';
export default defineComponent({
  name: 'DrapDown',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const isOpen = ref(false);
    const drapDownRef = ref<null | HTMLElement>(null);
    const toggleOpen = () => {
      isOpen.value = !isOpen.value;
    };
    // const handler = (e: MouseEvent) => {
    //   if (drapDownRef.value) {
    //     if (
    //       !drapDownRef.value.contains(e.target as HTMLElement) &&
    //       isOpen.value
    //     ) {
    //       isOpen.value = false;
    //     }
    //   }
    // };
    // onMounted(() => {
    //   document.addEventListener('click', handler);
    // });
    // onUnmounted(() => {
    //   document.removeEventListener('click', handler);
    // });
    const isClickOutside = useClickOutside(drapDownRef);
    // console.log(isClickOutside, isOpen.value, 'isClickOutside');
    watch(isClickOutside, () => {
      // console.log(isClickOutside, isOpen.value, 'isClickOutside');
      if (isClickOutside.value && isOpen.value) {
        isOpen.value = false;
      } else {
        isOpen.value = true;
      }
    });
    return {
      isOpen,
      toggleOpen,
      drapDownRef,
    };
  },
});
</script>
