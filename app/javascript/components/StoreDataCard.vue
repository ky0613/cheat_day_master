<template>
  <div>
    <Carousel :perPage="this.perPage" :paginationPadding="4">
      <Slide
        v-for="(store, index) of stores"
        :key="store.store_id"
        class="px-2 my-3"
      >
        <div
          class="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 w-full"
        >
          <a
            :href="`https://maps.google.co.jp/maps?q=place_id:${store.store_id}`"
            target="_blank"
          >
            <img
              class="object-cover object-center w-full h-56"
              :src="store.img_url"
              alt="avatar"
            />
          </a>
          <div class="p-2">
            <div v-if="wayPoint" class="text-l font-semibold text-center">
              {{ index + 1 }}店舗目
            </div>
            <div
              class="flex items-center mt-4 text-gray-700 dark:text-gray-200 h-10"
            >
              <img src="../../../public/shop.svg" class="w-5 h-5" />
              <p class="px-2 text-l font-semibold text-center">
                {{ store.name }}
              </p>
            </div>
            <div
              class="flex items-center mt-4 text-gray-700 dark:text-gray-200 h-6"
            >
              <img src="../../../public/place.svg" class="w-5 h-5" />
              <p class="px-2 text-sm">{{ store.address }}</p>
            </div>
            <div
              class="flex items-center mt-4 text-gray-700 dark:text-gray-200"
            >
              <StarRating
                :increment="0.1"
                :round-start-rating="false"
                :read-only="true"
                :rating="store.rating"
                :star-size="25"
                class="items-center text-base"
              ></StarRating>
              <p class="px-2 text-base items-center jus">
                ({{ store.total_ratings }})
              </p>
              <div v-if="authUser" class="text-right">
                <img
                  src="../../../public/bookmark_added_black_24dp.svg"
                  alt="bookmark"
                  v-if="existStore(store)"
                  @click="removeStore(store)"
                />
                <img
                  src="../../../public/bookmark_add_black_24dp.svg"
                  alt="bookmark"
                  v-else
                  @click="addStore(store)"
                />
              </div>
            </div>
          </div>
        </div>
      </Slide>
    </Carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import StarRating from "vue-star-rating";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Carousel,
    Slide,
    StarRating,
  },
  data() {
    return {
      // existStore: false,
    };
  },
  props: {
    perPage: {
      type: Number,
      required: true,
    },
    stores: {
      type: Array,
    },
    wayPoint: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(["savedStores", "authUser"]),
  },
  created() {
    this.fetchStores();
  },
  methods: {
    ...mapActions(["fetchStores", "addStore", "deleteStore"]),
    existStore(store) {
      const check = (savedStore) => {
        return (
          savedStore.store_id === store.store_id &&
          savedStore.store_type === store.store_type
        );
      };
      return this.savedStores.some(check);
    },
    removeStore(store) {
      const removeStore = this.savedStores.find(
        (savedStore) =>
          savedStore.store_id === store.store_id &&
          savedStore.store_type === store.store_type
      );
      this.deleteStore(removeStore.id);
    },
  },
};
</script>
