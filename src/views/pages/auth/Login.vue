<template>
  <div
    class="surface-ground flex align-items-center
      justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="flex flex-column align-items-center justify-content-center">
      <img src="../../../assets/logo.svg"
      alt="FinRiskMaster logo" class="mb-5 w-12rem flex-shrink-0" />
      <form
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(
            180deg,
            var(--primary-color) 10%,
            rgba(33, 150, 243, 0) 30%
          );
        "
      >
        <div
          class="w-full surface-card py-8 px-5 sm:px-8"
          style="border-radius: 53px"
        >
          <div>
            <label for="email1" class="block text-900 text-xl font-medium mb-2"
              >Email</label
            >
            <InputText
              id="email1"
              type="text"
              @keydown.enter="login"
              placeholder="Email address"
              class="w-full md:w-30rem mb-5"
              style="padding: 1rem"
              v-model="email"
              :class="['w-8rem', { 'p-invalid': v$.email.$errors.length }]"
              aria-describedby="text-error"
            />
            <div class="errors">
              <div v-for="error of v$.email.$errors" :key="error.$uid">
                {{ error.$message }}
              </div>
            </div>
            <label
              for="password1"
              class="block text-900 font-medium text-xl mb-2"
              >Password</label
            >
            <Password
              id="password1"
              v-model="password"
              @keydown.enter="login"
              placeholder="Password"
              :toggleMask="true"
              :feedback="false"
              class="w-full mb-3"
              inputClass="w-full"
              :inputStyle="{ padding: '1rem' }"
              :class="{ 'p-invalid': v$.password.$errors.length }"
              aria-describedby="text-error"
            ></Password>
            <div class="errors">
              <div v-for="error of v$.password.$errors" :key="error.$uid">
                {{ error.$message }}
              </div>
              <div v-for="(error, index) of serverErrors" :key="index">
                {{ error }}
              </div>
            </div>
            <div
              class="flex align-items-center justify-content-between mb-5 gap-5"
            >
              <div class="flex align-items-center">
                <Checkbox
                  v-model="rememberMe"
                  id="rememberme1"
                  binary
                  class="mr-2"
                ></Checkbox>
                <label for="rememberme1">Remember me</label>
              </div>
              <router-link
                class="font-medium no-underline ml-2 text-right cursor-pointer"
                style="color: var(--primary-color)"
                to="/auth/forget-password/"
              >
                Forgot password?
              </router-link>
            </div>
            <Button
              label="Sign In"
              class="w-full p-3 text-xl"
              @click="login"
              :loading="loading"
            ></Button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import Cookies from 'js-cookie';
import { useLayout } from '../../../layout/composables/layout';

export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  validationConfig: {
    $lazy: true,
  },
  mounted() {
    this.rememberMe = localStorage.getItem('rememberMe') || false;
    if (this.rememberMe) {
      this.email = localStorage.getItem('email') || '';
      this.password = localStorage.getItem('password') || '';
    } else {
      this.email = '';
      this.password = '';
    }
  },
  validations() {
    return {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    };
  },
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      loading: false,
      serverErrors: [],
    };
  },
  computed: {
    logoUrl() {
      const { layoutConfig } = useLayout();
      return `layout/images/${
        layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'
      }.svg`;
    },
  },
  methods: {
    saveLogin() {
      localStorage.setItem('rememberMe', this.rememberMe);
      if (this.rememberMe) {
        localStorage.setItem('email', this.email);
        localStorage.setItem('password', this.password);
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
      }
    },
    async login() {
      this.serverErrors = [];
      if (this.loading) {
        return;
      }
      this.v$.$validate();
      if (this.v$.$errors.length) {
        console.log('errors');
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Invalid login!',
          life: 3000,
        });

        return;
      }
      this.loading = true;
      const loginData = {
        email: this.email.toLowerCase(),
        password: this.password,
      };
      await this.$store
        .dispatch('users/retrieveToken', loginData)
        .then(() => {
          this.$store.dispatch('users/retrieveUserData').then(() => {
            const redirectLink = Cookies.get('currentLink');
            if (redirectLink) {
              window.location.href = redirectLink;
            } else {
              this.$router.push('/');
            }
            Cookies.remove('currentLink');
            this.saveLogin();
            this.getInfo();
            this.loading = false;
            this.$toast.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Logged in seccessfully. Welcome back!',
              life: 3000,
            });
          });
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
          const message = error?.response?.status === 403
            ? error.response.data
            : 'Invalid login!';
          this.password = '';
          this.v$.$reset();
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: message,
            life: 3000,
          });
        });
    },
    async getInfo() {
      await this.$store.dispatch('users/retrieveUserData').then(() => {});
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
