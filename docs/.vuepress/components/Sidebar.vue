<script setup lang="ts">
import NavbarItems from '@vuepress/theme-default/lib/client/components/NavbarItems.vue'
import SidebarItems from '@vuepress/theme-default/lib/client/components/SidebarItems.vue'

defineSlots<{
  top?: (props: Record<never, never>) => any
  bottom?: (props: Record<never, never>) => any
}>()
</script>

<template>
  <aside class="hidden lg:relative lg:block lg:flex-none">
    <NavbarItems />
    <slot name="top" />
    <SidebarItems />
    <slot name="bottom" />
  </aside>
</template>
