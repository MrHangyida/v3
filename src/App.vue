<template>
  <div class="container-fluid px-0 flex-shrink-0">
    <GlobalHeader :user="currentUser"></GlobalHeader>
    <loader
      v-if="isLoading"
      text="拼命加载中"
      background="rgba(0,0,0, 0.8)"
    ></loader>
    <router-view></router-view>
    <!-- <ColumnList :list="list"></ColumnList> -->
    <!-- <router-view name="footer"></router-view> -->
    <!-- 视图命名-->
    <!-- 底部组件-->
  </div>
  <GlobalFoot></GlobalFoot>
</template>
<script lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css';
// onMounted
import { computed, defineComponent,watch } from 'vue';
// import ColumnList, { ColumnProps } from './components/ColumnList.vue';
import GlobalHeader from './components/GlobalHeader.vue';
import GlobalFoot from './components/GlobalFoot.vue';
import Loader from './components/Loader.vue';
import createMessage from './components/createMessage'
import { useStore } from 'vuex';
import {GlobalDataProps} from '@/store'
// import request from './untils/request'
// const testData: ColumnProps[] = [
//   {
//     id: 1,
//     title: 'test1的专栏',
//     // avater: 'https://www.58pic.com/c/22014876',
//     description: 'H_yiDa H_yiDa H_yiDa H_yiDa H_yiDa H_yiDa H_yiDa H_yiDa',
//   },
//   {
//     id: 2,
//     title: 'test2的专栏',
//     avater: require('./assets/logo.png'),
//     description: 'H_yiDa2 H_yiDa2 H_yiDa2 H_yiDa2 H_yiDa2 H_yiDa2 H_yiDa2',
//   },
//   {
//     id: 3,
//     title: 'test3的专栏',
//     avater: require('./assets/logo.png'),
//     description: 'H_yiDa3 H_yiDa3 H_yiDa3 H_yiDa3 H_yiDa3 H_yiDa3 H_yiDa3',
//   },
//   {
//     id: 4,
//     title: 'test4的专栏',
//     avater: require('./assets/logo.png'),
//     description: 'H_yiDa4 H_yiDa4 H_yiDa4 H_yiDa4 H_yiDa4 H_yiDa4 H_yiDa4',
//   },
//   {
//     id: 5,
//     title: 'test5的专栏',
//     avater: require('./assets/logo.png'),
//     description: 'H_yiDa5 H_yiDa5 H_yiDa5 H_yiDa5 H_yiDa5 H_yiDa5 H_yiDa5',
//   },
// ];
// interface EmaliRules {
//   val: string;
//   error: boolean;
//   message: string;
// }
export default defineComponent({
  name: 'App',
  components: { GlobalHeader, GlobalFoot, Loader },
  setup() {
    const store = useStore<GlobalDataProps>();
    const currentUser = computed(() => store.state.user);
    const isLoading = computed(() => store.state.loading);
    // const token = computed(()=>{ return store.state.token})
    const error = computed(() =>{
       console.log( store.state.error)
       return  store.state.error
     })
    // onMounted(()=>{
    //   if(!currentUser.value.isLogin&&token.value){
    //     console.log('toekn')
    //     request.defaults.headers.common.Authorization=`Bearer ${token.value}`
    //     store.dispatch('fetchCurrentUser')
    //   }else{
    //     console.log('no token',currentUser.value.isLogin)
    //   }
    // })
     watch(() => error.value.status, () => {
      const { status, message } = error.value
      if (status && message) {
        createMessage(message, 'error')
      }
    })
    return {
      currentUser,
      isLoading,
      error
    };
  },
});
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  list-style: none;
  font-weight: normal;
  text-decoration: none;
}
body,
html,
#app {
  width: 100%;
  height: 100%;
}
</style>
