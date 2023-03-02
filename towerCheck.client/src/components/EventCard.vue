<template>
  <router-link class="text-light selectable" :to="{ name: 'EventDetails', params: { eventId: event.id } }">
    <div class="EventCard card my-3">
      <img :src="event.coverImg" alt="">
      <div class="card-body text-center">
        <p class="mb-0">
          <b>{{ event.name }}</b>
        </p>

      </div>
    </div>
  </router-link>
</template>


<script>
import { Event } from "../models/Event.js";
export default {
  props: {
    event: { type: Event, required: true }
  },
  setup() {

    return {}
  }
}
</script>


<style lang="scss" scoped>
.EventCard {
  height: 40vh;
  overflow: hidden;
  // text-shadow: 0 0 2px ;
  color: darkgoldenrod;
  letter-spacing: .07rem;
  background-color: darkblue;

  img {
    height: 30vh;
    object-fit: cover;
    object-position: bottom;
  }
}
</style>