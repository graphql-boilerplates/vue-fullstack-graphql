<template>
  <div class='signup'>
    <main class="pa4 black-80 tl">
        <form class="measure center" v-on:submit.prevent="signup">
          <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
            <legend class="f4 fw6 ph0 mh0 justify-between">Already have an account? 
              <router-link v-bind:to="'/login'" exact class="link dim blue db f4 fw6 ph0 mh0 fr">Sign In</router-link>
            </legend>
            <div class="mt3">
              <label class="db fw6 lh-copy f6" for="email-address">Name</label>
              <input 
                class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-80" 
                type="Name" 
                name="Name"  
                id="name"
                v-model="name"
                autocomplete="name"
              />
            </div>
            <div class="mt3">
              <label class="db fw6 lh-copy f6" for="email-address">Email</label>
              <input 
                class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-80" 
                type="email" 
                name="email-address"  
                id="email-address"
                autocomplete='email'
                v-model="email"
              />
            </div>
            <div class="mv3">
              <label class="db fw6 lh-copy f6" for="password">Password</label>
              <input 
                class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-80" 
                type="password" 
                name="password"  
                autocomplete='password'
                id="password" 
                v-model="password"
              />
            </div>
          </fieldset>
          <div class="lh-copy mb3">
            <a href="#0" class="f6 link dim black db fr">Forgot your password?</a>
          </div>
          <div class="">
            <input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib  w-80"
              v-bind:class="classObject"
              type="submit"
              value="Sign Up"
            >
          </div>
        </form>
    </main>
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  import { USER_ID, AUTH_TOKEN  } from '../constants'

  const SIGNUP_USER = gql `
    mutation SIGNUP_MUTATION($email: String!, $password: String!, $name: String!) {
      signup(email: $email, password: $password, name: $name) {
        token
        user{
          id
          name
          email
        }
      }
    }
  `

  export default {
    data: () => ({
      email: '',
      password: '',
      name: '',
    }),

    // Attribute
    methods: {
      signup() {
        const email = this.email
        const password = this.password
        const name = this.name

        // Mutation
        this.$apollo.mutate({
          mutation: SIGNUP_USER,
          variables: {
            email,
            password,
            name
          },
        }).then((result) => {
          // Result
          console.log(result);
          const user = result.data.signup.user
          const token = result.data.signup.token
          this.saveUserData(user, token)
          this.$router.push({ path: 'Blog' })
        }).catch((error) => {
          // Error
          alert(`Error from ${error}`)
          console.error(error)
        })
      },

      saveUserData (user, token) {
        localStorage.setItem(USER_ID, user)
        localStorage.setItem(AUTH_TOKEN, token)
        this.$root.$data.token = localStorage.getItem(USER_TOKEN)
      }
    },

    computed: {
      canLogin: function () {
        return {
          disabled: !this.email && !this.password
        }
      },
      classObject: function(){
        return {
          dim: this.email && this.password
        }
      }
    }
  }
</script>

<style>
  .ba {
    border-style: solid;
    border-width: 1px;
  }

  .b--black {
      border-color: #000;
  }

  .b--transparent {
      border-color: transparent;
  }

  .db {
      display: block;
  }

  .dib {
      display: inline-block;
  }

  .b {
      font-weight: bold;
  }

  .fw6 {
      font-weight: 600;
  }

  .input-reset {
      -webkit-appearance: none;
        -moz-appearance: none;
  }

  .input-reset::-moz-focus-inner {
      border: 0;
      padding: 0;
  }

  .lh-copy {
      line-height: 1.5;
  }

  .link {
      text-decoration: none;
      transition: color .15s ease-in;
  }

  .link:link, .link:visited {
      transition: color .15s ease-in;
  }

  .link:hover {
      transition: color .15s ease-in;
  }

  .link:active {
      transition: color .15s ease-in;
  }

  .link:focus {
      transition: color .15s ease-in;
      outline: 1px dotted currentColor;
  }

  .w-100 {
      width: 100%;
  }

  .black-80 {
      color: rgba(0, 0, 0, .8);
  }

  .black {
      color: #000;
  }

  .bg-transparent {
      background-color: transparent;
  }

  .hover-white:hover {
      color: #fff;
  }

  .hover-white:focus {
      color: #fff;
  }

  .hover-bg-black:hover {
      background-color: #000;
  }

  .hover-bg-black:focus {
      background-color: #000;
  }

  .pa0 {
      padding: 0;
  }

  .pa2 {
      padding: .5rem;
  }

  .pa4 {
      padding: 2rem;
  }

  .pv2 {
      padding-top: .5rem;
      padding-bottom: .5rem;
  }

  .ph0 {
      padding-left: 0;
      padding-right: 0;
  }

  .ph3 {
      padding-left: 1rem;
      padding-right: 1rem;
  }

  .ma0 {
      margin: 0;
  }

  .mt3 {
      margin-top: 1rem;
  }

  .mv3 {
      margin-top: 1rem;
      margin-bottom: 1rem;
  }

  .mh0 {
      margin-left: 0;
      margin-right: 0;
  }

  .f4 {
      font-size: 1.25rem;
  }

  .f6 {
      font-size: .875rem;
  }

  .measure {
      max-width: 30em;
  }

  .center {
      margin-right: auto;
      margin-left: auto;
  }

  .dim {
      opacity: 1;
      transition: opacity .15s ease-in;
  }

  .dim:hover, .dim:focus {
      opacity: .5;
      transition: opacity .15s ease-in;
  }

  .dim:active {
      opacity: .8;
      transition: opacity .15s ease-out;
  }

  .grow {
      -moz-osx-font-smoothing: grayscale;
      backface-visibility: hidden;
      transform: translateZ(0);
      transition: transform .25s ease-out;
  }

  .grow:hover, .grow:focus {
      transform: scale(1.05);
  }

  .grow:active {
      transform: scale(.9);
  }

  .pointer:hover {
      cursor: pointer;
  }

</style>
