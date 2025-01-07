import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const maincontentAppStore = defineStore(
    'maincontent', () => {
        const page = ref(0)
        const pagesize = ref(10)
        const tabtype= ref(1)
        const navigationtype= ref(0)
        const isLoading = ref(false)


        // const loadMore = async () => {
        //     if (isLoading.value) return;

        //     isLoading.value = true;

        //     try {
        //         maincontentllist.value=[...maincontentllist.value,...upcontentItems.value]
        //         page.value += 1;
        //     } catch (error) {
        //         console.error('Error loading more data:', error);
        //     } finally {
        //         isLoading.value = false;
        //     }
        // }

        return {
            // tabtype,
            // navigationtype,
            // maincontentllist,
            // loadMore,
            // page,
            // pagesize,
            // isLoading,
        }
    })