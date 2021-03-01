<template>
  <div>
    <fpl :isLoading="isLoading"></fpl>
    <v-app>
      <v-main>
        <v-container
            class="fill-height"
            fluid
        >
          <v-row
              align="center"
              justify="center"
          >
            <v-col
                cols="12"
                sm="8"
                md="4"
            >
              <v-card class="elevation-12">
                <v-toolbar
                    color="cyan"
                    dark
                    flat
                >
                  <v-toolbar-title>Login</v-toolbar-title>
                </v-toolbar>

                <v-card-text>
                  <v-form
                      v-model="valid"
                      lazy-validation
                      ref="loginForm">

                    <!--                    :error-messages="errors.email ? [errors.email[0]] : ''"-->
                    <!--                    :rules="validationRules.textRules"-->
                    <v-text-field
                        label="Email"
                        :value="loginInfo.email"
                        @input="SET_LOGIN_EMAIL"
                        prepend-icon="mdi-account"
                        type="text"
                    ></v-text-field>

                    <!--                    :error-messages="errors.password ? [errors.password[0]] : ''"-->
                    <!--                    :rules="validationRules.textRules"-->
                    <v-text-field
                        label="Password"
                        :value="loginInfo.password"
                        @input="SET_LOGIN_PASSWORD"
                        prepend-icon="mdi-lock"
                        type="password"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="login" color="cyan" dark>Login</v-btn>
                  <!--                  <v-btn @click="loginTest" color="cyan" dark>Login</v-btn>-->
                </v-card-actions>

              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
// import axios from 'axios'

export default {
  name: "Login",
  data: () => {
    return {
      valid: true,
    }
  },
  beforeMount() {
    let _this = this

    // Temporary redirect if login
    if (_this.token) {
      _this.$router.push('/products')
    }
  },
  computed: {
    // ...mapState('__rules', ['validationRules']),
    ...mapState('__helpers', [
      'isLoading',
      'commonErrors'
    ]),
    ...mapState('authentication', [
      'loginInfo',
      'token'
    ]),
  },
  methods: {
    ...mapMutations('authentication', [
      'SET_LOGIN_EMAIL',
      'SET_LOGIN_PASSWORD',
    ]),
    ...mapActions('authentication', [
      'login',
    ]),
  }
}
</script>

<style scoped>

</style>
