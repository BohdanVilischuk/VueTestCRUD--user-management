<template>
  <div class="table-wrapper">
    <!-- <v-btn @click="oo">
      add
    </v-btn> -->
    <v-btn
      :class="{ unactiveRed: !active, activeGreen: active }"
      @click="active = true"
      dark
      small
    >
      <v-icon> mdi-format-list-bulleted </v-icon>
    </v-btn>
    <v-btn
      @click="active = false"
      :class="{ unactiveRed: active, activeGreen: !active }"
      small
      dark
    >
      <v-icon> mdi-table </v-icon>
    </v-btn>
    <v-data-table
      :headers="headers"
      :items="users"
      class="elevation-1"
      :search="search"
      :group-by="groupingBy"
      :sort-by.sync="sortBy"
      aria-autocomplete="off"
      :sort-desc.sync="sortDesc"
      :header-props="{ sortIcon: null }"
      hide-default-header
    >
      <template v-slot:header="{ props }">
        <div :class="{ headers: active, headersNone: !active }">
          <div v-for="(head, index) in props.headers" :key="index">
            {{ head.text }}
          </div>
        </div>
      </template>
      <template class="itm" v-slot:item="{ item }">
        <div :class="{ itmList: active, itmTable: !active }">
          <v-avatar size="62">
            <img :src="item.avatar" :alt="item.firstName" />
          </v-avatar>
          <a v-if="active" @click="viewItem(item)">
            {{ item.firstName }}
          </a>
          <div v-if="active">
            {{ item.lastName }}
          </div>
          <div v-if="!active">
            <a @click="viewItem(item)">
              {{ item.firstName }} {{ item.lastName }}
            </a>
          </div>
          <div>
            {{ item.title }}
          </div>
          <div>
            {{ item.year }}
          </div>
          <div v-if="active">
            {{ item.email }}
          </div>
          <div v-if="active">
            {{ item.phone }}
          </div>
          <div v-if="active" class="item-bio">
            {{ item.bio }}
          </div>
          <div>
            <v-btn
              dark
              fab
              :class="{ editAbsolute: !active }"
              rounded
              x-small
              color="green"
              @click="editItem(item)"
            >
              <v-icon small> mdi-pencil </v-icon>
            </v-btn>
            <v-btn
              v-if="active"
              x-small
              fab
              dark
              rounded
              color="pink"
              @click="deleteItem(item)"
            >
              <v-icon small> mdi-delete </v-icon>
            </v-btn>
          </div>
        </div>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>USERS</v-toolbar-title>
          <v-text-field
            aria-autocomplete="off"
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            class="search-items"
          ></v-text-field>
          <v-select
            v-model="selectedAscOrDescValue"
            prepend-icon="mdi-table"
            label="Filter by ASC or DESC (default ASC)"
            class="select-style"
            height="53px"
            item-text="state"
            item-value="value"
            return-object
            :items="ascdesc"
            @change="onAscOrDesc"
          >
          </v-select>
          <v-select
            v-model="selectedValue"
            item-text="state"
            item-value="value"
            @change="onSortableChange"
            prepend-icon="mdi-filter"
            label="Filter by title or First Name or Last Name "
            class="select-style"
            hint="Filter"
            :items="items"
            height="53px"
            return-object
          >
          </v-select>
          <v-btn
            rounded
            fab
            dark
            small
            color="pink"
            @click="resetFiltersAndSearch"
          >
            <v-icon> mdi-reload </v-icon>
          </v-btn>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <!-- Dialog New and Edit -->
          <v-dialog v-model="dialog" max-width="700px" persistent>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="pink"
                small
                fab
                rounded
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                absolute
                right
                top
              >
                <v-icon> mdi-plus </v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <form
                      class="add-user-form"
                      autocomplete="off"
                      @submit.prevent="saveUser()"
                    >
                      <div class="input-cropper">
                        <cropper
                          ref="cropper"
                          class="example-cropper"
                          :src="editedItem.avatar"
                          :min-height="150"
                          :min-width="150"
                          v-model="editedItem.avatar"
                          :key="keyS"
                          @change="onChange"
                          :stencil-props="{
                            aspectRatio: 1 / 1
                          }"
                          :size-restrictions-algorithm="pixelsRestriction"
                        />
                        <div class="avatar-actions ">
                          <div class="button-wrapper">
                            <span class="button" @click="$refs.file.click()">
                              <input
                                type="file"
                                ref="file"
                                @change="uploadImage($event)"
                                accept="image/*"
                              />
                              <label
                                for="file-upload"
                                class="custom-file-upload"
                              >
                                <v-icon>mdi-upload</v-icon> {{ uploadOrChange }}
                              </label>
                            </span>
                          </div>
                          <div class="preview-wrapper">
                            <h5>Preview</h5>
                            <v-avatar size="104">
                              <preview
                                :width="104"
                                :height="104"
                                :image="result.image"
                                :coordinates="result.coordinates"
                              />
                            </v-avatar>
                          </div>
                          <div class="result-wrapper">
                            <h5>Result</h5>
                            <v-avatar size="108" class="ava-custom">
                              <img :src="editedItem.avatar" />
                            </v-avatar>
                          </div>
                        </div>
                      </div>
                      <v-btn class="crop-button" @click="crop" small color="primary">
                        <v-icon> mdi-plus </v-icon>
                        {{ cropOrSave }}
                      </v-btn>
                      <div class="inputs">
                        <v-text-field
                          v-model="editedItem.firstName"
                          :error-messages="firstNameErrors"
                          :counter="15"
                          label="First Name"
                          hint="Type first name"
                          required
                          prepend-icon="mdi-clipboard-text-play-outline"
                          @input="$v.firstName.$touch()"
                        ></v-text-field>
                        <v-text-field
                          v-model="editedItem.lastName"
                          :error-messages="lastNameErrors"
                          :counter="15"
                          label="Last Name"
                          hint="Type last name"
                          prepend-icon="mdi-clipboard-text-play-outline"
                          required
                          @input="$v.lastName.$touch()"
                        ></v-text-field>
                        <v-text-field
                          v-model="editedItem.title"
                          :error-messages="titleErrors"
                          :counter="10"
                          label="Title"
                          hint="Type title"
                          prepend-icon="mdi-alpha-t-circle-outline"
                          required
                          @input="$v.title.$touch()"
                        ></v-text-field>
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="editedItem.year"
                              label="Year"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              :rules="[v => !!v || 'Required']"
                              @input="disableYear($event)"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            ref="picker"
                            required
                            v-model="editedItem.year"
                            :max="new Date().toISOString().substr(0, 10)"
                            min="1950-01-01"
                            @change="save"
                          ></v-date-picker>
                        </v-menu>
                        <v-text-field
                          v-model="editedItem.phone"
                          :error-messages="phoneErrors"
                          :counter="13"
                          type="number"
                          label="Phone"
                          hint="Type phone"
                          prepend-icon="mdi-phone"
                          required
                          @input="$v.phone.$touch()"
                          @blur="$v.phone.$touch()"
                        ></v-text-field>
                        <!-- <vue-tel-input-vuetify   label="Phone"
                          hint="Type phone"
                         aria-autocomplete="off" :clearable="true" :required="true" v-model="editedItem.phone"></vue-tel-input-vuetify> -->
                        <v-text-field
                          v-model="editedItem.email"
                          :error-messages="emailErrors"
                          label="E-mail"
                          prepend-icon="mdi-email"
                          @input="$v.email.$touch()"
                        ></v-text-field>
                      </div>
                      <v-textarea
                        v-model="editedItem.bio"
                        name="input-7-1"
                        label="Bio"
                        prepend-icon="mdi-form-textarea"
                        hint="Describe yourself"
                      ></v-textarea>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">
                          Cancel
                        </v-btn>
                        <button></button>
                        <v-btn
                          type="submit"
                          color="blue darken-1"
                          text
                          @submit.prevent="saveUser()"
                        >
                          Save
                        </v-btn>
                        <v-btn
                          v-if="deleteEdit"
                          v-model="deleteBtns"
                          @click="deleteFromSave"
                        >
                          Remove
                        </v-btn>
                      </v-card-actions>
                    </form>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
          <!-- Dialog delete -->
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this user
                {{ editedItem.firstName }} {{ editedItem.lastName }}
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- View dialog -->
          <v-dialog v-model="viewDialog" :key="keyS" max-width="500px">
            <v-card>
              <div class="user-view__wrapper">
                <v-avatar size="108">
                  <img :src="editedItem.avatar" alt="" />
                </v-avatar>
                <div class="view-name">
                  <h6>Name:</h6>
                  <h6 class="ml-1">
                    {{ editedItem.firstName }} {{ editedItem.lastName }}
                  </h6>
                </div>
                <div class="view-title">
                  <h6>Title:</h6>
                  <h6 class="ml-1">{{ editedItem.title }}</h6>
                </div>
                <div class="view-phone">
                  <h6>Phone:</h6>
                  <h6 class="ml-1">{{ editedItem.phone }}</h6>
                </div>
                <div class="view-year">
                  <h6>Year:</h6>
                  <h6 class="ml-1">{{ editedItem.year }}</h6>
                </div>
                <div class="view-mail">
                  <h6>Email:</h6>
                  <h6 class="ml-1">{{ editedItem.email }}</h6>
                </div>
                <div class="view-bio">
                  <h6>Bio:</h6>
                  <h6 class="ml-1">{{ editedItem.bio }}</h6>
                </div>
                <div class="view-actions">
                  <v-btn small fab dark @click="openEditModalFromView">
                    <v-icon> mdi-pencil </v-icon>
                  </v-btn>
                  <v-btn small fab dark @click="deleteItemfromView">
                    <v-icon> mdi-delete </v-icon>
                  </v-btn>
                  <v-btn small dark @click="viewDialog = false"> close </v-btn>
                </div>
              </div>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`group.header`]="{ group, headers, toggle, isOpen }">
        <td class="group-line" :colspan="headers.length">
          <v-btn @click="toggle" x-small icon :ref="group">
            <v-icon v-if="!isOpen">mdi-plus</v-icon>
            <v-icon v-else>mdi-minus</v-icon>
          </v-btn>
          <span
            v-if="
              selectedValue.value == 'firstName' ||
                selectedValue.value == 'lastName'
            "
            class="mx-5 font-weight-bold"
            >{{ group.charAt(0) }}</span
          >
          <span
            v-if="selectedValue.value == 'title'"
            class="mx-5 font-weight-bold"
            >{{ group }}</span
          >
        </td>
      </template>
      <template v-slot:no-data>
        <v-toolbar-title> No data </v-toolbar-title>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import VueTelInputVuetify from "vue-tel-input-vuetify/lib/vue-tel-input-vuetify";
