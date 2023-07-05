<template>
	<div  :class="{popup:true, active:visible}" @click="close">

		<div ref='modal' class="popup-body" @click.stop  >
			<section id="registration-page">
        <form class="signup-form">
            <!-- FORM HEADER -->
            <div class="form-header">
                <h1>Créer Employé</h1>
            </div>
            <!-- FORM BODY -->
            <div class="form-body">
                <!-- First name & Last name -->
                <!-- username -->
                <div class="row">
                    <div class="input-group">
                        <label>Username </label>
                        <input type="text" placholder="Enter the username" v-model="employe.user.username">
                    </div>
                </div>
                <div class="row">
                    <div class="input-group">
                        <label>First name </label>
                        <input type="text" placholder="Enter your first name" v-model="employe.user.first_name">
                    </div>
                    <div class="input-group">
                        <label>Last name</label>
                        <input type="text" placholder="Enter your last name" v-model="employe.user.last_name">
                    </div>
                  </div>
                <!-- Email -->
                <div class="row">
                    <div class="input-group">
                        <label>Email </label>
                        <input type="email" placholder="Enter your email address" v-model="employe.user.email">
                    </div>
                </div>
                <!-- Matricule & date de naissance -->
                <div class="row">
                    <div class="input-group">
                        <label>Matricule </label>
                        <input type="number" placholder="Enter your first name" v-model="employe.matricule">
                    </div>
                    <div class="input-group">
                        <label>Date de Naissance</label>
                        <input type="date" placholder="Enter your last name" v-model="employe.date_naissance">
                    </div>
                </div>
                <div class="row">
                    <div class="input-group">
                        <label>Password </label>
                        <input type="password" placholder="Enter your your password" v-model="employe.user.password">
                    </div>
                    <div class="input-group">
                        <label>Confirm Password</label>
                        <input type="password" placholder="Enter your password again" v-model="employe.user.password">
                    </div>
                </div>
            </div>
            <div class="input-group">
            	<label for="id_nom">Services</label>
	            <select v-model="employe.service" name="city" id="city" class="form-control" tabindex="12">

							  <option v-for="(city,cityIndex) in services" :key="city.id" :value="city.id">{{ city.nom }}</option>
							</select>
            </div>
            <div class="input-group">
            	<label for="id_nom">Agence</label>
	            <select v-model="employe.agence" name="city" id="city" class="form-control" tabindex="12">

							  <option v-for="(city,cityIndex) in agences" :key="city.id" :value="city.id">{{ city.nom }}</option>
							</select>
            </div>
						<center>
							<div class="logs">
								{{logs}}
							</div>
						</center>
				<div class="btn">
					<button @click.prevent="submitForm" ref="submit">
						Ajouter
					</button>
				</div>				
    		</form>
    </section>
		</div>
	</div>
</template>
<script>
import axios from "axios";
export default {
	props: {
		visible:{ type:Boolean, default:false}
	},
	data(){
		return {
			logs:"",
      employe:{
          user: {
          password: "",
          is_superuser: false,
          username: "",
          first_name: "",
          last_name:"",
          email: ""
      },
      matricule:"",
      date_naissance:'',
  },
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
		this.fetchServices();
		this.fetchAgence()
	},
	methods: {
    submitForm() {
				axios.post(this.$store.state.url+`/employe/`, this.employe, this.headers)
					.then((response) => {
						this.employe = {};
						this.$store.state.employes.push(response.data);
						this.$emit("close");
					}).catch((error) => {
						console.error(error);
					})
    },
    fetchServices(){
      let headers = {
          headers: {
            "Authorization": "Bearer " + this.$store.state.user.access
          }
        }
        axios.get(this.$store.state.url+'/service/', headers)
        .then((response) => {
          this.$store.state.services = response.data.results;
          this.services = response.data.results;
          console.log(response.data.results)
        }).catch((error) => {
          if(error.response){
          }else{
            console.error(error)
          }
        });
    },
    fetchAgence(){
      let headers = {
          headers: {
            "Authorization": "Bearer " + this.$store.state.user.access
          }
        }
        axios.get(this.$store.state.url+'/agence/', headers)
        .then((response) => {
          this.$store.state.agences = response.data.results;
          this.agences = response.data.results;
          console.log(response.data.results)
        }).catch((error) => {
          if(error.response){
          }else{
            console.error(error)
          }
        });
    },
		close(){
			this.$emit("close");
		},
		createAgence(){
			if(!this.agence.nom){
				this.logs = "le nom est obligatoire"
				return;
			}
			if(!this.agence.description){
				this.logs = "la description est obligatoire"
				return;
			}
			axios.post(this.$store.state.url+`/agence/`, this.agence, this.headers)
			.then((response) => {
				this.agence = {};
				this.$store.state.agences.push(response.data);
				this.$emit("close");
			}).catch((error) => {
				console.error(error);
			})
		}
	}
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto');

* {
    margin:0;
    font-family: "Roboto", sans-serif;
    box-sizing: border-box;
}

html, body {
    height:100%; 
     
}

#registration-page {
    height:100%;
    background:#78a7ba; 
    display:flex;
    justify-content: center;
    align-items: center;
    overflow:scroll;
}

.signup-form  {
    flex:1;
    max-width:600px;
    border-radius: 10px;
    background-color: #EFF0F1;
    border: 1px solid #999;
    margin-top: auto;
    margin-bottom:  auto;
  }
  
/* FORM HEADER */
.form-header {
    padding:15px 0;
    border-bottom:1px solid #cccccc;
}

.form-header h1 {
    font-size: 28px;
    text-align:center;
    color:#666;
}

/* FORM BODY */
.form-body {
    background:white;
    padding:5px 10px;
}

.row {
    display:flex; 
}
  
.input-group {
    flex:1;  
    display:flex;
    flex-direction:column; 
    margin:10px 5px;
}

/* FORM BODY - Gender & Hobbies */
.radio-group, .checkbox-group {
    display:flex;
  }
  
  .radio-group div, .checkbox-group div {
    flex:1;
  }
  
  .radio-group label, .checkbox-group label  {
    color:#666;
    cursor:pointer;
  }
/* FORM BODY - Source of Income & Income */
  .range-group {
    display:flex;
  }

  .range-group input {
      flex:1;
  }

  .range-group label {
    margin-left:10px;
    background-color: #1BBA93;
    color:white;
    border-radius: 5px;
    padding:5px;
    font-size:17px;
    text-align:center;
  }

/* MOBILE VIEW */
@media only screen and (max-width: 500px) {
    .row{
      flex-direction:column; 
    }

    .btn {
        flex:1;
    }
}


/* FORM FOTTER */
.form-footer {
    display:flex;
    justify-content: flex-end;
    padding:10px;
}

.btn {
    padding:10px 20px;
    background-color: #4134e3;
    font-size:17px;
    border:none;
    border-radius:5px;
    color:#bcf5e7;
    cursor:pointer;
 }

 /* INPUT*/

 label {
  color:#1BBA93;
  font-size: 17px;
  font-weight: 500;
}

input[type="text"],
input[type="date"],
input[type="email"] ,
input[type="password"],
input[type="file"],
input[type="number"],
select,
textarea  {
width:100%;

font-size: 18px;
height: 34px;
padding-left: 10px;
padding-right: 10px;
color: #666;
border: 1px solid #d6d6d6;
border-radius: 4px;
background: white;
outline: none;
}
</style>