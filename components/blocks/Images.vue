<template> 
  <div class="bg-white relative">
    <div class="container mx-auto pb-12 lg:pb-20">
      <div class="lg:w-8/12 mx-auto grid md:grid-cols-2 gap-6 text-gray-800 px-4">
        <NuxtLink 
        v-if="block" 
        v-for="image in block" 
        :to="image.id"
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
        </NuxtLink>
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
      transform: (data) => data
    }
  );
</script>