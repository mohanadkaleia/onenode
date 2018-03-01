<template>
  <div>
    <div class="">
      <div>
        <logo></logo>
      </div>
      <div>
        <table class="device-list">
          <device  name="Mohanad-laptop" status="true"></device>
          <device  name="Mohanad-desktop"></device>
          <device  name="Shahla-laptop"></device>
          <device  name="Mohanad-iPhone"></device>
        </table>
      </div>
      <div>
        <panel></panel>
      </div>
    </div>

    <div class="controls"></div>
  </div>
</template>

<script>
import Device from './Device.vue'
import Logo from './Logo.vue'
import Panel from './Panel.vue'

export default {
  components: { Device, Logo, Panel },
  data () {
    return {
      device_list: 'Device lists',
      control_panel: 'list of buttons'
    }
  }
}
</script>

<style>
  .device-list {
    width: 100%;
  }
</style>
