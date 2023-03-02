<template>
  <div class="EventDetails">
    <div v-for="ticket in tickets">
      <img class="rounded" :src="ticket.profile.picture">
    </div>

  </div>
</template>


<script>
import { onMounted, computed, watchEffect } from 'vue';
import Pop from "../utils/Pop.js"
import { attendeesService } from "../services/AttendeesService.js";
import { eventsService } from "../services/EventsService.js";
import { AppState } from "../AppState.js";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()

    async function getTicketsByEventId() {
      const eventId = route.params.eventId
      try {
        await attendeesService.getTicketsByEventId(eventId)
      } catch (error) {
        Pop.error(error)
      }
    }
    async function getEventById() {
      const eventId = route.params.eventId
      try {
        await eventsService.getEventById(eventId)
      } catch (error) {
        Pop.error(error)
      }
    }
  }
}

onMounted(() => {

  getTicketsByEventId()
  getEventById()
  // getCommentsByEventId()

})
return {
  // tickets: computed(()=> )
}


</script>


<style lang="scss" scoped></style>

