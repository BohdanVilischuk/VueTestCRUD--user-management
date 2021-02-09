<template>
  <v-card>
    <v-card-title>
      <span class="headline">Add User Profile</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <form class="add-user-form">
          <v-text-field
            v-model="firstName"
            :error-messages="firstNameErrors"
            :counter="15"
            label="First Name"
            hint="Type first name"
            required
            prepend-icon="mdi-clipboard-text-play-outline"
            @input="$v.firstName.$touch()"
            @blur="$v.firstName.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="lastName"
            :error-messages="lastNameErrors"
            :counter="15"
            label="Last Name"
            hint="Type last name"
            prepend-icon="mdi-clipboard-text-play-outline"
            required
            @input="$v.lastName.$touch()"
            @blur="$v.lastName.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="title"
            :error-messages="titleErrors"
            :counter="10"
            label="Title"
            hint="Type title"
            prepend-icon="mdi-alpha-t-circle-outline"
            required
            @input="$v.title.$touch()"
            @blur="$v.title.$touch()"
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
                v-model="year"
                label="Year"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              ref="picker"
              v-model="year"
              :max="new Date().toISOString().substr(0, 10)"
              min="1950-01-01"
              @change="save"
            ></v-date-picker>
          </v-menu>
          <div class="form-buttons">
            <v-btn @click="clear">
              Cancel
              <v-icon>mdi-close </v-icon>
            </v-btn>
            <v-btn color="success" @click="submit">
              Save
              <v-icon>mdi-account-plus </v-icon>
            </v-btn>
          </div>
        </form>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  validations: {
    firstName: { required, maxLength: maxLength(15) },
    lastName: { required, maxLength: maxLength(15) },
    title: { required, maxLength: maxLength(30) },
    // year: { required, maxLength: maxLength(10) },
    phone: { required, maxLength: maxLength(13) },
    email: { required, email, maxLength: maxLength(30) },
    bio: { required, maxLength: maxLength(15) }
  },
  data: () => ({
    avatar: "",
    firstName: "",
    lastName: "",
    title: "",
    year: null,
    phone: "",
    email: "",
    bio: ""
  }),
   computed: {
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
    // yearErrors() {
    //   const errors = [];
    //   if (!this.$v.title.$dirty) return errors;
    //   !this.$v.title.maxLength &&
    //     errors.push("Last Name must be at most 20 characters long");
    //   !this.$v.title.required && errors.push("Last Name is required.");
    //   return errors;
    // }
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  methods: {
    save(year) {
      this.$refs.menu.save(year);
    },

    submit() {
      this.$v.$touch();
    },
    clear() {
      this.dialog = false;
      this.$v.$reset();
      this.avatar = "";
      this.firstName = "";
      this.lastName = "";
      this.title = "";
      this.year = "";
      this.phone = "";
      this.email = "";
      this.bio = "";
      // this.email = "";
    }
  }
};
</script>

<style></style>
