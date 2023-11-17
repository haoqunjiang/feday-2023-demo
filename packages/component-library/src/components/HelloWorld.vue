<script lang="ts">
/**
 * @description 这是一个 HelloWorld 组件
 */
export default {
  name: 'HelloWorld',
};
</script>
<script setup lang="ts">
const props = defineProps<{
  /**
   * 输入的 message 信息
   */
  message: string;
}>();

function alertMessage() {
  alert(`props.message = ${props.message}`);
}
defineExpose({
  alertMessage,
});
</script>
<template>
  <div>Hello, message = {{ message }}</div>
</template>
