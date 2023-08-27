<script setup lang="ts">
    import Home from '@vuepress/theme-default/lib/client/components/Home.vue';
    import Navbar from '@vuepress/theme-default/lib/client/components/Navbar.vue';
    import Page from '@vuepress/theme-default/lib/client/components/Page.vue';
    import Sidebar from '@vuepress/theme-default/lib/client/components/Sidebar.vue';
    import { usePageData, usePageFrontmatter } from '@vuepress/client';
    import { computed, onMounted, onUnmounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import type { DefaultThemePageFrontmatter } from '@vuepress/theme-default/lib/shared/index.js';
    import {
        useScrollPromise,
        useSidebarItems,
        useThemeLocaleData,
    } from '@vuepress/theme-default/lib/client/composables/index.js';

    defineSlots<{
        'navbar'?: (props: Record<never, never>) => any;
        'navbar-before'?: (props: Record<never, never>) => any;
        'navbar-after'?: (props: Record<never, never>) => any;
        'sidebar'?: (props: Record<never, never>) => any;
        'sidebar-top'?: (props: Record<never, never>) => any;
        'sidebar-bottom'?: (props: Record<never, never>) => any;
        'page'?: (props: Record<never, never>) => any;
        'page-top'?: (props: Record<never, never>) => any;
        'page-bottom'?: (props: Record<never, never>) => any;
        'page-content-top'?: (props: Record<never, never>) => any;
        'page-content-bottom'?: (props: Record<never, never>) => any;
    }>();

    const page = usePageData();
    const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>();
    const themeLocale = useThemeLocaleData();

    // navbar
    const shouldShowNavbar = computed(() => frontmatter.value.navbar !== false && themeLocale.value.navbar !== false);

    // sidebar
    const sidebarItems = useSidebarItems();
    const isSidebarOpen = ref(false);
    const toggleSidebar = (to?: boolean): void => {
        isSidebarOpen.value = typeof to === 'boolean' ? to : !isSidebarOpen.value;
    };
    const touchStart = { x: 0, y: 0 };
    const onTouchStart = (e): void => {
        touchStart.x = e.changedTouches[0].clientX;
        touchStart.y = e.changedTouches[0].clientY;
    };
    const onTouchEnd = (e): void => {
        const dx = e.changedTouches[0].clientX - touchStart.x;
        const dy = e.changedTouches[0].clientY - touchStart.y;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
            if (dx > 0 && touchStart.x <= 80) {
                toggleSidebar(true);
            } else {
                toggleSidebar(false);
            }
        }
    };

    // classes
    const containerClass = computed(() => [
        {
            'no-navbar': !shouldShowNavbar.value,
            'no-sidebar': !sidebarItems.value.length,
            'sidebar-open': isSidebarOpen.value,
        },
        frontmatter.value.pageClass,
    ]);

    // close sidebar after navigation
    let unregisterRouterHook;
    onMounted(() => {
        const router = useRouter();
        unregisterRouterHook = router.afterEach(() => {
            toggleSidebar(false);
        });
    });
    onUnmounted(() => {
        unregisterRouterHook();
    });

    // handle scrollBehavior with transition
    const scrollPromise = useScrollPromise();
    const onBeforeEnter = scrollPromise.resolve;
    const onBeforeLeave = scrollPromise.pending;
</script>

<template>
    <div class="theme-container" :class="containerClass" @touchstart="onTouchStart" @touchend="onTouchEnd">
        <slot name="navbar">
            <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar">
                <template #before>
                    <slot name="navbar-before" />
                </template>
                <template #after>
                    <slot name="navbar-after" />
                </template>
            </Navbar>
        </slot>

        <!-- <div class="sidebar-mask" @click="toggleSidebar(false)" /> -->

        <div class="relative mx-auto flex w-full max-w-8xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12">
            <Sidebar class="hidden lg:relative lg:block lg:flex-none">
                <template #top>
                    <slot name="sidebar-top" />
                </template>
                <template #bottom>
                    <slot name="sidebar-bottom" />
                </template>
            </Sidebar>

            <div name="page" class="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
                <Home v-if="frontmatter.home" />

                <Transition
                    v-else
                    name="fade-slide-y"
                    mode="out-in"
                    @before-enter="onBeforeEnter"
                    @before-leave="onBeforeLeave"
                >
                    <Page :key="page.path">
                        <template #top>
                            <slot name="page-top" />
                        </template>
                        <template #content-top>
                            <slot name="page-content-top" />
                        </template>
                        <template #content-bottom>
                            <slot name="page-content-bottom" />
                        </template>
                        <template #bottom>
                            <slot name="page-bottom" />
                        </template>
                    </Page>
                </Transition>
              </div>
        </div>
    </div>
</template>
