<template>
  <div>
    <el-popover ref="popover1" placement="top-start" title="标题" width="200" trigger="hover" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
    </el-popover>


    <el-button v-popover:popover1>hover 激活</el-button>
  </div>
</template>
