<template>
  <div id="app">
    <div class="container-fluid fill no-padding">
      <div class="row no-gutters fill">
        <div class="col-sm-12 col-md-3 sidebar" style="background-color: white">
          {{files}}
          <sidebar></sidebar>
        </div>
        <div class="col-sm-12 col-md-9 file-explorer">
          <explorer></explorer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Sidebar from './components/Sidebar.vue'
  import Explorer from './components/Explorer.vue'
  import FilesManagement_service from './services/FilesManagement_service'

  export default {
    components: { Sidebar, Explorer },
    name: 'app',
    data () {
      return {
        files: []
      }
    },
    mounted () {
      // TODO: Check for update

      // Get all files inside a folder upon loading the application
      this.getFiles()


    },
    methods: {
       getFiles () {
        FilesManagement_service.listFiles((response, error) => {
          if (response) {
            this.files = response.data
          } else {
            console.log(error);
          }
        })

      }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  height: 100%;
}

#app .sidebar {
  background-color: #533557;
  height: 100%;
}

#app .file-explorer {
  /*background-color: #F6C390;*/
  /*background-color: #343D46;*/
  background-color: #FEBE7E;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.fill {
  height: 100%;
}

.no-padding {
  padding-left: 0px;
  padding-right: 0px;
}
</style>
