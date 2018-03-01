<template>
  <div>
    <i v-if="status === 'online'" class="fas fa-file online" :title="name"></i>
    <i v-else-if="status === 'offline'" class="fas fa-file offline" :title="name"></i>
    <i v-else-if="status ==='local'" class="fas fa-file local" :title=name></i>

  </div>
</template>

<script>
  export default {
    props: ['name', 'status'],
    data () {
      return {
        name
      }
    },
    computed () {
    }
  }
</script>

<style>
i {
  font-size: 56px;
  cursor: pointer;
}

i:hover.offline {
  color: #F99157;
}
.online {
  color: #5fb4b3;
}

.offline {
  color: #ec5f66;
}

.local {
  color: #6598cc;
}

i:hover.local {
  color: #C594C5;
}

i:hover.online {
  color: #99C794;
}


</style>
