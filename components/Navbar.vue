<template>
  <v-card>
    <v-navigation-drawer app expand> <!--  expand-on-hover-->
      <v-list>
        <v-list-item class="px-2">
          <v-avatar size="36" color="indigo">
            <v-icon dark>
              mdi-account-circle
            </v-icon>
          </v-avatar>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">
              Bohdan Vilishchuk
            </v-list-item-title>
            <v-list-item-subtitle>iamtheflex@gmail.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon color="green darken-2">
              mdi-domain
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home page</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/about">
          <v-list-item-icon>
            <v-icon color="purple darken-2">
              mdi-dialpad
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>About page</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/contact">
          <v-list-item-icon>
            <v-icon color="blue darken-2">mdi-message-text</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Contact page</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/pretty">
          <v-list-item-icon>
            <v-icon color="blue-grey darken-2">
              mdi-call-split
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>Pretty page</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  
};
</script>

<style></style>
