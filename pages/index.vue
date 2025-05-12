<template>  
  <div class="relative z-10">
    <component
      v-for="(block, index) in blocks"
      :is="map[block.component]"
      :block="block.component"
      :key="index"
    />
  </div>
</template>

<script setup>
  const supabase = useSupabaseClient();
  const { path } = useRoute();

  const map = {
    block_heroBanner: resolveComponent('LazyBlocksHeroBanner'),
    block_title: resolveComponent('LazyBlocksTitle'),
    block_images: resolveComponent('LazyBlocksImages'),
    block_secondaryBanner: resolveComponent('LazyBlocksSecondaryBanner'),
    block_accordion: resolveComponent('LazyBlocksAccordion'),
    block_imageText: resolveComponent('LazyBlocksImageText'),
  };

  const { data: blocks, error } = await supabase
    .from('page_components')
    .select('*, page(*)')
    .eq('page', path);
</script>
