<template>
  <tr class="device-item">
    <td @click="strike">{{ name }}</td>
    <td><i class="fas fa-trash-alt delete"></i></td>
    <td>
      <span v-if="status" class="badge badge-success">on</span>
      <span v-else class="badge badge-secondary">off</span>
    </td>
  </tr>
</template>

<script>
  export default {
      props: ['name', 'status'],
      data () {
        return {

        }
      },
      methods: {
        strike () {
            console.log(this.name);
        }
    },
    created () {}
  }
</script>

<style>
  .device-item td {
    padding: 15px;
    color: white;
    text-align: left;
    padding-left: 60px;
    cursor: pointer;
    background-color:  rgba(64, 32, 40, 0.4);
    font-family: 'Dosis', Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*border-bottom: 1px solid white;*/
  }

  .device-item td:hover {
    /*background-color: rgba(215, 213, 215, 0.3);*/
  }

  .device-item .delete {
    font-size: 16px;
    color: #EC5f67;
  }

  
</style>
