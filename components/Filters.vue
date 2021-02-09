<template>
  <div class="all-filters">
    <div class="actions-buttons-selects">
      <v-select :items="items" filled label="Filt" dense></v-select>
      <v-select :items="items" filled label="Filled style" dense></v-select>
    </div>
  </div>
</template>

<script>
import AddUserModal from "../components/modals/AddUserModal";
export default {
  components: {
    AddUserModal,
  },
  data: () => ({
    items: ["Foo", "Bar", "Fizz", "Buzz"]
  }),
  computed: {
    users() {
      return this.$store.state.users;
    }
  }
};
</script>

<style lang="scss">
.all-filters {
  display: flex;
  justify-content: space-between;
}
.visibility-counter {
    flex: 1;
}
.actions-buttons-selects {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    .v-input__control {
        margin: 0 20px;    
    }
}
</style>
