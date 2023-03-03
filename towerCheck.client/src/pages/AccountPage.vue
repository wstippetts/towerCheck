<template>
  <div class="about text-start">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>

  <div class="container">
    <div class="row">
      {{ myTickets }}

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



    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
