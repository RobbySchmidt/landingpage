<template>
  <div class="bg-white sticky top-0 z-30 shadow">
    <div class="container mx-auto">
      <nav class="md:flex md:justify-between lg:w-8/12 mx-auto p-4">
        <div class="flex justify-between items-center">
          <NuxtLink 
            :to="pages[0].slug" 
            class="cursor-pointer">
            <img 
              class="w-13 block" 
              src="/logo.png" 
              alt="">
          </NuxtLink>
          <span 
            @click="store.openMenu = !store.openMenu" 
            class="cursor-pointer md:hidden">
            <X v-if="store.openMenu"/>
            <AlignJustify v-else/>
          </span>   
        </div>
        <ul 
          :class="store.openMenu ? 'w-full' : 'w-0'" 
          class="bg-white h-screen md:h-full border-y border-gray-800 md:border-none duration-150 ease-[cubic-bezier(.51,1.03,.89,.94)] overflow-hidden md:gap-4 absolute top-[63px] right-0 md:static md:flex md:w-auto">
          <li
            v-if="pages" 
            v-for="data in pages.slice(1)">
            <NuxtLink 
              class="text-gray-800 text-xl font-medium border-b border-gray-800 md:border-none inline-block p-4 md:py-0 w-full" 
              :to="'/' + data.slug">
              {{ data.title }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
  import { useStore } from '/store/store';
  import { X, AlignJustify } from 'lucide-vue-next'

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