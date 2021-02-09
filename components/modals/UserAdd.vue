<template>
  <div class="dialogs">
    <v-dialog width="600px" v-model="addUserDialog">
      <v-card class="users-modal">
        <v-card-title>Add User</v-card-title>

        <v-text-field
          label="First Name"
          hint="Type first name"
          required
          prepend-icon="mdi-clipboard-text-play-outline"
          v-model="userEdit.firstName"
        >
        </v-text-field>
        <v-btn @click="saveUser">
          SAVE
        </v-btn>
      </v-card>
    </v-dialog>
    <v-dialog width="600px" v-model="editUserDialog">
      <v-card class="users-modal">
        <v-card-title>Edit User</v-card-title>

        <v-text-field
          label="sda"
          hint="Type first name"
          required
          prepend-icon="mdi-clipboard-text-play-outline"
         v-model="userEdit.firstName"
        >
        </v-text-field>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addUserDialog: false,
      editUserDialog: false,
      editedIndex: -1,
      userDefault: {
        avatar: "",
        firstName: "",
        lastName: "",
        title: "",
        phone: "",
        year: "",
        email: "",
        bio: ""
      },
      userEdit: {
        avatar: "",
        firstName: "",
        lastName: "",
        title: "",
        phone: "",
        year: "",
        email: "",
        bio: ""
      }
    };
  },
  props: ["users"],
  methods: {
    addUserModalOpen() {
      this.addUserDialog = true;
    },
    editUserDialogOpen() {
      this.editUserDialog = true;
    },
    editItem(item) {
      this.editUserDialog = true
      this.editedIndex = this.users.indexOf(item);
      this.userEdit = Object.assign({}, item);
      this.userEdit.firstName = item.firstName
    },
    saveUser() {
      this.$store.dispatch("addUser", {
        firstName: this.userEdit.firstName
      });
    }
  }

  // saveUser() {
  //   this.$store.dispatch("addUser", {
  //     firstName: this.userDefault.firstName
  //   });
  // }
};
</script>

<style lang="scss">
.users-modal {
  padding: 20px;
}
</style>
