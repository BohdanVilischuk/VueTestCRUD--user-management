<template>
  <v-card class="new">
    <v-btn
      fab
      dark
      rounded
      absolute
      top
      right
      color="pink"
      @click="showAddUserDialog"
    >
      <v-icon>
        mdi-plus
      </v-icon>
    </v-btn>
    <UserAdd :users="users" ref="userAddModal" />
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="users" :search="search">
      <template v-slot:[`item.avatar`]="{ item }">
        <img width="100px" class="s" :src="item.avatar" />
      </template>
      <template v-slot:[`item.bio`]="{ item }">
        <div style="cursor: pointer" class="item-bio" @click="dia">
          {{ item.bio }}
        </div>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <div class="item-actions">
          <v-btn rounded small fab color="primary">
            <v-icon small @click="openEditDialog">
              mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn
            class="mx-2"
            fab
            dark
            small
            color="pink"
            @click="removeUser(item.id)"
          >
            <v-icon dark small>
              mdi-delete
            </v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import UserAdd from "../components/modals/UserAdd";
export default {
  data() {
    return {
      search: "",
      dialogs: false,
      headers: [
        {
          text: "Avatar",
          align: "start",
          sortable: false,
          groupable: false,
          searchable: false,
          value: "avatar"
        },
        { text: "First Name", value: "firstName" },
        { text: "Last Name", value: "lastName" },
        { text: "Title", value: "title" },
        { text: "Year", value: "year" },
        { text: "Phone", value: "phone" },
        { text: "Email", value: "email" },
        { text: "Bio", value: "bio", sortable: false, searchable: false },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
          searchable: false
        }
      ],
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
  components: {
    UserAdd
  },
  computed: {
    users() {
      return this.$store.state.users;
    }
  },
  methods: {
    dia() {
      this.dialogs = true;
    },
    showAddUserDialog() {
      this.$refs.userAddModal.addUserModalOpen();
    },
    openEditDialog() {
      this.$refs.userAddModal.editUserDialogOpen();
    },
    addUser: function() {
      this.$store.dispatch("addUser", this);
      this.newId++;
    },
    deleteUser: function(id) {
      this.$store.dispatch("deleteUser", id);
    }
  }
};
</script>

<style lang="scss">
.new {
  margin-top: 20px;
  width: 100%;
}
</style>