import { validationMixin } from "vuelidate";
import { Cropper, Preview } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  validations: {
    firstName: { required, maxLength: maxLength(15) },
    lastName: { required, maxLength: maxLength(15) },
    title: { required, maxLength: maxLength(30) },
    // year: { required, maxLength: maxLength(10) },
    phone: { required, maxLength: maxLength(13) },
    email: { email },
    bio: { maxLength: maxLength(100) }
  },
  components: {
    Preview,
    Cropper,
    VueCropper,
    VueTelInputVuetify
  },
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      deleteBtns: false,
      viewDialog: false,
      search: "",
      show: false,
      filterSearch: "title",
      menu: false,
      sortBy: "firstName",
      sortDesc: false,
      groupingBy: null,
      headers: [
        {
          text: "Avatar",
          align: "start",
          sortable: false,
          value: "avatar",
          groupable: false
        },
        {
          text: "First Name",
          value: "firstName"
        },
        {
          text: "Last Name",
          value: "lastName"
        },
        { text: "Title", value: "title", sortable: false },
        { text: "Year", value: "year", sortable: false },
        { text: "Phone", value: "phone", sortable: false },
        { text: "Email", value: "email", sortable: false },
        { text: "Bio", value: "bio", sortable: false },
        { text: "Actions", value: "actions", sortable: false }
      ],
      selectedAscOrDescValue: { state: "", value: null },
      ascdesc: [
        {
          state: "Asc",
          value: "asc"
        },
        {
          state: "Desc",
          value: "desc"
        }
      ],
      selectedValue: { state: "", value: null },
      items: [
        {
          state: "Title",
          value: "title"
        },
        {
          state: "First Name",
          value: "firstName"
        },
        {
          state: "Last Name",
          value: "lastName"
        }
      ],
      defaultItem: {
        id: 0,
        avatar:
          "https://gravatar.com/avatar/32f7281160d8564d70e1b9fee1fd6ebb?s=400&d=retro&r=x",
        firstName: "",
        lastName: "",
        title: "",
        year: null,
        phone: null,
        email: "",
        bio: ""
      },
      editedIndex: -1,
      editedItem: {
        id: 0,
        avatar:
          "https://gravatar.com/avatar/32f7281160d8564d70e1b9fee1fd6ebb?s=400&d=retro&r=x",
        firstName: "",
        lastName: "",
        title: "",
        year: null,
        phone: null,
        email: "",
        bio: ""
      },
      active: true,
      keyS: 1,
      result: {
        coordinates: null,
        image: null
      }
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    uploadOrChange() {
      return this.editedIndex === -1 ? "Upload Image" : "Upload New Image";
    },
    cropOrSave() {
      return this.editedIndex === -1
        ? "Crop default or upload new"
        : "Change crop";
    },
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      !this.$v.firstName.maxLength &&
        errors.push("First Name must be at most 15 characters long");
      !this.$v.firstName.required && errors.push("First Name is required.");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.maxLength &&
        errors.push("Last Name must be at most 15 characters long");
      !this.$v.lastName.required && errors.push("Last Name is required.");
      return errors;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.maxLength &&
        errors.push("Title must be at most 20 characters long");
      !this.$v.title.required && errors.push("Title is required.");
      return errors;
    },
    phoneErrors() {
      const errors = [];
      if (!this.$v.phone.$dirty) return errors;
      !this.$v.phone.maxLength &&
        errors.push("Phone must be at most 20 characters long");
      !this.$v.phone.required && errors.push("Phone is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      return errors;
    },
    deleteEdit() {
      return this.editedIndex === -1
        ? (this.deleteBtns = false)
        : (this.deleteBtns = true);
    }
  },
  watch: {
    users() {
      return this.$store.getters.users;
    },
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  methods: {
    crop() {
      const result = this.$refs.cropper.getResult();
      const image = result.canvas.toDataURL();
      this.editedItem.avatar = image;
    },
    resetCrop() {
      this.editItem.avatar = this.defaultItem.avatar;
    },
    showFileChooser() {
      this.$refs.input.click();
    },
    selectImage() {
      this.$refs.fileInput.click();
    },
    save(year) {
      this.$refs.menu.save(year);
    },
    onChange({ coordinates, image }) {
      this.result = {
        coordinates,
        image
      };
    },
    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, item);
        this.$store.dispatch("updateUser", this.editedItem);
        this.dialog = true;
        this.keyS++;
      });
    },
    viewItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.$nextTick(() => {
        this.viewDialogOpen();
      });
    },
    viewDialogOpen() {
      this.$nextTick(() => {
        this.keyS++;
        this.viewDialog = true;
      });
    },
    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.users.splice(this.editedIndex, 1);
      this.closeDelete();
      this.dialog = false;
      this.viewDialog = false;
      let timerInterval;
      Swal.fire({
        text: " You delete" + " " + this.editedItem.firstName,
        timer: 2000,
        toast: true,
        icon: "success",
        position: "bottom-right",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          timerInterval = setInterval(() => {
            const content = Swal.getContent();
            if (content) {
              const b = content.querySelector("b");
              if (b) {
                b.textContent = Swal.getTimerLeft();
              }
            }
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      });
    },
    deleteFromSave() {
      this.dialogDelete = true;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeEdit() {},
    preventChange(event) {
      event.preventDefault();
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    pixelsRestriction({
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      imageWidth,
      imageHeight
    }) {
      return {
        minWidth: minWidth,
        minHeight: minHeight,
        maxWidth: maxWidth,
        maxHeight: maxHeight
      };
    },
    openEditModalFromView() {
      this.viewDialog = false;
      this.$nextTick(() => {
        this.keyS++;
        this.dialog = true;
      });
    },
    saveUser(payload, user, index) {
      this.editedItem.id = new Date().getTime();
      if (this.editedIndex > -1) {
        this.$nextTick(() => {
          Object.assign(this.users[this.editedIndex], this.editedItem);
        });
        this.close();
      } else {
        this.$nextTick(() => {
          this.$store.dispatch("addUser", this.editedItem);
        });
        this.close();
      }
    },
    resetFiltersAndSearch() {
      this.search = "";
      this.groupingBy = null;
      this.selectedValue = "";
      this.sortDesc = false;
      this.selectedAscOrDescValue = "";
    },
    onSortableChange(event) {
      if (this.selectedValue.value == "title") {
        this.groupingBy = "title";
      } else if (this.selectedValue.value == "firstName") {
        this.groupingBy = "firstName";
      } else if (this.selectedValue.value == "lastName") {
        this.groupingBy = "lastName";
      }
    },
    onAscOrDesc() {
      if (this.selectedAscOrDescValue.value == "asc") {
        this.sortDesc = false;
      } else if (this.selectedAscOrDescValue.value == "desc") {
        this.sortDesc = !this.sortDesc;
      }
    },
    disableYear(event) {
      this.event.preventDefault();
    },
    deleteItemfromView() {
      this.dialogDelete = true;
    },
    uploadImage(event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = e => {
          const image = e.target.result;
          this.editedItem.avatar = image;
        };

        reader.readAsDataURL(input.files[0]);
      }
    }
  }
};
</script>
<style lang="scss">
.item-ava {
  max-width: 100px;
  object-fit: cover;
  object-position: top;
  padding: 3px;
  border: 3px solid rgb(24, 21, 21);
  margin: 10px 0px;
  border-radius: 50%;
}
.table-wrapper {
  width: 100%;
  margin-top: 30px;
}
.user-view__wrapper {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.select-style {
  display: flex;
  align-items: center;
  margin: 0 50px;
}
.view {
  &-ava {
    max-width: 150px;
    width: 100%;
    height: auto;
    max-height: 150px;
    object-fit: cover;
    object-position: top;
    padding: 3px;
    border: 3px solid rgb(24, 21, 21);
    margin: 10px 0px;
    border-radius: 50%;
  }
  &-title,
  &-name,
  &-phone,
  &-year,
  &-bio,
  &-mail,
  &-bio {
    display: flex;
    width: 100%;
    align-items: center;
  }
  &-bio {
    h6 {
      align-self: flex-start;
    }
  }
}
.imagePreviewWrapper {
  width: 100%;
  height: 100px;
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: cover;
  background-position: center center;
}
.adv-cropper {
  max-width: 100px;
}
.search-items {
  margin-left: 20px;
}
.itmList {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #eeeeee;
  margin: 10px;
  padding: 10px;
  border-radius: 20px;
  > div,
  a {
    flex: 1;
  }
  .item-bio {
    margin-right: 20px;
  }
}
.editAbsolute {
  top: 10px;
  right: 10px;
  position: absolute;
}
.itmTable {
  max-width: 300px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #eeeeee;
  margin: 10px 0px;
  border-radius: 20px;
}
.unactiveRed {
  background-color: red !important;
}
.activeGreen {
  background-color: green !important;
}
.headers {
  display: flex;
  justify-content: space-between;
  background: #eeeeee;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  div {
    flex: 1;
  }
}
.group-line {
  background-color: white;
  border: 0 !important;
}
.headersNone {
  display: none;
}
.input-cropper {
  display: flex;
  width: 100%;
  justify-content: space-between;
  max-width: 100%;
  .vue-advanced-cropper {
    max-width: 70%;
  }
}
input[type="file"] {
  display: none;
}
.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}
.crop-button {
  margin-top: 10px;
  display: flex;
}
.avatar-actions {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.ava-custom {
  // margin: 0 15px;
  border: 2px solid #eee;
}
.inputs {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  > div {
    width: 100%;
    max-width: 300px;
  }
}
</style>
