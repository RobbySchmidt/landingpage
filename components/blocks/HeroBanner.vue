<template>
  <div>
    <div class="clip-inset relative">
      <div class="fixed inset-0">
        <img
          crossorigin 
          v-if="block.image"
          :src="block.image"
          :alt="block.title"
          class="block w-full h-full object-cover object-[10%]">
      </div>
      <div class="container relative p-4">
        <div class="lg:w-8/12 mx-auto text-6xl lg:text-7xl text-white/80">
          <div 
            v-if="block.text.headline"
            class="py-24 md:py-32"
            v-html="block.text.headline">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    block: String
  })
  const supabase = useSupabaseClient()
  const { data: block, pending, error } = await useAsyncData(
    props.block,
    async () => {
      const { data, error } = await supabase
        .from(props.block)
        .select('*');

      if (error) throw error;
      return data;
    },
    {
      transform: (data) => data[0]
    }
  );
</script>

<style scoped>

</style>