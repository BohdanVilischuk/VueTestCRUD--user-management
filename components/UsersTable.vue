<template>
  <div>
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Top
        </v-btn>
      </template>
      <span>Top tooltip</span>
    </v-tooltip>
    <v-btn @click="this.new"> </v-btn>
    <v-dialog v-model="dialog" persistent>
      <input type="text" class="n" v-model="firstName" />
      <input type="text" class="n" v-model="lastName" />
      <v-btn @click="addUser">
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
    </v-dialog>
    <v-data-table
      :headers="headers"
      :items="users"
      item-key="name"
      class="elevation-1"
      :search="search"
      :custom-filter="filterOnlyCapsText"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search (UPPER CASE ONLY)"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:[`item.avatar`]="{ item }">
        <img width="100px" :src="item.avatar" />
      </template>
      <template v-slot:[`item.bio`]="{ item }">
        <div class="item-bio">
          {{ item.bio }}
        </div>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <div class="actions">
          <v-btn>
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn>
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <form @submit.prevent="addText" action="">
      <input class="n" type="text" v-model="newText" />
    </form>
    <v-btn>
      {{ text }}
    </v-btn>
    <stat />
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapState, mapMutations } from "vuex";
import Stat from "../components/Stat";
export default {
  data() {
    return {
      search: "",
      calories: "",
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%"
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%"
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%"
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%"
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%"
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%"
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%"
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%"
        }
      ],
      dialog: false,
      newText: "",
      userInput: {
        avatar: "",
        firstName: "",
        lastName: "",
        title: "",
        phone: "",
        email: "",
        year: "",
        bio: ""
      }
    };
  },
  components: {
    Stat
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
    ...mapState(["text"]),
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
    // headers() {
    //   return [
    //     {
    //       text: "Dessert (100g serving)",
    //       align: "start",
    //       sortable: false,
    //       value: "name"
    //     },
    //     {
    //       text: "Calories",
    //       value: "calories",
    //       filter: value => {
    //         if (!this.calories) return true;

    //         return value < parseInt(this.calories);
    //       }
    //     },
    //     { text: "Fat (g)", value: "fat" },
    //     { text: "Carbs (g)", value: "carbs" },
    //     { text: "Protein (g)", value: "protein" },
    //     { text: "Iron (%)", value: "iron" }
    //   ];
    // }
  },
  methods: {
    new() {
    },
    ...mapMutations(["ADD_LINK"]),
    addText() {
      this.ADD_LINK(this.newText);
      this.newText = "";
    },
    addUser() {
      this.createUser({
        avatar: this.userInput.avatar,
        firstName: this.userInput.firstName,
        lastName: this.userInput.lastName,
        title: this.userInput.title,
        phone: this.userInput.phone,
        email: this.userInput.email,
        bio: this.userInput.bio
      });
    },
    filterOnlyCapsText(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value
          .toString()
          .toLocaleUpperCase()
          .indexOf(search) !== -1
      );
    }
  }
};
</script>

<style lang="scss">
.n {
  background-color: white !important;
  border-style: solid !important;
}
</style>
