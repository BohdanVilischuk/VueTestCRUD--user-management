<template>
  <v-dialog v-model="dialog" max-width="500px" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="pink"
        small
        fab
        rounded
        dark
        class="mb-2"
        v-bind="attrs"
        v-on="on"
        absolute
        right
        top
      >
        <v-icon> mdi-plus </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-col>
                <v-col
                  class="imagePreviewWrapper"
                  :style="{
                    'background-image': `url(${editedItem.avatar})`
                  }"
                  v-model="editedItem.avatar"
                  @click="selectImage"
                >
                </v-col>

                <input ref="fileInput" type="file" @input="pickFile" />
              </v-col>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="editedItem.firstName"
                label="First name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="editedItem.lastName"
                label="last name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="editedItem.title"
                label="title"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="editedItem.year"
                label="year"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="editedItem.phone"
                label="Phoen"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">
          Cancel
        </v-btn>
        <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
        <v-btn v-if="deleteEdit" v-model="deleteBtns" @click="deleteFromSave">
          remove
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
    data() {
        return {
            dialog: false
        }
    },
    props: [
        "users",
        "editedItem",
        "defaultItem",
        "editedIndex"
    ],
    methods: {
        showDialog(){
            this.dialog = true
        }
    },
  watch: {
    dialog(val) {
      val || this.close();
    },
  }
};
</script>

<style></style>
