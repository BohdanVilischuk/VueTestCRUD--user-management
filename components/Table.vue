<template>
  <v-card>
    <v-btn
      fab
      dark
      rounded
      absolute
      top
      right
      color="pink"
      @click="openUserAddDialog"
    >
      <v-icon>
        mdi-plus
      </v-icon>
    </v-btn>
    <v-dialog v-model="newUserDialog" persistent class="dia" width="600px">
      <v-card>
        <v-form>
          <v-text-field
            v-model="defaultInput.firstName"
            label="First Name"
            hint="Type first name"
            required
          ></v-text-field>
          <v-text-field
            v-model="defaultInput.lastName"
            label="Last Name"
            hint="Type last name"
            required
          ></v-text-field>
          <v-btn fab dark rounded bottom right @click="closeUserAddDialog">
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
          <v-btn fab dark rounded bottom right @click="addUser">
            <v-icon>
              mdi-plus
            </v-icon>
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editUserDialog" persistent class="dia" width="600px">
      <v-card>
        <v-form>

            <v-text-field
              v-model="defaultInput.firstName"
              label="dsadsa"
              hint="Type first name"
              required
            ></v-text-field>
            <v-text-field
              v-model="defaultInput.lastName"
              label="Last Name"
              hint="Type last name"
              required
            ></v-text-field>
            <v-btn fab dark rounded bottom right @click="editUserDialog = false">
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
            <v-icon small @click="editUser(user)">
              mdi-pencil
            </v-icon>

        </v-form>
      </v-card>
    </v-dialog>
    <v-card-title>
      <v-btn dark color="primary" small rounded fab absolute left top>
        <v-icon>
          mdi-table
        </v-icon>
      </v-btn>
      <v-btn
        class="lefter-btn"
        dark
        color="pink"
        small
        rounded
        fab
        absolute
        top
        left
      >
        <v-icon>
          mdi-format-list-bulleted
        </v-icon>
      </v-btn>
    </v-card-title>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <div class="select-filter">
        <v-icon>
          mdi-filter
        </v-icon>

        <v-select class="margin-select"> </v-select>

        <v-select> </v-select>
      </div>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="users"
      item-key="name"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:[`item.avatar`]="{ item }">
        <img width="100px" class="s" :src="item.avatar" />
      </template>
      <template v-slot:[`item.bio`]="{ item }">
        <div class="item-bio">{{ item.bio }}</div>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <div class="item-actions">
          <v-btn rounded small fab color="primary">
            <v-icon small @click="editUser(item.id)">
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
import Swal from "sweetalert2";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      search: "",
      newUserDialog: false,
      editUserDialog: false,
      defaultInput: {
        id: "",
        avatar: "",
        firstName: "",
        lastName: "",
        title: "",
        phone: "",
        email: "",
        year: "",
        bio: ""
      },
      editInput: {}
    };
  },
  computed: {
    // setUsers() {
    //   this.$store.commit("setUser");
    // },
    users() {
      return this.$store.state.users;
    },
    headers() {
      return [
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
      ];
    }
  },
  watch: {
    editId(val) {
      if (val) {
        let current = this.$store.state.users.filter(i => {
          if (i.id == val) return true;
          else false;
        })[0];
        this.defaultInput.avatar = current.avatar;
        this.defaultInput.firstName = current.firstName;
        this.defaultInput.lastName = current.lastName;
        this.defaultInput.title = current.title;
        this.defaultInput.year = current.year;
        this.defaultInput.phone = current.phone;
        this.defaultInput.email = current.email;
        this.defaultInput.bio = current.bio;
      } else {
        this.resetFormData();
      }
    }
  },
  methods: {
    showDialog() {
      this.editUserDialog = true;
    },
    // addUser() {
    //   this.$store.state.users.push({
    //     firstName: this.defaultInput.firstName,
    //     lastName: this.defaultInput.firstName
    //   });
    //   this.defaultInput.firstName = "";
    //   this.defaultInput.lastName = "";
    // },
    // addUser(item, index){
    //   let id = this.defaultInput.id;
    //   let av = this.defaultInput.avatar;
    //   let fn = this.defaultInput.firstName;
    //   let ln = this.defaultInput.lastName;
    //   let ti = this.defaultInput.title;
    //   let ph = this.defaultInput.phone;
    //   let ye = this.defaultInput.year;
    //   let em = this.defaultInput.email
    //   let bio = this.defaultInput.bio
    //   this.$store.dispatch('addUser',{
    //     id: this.users.length + 1,
    //     avatar: av,
    //     firstName: fn,
    //     lastName: ln,
    //     title: ti,
    //     year: ye,
    //     phone: ph,
    //     email: em,
    //     bio: bio,
    //     // avatar: this.defaultInput.avatar,
    //     // firstName: this.defaultInput.firstName,
    //     // lastName: this.defaultInput.lastName,
    //     // title: this.defaultInput.text,
    //     // year: this.defaultInput.year,
    //     // phone: this.defaultInput.phone,
    //     // email: this.defaultInput.email,
    //     // bio: this.defaultInput.bio,
    //   })
    //   this.defaultInput.firstName = '',
    //   this.defaultInput.lastName = ''
    // },
    editUser(event, user) {
      var payload = this.defaultInput;
      this.defaultInput.id = user.id;
      this.editUserDialog = true;
      this.$store.dispatch("editUser", {
        firstName: payload.firstName
      });

    },
    addUser(event) {
      var payload = this.defaultInput;
      if (!this.editId) {
        payload["id"] =
          this.$store.state.users.length != 0
            ? Math.max(...this.$store.state.users.map(i => i.id)) + 1
            : 0;
        const user = { ...payload };
        this.$store.dispatch("addUser", user);
        this.resetFormData();
      }
      // } else {
      //   payload["id"] = this.id;
      //   const user = { ...payload };
      //   this.$store.dispatch("editUser", user);
      // }
    },
    resetFormData() {
      this.defaultInput = {
        avatar: "",
        firstName: "",
        lastName: "",
        title: "",
        phone: "",
        year: "",
        email: "",
        bio: ""
      };
    },
    removeUser(user) {
      Swal.fire({
        title: "Are you sure?" + user.firstName,
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$store.dispatch("removeUser", user).then(res => {
            if (res) Swal.fire("Deleted!", this.user.firstName, "success");
            else Swal.fire("Fail!", "Fail to delete record.", "error");
          });
        }
      });
    },
    openUserAddDialog() {
      this.newUserDialog = true;
    },
    closeUserAddDialog() {
      this.newUserDialog = false;
    }
  }
};
</script>

<style lang="scss">
.s {
  object-fit: cover;
  object-position: top;
  padding: 3px;
  border: 3px solid rgb(24, 21, 21);
  margin: 10px 0px;
  border-radius: 50%;
}
.container-s {
  margin-top: 10px;
  .v-card {
    width: 100%;
  }
}
.dia {
  padding: 10px !important;
}
.v-card__title {
  .lefter-btn {
    left: 70px;
  }
}
.select-filter {
  display: flex;
  flex: 1;
  margin: 10px 10px -11px 10px;
  .v-input__control {
    margin: 0 10px;
  }
}
</style>
