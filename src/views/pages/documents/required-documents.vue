<template>
  <div class="grid p-fluid">
    <div class="col-12 md:col-12">
      <div class="card">
        <h5 class="main-title">Required Documents</h5>
        <div class="grid formgrid">
          <div class="col-12 mb-2 lg:mb-0 mt-5">
            <p class="sub-title-form">National ID</p>
            <input
              type="file"
              class="form-control p-button p-component"
              accept="image/*, application/pdf"
              multiple
              ref="companyInfo"
              style="display: none"
            />
            <Button
              label="Upload Files"
              icon="pi pi-upload"
              style="width: auto"
              class="mr-3 p-invalid"
            />
            <Button label="Show Files" icon="pi pi-external-link" style="width: auto" />
            <Button label="Delete" icon="pi pi-trash" class="delete-btn" />
          </div>
          <hr />
          <div class="col-12 mb-2 lg:mb-0 mt-5">
            <p class="sub-title-form">The valid commercial register</p>
            <input
              type="file"
              class="form-control p-button p-component"
              accept="image/*, application/pdf"
              multiple
              ref="companyInfo"
              style="display: none"
            />
            <Button
              label="Upload Files"
              icon="pi pi-upload"
              style="width: auto"
              class="mr-3 p-invalid"
            />
            <Button label="Show Files" icon="pi pi-external-link" style="width: auto" />
            <Button label="Delete" icon="pi pi-trash" class="delete-btn" />
          </div>
          <hr />
          <div class="col-12 mb-2 lg:mb-0 mt-5">
            <p class="sub-title-form">Tax and insurance situation (newest one)</p>
            <input
              type="file"
              class="form-control p-button p-component"
              accept="image/*, application/pdf"
              multiple
              ref="companyInfo"
              style="display: none"
            />
            <Button
              label="Upload Files"
              icon="pi pi-upload"
              style="width: auto"
              class="mr-3 p-invalid"
            />
            <Button label="Show Files" icon="pi pi-external-link" style="width: auto" />
            <Button label="Delete" icon="pi pi-trash" class="delete-btn" />
          </div>
          <hr />
          <div class="col-12 mb-2 lg:mb-0 mt-5">
            <p class="sub-title-form">Investment newspaper</p>
            <input
              type="file"
              class="form-control p-button p-component"
              accept="image/*, application/pdf"
              multiple
              ref="companyInfo"
              style="display: none"
            />
            <Button
              label="Upload Files"
              icon="pi pi-upload"
              style="width: auto"
              class="mr-3 p-invalid"
            />
            <Button label="Show Files" icon="pi pi-external-link" style="width: auto" />
            <Button label="Delete" icon="pi pi-trash" class="delete-btn" />
          </div>
          <hr />
          <div class="col-12 mb-2 lg:mb-0 mt-5">
            <p class="sub-title-form">License to practice the activity.</p>
            <input
              type="file"
              class="form-control p-button p-component"
              accept="image/*, application/pdf"
              multiple
              ref="companyInfo"
              style="display: none"
            />
            <Button
              label="Upload Files"
              icon="pi pi-upload"
              style="width: auto"
              class="mr-3 p-invalid"
            />
            <Button label="Show Files" icon="pi pi-external-link" style="width: auto" />
            <Button label="Delete" icon="pi pi-trash" class="delete-btn" />
          </div>
          <hr />
          <div class="col-12 mb-2 lg:mb-0 mt-5">
            <p class="sub-title-form">
              Data of possession of the activity location (rent - ownership)
            </p>
            <input
              type="file"
              class="form-control p-button p-component"
              accept="image/*, application/pdf"
              multiple
              ref="companyInfo"
              style="display: none"
            />
            <Button
              label="Upload Files"
              icon="pi pi-upload"
              style="width: auto"
              class="mr-3 p-invalid"
            />
            <Button label="Show Files" icon="pi pi-external-link" style="width: auto" />
            <Button label="Delete" icon="pi pi-trash" class="delete-btn" />
          </div>
          <hr />
          <div class="col-12 mb-2 lg:mb-0 mt-5">
            <p class="sub-title-form">
              The client's financial statements for the last 3 years, final accounts and a recent
              financial position in the event that more than 6 months have passed since the last
              approved budget
            </p>
            <input
              type="file"
              class="form-control p-button p-component"
              accept="image/*, application/pdf"
              multiple
              ref="companyInfo"
              style="display: none"
            />
            <Button
              label="Upload Files"
              icon="pi pi-upload"
              style="width: auto"
              class="mr-3 p-invalid"
            />
            <Button label="Show Files" icon="pi pi-external-link" style="width: auto" />
            <Button label="Delete" icon="pi pi-trash" class="delete-btn" />
          </div>
          <hr />
          <div class="col-12 mb-2 lg:mb-0 mt-5">
            <p class="sub-title-form">
              (For new clients, a statement of revenues, expenses, net profit and financial
              indicators should be prepared)
            </p>
            <input
              type="file"
              class="form-control p-button p-component"
              accept="image/*, application/pdf"
              multiple
              ref="companyInfo"
              style="display: none"
            />
            <Button
              label="Upload Files"
              icon="pi pi-upload"
              style="width: auto"
              class="mr-3 p-invalid"
            />
            <Button label="Show Files" icon="pi pi-external-link" style="width: auto" />
            <Button label="Delete" icon="pi pi-trash" class="delete-btn" />
          </div>
          <hr />
          <div class="col-12 mb-2 lg:mb-0 mt-5">
            <p class="sub-title-form">Bank statement for the last 6 months</p>
            <input
              type="file"
              class="form-control p-button p-component"
              accept="image/*, application/pdf"
              multiple
              ref="companyInfo"
              style="display: none"
            />
            <Button
              label="Upload Files"
              icon="pi pi-upload"
              style="width: auto"
              class="mr-3 p-invalid"
            />
            <Button label="Show Files" icon="pi pi-external-link" style="width: auto" />
            <Button label="Delete" icon="pi pi-trash" class="delete-btn" />
          </div>
          <hr />
          <div class="col-12 mb-2 lg:mb-0 mt-5">
            <p class="sub-title-form">
              A statement of the client's and guarantors' properties, if any
            </p>
            <input
              type="file"
              class="form-control p-button p-component"
              accept="image/*, application/pdf"
              multiple
              ref="companyInfo"
              style="display: none"
            />
            <Button
              label="Upload Files"
              icon="pi pi-upload"
              style="width: auto"
              class="mr-3 p-invalid"
            />
            <Button label="Show Files" icon="pi pi-external-link" style="width: auto" />
            <Button label="Delete" icon="pi pi-trash" class="delete-btn" />
          </div>
          <hr />
          <div class="col-12 mb-2 lg:mb-0 mt-5">
            <p class="sub-title-form">
              Recent data on the related activity in terms of type of activity / legal form and
              partners / invested funds / financial statements / legal documents / position before
              banks and others
            </p>
            <input
              type="file"
              class="form-control p-button p-component"
              accept="image/*, application/pdf"
              multiple
              ref="companyInfo"
              style="display: none"
            />
            <Button
              label="Upload Files"
              icon="pi pi-upload"
              style="width: auto"
              class="mr-3 p-invalid"
            />
            <Button label="Show Files" icon="pi pi-external-link" style="width: auto" />
            <Button label="Delete" icon="pi pi-trash" class="delete-btn" />
          </div>
          <hr />
          <div class="col-12 mb-2 lg:mb-0 mt-5">
            <p class="sub-title-form">
              The feasibility study of the project, unless its data is included in the credit study
              (data on the market - the financed equipment - a copy of the purchase order - the
              investment cost and the expected cash flow statement)
            </p>
            <input
              type="file"
              class="form-control p-button p-component"
              accept="image/*, application/pdf"
              multiple
              ref="companyInfo"
              style="display: none"
            />
            <Button
              label="Upload Files"
              icon="pi pi-upload"
              style="width: auto"
              class="mr-3 p-invalid"
            />
            <Button label="Show Files" icon="pi pi-external-link" style="width: auto" />
            <Button label="Delete" icon="pi pi-trash" class="delete-btn" />
          </div>
          <hr />
          <div class="col-12 mb-2 lg:mb-0 mt-5">
            <p class="sub-title-form">
              Evidence of registration in the register of the Egyptian Federation of Construction
              and Building Contractors
            </p>
            <input
              type="file"
              class="form-control p-button p-component"
              accept="image/*, application/pdf"
              multiple
              ref="companyInfo"
              style="display: none"
            />
            <Button
              label="Upload Files"
              icon="pi pi-upload"
              style="width: auto"
              class="mr-3 p-invalid"
            />
            <Button label="Show Files" icon="pi pi-external-link" style="width: auto" />
            <Button label="Delete" icon="pi pi-trash" class="delete-btn" />
          </div>
          <hr />
          <div class="col-12 mb-2 lg:mb-0 mt-5">
            <p class="sub-title-form">
              A statement of the executed and ongoing operations, execution rates, and a statement
              of the operations to be undertaken
            </p>
            <input
              type="file"
              class="form-control p-button p-component"
              accept="image/*, application/pdf"
              multiple
              ref="companyInfo"
              style="display: none"
            />
            <Button
              label="Upload Files"
              icon="pi pi-upload"
              style="width: auto"
              class="mr-3 p-invalid"
            />
            <Button label="Show Files" icon="pi pi-external-link" style="width: auto" />
            <Button label="Delete" icon="pi pi-trash" class="delete-btn" />
          </div>
        </div>

        <div class="grid formgrid">
          <div class="col-4 mt-7">
            <Button
              label="Save As Draft"
              class="mr-2 mb-2"
              @click="saveDialog = true"
              :loading="loading"
              :asDraft="true"
              :disabled="isSubmitted"
            />
          </div>
          <!-- Submitted button -->
          <div class="col-4 mt-7">
            <Button
              label="Submit"
              class="mr-2 mb-2"
              @click="saveDialog = true"
              :loading="loading"
              :disabled="isSubmitted"
            />
          </div>
          <!-- Cancel button -->
          <div class="col-4 mt-7">
            <Button label="Cancel" class="mr-2 mb-2" @click="this.$router.push('/')" />
          </div>
        </div>
      </div>
    </div>
    <Dialog :style="{ width: '450px' }" header="Confirm" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span>Are you sure you want to delete this partner?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" class="p-button-text" />
        <Button label="Yes" icon="pi pi-check" class="p-button-text" />
      </template>
    </Dialog>
    <Dialog :style="{ width: '450px' }" header="Confirm" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span>Are you sure you want to delete those files?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" class="p-button-text" />
        <Button label="Yes" icon="pi pi-check" class="p-button-text" />
      </template>
    </Dialog>
    <Dialog
      :header="`Show  files`"
      :breakpoints="{ '960px': '75vw' }"
      :style="{ width: '30vw' }"
      class=""
      :modal="true"
    >
      <div class="p-fileupload-content">
        <div class="p-fileupload-file">
          <i class="pi dialog-icon"></i>
          <div class="p-fileupload-file-details">
            <a target="_blank" class="p-fileupload-file-name dialog-file-name"> </a>
          </div>
          <div class="p-fileupload-file-actions">
            <button type="button" class="dialog-delete-btn">
              <span class="pi pi-trash p-button-icon"></span>
              <span class="p-button-label">&nbsp;</span>
              <span class="p-ink" role="presentation" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </div>
      <p class="line-height-3 m-0"></p>
      <template #footer>
        <Button label="Ok" icon="pi pi-check" class="p-button-outlined" />
      </template>
    </Dialog>
    <Dialog :style="{ width: '450px' }" header="Confirm" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span>Are you sure you want to save?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" class="p-button-text" />
        <Button label="Yes" icon="pi pi-check" class="p-button-text" />
      </template>
    </Dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          label: 'Add',
          value: 'bodi',
          icon: 'pi pi-pencil',
          command: () => {
            this.$toast.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
          },
        },
        {
          label: 'Update',
          icon: 'pi pi-refresh',
          command: () => {
            this.$toast.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
          },
        },
        {
          label: 'Delete',
          icon: 'pi pi-trash',
          command: () => {
            this.$toast.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
          },
        },
        {
          label: 'Upload',
          icon: 'pi pi-upload',
          command: () => {
            this.$router.push('/fileupload');
          },
        },
        {
          label: 'Vue Website',
          icon: 'pi pi-external-link',
          command: () => {
            window.location.href = 'https://vuejs.org/';
          },
        },
        {
          label: 'Vue Website',
          icon: 'pi pi-external-link',
          command: () => {
            window.location.href = 'https://vuejs.org/';
          },
        },
        {
          label: 'Vue Website',
          icon: 'pi pi-external-link',
          command: () => {
            window.location.href = 'https://vuejs.org/';
          },
        },
      ],
    };
  },
};
</script>

