<template>  
  <div class="bg-white relative">
    <div class="container mx-auto py-12 lg:py-20">
      <div class="lg:w-8/12 mx-auto space-y-12 px-4">
        <h2 
          class="text-4xl lg:text-5xl font-bold underline text-gray-800"
          v-if="block.title">
          {{ block.title }}
        </h2>
        <div
          class="text-gray-800 md:text-lg"
          v-if="block.content" 
          v-html="block.content">
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