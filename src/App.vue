<template>
  <v-app>
    <app-bar/>
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container >

        <!-- vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import {mapActions} from "vuex";
import AppBar from "@/components/AppBar";

export default {
  name: 'App',

  components: {
     AppBar,
  },

  data: () => ({
  //
  }),
  methods: {
    ...mapActions('authentication', [
      'logout',
    ]),
  }
};
</script>
