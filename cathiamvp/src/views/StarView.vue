
<template>
  <div class="container mx-auto">
    <h1 class="text-2xl">Star View</h1>
    <router-link to="/stars">Back to Stars</router-link>
    <div class="">
      <div v-if="star" class="border border-black mx-auto">
        <h3 class="text-lg font-bold">Info</h3>
        <div>Name: {{ star.name }}</div>
        <div>Appearance: {{ star.appearance }}</div>
        <div>Personality Traits: {{ star.personalityTraits }}</div>
        <div>Interests: {{ star.interests }}</div>
        <div>Styles: {{ star.styles }}</div>
      </div>
      <div>
        <h3 class="text-lg font-bold">Connections</h3>
        <div v-if="connections">
          <div v-for="(string, index) in connections" :key="index" class="">
            Connections Here
          </div>
        </div>
        <div v-else>
          No connections yet
        </div>

      </div>
      <div>
        <h3 class="text-lg font-bold">Chat</h3>
        <div>
          Chat Log</div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import axios from "axios";
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'StarView',
  setup() {
    const route = useRoute();
    const star = ref(null); // A reactive reference to store the star details
    const connections = ref(null); // A reactive reference to store the star's connections
    const chat = ref(null); // A reactive reference to store the star's chat

    const fetchStar = async () => {
      console.log(route.params.id);
      console.log('fetching star');
      try {
        const response = await axios.get(`/api/stars/${route.params.id}`);
        star.value = response.data;
      } catch (error) {
        console.error('Error fetching star:', error);
      }
    };

    onMounted(() => {
      fetchStar();
    });

    return {
      star,
      connections,
      chat,
    };
  }
});
</script>