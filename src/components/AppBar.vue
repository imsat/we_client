<template>
  <v-app-bar
      app
      color="cyan"
      dark
  >
    <div class="d-flex align-center">
      <h2>WE RYZEN</h2>
    </div>

    <v-spacer></v-spacer>

    <span class="mr-2" v-if="user">{{ user.name }}</span>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
            icon
            v-on="on"
        >
          <v-icon @click="logout">mdi-logout</v-icon>
        </v-btn>
      </template>
      <span>Logout</span>
    </v-tooltip>

  </v-app-bar>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: "AppBar",
  data: () => ({
    //
  }),
  computed: {
    ...mapState('__helpers', [
      'isLoading',
    ]),
    ...mapState('authentication', ['user']),
  },
  methods: {
    ...mapActions('authentication', [
      'logout',
    ]),
  }
}
</script>

<style scoped>

</style>
