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


    </form>

  </div>
</template>


<script>
export default {
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped></style>