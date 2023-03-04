<template>
  <div v-for="post in comments">

    <div class="component">
      <div class="card-body d-flex justify-content-between m-4 glassCard">
        <div>
          <h5 class="card-title m-3">{{ post.creator.name }}</h5>
          <!-- <span v-if="post.updatedAt && post.updatedAt != post.createdAt" class="">last update: {{ post.updatedAt }}</span> -->
          <h5 class="fs-3 m-3">{{ post.body }}</h5>
        </div>
        <div class="d-flex flex-column">
          <button @click="like(post)" class="mb-2">
          </button>
          <img :src="post.creator.picture" :alt="post.creator.name" class="profile-picture">
          <!-- TODO NEED TO FIX DELETE -->
          <button v-if="account?.id == post.creator?.id" class="mdi mdi-delete rounded text-danger"
            @click="removePost(post.id)">DELETE</button>
          <!-- <button v-if="account.id === post.creatorId" class="mdi mdi-hamburger rounded text-secondary"
            @click="editPost(post)"></button> -->

        </div>

      </div>

    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState.js";
import { computed } from "vue";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";
export default {
  setup() {
    return {
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),

      async removePost(postId) {
        try {
          if (await Pop.confirm('are you sure you want to delete your post')) {
            await eventsService.removeComment(postId)
          }
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.profile-picture {
  height: 10vh;
  width: 10vh;
  border-radius: 50%;
  box-shadow: 2px 2px 4px black;
}

.glassCard {
  background-color: rgba(28, 236, 174, 0.082);
  overflow: auto;
}
</style>