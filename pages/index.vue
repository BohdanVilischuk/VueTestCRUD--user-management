<template>
  <div>
    <div class="container-s">
      <!-- <UsersTable /> -->
      <!-- <NewUsersTable /> -->
      <!-- <Table></Table>
      <Cr></Cr> -->
      <!-- <UsersCrud/> -->
      <Cr></Cr> 
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Users from "../components/Users";
import Filters from "../components/Filters";
import { validationMixin } from "vuelidate";
import AddUserModal from "../components/modals/AddUserModal";
import UsersCrud from '../components/UsersCrud'
// import Table from "../components/Table"
import Cr from "../components/cr"
import Crop from "../components/crop"
// import Crud from '../components/crud'
// import UsersTable from "../components/UsersTable"
// import NewUsersTable from "../components/NewUsersTable"
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  // data: () => ({
  //   dialog: false,
  //   simpleDialog: false
  // }),
  data() {
    return {

    }
  },
  components: {
    UsersCrud,
    Crop,
    // Table,
    Cr
    // UsersTable,
    // NewUsersTable
    // Users,
    // // Crud,
    // Filters,
    // AddUserModal
    // VEasyDialog
  },
  computed: {
   
  },
  methods: {
   
  }
};
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
a:hover {
  text-decoration: none;
}
textarea {
  resize: none;
}
.popup-block {
  border-radius: 10px;
  padding: 20px;
  background: white;
}
.container-s {
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
}
.close-user-popup {
  .mdi-plus::before {
    transform: rotate(45deg);
  }
}
.for-search {
  align-items: center;
  justify-content: center;
  max-width: 800px;
  width: 100%;
  display: flex;
}
.error--text {
  color: red;
}
.form-buttons {
  display: flex;
  justify-content: space-between;
}
.filters-inner {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin: 10px;
}
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.add-user__form {
  display: flex;
  flex-wrap: wrap;
  .v-input {
    max-width: 50%;
    margin: 10px;
  }
}
.form-buttons__wrapper {
  display: flex;
  width: 100%;
  justify-content: space-between;
  button {
    margin: 10px !important;
  }
}
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
