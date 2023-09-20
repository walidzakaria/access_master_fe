<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-3"
      v-for="(branch, index) in branchEntries" :key="index">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">{{ branch.branch }}</span>
            <div class="text-900 font-medium text-xl">{{ branch.entries }}</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-blue-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-map-marker text-blue-500 text-xl"></i>
          </div>
        </div>
        <span class="text-500">Entries of today</span>
      </div>
    </div>
  </div>
</template>

<script>
import { useLayout } from '../layout/composables/layout';

export default {
  data() {
    return {
    };
  },
  created() {
    this.applyLightTheme = () => {
      this.lineOptions = {
        plugins: {
          legend: {
            labels: {
              color: '#495057',
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#495057',
            },
            grid: {
              color: '#ebedef',
            },
          },
          y: {
            ticks: {
              color: '#495057',
            },
            grid: {
              color: '#ebedef',
            },
          },
        },
      };
    };
    this.applyDarkTheme = () => {
      this.lineOptions = {
        plugins: {
          legend: {
            labels: {
              color: '#ebedef',
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#ebedef',
            },
            grid: {
              color: 'rgba(160, 167, 181, .3)',
            },
          },
          y: {
            ticks: {
              color: '#ebedef',
            },
            grid: {
              color: 'rgba(160, 167, 181, .3)',
            },
          },
        },
      };
    };
    this.retrieveBranchEntries();
  },
  mounted() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  },
  methods: {
    retrieveBranchEntries() {
      this.$store.dispatch('entries/getBranchEntries');
    },
  },
  watch: {
    isDarkTheme(val) {
      if (val) {
        this.applyDarkTheme();
      } else {
        this.applyLightTheme();
      }
    },
  },
  computed: {
    useLayout() {
      return useLayout();
    },
    isDarkTheme() {
      return this.useLayout.isDarkTheme;
    },
    branchEntries() {
      return this.$store.getters['entries/branchEntries'];
    },
  },
};
</script>
