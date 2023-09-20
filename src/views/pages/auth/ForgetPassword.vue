<template>
  <div
    class="surface-ground flex align-items-center
      justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="flex flex-column align-items-center justify-content-center">
      <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
      <div
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%);
        "
      >
        <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
          <div>
            <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
            <InputText
              id="email1"
              type="text"
              placeholder="Email address"
              class="w-full md:w-30rem mb-5"
              style="padding: 1rem; display: block"
              v-model="email"
              :class="['w-8rem', { 'p-invalid': v$.email.$errors.length }]"
              aria-describedby="text-error"
              @keydown.enter="resetPassword"
            />
            <div class="errors">
              <div v-for="error of v$.email.$errors" :key="error.$uid">
                {{ error.$message }}
              </div>
            </div>
            <Button
              label="Reset"
              class="w-full p-3 text-xl"
              :loading="loading"
              @click="resetPassword"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { useLayout } from '../../../layout/composables/layout';

export default {
  name: 'ResetPassword',
  components: {},
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  validationConfig: {
    $lazy: true,
  },
  validations() {
    return {
      email: {
        required,
        email,
      },
    };
  },
  data() {
    return {
      email: '',
      loading: false,
      layoutConfig: {},
    };
  },
  computed: {
    logoUrl() {
      return `layout/images/${this.layoutConfig.darkTheme ? 'logo-white' : 'logo-dark'}.svg`;
    },
  },
  created() {
    const { layoutConfig } = useLayout();
    this.layoutConfig = layoutConfig;
  },
  methods: {
    async resetPassword() {
      if (this.loading) {
        return;
      }
      this.v$.$validate();
      console.log(this.v$.$errors.length);
      if (this.v$.$errors.length) {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Invalid entry!',
          life: 3000,
        });
        return;
      }
      this.loading = true;
      const loginData = {
        email: this.email,
      };
      await this.$store
        .dispatch('users/resetPassword', loginData)
        .then((response) => {
          console.log(response);
          this.showError = false;
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'If your email is registered, you shall be receiving a reset link.',
            life: 3000,
          });

          this.loading = false;
          this.v$.$reset();
          this.email = '';
        })
        .catch((error) => {
          console.log(error.response);
          this.showError = true;
          this.loading = false;
          this.statusOk = false;
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Couldn\'t send a reset link. Please try again later.',
            life: 3000,
          });

          this.email = '';
        });
    },
  },
};
</script>
<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}

.errors {
  width: 100%;
  font-size: 80%;
  color: #dc3545;
  margin-bottom: 14px;
  margin-top: -14px;
}
</style>
