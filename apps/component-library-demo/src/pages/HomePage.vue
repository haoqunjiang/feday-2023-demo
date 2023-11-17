<script setup lang="ts">
import { HelloWorld } from 'component-library';
import { shallowRef, isVue2, isVue3 } from 'vue-demi';

const helloWorldInstance = shallowRef<InstanceType<typeof HelloWorld> | null>(
  null,
);

const onClickButton = () => {
  helloWorldInstance.value?.alertMessage();
};
</script>

<template>
  <div>
    <HelloWorld message="FeDay" ref="helloWorldInstance" />
    <button @click="onClickButton">点击</button>
    <div v-if="isVue2">This app is running on Vue 2</div>
    <div v-if="isVue3">This app is running on Vue 3</div>
  </div>
</template>
