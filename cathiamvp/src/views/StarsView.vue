
<template>
  <div class="home">
    <form class="max-w-md mx-auto" @submit="submitForm">
      <div class="mb-4">
        <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name:</label>
        <input type="text" id="name" v-model="name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div class="mb-4">
        <label for="appearance" class="block text-gray-700 text-sm font-bold mb-2">Appearance:</label>
        <input type="text" id="appearance" v-model="appearance"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div class="mb-4">
        <label for="personalityTraits" class="block text-gray-700 text-sm font-bold mb-2">Personality Traits:</label>
        <textarea id="personalityTraits" v-model="personalityTraits"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
      </div>
      <div class="mb-4">
        <label for="interests" class="block text-gray-700 text-sm font-bold mb-2">Interests:</label>
        <input type="text" id="interests" v-model="interests"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div class="mb-4">
        <label for="styles" class="block text-gray-700 text-sm font-bold mb-2">Styles:</label>
        <input type="text" id="styles" v-model="styles"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <button type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
    </form>
    <div class="grid grid-cols-2">
      <div v-for="(star, index) in stars" :key="index" class="">
        <a :href="`/stars/${star._id}`">
        {{ star.name }}
        {{ star.appearance }}
        {{ star.personalityTraits }}
        {{ star.interests }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import axios from "axios";

export default defineComponent({
  name: 'StarsView',
  setup() {
    const name = ref('');
    const appearance = ref('');
    const personalityTraits = ref('');
    const interests = ref('');
    const styles = ref('');
    const stars = ref([]); // A reactive reference to store the stars

    const submitForm = async (event) => {
      event.preventDefault(); // prevent form submission

      // Create an object with the form data
      const formData = {
        name: name.value,
        appearance: appearance.value,
        personalityTraits: personalityTraits.value,
        interests: interests.value,
        styles: styles.value,
      };
      console.log(formData);
      // Send a POST request to the /stars endpoint
      try {
        const response = await axios.post('/api/stars', { formData });

        // Handle the response
        console.log(response.data);
      } catch (error) {
        // Handle the error
        console.error(error);
      }


    };
    const fetchAllStars = async () => {
      try {
        const response = await axios.get('/api/stars');
        stars.value = response.data; // Assign the response data to the stars ref
      } catch (error) {
        console.error('Error fetching stars:', error);
      }
    };

    onMounted(() => {
      fetchAllStars();
    });

    return {
      name,
      appearance,
      personalityTraits,
      interests,
      styles,
      submitForm,
      stars
    };
  }
});
</script>