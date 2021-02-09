<template>
  <div>
    <v-card-text>
      <v-container>
        <form class="add-user-form">
          <v-text-field
            v-model="avatar"
            :counter="15"
            label="First Name"
            value=" "
            hint="Type ava name"
            required
            prepend-icon="mdi-clipboard-text-play-outline"
          ></v-text-field>
          <v-text-field
            v-model="firstName"
            :counter="15"
            label="First Name"
            value=" "
            hint="Type first name"
            required
            prepend-icon="mdi-clipboard-text-play-outline"
          ></v-text-field>
          <v-text-field
            v-model="lastName"
            :counter="15"
            label="last Name"
            value=" "
            hint="Type last name"
            required
            prepend-icon="mdi-clipboard-text-play-outline"
          ></v-text-field>

          <v-btn v-if="saveForm" @click.prevent="save">
            add
          </v-btn>
          <v-btn v-if="updateForm">
            update
          </v-btn>
          <v-btn @click.prevent="clear"> cl</v-btn>
        </form>
      </v-container>
    </v-card-text>
  </div>
</template>

<script>
import swal from "sweetalert2";
window.Swal = swal;
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  props: [
    "users",
    "input",
    "saveForm",
    "updateForm",
    "id",
    "avatar",
    "firstName",
    "lastName",
    "title",
    "year",
    "phone",
    "email",
    "bio",
    "rm"
  ],
  mixins: [validationMixin],
  validations: {
    firstName: { required, maxLength: maxLength(15) },
    lastName: { required, maxLength: maxLength(15) },
    title: { required, maxLength: maxLength(30) },
    // year: { required, maxLength: maxLength(10) },
    phone: { required, maxLength: maxLength(13) },
    email: { email },
    bio: { required, maxLength: maxLength(15) }
  },
  data: function() {
    return {
      created: function() {
        this.view();
      }
    };
  },
  methods: {
    view: function() {},
    save: function() {
      let ava = this.avatar;
      let fn = this.firstName;
      let ln = this.lastName;
      let ti = this.title;
      let ye = this.year;
      let ph = this.phone;
      let bi = this.bio;
      this.users.push({
        avatar: this.ava,
        firstName: this.firstName,
        lastName: this.lastName,
        title: this.title,
        year: this.year,
        phone: this.phone,
        bio: this.bio
      }),
        this.$emit("rm");
      swal.fire({
        text:
          "You succesfully add" +
          " " +
          this.firstName +
          " " +
          this.lastName +
          " ",
        target: "#custom-target",
        customClass: {
          container: "position-absolute"
        },
        toast: true,
        position: "bottom-right",
        timer: 5000
      });
      // swal.fire(
      // "You succesfully add" +
      //   " " +
      //   this.firstName +
      //   " " +
      //   this.lastName +
      //   "as user"
      // );
    },
    clear: function() {
      this.$emit("rm");
      (this.saveForm = true), (this.updateForm = false), (this.avatar = "");
      this.firstName = "";
      this.lastName = "";
      this.title = "";
      this.year = "";
      this.phone = "";
      this.bio = "";
    },
    edit: function(item) {
      (this.saveForm = false),
        (this.updateForm = true),
        (this.id = item.id),
        (this.firstName = item.firstName),
        (this.lastName = item.lastName),
        (this.title = item.title),
        (this.year = item.year),
        (this.phone = item.phone),
        (this.bi = item.bio);
    },
    update: function(id) {
      let myid = id - 1;
      Object.assign(this.users[myid], this.users);
      this.clear();
    },
    destroy: function(item) {
      let del = this.users.indexOf(item)
      swal({
        title: 'deleted'
      }).then((willDelete)=> {
        if(willDelete) {
          this.users.splice(del, 1)
        }
        else {

        }
      })
    }
  }
};
</script>

<style></style>
