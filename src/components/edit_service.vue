<template>
	<div :class="{popup:true, active:visible}" @click="close">
		<div class="popup-body" @click.prevent.stop>
			<center>
				<h3>Modifier {{service.nom}}</h3>
			</center>
			<form method="post">
				<div class="field">
					<label for="id_unite">Nom:</label>
					<input type="text" v-model="new_service.nom" id="id_unite">
				</div>
				<div class="field">
					<label for="id_unite">Description:</label>
					<input type="text" v-model="new_service.description" id="id_unite">
				</div>
				<div class="btn">
					<div class="logs">{{logs}}</div>
					<input type="submit" value="Modifier" @click="changerService">
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
		service:{ type:Object, required:true}
	},
	data(){
		return {
			logs:"", new_price:"", new_service:""
		}
	},
	watch:{
		service(new_value){
			this.new_service = JSON.parse(JSON.stringify(new_value));
		}
	},
	methods: {
		close(){
			this.$emit("close");
		},
		changerService(){
			let headers = {
				headers: {
				"Authorization": "Bearer " + this.$store.state.user.access
				}
			};
			axios.put(this.$store.state.url+`/service/${this.service.id}/`, this.new_service, headers)
			.then((response) => {
				let services = this.$store.state.services;
				for(var i = 0; i < services.length; i++){
					let x = services[i];
					if(x.id==this.service.id){
						this.$store.state.services[i] = response.data;
						break;
					}
				}
				this.$emit("close");
			}).catch((error) => {
				console.error(error);
			})
		}
	}
};
</script>
<style scoped>
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
  margin: 0;
}
.logs{
  width: 180px;
  color: red;
}
.btn{
  display: inline-block;
  background-color: #4134e3 ;
  padding: 0px;
  margin: 4px;
  justify-content: center;
}
.btns{
  display: inline-block;
  background-color: #4134e3 ;
  padding: 0px;
  float: right;
}
</style>