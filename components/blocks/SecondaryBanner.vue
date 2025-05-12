<template>
  <div 
    class="bg-transparent relative"
    :class="block.text && block.button ? 'py-18 md:py-24' : 'py-24 md:py-32'">
    <div class="container mx-auto">
      <div class="lg:w-8/12 mx-auto space-y-12 px-4">
        <div 
          class="text-white/80 text-4xl lg:text-5xl" 
          v-if="block.text.content"
          v-html="block.text.content">
        </div>
      
        <Button as-child
          size="lg">
          <NuxtLink
            v-if="block.button" 
            :to="block.button.url">
            {{ block.button.label }}
          </NuxtLink>
        </Button>
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