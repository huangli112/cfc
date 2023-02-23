<template>
  <div class="">
    <div class="text-white">
      <div>
        <div class=" text-center">
          <h1 class="mb-4">呃...</h1>
          <div class="mb-5">抱歉，找不到您访问的资源啦 :(</div>
          <a-button
            @click="$router.replace('/')"
            type="primary"
          >←&nbsp; 返回首页</a-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.error-device-content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1;
}
</style>
