<template>
	<div  :class="{popup:true, active:visible}" @click="close">

		<div ref='modal' class="popup-body" @click.stop  >
			<center>
				<h3>Créer service</h3>
			</center>
			<form method="post">
				<div class="field">
					<label for="id_nom">Nom:</label>
					<input type="text" v-model="service.nom" id="id_nom" placeholder="le nom du service">
				</div>
				<div class="field">
					<label for="id_entrant">Description:</label>
					<input type="text" v-model="service.description" id="id_entrant" placeholder="decrire le service..">
				</div>
				<div class="logs">{{logs}}</div>
				<div class="btns">

					<button @click.prevent="createService" ref="submit">
						Ajouter
					</button>
				</div>				
    		</form>
		</div>
	</div>
</template>
<script>
import axios from "axios";
export default {
	props: {
		visible:{ type:Boolean, default:false},
		modelaVisible:true
	},
	data(){
		return {
			logs:"", service:{},
		}
	},
	computed:{
		headers(){
			return {
				headers: {
					"Authorization": "Bearer " + this.$store.state.user.access
				}
			}
		}
	},
	mounted(){
		this.fetchData()
	},
	methods: {
		fetchData(){
	      let headers = {
	          headers: {
	            "Authorization": "Bearer " + this.$store.state.user.access
	          }
	        }
	      if(this.$store.state.users.length==0){
	        axios.get(this.$store.state.url+'/service/', headers)
	        .then((response) => {
	          this.$store.state.services = response.data.results;
	        }).catch((error) => {
	          if(error.response){
	          }else{
	            console.error(error)
	          }
	        });
	      }
	    },
		close(){
			this.$emit("close");
		},
		createService(){
			if(!this.service.nom){
				this.logs = "le nom est obligatoire"
				return;
			}
			if(!this.service.description){
				this.logs = "la description est obligatoire"
				return;
			}
			axios.post(this.$store.state.url+`/service/`, this.service, this.headers)
			.then((response) => {
				this.service = {};
				this.$store.state.services.push(response.data);
				this.$emit("close");
			}).catch((error) => {
				console.error(error);
			})
		}
	}
};
</script>
<style>
form{
	margin-top: 10px;
	display: flex;
	flex-direction: column;
}
form div{
	margin: 5px;
}
[disabled]{
	border: 1px solid gray;
}
.buttons{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.buttons *{
  margin: 0 5;
}
.logs{
  width: 180px;
  color: red;
  align-items: center;
  text-align: center;
}
input[type=text], input[type=password], input[type=number], select{
	padding: 7px;
	font-size: 12pt;
    border-radius: 0;
    border: 1px solid black;
}
input[type=submit], button{
	padding: 8px 15px;
	font-size: 1em;
	background: var(--primary);
	border-radius: 0;
	border-width: 0;
	color: white;
	margin: 5px;
}
.field{
	margin: 10px 0;
}
.field *{
	display: block;
	width: 100%;
}
.popup{
	position: fixed;
	background-color: rgb(0,0,0,0.5);
	top:0;
	left:0;
	width: 100%;
	height: 100%;
	visibility: hidden;
	overflow-y: scroll;
	z-index: 3;
}
.popup.active{
	visibility: visible;
}
.popup-body{
	position: absolute;
	border-radius: 0;
	top:30%;
	left:50%;
	transform: translate(-50%, -30%);
	background-color: white;
	opacity: 1;
	padding: 5px;
}
@media screen and (max-width: 650px){
}
.btns{
  display: flex;
  background-color: #4134e3 ;
  padding: 0px;
  margin-left: 120px;
  margin-right: 120px;
  justify-content: center;
}
</style>