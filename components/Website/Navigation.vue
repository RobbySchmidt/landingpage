<template>
  <div>
    <nav class="bg-white md:flex md:justify-between sticky top-0 z-30 shadow">
      <div class="p-4 flex justify-between items-center">
        <NuxtLink 
          :to="'/'" 
          class="cursor-pointer">
          <Codesandbox/>
        </NuxtLink>
        <span 
          @click="store.openMenu = !store.openMenu" 
          class="text-2xl cursor-pointer md:hidden">
          <X v-if="store.openMenu"/>
          <AlignJustify v-else/>
        </span>   
      </div>
      <ul 
        :class="store.openMenu ? 'w-full' : 'w-0'" 
        class="bg-white h-screen md:h-full border-y border-black md:border-none duration-150 ease-[cubic-bezier(.51,1.03,.89,.94)] overflow-hidden grid content-start md:gap-4 md:pt-5 md:pb-4 absolute right-0 md:static md:flex md:w-auto">
          <li 
            v-for="data in pages">
            <NuxtLink 
            class="px-4 text-xl border-b border-black md:border-none inline-block py-4 md:py-0 w-full" 
            :href="data.slug">
            {{ data.title }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
  import { useStore } from '/store/store';
  import { X, AlignJustify, Codesandbox } from 'lucide-vue-next'

  const supabase = useSupabaseClient();
  const store = useStore()
  const route = useRoute();

    
  let { data: pages, error } = await supabase
    .from('pages')
    .select('*')
          

  watch(() => route.fullPath, () => {
      store.openMenu = false;
  });

  useHead({
    bodyAttrs: {
      class: computed(() => {
      if (store.openMenu == true) return 'overflow-hidden';
      
      return '';
      }),
    },
  });
</script>

<style scoped>
    
</style>