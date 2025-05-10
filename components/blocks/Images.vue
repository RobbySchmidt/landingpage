<template> 
  <div class="bg-white relative">
    <div class="container mx-auto pb-12 lg:pb-20">
      <div class="lg:w-8/12 mx-auto grid md:grid-cols-2 gap-6 text-gray-800 px-4">
        <div 
          v-if="block" 
          v-for="image in block" 
          :key="image.id"
          class="space-y-4"
          >
          <h2
            v-if="image.title" 
            class="text-xl font-bold"
            >
            {{ image.title }}
          </h2>
          <img
            v-if="image.image" 
            :src="image.image"
            alt="" />
          <div
            v-if="image.description" 
            v-html="image.description.content">
          </div>
        </div>
      </div>
    </div>
  </div> 
</template>

<script setup>
  const supabase = useSupabaseClient()
  const { data: block, pending, error } = await useAsyncData(
    'block_images',
    async () => {
      const { data, error } = await supabase
        .from('block_images')
        .select('*');

      if (error) throw error;
      return data;
    },
    {
      transform: (data) => data
    }
  );
</script>
 