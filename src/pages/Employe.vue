<template>
          <section class="content">
            <section class="container-fluid">
              <section class="row">
                  <section class="col col-lg-12">
                    <a href="#" style="color:#c1c1c1;"></a><br><br><br>
                  </section>
              </section>
                    <!-- <div class="container"> -->
                    <section class="row margin-bottom">
                      <div class="container-fluid">
                      <section class="col-lg-4 col-md-4 col-sm-12">
                    <div class="employee-box sec-box">
                      <a href="">
                      <span>Employees</span>
                      </a>
                      <span class="count-object">{{items.length }}</span> 
                    </div>
                  </section>
                  <section class="col-lg-4 col-md-4 col-sm-12">
                    <div class="leave-box sec-box">
                      <a href="">
                      <span>Agences</span>
                      </a>
                      <span class="count-object deprt">{{items2.length}}</span>
                    </div>
                  </section>
                  <section class="col-lg-4 col-md-4 col-sm-12">
                    <div class="birthday-box sec-box">
                      <a href="">
                      <span>Services</span>
                      </a>
                      <span class="count-object">{{items1.length}}</span> 
                    </div>
                  </section>
                  <!-- <section class="col col-lg-4">
                    <div class="deleted-box sec-box">
                      <a href="">
                      <span>Deleted</span>
                      </a>
                    </div>
                  </section> -->
                  </div>
                    </section><!-- /row -->

                    <!-- </div> -->
                    <!-- Search form -->
          <div class="row" style="margin-bottom: 2.2rem;margin-top: 3rem;">
           <div class="">
            <div class="col-lg-12">

              <form action="" method="GET">
                <div class="input-group">
                  <span class="input-group-btn">
                    <!-- <button class="btn btn-default" id = "stylebutton" type="button">Search</button> -->
                  </span>
                  <input type="search" name="search" class="form-control" placeholder="Search by firstname,lastname...">
                </div><!-- /input-group -->
              </form>

            </div><!-- /.col-lg-6 -->
            </div>
          </div><!-- /.row -->
          <!-- /search form -->

                  <!-- TABLE -->
                  <div class="table-responsive table-shadow">
                    <div class="text-center table-description">
                      <h4 class="title-h3" style="color: #60a0b3 !important;
                text-shadow: 1px 0px rgba(0,0,0,0.11)">TABLE DE TOUS LES EMPLOYEES </h4>
                    </div>
                    <div class="container-fluid">
                      <div class="row">
                        <div class="download-print-action">
                            Download Excel | Pdf | Print <!-- Work on pdf and excel and print -->
                            
                        </div>
                      </div>
                    </div>
                    <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Matricule</th>
                    <th scope="col">Nom Complet</th>
                    <th scope="col">Service</th>
                    <th scope="col">Agence</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- {% for employee in items %} -->
                  <tr v-for = 'employee in items'>

                    <!-- {% if employee.employeeid %} -->
                    <th scope="row">{{ employee.matricule }}</th>
                    <!-- {% else %} -->
                    <!-- <th scope="row">-</th> -->
                    <!-- {% endif %} -->

                    <td>{{ employee.user.first_name }} {{ employee.user.last_name }}</td>
                    <td>{{ employee.service.nom}}</td>
                    <td>{{ employee.agence.nom }}</td>

                    <!-- {% if employee.is_blocked %} -->
                    <td style="text-transform:capitalize;">{{employee.status}}</td>
                    <!-- {% else %} -->
                    <!-- <td>active</td> -->
                    <!-- {% endif %} -->

                    <td>                       
                      <button class="btn" @click="edit_mode=true">Edit</button>

                    </td>
                  </tr>
                  <!-- {% endfor %} -->

                </tbody>

            </table>
            <!-- Pagination -->
                <div class="pagination">
                  <span class="step-links">
                    <center>
                      <div class="buttons">
                          <button class="btn btn-info btn-sm ml-1 " @click="loadPrev()" v-if="showPrevButton">Prev</button>
                          <button class="btn btn-info btn-sm ml-1 " @click="loadNext()" v-if="showNextButton">Next  </button>
                      </div>
                        
                    </center>
                  </span>
              </div>
            <!-- /pagination -->


          </div>
                  <!-- /TABLE -->

            </section> <!-- /container --> 


        </section>
