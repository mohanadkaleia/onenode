<template>
  <div>
    <div id="explorer" class="container-fluid">
      <div class="row">
        <div v-for="file in files" class="col">
          <item v-bind:name='file.name' v-bind:status='file.status'></item>
          {{file.name}}
        </div>
      </div>
    </div>
</div>
</template>

<script>
import Item from './Item.vue'
export default {
  components: { Item },
  data () {
    return {
      files: [{name: 'Document', status: 'online', type:'file'},
              {name: 'Pictures', status: 'offline', type:'video'},
              {name: 'Videos', status: 'local', type:'picture'},
              {name: 'Music', status: 'local', type:'music'},
              {name: 'Document', status: 'online', type:'file'},
              {name: 'Pictures', status: 'offline', type:'video'},
              {name: 'Videos', status: 'local', type:'picture'}
            ]
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
