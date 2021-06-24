<template>
  <div class="home-page container-md">
    <section class="text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <a href="#" class="btn btn-primary my-2" @click="goArticle">开始写文章</a>
          </p>
        </div>
      </div>
    </section>
    <!-- <uploader action="/upload" :beforeUpload="beforeUpload" @file-uploaded="onFileUploaded" @fileUploaderError="fileUploaderError">
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.data.url" width="500" />
      </template>
    </uploader> -->
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import ColumnList from '../components/ColumnList.vue';
// import Uploader from '../components/Uploader.vue';
// import createMessage from '../components/createMessage';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
// ImageProps,ResponseType
import { GlobalDataProps } from '../store/index';

export default defineComponent({
  name: 'Home',
  components: {
    ColumnList,
    // Uploader
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const router=useRouter()
    onMounted(() => {
      store.dispatch('fetchColumns');
    });
    const list = computed(() => {
      return store.state.columns;
    });
    // columndetail store改造
    // const beforeUpload=(file: File)=>{
    //   const isJPG= file.type==='image/jpeg' || file.type==='image/png'
    //   if(!isJPG){
    //     createMessage('上传图片可以是 JPG 格式或 PNG 格式','error')
    //   }
    //   return isJPG
    // }
    // const fileUploader=(rowData: ResponseType<ImageProps>)=>{
    //    createMessage(`上传图片ID ${rowData.data._id}`,'success')
    // }
    // const fileUploaderError=(rowData: {error: string})=>{
    //    createMessage(`上传图片ID ${rowData.error}`,'error')
    // }
    const goArticle=()=>{
      router.push({name:'create', path:'/create'})
    }
    return {
      list,
      goArticle
      // beforeUpload,
      // fileUploader,
      // fileUploaderError
    };
  },
});
</script>
