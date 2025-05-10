<template> 
  <div class="bg-white relative">
    <div class="container mx-auto py-12">
      <div class="lg:w-8/12 mx-auto grid md:grid-cols-2 gap-6 text-gray-800 p-4">
        <div 
          v-if="block" 
          v-for="image in block" 
          :key="image.id"
          >
          <NuxtLink
            :to="`/images/${image.id}`" 
            class="space-y-4">
            <h2 class="text-xl">
              {{ image.title }}
            </h2>
            <img 
              :src="image.image"
              alt="" />
            <div 
              v-html="image.description.content">
            </div>
          </NuxtLink>
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
 