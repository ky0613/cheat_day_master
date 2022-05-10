<template>
  <div
    class="fixed w-full h-full top-0 left-0 outline-none overflow-x-hidden overflow-y-auto rounded-md flex justify-center bg-black bg-opacity-50"
    @click.self="isCloseModal"
  >
    <div class="w-3/4 h-3/4 pointer-events-none rounded-md my-16">
      <div
        class="border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
      >
        <div
          class="modal-header flex flex-shrink-0 items-center p-2 justify-between border-b border-gray-200 rounded-t-md bg-orange-300"
        >
          <h5 class="text-3xl font-medium leading-normal text-gray-800">
            このサービスについて
          </h5>
          <button
            type="button"
            class="btn-close box-content my-auto p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline text-4xl"
            @click="isCloseModal"
          >
            ×
          </button>
        </div>
        <div class="modal-body relative p-4">
          <h5 class="text-2xl">チートデイとは？</h5>
          <hr class="my-2" />
          <p>
            チートデイを日本語に訳すと「騙す日」という意味になります。<br />
            人の体はダイエットなどで減量が続くと、体重が落ちることを危険と判断して省エネな体になります。<br />
            そういった状態になった体を大量の摂取カロリーで文字通り「騙す」ことで、体の省エネ化を解除し、<br />
            以降の減量につなげるための１日のことをチートデイと言います。
          </p>
          <h5 class="text-2xl mt-4">ログイン後の機能について</h5>
          <hr class="my-2" />
          <h6 class="text-xl">1. ブックマーク</h6>
          <hr class="my-2" />
          <p class="text-center mb-2">
            検索結果の各カードにブックマークボタンが追加され、<br />
            ブックマーク機能がご利用いただけるようになります。
          </p>
          <img
            src="../../../public/bookmarkimage.png"
            alt="mockup"
            class="w-3/4 h-auto mx-auto"
          />
          <hr class="my-2" />
          <h6 class="text-xl">2. 通販ジャンル選択</h6>
          <hr class="my-2" />
          <p class="text-center mb-2">
            自宅でチートデイの現在地入力画面でジャンルを選択できるようになります。<br />
            ジャンルも多岐に渡りますので、是非お楽しみください！
          </p>
          <img
            src="../../../public/select.png"
            alt="mockup"
            class="w-3/4 h-auto mx-auto border border-orange-300"
          />
        </div>
        <div
          class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md bg-orange-300"
        >
          <button
            type="button"
            class="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
            @click="isCloseModal"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    isCloseModal() {
      this.$emit("close-modal");
    },
  },
  mounted: {},
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Yomogi&display=swap");
p,
button,
h5,
h6 {
  font-family: "Yomogi", cursive;
}
</style>
