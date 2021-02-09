<template>
  <div class="users-inner">
    <Add
      ref="add"
      :users="users"
      :input="input"
      :id="input.id"
      :avatar="input.avatar"
      :firstName="input.firstName"
      :lastName="input.lastName"
      :title="input.title"
      :year="input.year"
      :phone="input.phone"
      :email="input.email"
      :bio="input.bio"
      :saveForm="saveForm"
      :updateForm="updateForm"
    />
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :search="search"
      :headers="headers"
      :items="users"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item.avatar="{ item }">
        <div class="item-ava">
          <v-img
            max-width="100px"
            width="100%"
            :src="item.avatar"
            height="100px"
          ></v-img>
        </div>
      </template>
      <template v-slot:item.firstName="{ item }">
        <a href="#" class="item-profile">
          {{ item.firstName }}
        </a>
      </template>
      <template v-slot:item.bio="{ item }">
        <div class="item-bio">
          {{ item.bio }}
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn @click="updateItem">
          <v-icon small>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn @click="deleteItem">
          <v-icon small>
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
          Reset
        </v-btn>
      </template>
    </v-data-table>
    
    <!-- <Add :id="input.id" :avatar="input.avatar" :firstName="input.firstName" :lastName="input.lastName" :title="input.title" :year="input.year" :phone="input.phone" :email="input.email" :bio="input.bio" /> -->
  </div>
</template>

<script>
import Add from "../components/modals/add";
// import User from "../components/User";
export default {
  data() {
    return {
      search: "",
      addUserDialog: false,
      saveForm: true,
      updateForm: false,
      users: [],
      headers: [
        {
          text: "avatar",
          align: "start",
          sortable: false,
          value: "avatar",
          filterable: false,
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
        {
          text: "Title",
          value: "title"
        },
        {
          text: "Year",
          value: "year"
        },
        {
          text: "Phone",
          value: "phone"
        },
        {
          text: "Email",
          value: "email"
        },
        {
          text: "Biography ",
          value: "bio",
          sortable: false
        },
        { text: "Actions", value: "actions", sortable: false }
      ],
      input: {
        id: "",
        avatar: "",
        firstName: "",
        lastName: "",
        title: "",
        year: "",
        phone: "",
        email: "",
        bio: ""
      }
    };
  },
  components: {
    Add
  },
  created() {
    this.initialize();
  },
  // computed: {
  //   users() {
  //     return this.$store.state.users;
  //   }
  // },
  methods: {
    updateInfo() {},
    initialize() {
      this.users = [
        {
          id: "1",
          avatar:
            "https://gravatar.com/avatar/8c30649fc1292542673b0878017a30ab?s=400&d=retro&r=x",
          firstName: "First1",
          lastName: "Last1",
          title: "CEO",
          year: 11 - 11 - 1111,
          phone: 111111111,
          email: "www@www.www",
          bio: "bio1"
        },
        {
          id: "2",
          avatar:
            "https://gravatar.com/avatar/32f7281160d8564d70e1b9fee1fd6ebb?s=400&d=retro&r=x",
          firstName: "First2",
          lastName: "Last2",
          title: "DEV",
          year: 22 - 22 - 2222,
          phone: 2222222222,
          email: "www2@www2.www2",
          bio: "bio2"
        },
        {
          id: "3",
          avatar:
            "https://gravatar.com/avatar/5ce11485b1ac7bf1a2e9beb03bef3c06?s=400&d=retro&r=x",
          firstName: "First3",
          lastName: "Last3",
          title: "Next",
          year: 33 - 33 - 3333,
          phone: 3333333333,
          email: "www3@www3.www",
          bio: "bio3"
        }
      ];
    },
    showModal() {
      this.$refs.add.ad();
    },
    updateItem(item){
        this.$refs.add.updateUser()
    },
    deleteItem(item) {
      this.$refs.add.deleteUser()
    }
  }
};
</script>

<style lang="scss">
.item-bio {
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item-ava,
.item-bio {
  position: relative;
}
.v-data-table__wrapper {
  tr {
    &:hover {
      .edit-btn {
        left: -10px;
        opacity: 1;
        transition: 0.2s ease;
        visibility: visible;
        transition-delay: 0.2s;
      }
      .delete-btn {
        left: -10px;
        opacity: 1;
        transition: 0.2s ease;
        transition-delay: 0.2s;
        visibility: visible;
      }
    }
  }
}
.delete-btn {
  position: absolute;
  z-index: 2;
  top: 0%;
  visibility: hidden;
  opacity: 0;
  left: -25px;
  transition: 0.2s ease;
}
.edit-btn {
  position: absolute;
  z-index: 2;
  top: 35%;
  visibility: hidden;
  opacity: 0;
  left: -25px;
  transition: 0.2s ease;
}
.v-progress-linear--absolute {
  top: -5px;
}
</style>
