<template>
  <div class="conge">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb" style="font-size: 24px;">
                  <li class="breadcrumb-item"><a href="/">Dashboard</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Quotation </li>
                </ol>
            </nav>
            <section>
              <div class="conge">
                <h3>What's next for quotation ???</h3>
              </div>
            </section>
  </div>
</template>
<script>
import axios from 'axios';
export default{
  data(){
    return {
      csvData : {},
      items:this.$store.state.services,
      active_item:{},
      edit_mode:false, achat_mode:false, add_mode:false
    }
  },
  watch:{
    "$store.state.services"(new_val){
      this.items = new_val;
    }
  },
  methods:{
    Delete(item) {
      let headers = {
          headers: {
          "Authorization": "Bearer " + this.$store.state.user.access
          }
        };
        if (confirm('Effacer le service ' + item.nom)) {
            axios.delete(this.$store.state.url+`/service/${item.id}/`, headers)
                .then( response =>                     
                {
                    this.fetchData()
                    return response
                }
            );
        }
    },
    exitEdition(){
      this.active_item = {};
      this.add_mode = false;
      this.edit_mode = false;
    },
    startEdit(item){
      this.active_item = item;
      this.edit_mode = true;
    },
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
    total(){
      let total = 0;
      for(let item of this.items){
        total += 1;
      }
      return total;
    },
  },
  mounted(){
    this.fetchData()
  }
};
</script>

<style scoped>
        .fa-eye,.fa-pencil{
          margin-right: 5px;
     }

     .table-shadow{
/*      background: white;*/
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
   width:200px;
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

.recycler{
  display: flex;
  flex-wrap: wrap;
}
tr th{
  background-color: #f5f5f5;
}
tr:nth-child(even) {
  background-color: #eee;
}
td{
  padding-right: 10px;
}
.table button, .table .btn{
  padding: 3px 1em;
}
.table tr:hover {
  background-color: #ddd;
}
.table {
  border-collapse: collapse;
  width: 100%;
}
.table th, .table td {
  border-bottom: 1px solid #aaa;
  text-align: left;
  height: 30px;
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
.conge{
  padding: 24px;
}
</style>