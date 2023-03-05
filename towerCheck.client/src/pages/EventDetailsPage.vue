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

              <p v-if="!event.isCanceled"><b>Tickets remaining: {{ event.capacity }}</b></p>
            </div>
            <div v-if="!event?.isCanceled" class="col-md-4">
              <p><b>Opening day: {{ new Date(event.startDate).toLocaleDateString('en-us') }}</b></p>
              <p><b>Event: {{ event.type }}</b></p>
            </div>
            <div v-else="event.isCanceled" class="me-5">
              <h1 class="canceled">CANCELED</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center" v-if="guest.length">
        <div class="col-12 glassCard rounded m-4 p-2 d-flex justify-content-start">
          <h2 class="p-3 m-3">Attendees:</h2>
          <div v-for="p in guest" class="img-fluid rounded ">
            <img class="profilePic elevation-4" :src="p.profile?.picture">
            <h6>{{ p.profile?.name }}</h6>

          </div>


        </div>
      </div>

    </div>

  </div>
  <div>
    <button v-if="!attending && event?.capacity > 0 && event?.isCanceled == false" @click="createTicket()"
      :disabled="event?.isCanceled" class="btn btn-success">
      <i class="mdi mdi-heart"></i>
      <br>
      <b>Print ticket</b>
    </button>
    <button v-if="attending" @click="returnTicket(attending.ticketId)" :disabled="event?.isCanceled"
      class="btn btn-outline-danger">
      <i class="mdi mdi-heart"></i>
      <br>
      <b>Refund ticket</b>
    </button>
    <button @click="cancelEvent(event.id)" v-if="event?.creatorId == account.id" class="btn btn-danger ms-4"
      :disabled="event?.isCanceled">
      <i class="mdi mdi-close-circle text-dark"></i>
      Cancel event
    </button>
    <!-- <button v-if="account?.id == event?.creatorId" @click="eventsService.changeEvent(event.isCanceled = true)"
      :disabled="event?.isCanceled" class="btn btn-outline-danger">
      <i class="mdi mdi-heart"></i>
      <br>
      <b>Cancel event</b>
    </button> -->

  </div>

  <div class="row">
    <div class="col-md-9">
      <form @submit.prevent="postComment()">
        <textarea class="textbox m-3" v-model="formData.newPost.body" placeholder="whats on your mind?" name="body"
          id="body" rows="10"> </textarea>
        <button type="submit" class=" btn btn-outline-primary">
          <b>Post</b>
        </button>
      </form>

    </div>
  </div>
  <div class="row justify-content-center">

    <div class="col-8">

      <CommentCard />
    </div>
  </div>
</template>


<script>
import { computed, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { AppState } from "../AppState.js";
import { attendeesService } from "../services/AttendeesService.js";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";
import { watchEffect, onMounted } from "vue";
import { logger } from "../utils/Logger.js";
import CommentCard from "../components/CommentCard.vue";

export default {
  setup() {
    const formData = reactive({
      newPost: {
        body: ""
      }
    });
    const route = useRoute();
    const router = useRouter();
    const event = getEventById();


    async function getEventById() {
      try {
        const eventId = route.params.eventId
        await eventsService.getEventById(eventId);
      } catch (error) {
        Pop.error("Event not found, sending back to home");
        router.push("/");
      }
    }
    async function getTicketsByEventId() {
      const eventId = route.params.eventId;
      try {
        await attendeesService.getTicketsByEventId(eventId);
      }
      catch (error) {
        Pop.error(error);
      }
    }
    async function getCommentsByEventId() {
      try {
        const eventId = route.params.eventId;
        await eventsService.getCommentsByEventId(eventId);
      }
      catch (error) {
        Pop.error(error);
      }
    }
    onMounted(() => {

    })
    watchEffect(() => {
      if (route.params.eventId) {
        getEventById();
        getTicketsByEventId();
        getCommentsByEventId();

      }
    });
    return {
      guest: computed(() => AppState.ticket),
      event: computed(() => AppState.event),
      eventTicket: computed(() => AppState.myTickets.find(t => t.creatorId == AppState.account.id)),
      attending: computed(() => AppState.myTickets.find(e => e.id == route.params.eventId)),
      account: computed(() => AppState.account),
      formData,
      clearForm() {
        formData.newPost = {
          body: ""
        };
      },
      async postComment() {
        try {
          await eventsService.postComment(this.formData.newPost, route.params.eventId);
          this.clearForm();
        }
        catch (error) {
          Pop.error(error);
        }
      },
      async createTicket() {
        try {
          await attendeesService.createTicket({ eventId: route.params.eventId });
        }
        catch (error) {
          logger.error(error);
          Pop.error(error);
        }
      },
      async returnTicket(eventTicketId) {
        try {
          if (await Pop.confirm("are you sure you dont want to go to this event!???")) {
            await attendeesService.returnTicket(eventTicketId);
          }
        }
        catch (error) {
          logger.error(error);
          Pop.error(error);
        }
      },

      async cancelEvent(eventId) {
        try {
          if (await Pop.confirm('do you want to cancel this even?')) {
            await eventsService.cancelEvent(eventId)
          }
        } catch (error) {
          Pop.error(error)
        }
      }
    };
  },
  components: { CommentCard }
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
  overflow: auto;
}

.profilePic {
  height: 5vh;
  margin: 7px;
  border-radius: 50%;
}

.canceled {
  color: red;
  box-shadow: 2px 2px 4px black;

}
</style>