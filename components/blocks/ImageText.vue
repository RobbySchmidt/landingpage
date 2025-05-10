<template> 
  <div class="bg-white relative">
    <div class="container mx-auto pb-12 lg:pb-20">
      <div class="lg:w-8/12 mx-auto grid md:grid-cols-2 gap-6 px-4 text-gray-800">
        <div>
          <img
            v-if="block.image"
            class="w-full block" 
            :src="block.image"
            alt="" />
        </div>
        <div class="grid content-center gap-4">
          <div 
            v-if="block.text" 
            v-html="block.text.content">
          </div>
          <Button
            v-if="block.button"
            variant="secondary"
            size="lg"
            as-child>
            <NuxtLink>
              {{ block.button.label }}
            </NuxtLink>
          </Button>
        </div>
      </div>
    </div>
  </div> 
</template>

<script setup>
  const supabase = useSupabaseClient()
  const { data: block, pending, error } = await useAsyncData(
    'block_imageText',
    async () => {
      const { data, error } = await supabase
        .from('block_imageText')
        .select('*');

      if (error) throw error;
      return data;
    },
    {
      transform: (data) => data[0]
    }
  );
</script>
 