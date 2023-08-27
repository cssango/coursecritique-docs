<script setup lang="ts">
    import NavbarBrand from '@vuepress/theme-default/lib/client/components/NavbarBrand.vue';
    import NavbarItems from '@vuepress/theme-default/lib/client/components/NavbarItems.vue';
    import ToggleColorModeButton from '@vuepress/theme-default/lib/client/components/ToggleColorModeButton.vue';
    import ToggleSidebarButton from '@vuepress/theme-default/lib/client/components/ToggleSidebarButton.vue';
    import { computed, ref } from 'vue';
    import {
        DeviceType,
        useThemeLocaleData,
        useUpdateDeviceStatus,
    } from '@vuepress/theme-default/lib/client/composables/index';

    defineEmits<{
        (e: 'toggle-sidebar'): void;
    }>();

    defineSlots<{
        before?: (props: Record<never, never>) => any;
        after?: (props: Record<never, never>) => any;
    }>();

    const themeLocale = useThemeLocaleData();

    const navbar = ref<HTMLElement | null>(null);
    const navbarBrand = ref<HTMLElement | null>(null);

    const linksWrapperMaxWidth = ref(0);
    const linksWrapperStyle = computed(() => {
        if (!linksWrapperMaxWidth.value) {
            return {};
        }
        return {
            maxWidth: linksWrapperMaxWidth.value + 'px',
        };
    });

    useUpdateDeviceStatus(DeviceType.MOBILE, (mobileDesktopBreakpoint: number): void => {
        // avoid overlapping of long title and long navbar links
        const navbarHorizontalPadding =
            getCssValue(navbar.value, 'paddingLeft') + getCssValue(navbar.value, 'paddingRight');
        if (window.innerWidth < mobileDesktopBreakpoint) {
            linksWrapperMaxWidth.value = 0;
        } else {
            linksWrapperMaxWidth.value =
                navbar.value!.offsetWidth - navbarHorizontalPadding - (navbarBrand.value?.offsetWidth || 0);
        }
    });

    function getCssValue(el: HTMLElement | null, property: string): number {
        // NOTE: Known bug, will return 'auto' if style value is 'auto'
        const val = el?.ownerDocument?.defaultView?.getComputedStyle(el, null)?.[property];
        const num = Number.parseInt(val, 10);
        return Number.isNaN(num) ? 0 : num;
    }
</script>

