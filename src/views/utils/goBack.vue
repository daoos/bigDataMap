<template>
  <div>

  </div>
</template>
<script>
export default {
  created(){
      console.log('goBack')
      this.$router.go(-1)
  }
}
</script>

