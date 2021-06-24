<template>
  <div class="row">
    <div
      class="col-4 mb-4 "
      v-for="(item, index) in columnList"
      :key="item._id"
      :index="index"
    >
      <div class="card h-100 shadow-sm" style="width: 18rem;">
        <div class="card-body text-center">
          <img
            :src="item.avatar && item.avatar.fitUrl"
            :alt="item.title"
            class="rounded-circle border border-light  my-3"
          />
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text  text-start">{{ item.description }}</p>
          <router-link
            :to="{ name: 'column', params: { id: item._id } }"
            class="btn btn-outline-primary"
            >进入专栏</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { ColumnProps } from '../store';
import { addColumnAvatar  } from '../helper'
export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      default: [],
    },
  },
  setup(props) {
    const columnList = computed(() => {
      return props.list.map((column) => {
        // if (!column.avatar) {
        //   column.avatar = {
        //     url: require('@/assets/logo.png'),
        //   };
        // } else {
        //   column.avatar.url =
        //     column.avatar.url + '?x-oss-process=image/resize,m_pad,h_50,w_50';
        // }
        addColumnAvatar (column, 50, 50)
        return column;
      });
    });
    return {
      columnList,
    };
  },
});
</script>
<style scoped>
.card-body img {
  width: 50px;
  height: 50px;
}
</style>
