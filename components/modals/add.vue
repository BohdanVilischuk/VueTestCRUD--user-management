<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="addUserDialog" persistent width="700px">
        <v-card>
          <v-card-title>
            <span class="headline">Add User Profile</span>
          </v-card-title>
          <AddForm
            :users="users"
            :id="id"
            ref="addForm"
            :input="input"
            :avatar="avatar"
            :firstName="firstName"
            :lastName="lastName"
            :title="title"
            :year="year"
            :phone="phone"
            :email="email"
            :bio="bio"
            :saveForm="saveForm"
            :updateForm="updateForm"
            @rm="rm"
          />
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import AddForm from "../form/addForm";
export default {
  components: {
    AddForm
  },
  data: function() {
    return {
      addUserDialog: false
    };
  },
  props: [
    "input",
    "users",
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
    "bio"
  ],
  methods: {
    ad: function() {
      this.addUserDialog = true;
    },
    rm: function() {
      this.addUserDialog = false;
    },
    updateUser: function() {
      this.$refs.addForm.update();
    },
    deleteUser: function() {
      this.$refs.addForm.destroy();
    }
  }
};
</script>

<style></style>
