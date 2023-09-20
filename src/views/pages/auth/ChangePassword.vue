<template>
  <div class="grid p-fluid">
    <div class="col-12 md:col-12">
      <div class="card">
        <div class="grid formgrid">
          <div class="col-12 mb-2 lg:col-12 lg:mb-0">
            <label for="oldpassword" class="block text-900 font-medium text-xl mb-2"
              >Old Password</label
            >
            <Password
              id="oldpassword"
              v-model="currentPassword"
              placeholder="Old Password"
              :toggleMask="true"
              class="w-full mb-3"
              inputClass="w-full"
              inputStyle="padding:1rem"
              @keydown.enter="onSubmit"
              :class="{ 'p-invalid': v$.currentPassword.$errors.length }"
            ></Password>
            <div class="errors">
              <div v-for="error of v$.currentPassword.$errors" :key="error.$uid">
                {{ error.$message }}
              </div>
            </div>
            <label for="newpassword" class="block text-900 font-medium text-xl mb-2"
              >New Password</label
            >
            <Password
              id="newpassword"
              v-model="newPassword"
              placeholder="New Password"
              :toggleMask="true"
              class="w-full mb-3"
              inputClass="w-full"
              inputStyle="padding:1rem"
              @keydown.enter="onSubmit"
              :class="{ 'p-invalid': v$.newPassword.$errors.length }"
            ></Password>
            <div class="errors">
              <div v-for="error of v$.newPassword.$errors" :key="error.$uid">
                {{ error.$message }}
              </div>
            </div>
            <label for="confirmpassword" class="block text-900 font-medium text-xl mb-2"
              >Confirm Password</label
            >
            <Password
              id="confirmpassword"
              v-model="reNewPassword"
              placeholder="Confirm Password"
              :toggleMask="true"
              class="w-full mb-3"
              inputClass="w-full"
              inputStyle="padding:1rem"
              @keydown.enter="onSubmit"
              :class="{ 'p-invalid': v$.reNewPassword.$errors.length }"
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
              label="Change Password"
              class="w-full p-3 text-xl"
              :loading="loading"
              @click="onSubmit"
            ></Button>
          </div>
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
  components: {},
  data() {
    return {
      loading: false,
      submitted: {
        isSuccess: true,
        isSubmitted: false,
      },
      statusOk: true,
      newPassword: '',
      reNewPassword: '',
      currentPassword: '',
      serverErrors: [],
    };
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
      currentPassword: {
        required,
      },
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
    async onSubmit() {
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
        new_password: this.newPassword,
        re_new_password: this.reNewPassword,
        current_password: this.currentPassword,
      };
      await this.$store
        .dispatch('users/changePasswordConfirm', requestBody)
        .then((result) => {
          console.log(result);
          this.submitted.isSuccess = true;
          this.$router.push('/');
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'You password was updated successfully.',
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
            this.serverErrors = result.current_password || [];
          }
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Password change failed. Please fix the errors, and try again.',
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
