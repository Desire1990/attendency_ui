<template>
  <div id="body">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <div class="main" v-if="logged_in">
      <NavBar/>
      <router-view/>
      <div class="loggout" @click="loggout">
        <fa icon="power-off" />
      </div>
    </div>
    <div v-else>
      <Login/>
    </div>
  </div>
</template>

<script>
import Login from "./pages/Login.vue"
import NavBar from "./components/navbar.vue";
export default{
  components:{NavBar, Login},
  computed:{
    logged_in() {
      return this.$store.state.user != null;
    }
  },
  mounted(){
    var user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.$store.state.user = user;
    } else {
      console.warn("il y'a pas de session");
    }
  },
  watch:{
    "$store.state.user":{
      deep: true,
      handler(new_user){
        localStorage.setItem('user', JSON.stringify(new_user));
      }
    }
  },
  methods:{
    loggout(){
      if (confirm("êtes vous sur de vouloir deconnecter?")) {
        this.$store.state.user = null;
      }
    },
  }
};
</script>
<style scoped>
  .loggout{
  position: fixed;
  right: 10px;
  top: 5px;
  font-size: 20px;
  background: #944;
  color: #ccc;
  border-radius: 5px;
  padding: 3px 10px;
  box-shadow: 0px 0px 5px 2px #777;
}
.loggout:hover{
  color: #fff;
}
</style>