<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img alt="logo" src="../assets/img/logo.png" height="45" />
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li v-if="account?.id" class="m-2">
          <button data-bs-toggle="modal" data-bs-target="#event-form" class="btn btn-outline-light mdi mdi-plus-box">Post
            a new event!</button>
        </li>
        <li v-if="account?.id" class="m-2">
          <router-link :to="{ name: 'Account' }" class="btn btn-outline-light lighten-30 selectable text-uppercase ">
            My Account
          </router-link>
        </li>
        <!-- <li class="m-2">
          <router-link :to="{ name: 'About' }" class="btn text-success lighten-30 selectable text-uppercase">
            About
          </router-link>
        </li> -->



        <li class="m-2">
          <Login />

        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
    </div>
    <Modal id="event-form" modal-title="Post an event:">
      <EventForm />
    </Modal>

  </nav>
</template>

<script>
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";
import EventForm from "./EventForm.vue";
import Login from './Login.vue';
import Modal from "./Modal.vue";
import { computed } from 'vue';


export default {
  setup() {
    const route = useRoute()
    return {
      route,
      account: computed(() => AppState.account),
      event: computed(() => AppState.event),


    }
  },
  components: { Login, EventForm, Modal }
}


</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
