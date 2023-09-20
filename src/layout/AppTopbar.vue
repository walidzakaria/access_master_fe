<script setup>
import {
  ref, computed, onMounted, onBeforeUnmount,
} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useLayout } from '@/layout/composables/layout';

const { onMenuToggle } = useLayout();
const store = useStore();

const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const mostrarMenu = ref(false);
const router = useRouter();

const isOutsideClicked = (event) => {
  if (!topbarMenuActive.value) return false;

  const sidebarEl = document.querySelector('.layout-topbar-menu');
  const topbarEl = document.querySelector('.layout-topbar-menu-button');

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
        topbarMenuActive.value = false;
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

const abrirMenu = () => {
  mostrarMenu.value = !mostrarMenu.value;
};

onMounted(() => {
  bindOutsideClickListener();
});

onBeforeUnmount(() => {
  unbindOutsideClickListener();
});

const onTopBarMenuButton = () => {
  topbarMenuActive.value = !topbarMenuActive.value;
};

const onSettingsClick = () => {
  topbarMenuActive.value = false;
  router.push('/documentation');
};
const topbarMenuClasses = computed(() => ({
  'layout-topbar-menu-mobile-active': topbarMenuActive.value,
}));

const signOut = async () => {
  await store.dispatch('users/destroyToken');
  router.push('/login');
};
const userInfo = computed(() => store.getters['users/userInfo']);

</script>
<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <span>TWINS Access</span>
    </router-link>

    <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
      <i class="pi pi-bars"></i>
    </button>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      @click="onTopBarMenuButton()"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>
    <div class="layout-topbar-menu" :class="topbarMenuClasses">
      <button @click="onTopBarMenuButton()" class="p-link layout-topbar-button">
        <i class="pi pi-calendar"></i>
        <span>Calendar</span>
      </button>

      <div class="user-menu-wrap">
        <a
          @click="abrirMenu()"
          ref="mini-photo-wrapper"
          class="p-link layout-topbar-button"
          href="#"
        >
          <i class="pi pi-user"></i>
        </a>
        <div ref="menucontainer" class="menu-container" :class="{ active: mostrarMenu }">
          <ul class="user-menu">
            <li class="user-menu__item">
              <span class="p-5"
                ><b style="text-transform: capitalize">{{
                  `${userInfo.firstName} ${userInfo.lastName}`
                }}</b></span
              >
            </li>
            <li class="user-menu__item">
              <router-link to="/auth/change-password" class="user-menu-link">
                Change Password
              </router-link>
            </li>
            <li class="user-menu__item">
              <a class="user-menu-link" href="#" @click="signOut">Sign Out</a>
            </li>
          </ul>
        </div>
      </div>
      <button @click="onSettingsClick()" class="p-link layout-topbar-button">
        <i class="pi pi-cog"></i>
        <span>Settings</span>
      </button>
    </div>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.menu-link:hover {
  color: #000000;
}
.menu-link {
  color: var(--primary-600);
}

.layout-menu-button {
  margin-left: -10rem !important;
}
body {
  background-color: #e2e1e0;
  font-family: sans-serif;
}
ul {
  list-style: none;
}

.user-menu-wrap {
  position: relative;
  width: 36px;
  margin: 50px auto;
}

.mini-photo-wrapper {
  display: block;
}

.mini-photo {
  border-radius: 50%;
}

.menu-container {
  visibility: hidden;
  opacity: 0;
}

.menu-container.active {
  visibility: visible;
  opacity: 1;
  transition: all 0.3s ease-in-out;
}

.user-menu {
  position: absolute;
  width: 175px !important;
  right: -75px;
  background-color: #fff;
  width: 120px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding-top: 5px;
  padding-bottom: 5px;
  margin-top: 10px;
}
.user-menu li {
  line-height: 25px;
}

.user-menu .user-menu-link {
  display: block;
  text-decoration: none;
  color: #444;
  font-size: 14px;
  padding: 5px 10px;
}
.user-menu-link:hover {
  background-color: var(--primary-600) !important;
  color: #fff !important;
}
.user-menu__item:hover {
  background-color: var(--primary-600) !important;
  color: #fff !important;
}

.user-menu:before {
  position: absolute;
  top: -16px;
  left: 72px;
  display: inline-block;
  content: '';
  border: 8px solid transparent;
  border-bottom-color: #ccc;
  border-bottom-color: rgba(0, 0, 0, 0.15);
}

.user-menu:after {
  position: absolute;
  top: -14px;
  left: 73px;
  display: inline-block;
  content: '';
  border: 7px solid transparent;
  border-bottom-color: #fff;
}
.icon-index {
  z-index: 1;
}
</style>
