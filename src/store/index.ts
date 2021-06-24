import { createStore, Commit } from "vuex";
import request from "@/untils/request";
// import { testPosts } from '../testData'

export interface ResponseType<P={}>{
  code: number;
  msg: string;
  data: P;
}
export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
  avatar?: ImageProps;
  description?: string;
}
export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
  fitUrl?: string;
}
export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}
export interface PostProps {
  _id?: string;
  title: string;
  excerpt?: string;
  content: string;
  image?: ImageProps|string;
  createdAt?: string;
  column: string;
  author?: string|UserProps;
}

export interface GlobalError {
  status: boolean;
  message?: string;
}

export interface GlobalDataProps {
  error: GlobalError;
  token: string;
  loading: boolean;
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}



const getAndCommit = async (
  url: string,
  muationName: string,
  commit: Commit
) => {
  const { data } = await request.get(url);
  commit(muationName, data);
  return data
};
const postAndCommit = async (
  url: string,
  muationName: string,
  commit: Commit,
  payLoad: any
) => {
  const { data } = await request.post(url, payLoad);
  console.log(data)
  commit(muationName, data);
  return data;
};
const store = createStore<GlobalDataProps>({
  state: {
    error: { status: false, message: '' },
    token: localStorage.getItem('token') || "",
    loading: false,
    columns: [],
    posts: [],
    user: {
      isLogin: false,

    },
  },
  getters: {
    getColumnById: (state) => (id: string) => {
      return state.columns.find((c) => {
        return c._id === id;
      });
    },
    getPostsByCid: (state) => (cid: string) => {
      return state.posts.filter((post) => post.column === cid);
    },
    getCurrentPost: (state) => (id: string) => {
      return state.posts.find(post => post._id === id)
    }
  },
  mutations: {
    // login(state, flag) {
    //   state.user = { ...state.user, isLogin: flag, name: 'H yiDa' }
    // },
    createPost(state, newPost) {
      state.posts.push(newPost);
    },
    fetchColumns(state, rowData) {
      state.columns = rowData.data.list;
    },
    fetchColumn(state, rowData) {
      state.columns = [rowData.data];

    },
    fetchPosts(state, rowData) {
      state.posts = rowData.data.list;
    },
    fetchPost(state, rawData) {
      state.posts = [rawData.data]
    },
    setLoading(state, status) {
      state.loading = status;
    },
    setError(state, e: GlobalError) {
      console.log(state, e)
      state.error = e
    },
    fetchCurrentUser(state, rowData) {
      console.log(rowData)
      state.user = { isLogin: true, ...rowData.data }
    },
    login(state, rowData) {
      const { token } = rowData.data
      state.token = token;
      // 或者用cookie 插件例如 js-cookie
      localStorage.setItem('token', token)
      request.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    loginOut(state, rowData) {
      state.token = ''
      delete request.defaults.headers.common.Authorization
      state.user.isLogin = rowData
      localStorage.removeItem('token')
    },
    signUp() {
      console.log('signUp')
    }
  },
  actions: {
    fetchColumns({ commit }) {
     return getAndCommit("/columns/?pageSize=100", "fetchColumns", commit);
    },
    fetchColumn({ commit }, cid) {
     return getAndCommit(`/columns/${cid}`, "fetchColumn", commit);
    },
    fetchPosts({ commit }, cid) {
     return getAndCommit(`/columns/${cid}/posts`, "fetchPosts", commit);
    },
    fetchPost({ commit }, id) {
      return getAndCommit(`/posts/${id}`, 'fetchPost', commit)
    },
    fetchCurrentUser({ commit }) {
     return getAndCommit("/user/current", "fetchCurrentUser", commit);
    },
    login({ commit }, payLoad) {
      return postAndCommit("/user/login", "login", commit, payLoad);
    },
    createPost({ commit }, payLoad) {
      return postAndCommit("/posts", "createPost", commit, payLoad);
    },
    loginAndFetch({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    },
    signUp({ commit }, payLoad) {
      return postAndCommit("/users", "signUp", commit, payLoad);
    }
  },
  modules: {},
});
export default store;
