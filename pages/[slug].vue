<template>  
  <div class="relative z-10">
    <WebsitePageBuilder :route="params.slug"/>
  </div>
</template>

<script setup>
  const { params } = useRoute();
</script>
