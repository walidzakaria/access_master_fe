<template>
  <div class="grid p-fluid">
    <div class="col-12 md:col-12">
      <div class="card">
        <h5 class="main-title">Entry Form</h5>
        <div class="grid formgrid">
          <div class="col-12 mb-2 lg:col-12 lg:mb-0">
            <!-- <StreamBarcodeReader
              v-if="showScanner"
              @decode="onDecode"
              @loaded="onLoaded"
            /> -->
            <InputText type="text"
              v-model="qrCode" placeholder="QR Code"
              @keydown.enter="postEntry"/>
            <p class="text-danger">{{ scanMessage }}</p>
            <!-- <div class="col-2 mt-5">
              <Button
                label="Scan"
                class="mr-2 mb-2 bg-success"
                @click="showScanner = !showScanner"
                :loading="loading"
              />
            </div> -->
          </div>
        </div>
        <!-- Save as draft button -->
        <div class="grid formgrid">
          <!-- Submitted button -->
          <div class="col-12 mt-5">
            <Button
              label="Submit"
              class="mr-2 mb-2 bg-success"
              @click="postEntry"
              :loading="loading"
              :disabled="loading"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line import/no-extraneous-dependencies
// import { StreamBarcodeReader } from 'vue-barcode-reader';

export default {
  components: {
    // StreamBarcodeReader,
  },
  data() {
    return {
      loading: false,
      qrCode: '',
      showScanner: false,
    };
  },
  computed: {
    scannedCode() {
      return this.$route.params.qrcode || '';
    },
    scanMessage() {
      return this.$store.getters['entries/scanMessage'];
    },
  },
  mounted() {
    if (this.scannedCode !== '') {
      this.qrCode = this.scannedCode;
      this.postEntry();
    }
  },
  methods: {
    // onDecode(text) {
    //   console.log(`scanned text: ${text}`);
    //   this.qrCode = text;
    //   this.postEntry();
    //   this.showScanner = false;
    // },
    // onLoaded() {
    //   console.log('Ready to start scanning barcodes');
    // },
    postEntry() {
      if (this.qrCode === '') {
        const message = 'No QR Code entered!';
        this.$store.dispatch('entries/changeScanMessage', message);
        this.$toast.add({
          severity: 'error',
          summary: 'No Code',
          detail: message,
          life: 4000,
        });
        return;
      }
      this.loading = true;
      const qrCodeData = {
        qr_code: this.qrCode,
      };
      this.$store
        .dispatch('entries/postEntry', qrCodeData)
        .then((response) => {
          console.log(response);
          this.$store.dispatch('entries/changeScanMessage', `'${this.qrCode}' is valid.`);
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Valid QR Code. Welcome!',
            life: 4000,
          });
          this.qrCode = '';
          this.$router.push('/entry/');
          this.loading = false;
        })
        .catch((error) => {
          console.log(error.response.status);
          const message = error.response.data.result;
          this.$store.dispatch('entries/changeScanMessage', message);
          this.$toast.add({
            severity: 'error',
            summary: 'Invalid Code',
            detail: message,
            life: 4000,
          });
          this.qrCode = '';
          this.$router.push('/entry/');
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
  .text-danger {
    color: red;
    font-weight: 600;
    font-size: 16px;
    text-transform: uppercase;
  }

</style>
