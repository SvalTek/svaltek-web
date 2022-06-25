<template>
  <div id="navbar-container">
    <b-navbar toggleable="lg" type="dark" sticky>
      <b-navbar-brand href="/"><b>{{ SiteName }}</b></b-navbar-brand>
      <b-navbar-toggle target="nav-collapse">
        <b-icon icon="bars" />
      </b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav id="nav-list">
          <b-nav-item class="nav-list" href="/">Home</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
      <!-- <b-navbar-nav v-if="!$auth.loggedIn" class="ml-auto">
        <b-nav-form right>
          <button
            class="btn btn-outline-success"
            type="button"
            @click="loginUser()"
          >
            <b>LOGIN</b>
          </button>
        </b-nav-form>
      </b-navbar-nav>
      <b-navbar-nav v-else class="ml-auto">
        <img
          :src="userAvaterUrl()"
          style="position: relative; width: 39px; height: 39px; top: 5px"
        />
        <b-nav-item-dropdown :text="$auth.user.username" right>
          <b-dropdown-item href="/account">Account</b-dropdown-item>
          <b-dropdown-item href="/account/settings">Settings</b-dropdown-item>
          <b-dropdown-item href="#" @click="logoutUser()"
            >Logout</b-dropdown-item
          >
        </b-nav-item-dropdown>
      </b-navbar-nav> -->
    </b-navbar>
    <ToastHandler />
  </div>
</template>

<script>
export default {
  name: 'HeaderSection',
  data() {
    return {
      userAvaterUrl() {
        if (this.$auth.loggedIn) {
          return (
            'https://cdn.discordapp.com/avatars/' +
            this.$auth.user.id +
            '/' +
            this.$auth.user.avatar +
            '.png'
          )
        } else {
          return 'https://cdn.discordapp.com/embed/avatars/0.png'
        }
      },
      SiteName: this.$store.state.ProjectName
    }
  },
  mounted() {
    const element = document
      .getElementById('nav-list')
      .getElementsByClassName('nav-item')
    for (let i = 0; i <= element.length - 1; i++) {
      if (
        document.location.href.includes(
          document
            .getElementById('nav-list')
            .getElementsByClassName('nav-link')
            [i].innerHTML.replace(/\n| /g, '')
            .toLowerCase()
        )
      )
        return element[i].classList.add('active')
    }
  },
  methods: {
    logoutUser() {
      this.$auth.logout()
    },
    loginUser() {
      this.$auth.loginWith('discord')
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Hammersmith+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');
/*Background of the nav bar */

:root {
  --background: #0b1622;
  --header: #151f2e;
  --iconcolor: #85b2f7;
}

.navbar-dark {
  background-color: var(--header);
}

.navbar-brand {
  padding-top: 0px;
  padding-bottom: 0px;
}

.nav-head {
  font-family: 'Hammersmith One', sans-serif;
  font-size: 2rem;
  display: none;
}

.active {
  color: rgb(166 168 253);
}

/*Color of the login button */
form.d-flex button {
  font-family: 'Josefin Sans', sans-serif;
  background-color: rgb(121 145 246);
  color: white;
  outline: none;
  border: none;
}

/* Color of the login button on hover */
form.d-flex button:hover {
  background-color: rgb(166 168 253);
}

li {
  font-family: 'Josefin Sans', sans-serif;
  padding-top: 10px;
}

#nav-list {
  transform: none;
}

.nav-link {
  background-color: var(--background);
  padding-right: 10px;
  text-align: center;
  border-radius: 5px;
}

@media (min-width: 992px) {
  .nav-head {
    display: block;
  }

  .nav-link {
    background-color: transparent;
    padding-right: none;
    text-align: left;
    border-radius: none;
  }

  #nav-list {
    transform: translateY(-10%);
  }
}

::-webkit-scrollbar {
  width: 3px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background: #02a9ff;
}
</style>
