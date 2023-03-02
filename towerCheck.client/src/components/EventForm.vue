<template>
  <div class="EventForm">
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="name" class="form-label">name</label>
        <input maxlength="5000" minlength="2" required type="text" v-model="editable.name" class="form-control" id="name"
          placeholder="name..." name="name">
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Event description:</label>
        <input maxlength="5000" minlength="2" required type="text" v-model="editable.description" class="form-control"
          id="description" placeholder="description..." name="description">
      </div>

      <div class="mb-3">
        <label for="location" class="form-label">Event location:</label>
        <input maxlength="5000" minlength="2" required type="text" v-model="editable.location" class="form-control"
          id="location" placeholder="location..." name="location">
      </div>
      <div class="mb-3">
        <label for="capacity" class="form-label">Capacity:</label>
        <input required type="number" v-model="editable.capacity" class="form-control" id="capacity"
          placeholder="capacity..." name="capacity">
      </div>
      <div class="form-group">
        <label for="startDate">Start date:</label>
        <input type="startDate" class="form-control" id="startDate" name="startDate">
      </div>

      <div class="mb-3">
        <label for="coverImg" class="form-label">Event image:</label>
        <input required type="text" v-model="editable.coverImg" class="form-control" id="coverImg"
          placeholder="coverImg..." name="coverImg">
      </div>
      <div class="mb-3">
        <label for="type" class="form-label">Event type</label>
        <select name="type" id="type" v-model="editable.type">
          <option v-for="t in type" :value="t" class="text-capitalize">{{ t }}</option>
        </select>
      </div>

      <div>
        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">
          {{ editable.id ? 'Save Changes' : 'Post event' }}
        </button>
      </div>
    </form>

  </div>
</template>


<script>
import { AppState } from "../AppState.js";
import { ref } from "vue";
import { router } from "../router.js";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const editable = ref({ ...AppState.event })
    return {
      editable,
      type: ['concert', 'convention', 'sport', 'digital'],
      async handleSubmit() {
        try {
          const event = editable.value.id
            ? await eventsService.changeEvent(editable.value)
            : await eventsService.createEvent(editable.value)
          editable.value = {}
          if (event?.id) {
            router.push({ name: 'EventDetails', params: { eventId: event.id } })
          }

        } catch (error) {
          Pop.error(error, 'failed event submission')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>