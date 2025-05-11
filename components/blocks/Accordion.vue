<template> 
  <div class="bg-white relative">
    <div class="container mx-auto py-12 lg:py-20">
      <div class="lg:w-6/12 mx-auto space-y-12 text-gray-800 px-4">
        <h2 
          class="text-3xl lg:text-4xl font-bold underline text-gray-800"
          v-if="block.title">
          {{ block.title }}
        </h2>
        <Accordion type="single" class="w-full space-y-1" collapsible >
          <AccordionItem v-for="item in block.items" :value="item.title">
            <AccordionTrigger>{{ item.title }}</AccordionTrigger>
            <AccordionContent>
              <div v-html="item.content"></div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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