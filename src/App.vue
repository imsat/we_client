<template>
  <v-app>
    <app-bar/>
    <v-main>
      <router-view></router-view>
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
