<template>
	<div class="centered">
		<form action="." method="post">
        <center>
            <h2 style="text-transform: uppercase;">HRM Management</h2>
        </center><br><br>
		    <div class="field">
				<label for="id_username"><strong>Username:</strong></label>
				<input type="text" name="username" placeholder="Username " required
					id="id_username" v-model="username" autocomplete="on">
			</div>
		    <div class="field">
				<label for="id_password"><strong>Password:</strong></label>
				<input type="password" name="password" placeholder="Password " required
					id="id_password" v-model="password" autocomplete="on">
			</div>
			<label for="id_password" v-if="logs.length>0"
				 style="color:red">{{ logs }}
			</label>
			<div class="btns"><br><br>
	    		<button @click.prevent="logIn">Log In</button>
			</div>
			<center>
				Developped by <b><a href="#">Raoul</a></b>
			</center>
		</form>
	</div>
</template>
<script>
import axios from "axios"
export default{
	data(){
		return{
			logs:"",
			username:"",
			password:"",
			url:this.$store.state.url
		}
	},
	methods:{
		logIn(){
			this.logs = "loging in..."
			axios.post(this.url+"/login/", {
				"username": this.username,
				"password": this.password
			}).then((response) => {
				this.$store.state.user = response.data;
			}).catch((error) => {
				if (!!error.response) {
					this.logs = JSON.stringify(error.response.data)
				} else {
					this.logs = "erreur de connectivité";
				}
			});
		}
	}
};
</script>
<style scoped>
.centered{
	display: flex;
	justify-content: center;
	margin-top: 150px;
}
form{
	background-color: white;
	width: 400px;
	padding: 10px 20px;
	border-radius: 0;
	box-shadow: 0 3px 5px rgba(0, 0, 0, .5);
}
.btns{
	display: flex;
	background-color: #0088aa ;
	padding: 4px;
	margin-left: 120px;
	margin-right: 120px;
	justify-content: center;
}
center{
	margin-top: 10px;
}
h2, a{
	color: var(--primary);
}
@charset "UTF-8";
:root {
	--primary: #0088aa;
	--primary-light: #afd8f3;
	--hover: #29b;
}
*{
	box-sizing: border-box;
	text-decoration: none;
  	margin: 0;
  	padding: 0;
  	outline:0;
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
@media screen and (max-width: 650px){
}
</style>
