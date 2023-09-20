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
          background: linear-gradient(
            180deg,
            var(--primary-color) 10%,
            rgba(33, 150, 243, 0) 30%
          );
        "
      >
        <div
          v-if="!submitted.isSuccess"
          class="w-full surface-card py-8 px-5 sm:px-8"
          style="border-radius: 53px"
        >
          <div>
            <label
              for="password1"
              class="block text-900 font-medium text-xl mb-2"
              >Password</label
            >
            <Password
              id="password1"
              v-model="newPassword"
              placeholder="Password"
              :toggleMask="true"
              class="w-full mb-3"
              inputClass="w-full"
              inputStyle="padding:1rem"
              @keydown.enter="applyReset"
              :class="{ 'p-invalid': v$.newPassword.$errors.length }"
              aria-describedby="text-error"
            ></Password>
            <div class="errors">
              <div v-for="error of v$.newPassword.$errors" :key="error.$uid">
                {{ error.$message }}
              </div>
            </div>
            <label
              for="password2"
              class="block text-900 font-medium text-xl mb-2"
              >Confirm Password</label
            >
            <Password
              id="password2"
              v-model="reNewPassword"
              placeholder="Confirm Password"
              :toggleMask="true"
              class="w-full mb-3"
              inputClass="w-full"
              inputStyle="padding:1rem"
              @keydown.enter="applyReset"
              :class="{ 'p-invalid': v$.reNewPassword.$errors.length }"
              aria-describedby="text-error"
            ></Password>
            <div class="errors">
              <div v-for="error of v$.reNewPassword.$errors" :key="error.$uid">
                {{ error.$message }}
              </div>
              <div v-for="(error, index) of serverErrors" :key="index">
                {{ error }}
              </div>
            </div>
            <Button
              label="Reset Password"
              class="w-full p-3 text-xl"
              @click="applyReset"
              :loading="loading"></Button>
          </div>
        </div>
        <div
          v-else
          class="w-full surface-card py-8 px-5 sm:px-8"
          style="border-radius: 53px"
        >
          <p>Your password is reset successfully!</p>
          <router-link
            class="font-medium no-underline ml-2 text-right cursor-pointer"
            style="color: var(--primary-color)"
            to="/login/">
            Go to login
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useLayout } from '../../../layout/composables/layout';

export default {
  data() {
    return {
      loading: false,
      submitted: {
        isSuccess: false,
        isSubmitted: false,
      },
      statusOk: true,
      newPassword: '',
      reNewPassword: '',
      serverErrors: [],
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
      newPassword: {
        required,
      },
      reNewPassword: {
        required,
      },
    };
  },
  methods: {
    async applyReset() {
      if (this.loading) {
        return;
      }
      this.v$.$reset();
      this.v$.$validate();
      console.log(this.v$.$errors.length);
      if (this.v$.$errors.length) {
        return;
      }
      this.loading = true;
      const requestBody = {
        uid: this.$route.params.uid,
        token: this.$route.params.token,
        new_password: this.newPassword,
        re_new_password: this.reNewPassword,
      };
      await this.$store
        .dispatch('users/resetPasswordConfirm', requestBody)
        .then((result) => {
          console.log(result);
          this.submitted.isSuccess = true;
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'You password was reset successfully, you may now login again.',
            life: 3000,
          });
        })
        .catch((error) => {
          const result = error.response.data;
          console.log(result);
          this.serverErrors = result.values;
          this.submitted.isSuccess = false;
          this.serverErrors = result.new_password || [];
          if (this.serverErrors.length === 0) {
            this.serverErrors = result.non_field_errors || [];
          }
          if (this.serverErrors.length === 0) {
            this.serverErrors = result.token || [];
          }
          if (this.serverErrors.length === 0) {
            this.serverErrors = result.uid || [];
          }
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Password reset failed. Please fix the errors, and try again.',
            life: 3000,
          });
        });
      this.loading = false;
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