</template>

<script>
import axios from 'axios';
export default{
  data(){
    return {
      csvData : {},
      items:this.$store.state.employes,
      items1:this.$store.state.services,
      items2:this.$store.state.agences,
      active_item:{},
      currentPage: 1,
      showNextButton: false,
      showPrevButton: false,
      search_term:'',
      loading:false,
      edit_mode:false, achat_mode:false, add_mode:false
    }
  },
  watch:{
    "$store.state.employes"(new_val){
      this.items = new_val;
    }
  },
  methods:{
    fetchData(){
      let headers = {
          headers: {
            "Authorization": "Bearer " + this.$store.state.user.access
          }
        }
        if(this.$store.state.users.length==0){
          axios.get(this.$store.state.url+'/employe/', headers)
          .then((response) => {
            if (response.data.next) {
                  this.showNextButton = true
            }

            if (response.data.previous) {
                this.showPrevButton = true
            }
            this.$store.state.employes = response.data.results;
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
      loadNext() {
        this.currentPage += 1
        this.fetchData()
      },
      loadPrev() {
          this.currentPage -= 1
          this.fetchData()
      },
    
      fetchServices(){
      let headers = {
          headers: {
            "Authorization": "Bearer " + this.$store.state.user.access
          }
        }
      if(this.$store.state.users.length==0){
        axios.get(this.$store.state.url+'/service/', headers)
        .then((response) => {
          this.$store.state.services = response.data.results;
          this.items1 = response.data.results;
          console.log(response.data.results)
        }).catch((error) => {
          if(error.response){
          }else{
            console.error(error)
          }
        });
      }
    },
    fetchAgence(){
      let headers = {
          headers: {
            "Authorization": "Bearer " + this.$store.state.user.access
          }
        }
      if(this.$store.state.users.length==0){
        axios.get(this.$store.state.url+'/agence/', headers)
        .then((response) => {
          this.$store.state.agences = response.data.results;
          this.items2 = response.data.results;
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
  mounted(){
    this.fetchData();
    this.fetchServices();
    this.fetchAgence()
  }
};
</script>




<style>
        .fa-eye,.fa-pencil{
          margin-right: 5px;
     }

     .table-shadow{
      background: white;
      padding: 2%;
      -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(  0,0,0,0.2);
      box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
  }
  

  h4{
  margin:2px 0 5px 0 !important;
  }


  .download-print-action{
    padding-bottom: 12px;
  }


    #override-start{
      background:none !important;
      top: 35% !important;
      right:13px;
      color:#000;
      font-size: 24px;

  }

  .alert-warning{
      background:#fd7b7b;
  }

  .alert-success {
      background-color: #82b72a;
  }

  .alert-success,.alert-warning{
      font-size:16px;
  }

  .sec-box{
     height:80px;
     max-width:100%;
     line-height:80px;
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
  background:#3f9a26;
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

.deleted-box{
  background:#d42828;
}

.company-box{
  background:#868686;
}

.margin-bottom{
  margin-bottom:1.4rem;
}

.count-object {
    position: absolute;
    top: 31%;
    right: 12px;
    font-size: 25px;
    font-weight: 100;
    font-variant: petite-caps;
    color: #f5f5f5;
    text-shadow:1px 1px rgba(8, 8, 8, 0.23);
}

.deprt{
  color:#4195bd !important;
}


#stylebutton{
  background: #60a0b3 !important;
    color: #fff !important;
    font-variant: petite-caps !important;
    font-size: 14px !important;
}

.input-group-btn + input:focus{
  outline:#60a0b3;
}

.btn{
  display: inline-block;
  background-color: #0088aa ;
  padding: 4px;
  margin: 4px;
  justify-content: center;
}


</style>