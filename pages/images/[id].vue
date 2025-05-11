<template> 
  <div class="bg-white relative">
    <div class="container mx-auto py-12 lg:py-20">
      <div class="max-w-4xl mx-auto text-gray-800 px-4 space-y-4">
        <Button 
          @click="$router.push('/')" 
          variant="secondary"
          class="group gap-1.5">
          <MoveLeft
            class="inline-block transition-transform lg:group-hover:-translate-x-1 w-5 h-5"/>
            Back to main Page
        </Button>
        <div 
          v-if="block" 
          class="space-y-4 shadow rounded-md overflow-hidden">
          <img
          v-if="image.image" 
          :src="image.image"
          alt="" />
          <h2
            v-if="image.title" 
            class="text-xl font-bold px-4"
            >
            {{ image.title }}
          </h2>
          <div class="px-4 pb-4"
            v-if="image.description" 
            v-html="image.description.content">
          </div>
        </div>
      </div>
    </div>
  </div> 
</template>

<script setup>
  import { MoveLeft } from 'lucide-vue-next'
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

  const { params } = useRoute(9)
  const image = computed(() =>{
    return block.value.find(item => item.id === params.id)
  })
</script>
 