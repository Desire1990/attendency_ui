<template>
	<div>
        <section class="content">
            <section class="container-fluid">
            	<section class="row">
            		<section class="col col-lg-4">
            			<div class="employee-box sec-box">
            				<a href="">
            				<span>Employes </span>
            				</a>
            				<span class="count-object">{{ employes.length }}</span> 
            			</div>
            		</section>
            		<section class="col col-lg-4">
            			<div class="leave-box sec-box">
            				<span>Conges</span>
                        <span class="count-object" style="color:#41b6d6;">{{ conges.length}}</span> 
            			</div>
            		</section>
            		<section class="col col-lg-4">
            			<div class="birthday-box sec-box">
            				<a href="">
            				<span>Presences</span>
            				</a>
                            <span class="count-object"> {{presences.length}} </span>
            			</div>
            		</section>
                 </section>
             </section>
         </section>
     </div>
</template>
<script>
    import axios from 'axios'
    export default{
        data(){
            return{
                employes:this.$store.state.employes,
                conges:this.$store.state.conges,
                presences:this.$store.state.presences,                
            }
        },
        mounted(){
          this.fetchEmployes();
          this.fetchData();
          this.fetchConges();
        },
        methods:{
            fetchEmployes(){
              let headers = {
                  headers: {
                    "Authorization": "Bearer " + this.$store.state.user.access
                  }
                }
              if(this.$store.state.users.length==0){
                axios.get(this.$store.state.url+'/employe/', headers)
                .then((response) => {
                  this.$store.state.employes = response.data;
                  this.employes = response.data.results;
                  console.log(response.data.results)
                }).catch((error) => {
                  if(error.response){
                  }else{
                    console.error(error)
                  }
                });
              }
            },
            fetchConges(){
              let headers = {
                  headers: {
                    "Authorization": "Bearer " + this.$store.state.user.access
                  }
                }
              if(this.$store.state.users.length==0){
                axios.get(this.$store.state.url+'/conge/', headers)
                .then((response) => {
                  this.$store.state.conges = response.data;
                  this.conges = response.data.results;
                  console.log(response.data.results)
                }).catch((error) => {
                  if(error.response){
                  }else{
                    console.error(error)
                  }
                });
              }
            },
            fetchData(){
              let headers = {
                  headers: {
                    "Authorization": "Bearer " + this.$store.state.user.access
                  }
                }
              if(this.$store.state.users.length==0){
                axios.get(this.$store.state.url+'/presence/', headers)
                .then((response) => {
                  this.$store.state.presences = response.data;
                  this.presences = response.data.results;
                  console.log(response.data.results)
                }).catch((error) => {
                  if(error.response){
                  }else{
                    console.error(error)
                  }
                });
              }
            },

        },
    }
</script>

<style scoped>
    .content{
        padding-top: 20%;
    }
   .sec-box{
     width:300px;
     height:160px;
     max-width:100%;
     line-height:160px;
     margin: 5px;
     display: inline-block;
     text-align:center;
     position:relative;
     
     font-size:1.9rem;

    -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
    transition: all 400ms ease-in;

    font-variant: petite-caps;
 }

.sec-box a{
 color:#fff;
 text-decoration:none;
	
}


 .employee-box{
 	background:#41b6d6;
}


 .leave-box{
 	background:#fff;

}

.leave-box a{
	color:#3ea7c7 !important;
}


 .birthday-box{
 	background:#8664ad;
}

.company-box{
	background:#868686;
}


.count-object {
    position: relative;

    top: 30%;
    right: 12px;
    font-size: 29px;
    font-weight: 100;
    font-variant: petite-caps;
    color: #f5f5f5;
    text-shadow:1px 1px rgba(8, 8, 8, 0.23);
}


</style>