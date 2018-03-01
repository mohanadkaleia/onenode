<template>
  <div id="app">
    <div class="container-fluid fill no-padding">
      <div class="row no-gutters fill">
        <div class="col-sm-12 col-md-3 sidebar">
          <logo></logo>
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

  export default {
    components: { Sidebar, Explorer },
    name: 'app',
    data () {
      return {
        msg: 'Welcome to O1node'
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
