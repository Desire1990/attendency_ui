<template>
	<div :class="{popup:true, active:visible}" @click="close">
		<div class="popup-body" @click.prevent.stop>
			<center>
				<h3>Modifier</h3>
			</center>
			<form method="post">
				<div class="field">
					<label for="id_unite">Debut:</label>
					<input type="date" v-model="new_service.date_de_debut" id="id_unite">
				</div>
				<div class="field">
					<label for="id_unite">Fin:</label>
					<input type="date" v-model="new_service.date_de_fin" id="id_unite">
				</div>
				<div class="field">
					<label>Selectionnez le type de conge</label><br>
			    <select type="text" name="cars_id" v-model="new_service.type_de_conge" id="id_entrant">
			        <option>---- Selection d'une type ----</option>
			        <option value="conge de maladie">Conge de maladie</option>
			        <option value="Conge annuelle">Conge annuelle</option>
			        <option value="Conge circonstance">Conge circonstance</option>
			        <option value="Conge prénatal">Conge prénatal</option>
			        <option value="Conge postnatal">Conge postnatal</option>
			        <option value="Conge prenatal">Conge prenatal</option>
			        <option value="Conge d'etude">Conge d'etude</option>
			    </select>		
				</div>
				<div class="field">
					<label for="id_unite">Raison:</label>
					<input type="text" v-model="new_service.raison" id="id_unite">
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
			axios.put(this.$store.state.url+`/conge/${this.service.id}/`, this.new_service, headers)
			.then((response) => {
				let conges = this.$store.state.conges;
				for(var i = 0; i < conges.length; i++){
					let x = conges[i];
					if(x.id==this.service.id){
						this.$store.state.conges[i] = response.data;
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