<template>
  <div class="container">
    <div class="separator"><!-- Next section content --></div>

    <div v-if="loading" class="loading">
      <img alt="kwotes logo" class="logo center" src="~/assets/animations/animated-app.gif" width="90" height="90" />
      <p>Loading...</p>
    </div>

    <div v-else class="content">
      <img alt="kwotes logo" class="logo center" src="~/assets/icons/app-icon.png" width="64" height="64" />

      <div class="hero-quote">
        <h2 class="name" :class="{ small: heroQuote?.name.length > 100 }">{{ heroQuote?.name }}</h2>
        <h1>•</h1>
        <p class="author">{{ heroQuote?.author.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
const loading = ref(false)
const error = ref("")
const heroQuote: Ref<any> = ref(null)
const quotes: Ref<any[]> = ref([])


async function fetchData() {
  loading.value = true

  try {
    const response = await fetch('https://us-central1-memorare-98eee.cloudfunctions.net/api/v1/quotes?orderBy=created_at&order=desc', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.KWOTES_API_KEY || '1TmRZgvB35ThTdBlXjQH,hmgUVFyZcCKCr7DouGolSQ==,k=1',
      },
    })
    const data = await response.json()

    for (const quote of data.response.quotes) {
      quotes.value.push(quote)
    }

    heroQuote.value = data.response.quotes[0]
  } catch (err) {
    error.value = "error"
  } finally {
    loading.value = false
  }
}

fetchData()

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 0rem auto;
  max-width: 90%;
  width: 90%;
  height: 100vh;
}

.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    margin-top: 1rem;
    font-size: 1rem;
    font-weight: 400;
    text-transform: uppercase;
    text-align: center;
  }
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-quote {
  margin-bottom: 2rem;
  font-weight: 600;
  text-align: center;
  font-family: "Poetsen One";

  .name {
    font-size: 4rem;
  }

  .name.small {
    font-size: 2rem;
  }

  .author {
    font-size: 1rem;
    font-weight: 400;
    font-family: "Rubik";
    margin-top: 1.0rem;
  }
}

.quote {
  margin-bottom: 1rem;
}

.title {
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
}
</style>
