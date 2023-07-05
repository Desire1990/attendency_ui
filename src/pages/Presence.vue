<template>
  <div class="main-panel">
    <div class="content-wrapper">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb" style="font-size: 24px;">
              <li class="breadcrumb-item"><a href="/">Dashboard</a></li>
              <li class="breadcrumb-item active" aria-current="page">Présence </li>
            </ol>
        </nav>
        <div class="col-lg-12 grid-margin">
          <div class="card">
          <div class="card-body">
             <h4 class="text-center text-primary"><i class="fa  fa-check-square-o">&emsp; Présence des employés </i></h4><hr>
                  <form class="form-group" method="post">
                      <span class="mb-5">** All Fields are required</span><br>
                          <div class="table-responsive">
                              <table class="table table-striped">
                                  <thead>
                                      <tr>
                                          <th>
                                              Date
                                          </th>
                                          
                                          <th>
                                              Employé
                                          </th><!-- 
                                          <th>
                                              First in
                                          </th> -->
                                          <th>
                                              Status
                                          </th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      <tr>
                                          <td class="py-3">
                                            <input type="date hidden" :value = 'currentDate()'>
                                          </td>                                          
                                          <td>
                                            {{this.user.username}}                                          
                                          </td><!--                                           
                                          <td>
                                            <input type="time" v-model = "presence.first_in">
                                          </td> -->
                                          <td>
                                            <div class="field">
                                              <select type="text" name="cars_id" v-model = "presence.status" id="id_entrant">
                                                  <option value="PRESENT">PRESENT</option>
                                                  <option value="ABSENT">ABSENT</option>
                                                  <option :value="UNAVAILABLE">UNAVAILABLE</option>
                                              </select>       
                                            </div>
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </div>              
                      <div class="text-center mt-3">
                          <button @click.prevent='signIn' class="btn btn-rounded btn-outline-success">Sign in
                          </button>
                      </div>
        </form><br>
        <h4 class="text-center text-primary"><i class="fa  fa-sign-in">&emsp; Signed In Staffer(s) </i> </h4><hr>
    <small class='text-center'>Ceci est une liste des membres du personnel qui sont actuellement présents ou absents. </small>
    <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Utilisateur</th>
                                <th>
                                    Date
                                </th>
                                <th>
                                    Arrivé
                                </th>
                                <th>
                                    Depart
                                </th>
                                <th>
                                    Status
                                </th>
                                <th>
                                    Duration
                                </th>
                                <th>
                                    Action(s)
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr v-for = "ps, index in items">
                                  <th>{{ps.user.username}}</th>
                                    <td class="py-1">
                                        {{(ps.date)}}
                                    </td>
                                    <td>
                                    {{ps.first_in}}
                                    </td>
                                    <td>
                                    
                                        {{ps.last_out }}
                                    </td>
                                    <td>
                                    
                                        {{ps.status }}
                                    </td>
                                    <td>
                                    {{ps.hours}}
                                    </td>
                                    <td v-if='ps.is_approved==false'>
                                      <button style=" background-color: mediumvioletred; color: white;"@click.prevent="signOut(ps)" class="fa fa-sign-out">Sign-out</button>
                                    </td>
                                    <td v-else>-</td>
                                </tr>
                        </tbody>
                    </table>
                </div>
      </div></div></div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from "axios"
  export default {
    data(){
      return {
        logs:"", presence:{},
        items:[],
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
    methods: {
    signIn(){
      axios.post(this.$store.state.url+`/presence/`, this.presence, this.headers)
      .then((response) => {
        this.presence = {};
        this.$store.state.presences.push(response.data);
        this.fetchData()
      }).catch((error) => {
        console.error(error);
      })
    },
    signOut(item){
      axios.put(this.$store.state.url+`/presence/${item.id}/`, this.presence, this.headers)
      .then((response) => {
        this.presence = {};
        this.$store.state.presences.push(response.data);
        this.fetchData()
      }).catch((error) => {
        console.error(error);
      })
    },
    fetchData(){
        if(this.$store.state.users.length==0){
          axios.get(this.$store.state.url+'/presence/', this.headers)
          .then((response) => {
            if (response.data.next) {
                  this.showNextButton = true
            }

            if (response.data.previous) {
                this.showPrevButton = true
            }
            this.$store.state.presences = response.data.results;
            this.items = response.data.results;
            console.log(response.data.results)
          }).catch((error) => {
            if(error.response){
            }else{
              console.error(error)
            }
          });
        }
      },
      currentDate() {
        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
        return date;
      }
    },
    mounted(){
      this.fetchData();    }
  }
</script>
<style scoped>
.hidden{

}
.main-panel{
    padding: 20px;
}
.btn.btn-rounded {
    border-radius: 50px;
    border: 1px solid;
}
.btn.btn-rounded:hover {
  background-color:#00ce66;
  color: white;
}
.btn-outline-success {
    color: #00ce68;
    background-color: transparent;
    background-image: none;
    border-color: #00ce68;
    border-radius: 0.1875rem;
}
.btn {
    display: inline-block;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.56rem 1.375rem;
    font-size: 1.5rem;
    line-height: 1.5;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.table td, .table th  {
    vertical-align: middle;
    font-size: 17px;
    line-height: 1;
    white-space: nowrap;
}
.table th, .table td {
    padding: 18px 30px;
    vertical-align: top;
    border-top: 1px solid #f2f2f2;
}
input {
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  font-size: inherit;
  border: none;
}

user agent stylesheet
td {
    display: table-cell;
    vertical-align: inherit;
}
table {
    border-collapse: collapse;
}
user agent stylesheet
table {
    border-collapse: separate;
    text-indent: initial;
    border-spacing: 2px;
}
</style>