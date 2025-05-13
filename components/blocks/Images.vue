<template> 
  <div class="bg-white relative">
    <div class="container mx-auto pb-12 lg:pb-20">
      <div class="lg:w-8/12 mx-auto grid md:grid-cols-2 gap-6 text-gray-800 px-4">
        <NuxtLink 
          v-if="block" 
          v-for="image in block" 
          :to="'/images/' + image.id"
          :key="image.id"
          class="space-y-4 group overflow-hidden"
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
            class="lg:group-hover:scale-105 duration-500 ease-in-out"
            alt="" />
          <div
            v-if="image.description" 
            v-html="image.description.content"
            class="line-clamp-3">
          </div>
          <span 
            class="font-semibold">
            read more
            <MoveRight
            class="inline-block duration-500 ease-in-out lg:group-hover:translate-x-1 w-5 h-5 ml-1"/>
          </span>
        </NuxtLink>
      </div>
    </div>
  </div> 
</template>

<script setup>
  import { MoveRight } from 'lucide-vue-next'
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
      transform: (data) => data
    }
  );
</script>