<template>
    <header
        class="sticky top-0 z-50 flex flex-none flex-wrap items-center justify-between bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 dark:shadow-none sm:px-6 lg:px-8 dark:bg-slate-900/95 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75"
    >
        <div class="mr-6 flex lg:hidden">
            <button type="button" class="relative" aria-label="Open navigation">
                <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke-width="2"
                    stroke-linecap="round"
                    class="h-6 w-6 stroke-slate-500"
                >
                    <path d="M4 7h16M4 12h16M4 17h16"></path>
                </svg>
            </button>
            <div
                style="
                    position: fixed;
                    top: 1px;
                    left: 1px;
                    width: 1px;
                    height: 0;
                    padding: 0;
                    margin: -1px;
                    overflow: hidden;
                    clip: rect(0, 0, 0, 0);
                    white-space: nowrap;
                    border-width: 0;
                    display: none;
                "
            ></div>
        </div>
        <div class="relative flex flex-grow basis-0 items-center">
            <a aria-label="Home page" href="/"
                ><svg aria-hidden="true" viewBox="0 0 36 36" fill="none" class="h-9 w-9 lg:hidden">
                    <g fill="none" stroke="#38BDF8" stroke-linejoin="round" stroke-width="3">
                        <path d="M10.308 5L18 17.5 10.308 30 2.615 17.5 10.308 5z"></path>
                        <path d="M18 17.5L10.308 5h15.144l7.933 12.5M18 17.5h15.385L25.452 30H10.308L18 17.5z"></path>
                    </g></svg
                ><svg
                    aria-hidden="true"
                    viewBox="0 0 227 36"
                    fill="none"
                    class="hidden h-9 w-auto fill-slate-700 dark:fill-sky-100 lg:block"
                >
                    <g fill="none" stroke="#38BDF8" stroke-linejoin="round" stroke-width="3">
                        <path d="M10.308 5L18 17.5 10.308 30 2.615 17.5 10.308 5z"></path>
                        <path d="M18 17.5L10.308 5h15.144l7.933 12.5M18 17.5h15.385L25.452 30H10.308L18 17.5z"></path>
                    </g>
                    <path
                        d="M55.96 26.2c-1.027 0-1.973-.173-2.84-.52a6.96 6.96 0 01-2.24-1.5 6.979 6.979 0 01-1.46-2.3c-.347-.893-.52-1.867-.52-2.92 0-1.027.18-1.973.54-2.84a6.71 6.71 0 011.52-2.28 6.922 6.922 0 012.3-1.52 7.48 7.48 0 012.86-.54c.667 0 1.32.093 1.96.28a6.12 6.12 0 011.78.78 5.7 5.7 0 011.4 1.24l-1.88 2.08a6.272 6.272 0 00-1-.82 3.728 3.728 0 00-1.08-.54 3.542 3.542 0 00-1.2-.2 4.14 4.14 0 00-1.62.32 3.991 3.991 0 00-1.3.9 4.197 4.197 0 00-.9 1.38 4.755 4.755 0 00-.32 1.78c0 .667.107 1.273.32 1.82.213.533.513.993.9 1.38.387.373.847.667 1.38.88.547.2 1.147.3 1.8.3a4.345 4.345 0 002.34-.68c.347-.213.653-.46.92-.74l1.46 2.34c-.32.36-.753.687-1.3.98a7.784 7.784 0 01-1.8.7c-.667.16-1.34.24-2.02.24zm6.99-.2l5.48-14h2.68l5.46 14h-3.08l-2.82-7.54c-.08-.213-.18-.487-.3-.82a922.595 922.595 0 00-.68-2.12 13.694 13.694 0 01-.24-.86l.54-.02c-.08.307-.174.627-.28.96-.094.32-.194.653-.3 1-.108.333-.22.66-.34.98-.12.32-.234.633-.34.94L65.91 26h-2.96zm2.54-2.94l.98-2.42h6.42l1 2.42h-8.4zm19.794 3.14c-1.026 0-1.973-.173-2.84-.52a6.96 6.96 0 01-2.24-1.5 6.98 6.98 0 01-1.46-2.3c-.346-.893-.52-1.867-.52-2.92 0-1.027.18-1.973.54-2.84a6.71 6.71 0 011.52-2.28 6.923 6.923 0 012.3-1.52 7.48 7.48 0 012.86-.54c.667 0 1.32.093 1.96.28a6.118 6.118 0 011.78.78c.547.347 1.014.76 1.4 1.24l-1.88 2.08a6.272 6.272 0 00-1-.82 3.728 3.728 0 00-1.08-.54 3.542 3.542 0 00-1.2-.2 4.14 4.14 0 00-1.62.32 3.992 3.992 0 00-1.3.9 4.197 4.197 0 00-.9 1.38 4.755 4.755 0 00-.32 1.78c0 .667.107 1.273.32 1.82.214.533.514.993.9 1.38.387.373.847.667 1.38.88.547.2 1.147.3 1.8.3a4.345 4.345 0 002.34-.68 4.53 4.53 0 00.92-.74l1.46 2.34c-.32.36-.753.687-1.3.98a7.784 7.784 0 01-1.8.7c-.666.16-1.34.24-2.02.24zm17.469-.2V12h3v14h-3zm-8.82 0V12h3v14h-3zm1.2-5.62l.02-2.72h9.14v2.72h-9.16zM110.402 26V12h9.46v2.64h-6.54v8.72h6.68V26h-9.6zm1.4-5.86v-2.56h7.1v2.56h-7.1zM122.437 26l5.48-14h2.68l5.46 14h-3.08l-2.82-7.54c-.08-.213-.18-.487-.3-.82l-.34-1.06-.34-1.06a14.73 14.73 0 01-.24-.86l.54-.02c-.08.307-.173.627-.28.96a63.3 63.3 0 01-.3 1c-.106.333-.22.66-.34.98-.12.32-.233.633-.34.94l-2.82 7.48h-2.96zm2.54-2.94l.98-2.42h6.42l1 2.42h-8.4zM139.023 26V12h5.74c1.027 0 1.953.173 2.78.52.84.333 1.56.813 2.16 1.44a6.097 6.097 0 011.4 2.2c.32.853.48 1.8.48 2.84 0 1.027-.16 1.973-.48 2.84a6.438 6.438 0 01-1.38 2.22 6.394 6.394 0 01-2.16 1.44c-.84.333-1.773.5-2.8.5h-5.74zm3-2.18l-.32-.52h2.96c.6 0 1.14-.1 1.62-.3.48-.213.887-.5 1.22-.86.347-.373.607-.827.78-1.36.173-.533.26-1.127.26-1.78a5.56 5.56 0 00-.26-1.76 3.595 3.595 0 00-.78-1.36 3.323 3.323 0 00-1.22-.86 3.948 3.948 0 00-1.62-.32h-3.02l.38-.48v9.6zM158.671 26l-5.58-14h3.18l2.92 7.58c.16.413.293.78.4 1.1.12.307.22.6.3.88.093.267.18.533.26.8.08.253.16.533.24.84l-.58.02c.107-.413.213-.793.32-1.14.107-.36.227-.733.36-1.12.133-.387.3-.847.5-1.38l2.76-7.58h3.16l-5.62 14h-2.62zm8.114 0l5.48-14h2.68l5.46 14h-3.08l-2.82-7.54c-.08-.213-.18-.487-.3-.82l-.34-1.06-.34-1.06a13.293 13.293 0 01-.24-.86l.54-.02c-.08.307-.173.627-.28.96a63.3 63.3 0 01-.3 1c-.107.333-.22.66-.34.98-.12.32-.233.633-.34.94l-2.82 7.48h-2.96zm2.54-2.94l.98-2.42h6.42l1 2.42h-8.4zM183.371 26V12h2.68l7.74 10.46h-.56c-.054-.413-.1-.813-.14-1.2l-.12-1.2c-.027-.413-.054-.833-.08-1.26-.014-.44-.027-.9-.04-1.38a56.825 56.825 0 01-.02-1.6V12h2.94v14h-2.72l-7.9-10.56.76.02c.066.693.12 1.287.16 1.78a36.623 36.623 0 01.18 2.2c.026.267.04.52.04.76.013.24.02.493.02.76V26h-2.94zm23.175.2c-1.027 0-1.973-.173-2.84-.52-.853-.36-1.6-.86-2.24-1.5a6.979 6.979 0 01-1.46-2.3c-.347-.893-.52-1.867-.52-2.92 0-1.027.18-1.973.54-2.84a6.71 6.71 0 011.52-2.28 6.919 6.919 0 012.3-1.52 7.48 7.48 0 012.86-.54c.667 0 1.32.093 1.96.28a6.12 6.12 0 011.78.78 5.7 5.7 0 011.4 1.24l-1.88 2.08a6.259 6.259 0 00-1-.82 3.721 3.721 0 00-1.08-.54 3.54 3.54 0 00-1.2-.2 4.14 4.14 0 00-1.62.32 3.991 3.991 0 00-1.3.9 4.206 4.206 0 00-.9 1.38 4.76 4.76 0 00-.32 1.78c0 .667.107 1.273.32 1.82.213.533.513.993.9 1.38.387.373.847.667 1.38.88.547.2 1.147.3 1.8.3a4.35 4.35 0 002.34-.68c.347-.213.653-.46.92-.74l1.46 2.34c-.32.36-.753.687-1.3.98a7.773 7.773 0 01-1.8.7c-.667.16-1.34.24-2.02.24zm8.649-.2V12h9.46v2.64h-6.54v8.72h6.68V26h-9.6zm1.4-5.86v-2.56h7.1v2.56h-7.1z"
                    ></path></svg
            ></a>
        </div>
        <div class="-my-5 mr-6 sm:mr-8 md:mr-0">
          <NavbarSearch class="group flex h-6 w-6 items-center justify-center sm:justify-start md:h-auto md:w-80 md:flex-none md:rounded-lg md:py-2.5 md:pl-4 md:pr-3.5 md:text-sm md:ring-1 md:ring-slate-200 md:hover:ring-slate-300 dark:md:bg-slate-800/75 dark:md:ring-inset dark:md:ring-white/5 dark:md:hover:bg-slate-700/40 dark:md:hover:ring-slate-500 lg:w-96"/>
        </div>
        <div class="relative flex basis-0 justify-end gap-6 sm:gap-8 md:flex-grow">
            <div class="relative z-10">
              <ToggleColorModeButton v-if="themeLocale.colorModeSwitch" />
            </div>
        </div>
    </header>
</template>
