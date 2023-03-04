<template>
  <div class="list-group-item dropdown-item list-group-item-action text-danger selectable" @click="logout">
    <i class="mdi mdi-logout"></i>
    logout
  </div>
  <div class="about text-start">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>

  <div v-for="myTickets in myTickets">
    <div class="container">
      <div class="row">
        <div class="EventCard card my-3">
          <img :src="myTickets.coverImg" alt="">
          <div class="card-body text-center">
            <p class="mb-0">
              <b>{{ myTickets.name }}</b>
              <b>{{ myTickets.location }}</b>
            </p>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, } from 'vue';
import { useRoute, } from "vue-router";
import { AppState } from "../AppState.js";
import { attendeesService } from "../services/AttendeesService.js";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { AuthService } from "../services/AuthService.js";

export default {
  setup() {
    const route = useRoute()
    async function getMyEventTickets() {
      try {
        attendeesService.getMyEventTickets()
      } catch (error) {
        Pop.error(error)
        logger.error(error)
      }
    }
    //attending events
    // async function getmyEvents() {
    //   try {
    //     eventsService.getMyEvents()

    //   } catch (error) {
    //     Pop.error(error)
    //     logger.log(error)
    //   }

    // }

    onMounted(() => {
      getMyEventTickets()
      // getmyEvents()
    })
    return {
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets),
      myEvents: computed(() => AppState.myEvents),

      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }

    }
  }
}
</script>

<style scoped>
.EventCard {
  height: 40vh;
  overflow: hidden;
  /* text-shadow: 0 0 2px; */
  color: rgb(255, 255, 255);
  letter-spacing: .07rem;
  background-color: rgba(86, 190, 91, 0.13);

}

img {
  max-width: 100px;
}
</style>
