<template>
  <div class="grid p-fluid">
    <div class="col-12 md:col-12">
      <div class="card">
        <h5 class="main-title">QR Codes</h5>
        <!-- Save as draft button -->
        <div class="grid formgrid">
          <!-- Submitted button -->
          <div class="col-4 mt-5">
            <Button
              label="Create QR Codes"
              class="mr-2 mb-2 bg-success"
              @click="createCodes"
              :loading="loading"
              :disabled="loading || !userAdmin"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      loading: false,
      fileBlob: null,
    };
  },
  computed: {
    userAdmin() {
      return this.$store.getters['users/userAdmin'];
    },
  },
  methods: {
    createCodes() {
      this.loading = true;
      this.$store.dispatch('entries/createCodes')
        .then((response) => {
          const blob = new Blob([response.data], {
            type: 'application/pdf',
          });
          this.fileBlob = blob;
          this.showPdf();
          this.loading = false;
        })
        .catch((error) => {
          console.log(error.result);
          const message = error.result;
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: message,
            life: 4000,
          });
          this.loading = false;
        });
    },
    showPdf() {
      if (this.fileBlob === null) {
        return;
      }
      const link = document.createElement('a');
      link.href = this.fileBlob instanceof Blob
        ? URL.createObjectURL(this.fileBlob)
        : this.getFilePath(this.fileBlob);
      link.target = '_blank';
      console.log('link', link.href);
      link.textContent = '';
      link.click();
    },
  },
};
</script>
