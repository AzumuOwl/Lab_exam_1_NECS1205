<template>
  <div class="app-container">
    <header>
      <h1><span class="icon">📸</span> Nobpadon Gallery</h1>
      <form @submit.prevent="fetchPhotos(true)" class="search-form">
        <input v-model="query" type="text" placeholder="ค้นหารูปภาพ..." :disabled="isLoading" />
        <button type="submit" :disabled="isLoading">
          {{ isLoading ? '🌀 กำลังโหลด' : 'ค้นหาตอนนี้' }}
        </button>
      </form>
    </header>

    <div v-if="error" class="error-msg">{{ error }}</div>

    <main class="gallery-grid">
      <div v-for="photo in photos" :key="photo.id" class="photo-card">
        <div class="image-wrapper" @click="openFullImage(photo.urls.regular)">
          <img :src="photo.urls.small" :alt="photo.alt_description" />
          <div class="overlay">VIEW FULLSCREEN</div>
        </div>

        <div class="photo-info">
          <div class="info-header">
            <p class="photographer">👤 {{ photo.user.name }}</p>
          </div>
          <p class="description">{{ photo.description || 'Wonderful Snapshot' }}</p>

          <button @click="toggleLike(photo.id)" class="like-btn-inline" :class="{ active: photo.isLiked }">
            {{ photo.isLiked ? '❤️' : '🤍' }}
          </button>

        </div>
      </div>
    </main>

    <div class="load-more-container" v-if="photos.length > 0">
      <button @click="fetchPhotos(false)" class="btn-load-more" :disabled="isLoading">
        {{ isLoading ? 'กำลังโหลดเพิ่ม...' : 'โหลดรูปภาพเพิ่มเติม' }}
      </button>
    </div>

    <Transition name="fade">
      <div v-if="fullImageUrl" class="modal" @click="fullImageUrl = null">
        <div class="modal-body" @click.stop>
          <img :src="fullImageUrl" />
          <button class="close-btn" @click="fullImageUrl = null">ปิดหน้าต่าง</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import './style.css';
import { useGalleryLogic } from './logic.js';

const {
  query, photos, isLoading, error, fullImageUrl,
  fetchPhotos, openFullImage, toggleLike
} = useGalleryLogic();
</script>