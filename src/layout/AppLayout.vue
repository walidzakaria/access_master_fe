<script setup>
import { computed, watch, ref } from 'vue';
import { useStore } from 'vuex';
// eslint-disable-next-line import/no-extraneous-dependencies
import { onMounted } from '@vue/runtime-core';
import { useLayout } from './composables/layout';
import AppTopbar from './AppTopbar.vue';
import AppFooter from './AppFooter.vue';
import AppSidebar from './AppSidebar.vue';
import AppConfig from './AppConfig.vue';

const { layoutConfig, layoutState, isSidebarActive } = useLayout();

const outsideClickListener = ref(null);
const store = useStore();

const isOutsideClicked = (event) => {
  const sidebarEl = document.querySelector('.layout-sidebar');
  const topbarEl = document.querySelector('.layout-menu-button');

  return !(
    sidebarEl.isSameNode(event.target)
    || sidebarEl.contains(event.target)
    || topbarEl.isSameNode(event.target)
    || topbarEl.contains(event.target)
  );
};

const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        layoutState.overlayMenuActive.value = false;
        layoutState.staticMenuMobileActive.value = false;
        layoutState.menuHoverActive.value = false;
      }
    };
    document.addEventListener('click', outsideClickListener.value);
  }
};
const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener);
    outsideClickListener.value = null;
  }
};
watch(isSidebarActive, (newVal) => {
  if (newVal) {
    bindOutsideClickListener();
  } else {
    unbindOutsideClickListener();
  }
});

const containerClass = computed(() => ({
  'layout-theme-light': layoutConfig.darkTheme.value === 'light',
  'layout-theme-dark': layoutConfig.darkTheme.value === 'dark',
  'layout-overlay': layoutConfig.menuMode.value === 'overlay',
  'layout-static': layoutConfig.menuMode.value === 'static',
  'layout-static-inactive':
      layoutState.staticMenuDesktopInactive.value
      && layoutConfig.menuMode.value === 'static',
  'layout-overlay-active': layoutState.overlayMenuActive.value,
  'layout-mobile-active': layoutState.staticMenuMobileActive.value,
  'p-input-filled': layoutConfig.inputStyle.value === 'filled',
  'p-ripple-disabled': !layoutConfig.ripple.value,
}));

const isAuthenticated = computed(() => store.getters['users/isAuthenticated']);

const getInfo = async () => {
  await store.dispatch('users/retrieveUserData');
};
const checkToken = () => {
  try {
    store.dispatch('users/checkToken')
      .then(() => {
        console.log('invalid token again');
        getInfo();
      });
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  checkToken();
});
</script>

<template>
  <div :class="[containerClass, { 'layout-wrapper': isAuthenticated }]">
    <app-topbar v-if="isAuthenticated"></app-topbar>
    <div v-if="isAuthenticated" class="layout-sidebar">
      <app-sidebar></app-sidebar>
    </div>
    <div :class="{ 'layout-main-container': isAuthenticated }">
      <div :class="{ 'layout-main': isAuthenticated }">
        <router-view></router-view>
      </div>
      <app-footer v-if="isAuthenticated"></app-footer>
    </div>
    <app-config></app-config>
    <div class="layout-mask"></div>
    <Toast />
  </div>
</template>

<style scoped>
.layout-wrapper .layout-static .layout-main-container {
    margin-left: 0 !important;
    margin-top: -100px !important;
  }
</style>
