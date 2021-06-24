<template>
  <nav class="navbar navbar-dark bg-dark justify-content-between mb-4 px-4">
    <!-- Navbar content -->
    <router-link class="navbar-brand" to="/">者也专栏</router-link>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <router-link to="/login" class="btn btn-outline-light my-2"
          >登录</router-link
        >
      </li>
      <li class="list-inline-item">
        <router-link to="/signup" class="btn btn-outline-light my-2"
          >注册</router-link
        >
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <DrapDown :title="`您好 ${user.nickName}`">
          <DrapDownItem>
            <template v-slot:drapDownItemName>
              <router-link to="/create" class="dropdown-item">新建文章</router-link>
            </template>
          </DrapDownItem>
          <DrapDownItem disabled>
            <template v-slot:drapDownItemName>
              <a href="#" class="dropdown-item">编辑资料</a>
            </template>
          </DrapDownItem>
          <DrapDownItem>
            <template v-slot:drapDownItemName>
              <a href="#" class="dropdown-item" @click="cancelOut">退出登录</a>
            </template>
          </DrapDownItem>
        </DrapDown>
      </li>
    </ul>
  </nav>
</template>
<script lang="ts">
import { defineComponent, PropType, onUpdated } from 'vue';
import DrapDown from './DrapDown.vue';
import DrapDownItem from './DrapDownItem.vue';
import { UserProps } from '../store/index';
import { useStore } from 'vuex';
import { GlobalDataProps } from '../store';

export default defineComponent({
  name: 'GlobalHeader',
  components: {
    DrapDown,
    DrapDownItem,
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true,
      default: {},
    },
  },
  setup(props) {
    const store = useStore<GlobalDataProps>();
    const cancelOut = () => {
      console.log('tuicu登录')
      store.commit('loginOut', false);
    };
    onUpdated(()=>{
      console.log(props.user)
    })
    return {
      cancelOut,
    };
  },
});
</script>
