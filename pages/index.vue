<template>  
  <div class="relative z-10">
    <WebsitePageBuilder :route="path"/>
  </div>
</template>

<script setup>
  const { path } = useRoute();
</script>
