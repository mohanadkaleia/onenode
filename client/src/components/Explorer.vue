<template>
  <div>
    <div id="explorer" class="container-fluid">
      <div class="row">
        <div v-for="file in files" class="col">
          <!-- <item v-bind:name='file.name' v-bind:status='file.status'></item> -->
          <item v-bind:name='file.name' status='online'></item>
          {{file.name}}
        </div>
      </div>
    </div>
</div>
</template>

<script>
import FilesManagement_service from '../services/FilesManagement_service'
import File_manager from '../controller/File_manager'
import Item from './Item.vue'
export default {
  components: { Item },
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
#explorer {
  margin-top: 50px;
  pading: 25px;
}
</style>
