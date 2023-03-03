<template>
  <div v-if="event" class="EventDetails">
    <div class="container">
      <div class="row glassCard rounded p-3 m-1">
        <div class="col-5 d-flex flex-row">
          <img class="p-2 img-fluid rounded event-img" :src="event.coverImg" :alt="event.name + ' picture'">
        </div>
        <div class="col-7 d-flex flex-column justify-content-between ">
          <h3 class="ps-1">{{ event.name }}</h3>
          <h5 class="ps-3">{{ event.description }}</h5>
          <div class="d-flex flex-row justify-content-between mt-4">
            <div class="col-7">
              <p><b>Location: {{ event.location }}</b></p>
              <p><b>Tickets remaining: {{ event.capacity }}</b></p>
            </div>
            <div class="col-md-4">
              <p><b>Opening day: {{ new Date(event.startDate).toLocaleDateString(en - us) }}</b></p>
              <p><b>Event: {{ event.type }}</b></p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { AppState } from "../AppState.js";
import { attendeesService } from "../services/AttendeesService.js";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";
import { watchEffect } from "vue";

export default {

  setup() {
    const route = useRoute()
    const router = useRouter()

    async function getEventById() {
      const eventId = route.params.eventId
      try {
        await eventsService.getEventById(eventId)
      } catch (error) {
        Pop.error('Event not found, sending back to home')
        router.push('/')
      }
    }
    async function getTicketsByEventId() {
      if (tickets.length) {
        const eventId = route.params.eventId
        try {
          await attendeesService.getTicketsByEventId()
        } catch (error) {
          Pop.error(error)
        }
      }

    }

    watchEffect(() => {
      getEventById()
    })

    return {
      // tickets: computed(() => AppState.attendee),
      event: computed(() => AppState.event)
    }
  }
}
</script>


<style lang="scss" scoped>
h3 {
  color: darkgoldenrod;
  text-shadow: 1px 1px 2px black;
}

h5 {
  color: gray;

}

.glassCard {
  background-color: rgba(28, 236, 174, 0.082);
}

.event-img {}
</style>