<style>
.sub-title-form {
  font-weight: 500;
  padding-left: 10px;
  color: var(--primary-600);
}
.main-title {
  color: var(--primary-900);
  border-radius: 5px;
  background-color: #80808057;
  height: 50px;
  justify-content: center;
  padding-top: 12px;
  padding-left: 12px;
  background: rgb(251, 251, 251);
  background: linear-gradient(90deg, rgba(251, 251, 251, 1) 6%, var(--primary-400) 100%);
}
.add-partner-btn {
  width: 15% !important;
  float: right;
  top: 0;
  margin-top: -5px;
  margin-right: 10px;
  background-color: var(--primary-900) !important;
}
.del-partner-btn {
  width: 100% !important;
  float: right;
  top: 0;
  margin-right: 10px;
  background-color: var(--primary-900) !important;
}

.errors {
  width: 100%;
  font-size: 80%;
  color: #dc3545;
}

.delete-btn {
  background-color: #dc3545;
  width: auto !important;
  margin-left: 15px !important;
  border-color: #dc3545;
}
.required {
  color: #dc3545;
}

.dialog-icon {
  font-size: 35px !important;
  color: var(--primary-600);
}
.dialog-file-name {
  font-size: 18px !important;
  color: var(--primary-600);
  margin-left: 20px;
}
.pi:before {
  padding-top: 3px;
  padding-left: 3px;
}
.p-dialog-header {
  color: var(--primary-600) !important;
}
.dialog-delete-btn {
  border-color: var(--primary-600) !important;
  background-color: #ffffff !important;
  border-width: 0px !important;
}
.dialog-delete-btn span {
  font-size: 20px;
  color: var(--primary-600);
}

.sub-error {
  margin-top: -6px;
  margin-bottom: 6px;
}
.p-speeddial {
  right: 0 !important;
  bottom: 0 !important;
  position: fixed;
  z-index: 1000;
  left: inherit !important;
  top: inherit !important;
}
.p-speeddial-list {
  margin-bottom: 60px;
}
.p-speeddial-button.p-button.p-button-icon-only {
  position: absolute;
  bottom: 0 !important;
  right: 5px !important;
}
.p-speeddial-direction-right .p-speeddial-list {
  flex-direction: column;
  margin-right: 5px;
}
hr {
  border-top: solid var(--surface-border);
  border-width: 2px 0 0 0;
  margin: 1rem 0;
  width: 100%;
  position: static;
  display: block;
  margin-bottom: 30px;
  border-color: var(--primary-600);
}
</style>
