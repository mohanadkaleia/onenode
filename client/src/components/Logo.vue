<template>
  <div>
    <div class="container-fluid logo">
      <div class="row">
        <div class="col">
          <div class="square-top"></div>
        </div>

      </div>
      <div class="row">
          <div class="col offset-md-2">
              <div class="circle"></div>
          </div>
          <div class="col"></div>
          <div class="col">
              <div class="circle"></div>
          </div>
          <div class="col"></div>
          <div class="col"></div>
      </div>
    </div>




  </div>
</template>

<script>
  export default {

  }
</script>

<style>
.circle {
  display: inline-block;
  width: 75px;
  height: 75px;
  background-color: #EC7263;
  border-radius: 100%;
}

.logo-line {
  margin: 15px 0 30px;

  span {
    display: inline-block;
    height: 10px;
    margin: 0 5px;
    background-color: #C06162;
    border-radius: 5px;

    &:first-child {
      width: 50px;
    }

    &:last-child {
      width: 80px;
    }
  }
}

.square-top {
  display: inline-block;
  position: relative;
  width: 60px;
  height: 60px;
  background-color: #FEBE7E;
  z-index: 1;
}

.logo {
  margin-top: 50px;
}
</style>
