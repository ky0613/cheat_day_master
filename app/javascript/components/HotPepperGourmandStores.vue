<template>
  <div class="p-6 flex justify-between">
    <div
      class="mx-2 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 w-full"
      v-for="store of stores"
      :key="store.id"
    >
      <a class="bg-blue-300 w-full" :href="store.urls.pc">
        <img
          class="object-cover object-center w-full h-56"
          :src="store.photo.pc.l"
          alt="avatar"
        />
      </a>
      <div class="p-1">
        <div
          class="flex flex-col items-center mt-4 text-gray-700 dark:text-gray-200"
        >
          <a
            class="px-2 text-l font-semibold text-center"
            :href="store.urls.pc"
            >{{ store.name }}</a
          >
        </div>
        <div
          class="flex flex-col items-center mt-4 text-gray-700 dark:text-gray-200"
        >
          <p class="px-2 text-sm">営業時間</p>
          <p class="px-2 text-sm">{{ store.open }}</p>
        </div>
        <div
          class="flex flex-col items-center mt-4 text-gray-700 dark:text-gray-200"
        >
          <p class="px-2 text-sm">住所</p>
          <p class="px-2 text-sm">{{ store.address }}</p>
        </div>
      </div>
      <div class="flex-1 h-auto">
        <a
          href="http://webservice.recruit.co.jp/"
          class="flex flex-col p-2 items-end relative"
          ><img
            src="http://webservice.recruit.co.jp/banner/hotpepper-s.gif"
            alt="ホットペッパー Webサービス"
            width="135"
            height="17"
            border="0"
            title="ホットペッパー Webサービス"
            class="mt-auto"
        /></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stores: {
      type: Array,
      required: true,
    },
  },
};
</script>
