<template>  
  <div class="relative z-10">
    <component
      v-for="(block, index) in blocks"
      :is="block.component"
      :block="block.component_title"
      :key="index"
    />
  </div>
</template>

<script setup>
  import BlocksHeroBanner from '@/components/blocks/HeroBanner.vue';
  import BlocksTitle from '@/components/blocks/Title.vue';
  import BlocksImages from '@/components/blocks/Images.vue';
  import BlocksSecondaryBanner from '@/components/blocks/SecondaryBanner.vue';
  import BlocksAccordion from '@/components/blocks/Accordion.vue';
  import BlocksImageText from '@/components/blocks/ImageText.vue';

  const supabase = useSupabaseClient();
  const blocks = ref([]);
  const { path } = useRoute()

  const componentMap = {
    BlocksHeroBanner,
    BlocksTitle,
    BlocksImages,
    BlocksSecondaryBanner,
    BlocksAccordion,
    BlocksImageText,
  };

  const fetchBlocks = async () => {
    const { data: pageComponents, error } = await supabase
      .from('page_components')
      .select('*, page(*)')
      .eq('page', path)

      blocks.value = pageComponents
      .map((component) => {
        
        return {
          component: componentMap[component.component],
          component_title: component.component_title,
        };
      })
      
  };

  onMounted(fetchBlocks);
</script>
