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
    .select('*');

  if (error) {
    console.error("Error fetching components:", error);
    return;
  }

  console.log("Fetched Components:", pageComponents);

  blocks.value = pageComponents
    .map((component) => {
      if (!componentMap[component.component]) {
        console.warn(`Component "${component.component}" not found in componentMap`);
        return null; // Skip if the component is not found
      }
      return {
        component: componentMap[component.component],
        component_title: component.component_title,
      };
    })
    .filter(Boolean); // Remove nulls
};

onMounted(fetchBlocks);
</script>
