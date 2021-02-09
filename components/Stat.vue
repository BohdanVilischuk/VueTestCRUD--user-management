<template>
<div>
    <div>Users: {{ countUsers }}</div>
    <div>
      
    </div>
</div>
</template>

<script>
import Swal from "sweetalert2";
import { mapGetters } from "vuex";
export default {
  methods: {
    new() {
      Swal.fire({
        text: "yarick {e"
      });
    }
  },
  computed: {
    ...mapGetters(["countUsers"])
  }
};
</script>

<style></style>
