import { ref } from 'vue';

export function useGalleryLogic() {
    const query = ref('');
    const photos = ref([]);
    const isLoading = ref(false);
    const page = ref(1); // เพิ่มตัวแปรหน้า

    const ACCESS_KEY = ' ใส่ Access_key ของ unsplash.com ';

    const fetchPhotos = async (isNewSearch = true) => {
        if (!query.value.trim()) return;

        if (isNewSearch) {
            photos.value = []; // ถ้าค้นหาใหม่ให้ล้างรูปเก่า
            page.value = 1;
        }

        isLoading.value = true;
        try {
            const response = await fetch(
                `https://api.unsplash.com/search/photos?query=${query.value}&per_page=6&page=${page.value}&client_id=${ACCESS_KEY}`
            );
            const data = await response.json();

            // เอาของใหม่ไปต่อท้ายของเดิม (Spread Operator)
            photos.value = [...photos.value, ...data.results.map(p => ({ ...p, isLiked: false }))];
            page.value++; // เตรียมหน้าถัดไป
        } catch (err) {
            console.error(err);
        } finally {
            isLoading.value = false;
        }
    };

    const toggleLike = (id) => {
        const photo = photos.value.find(p => p.id === id);
        if (photo) photo.isLiked = !photo.isLiked;
    };

    return { query, photos, isLoading, fetchPhotos, toggleLike };
}
