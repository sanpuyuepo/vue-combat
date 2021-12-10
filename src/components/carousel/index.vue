<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";

export default {
  name: "Carousel",
  data() {
    return {};
  },
  props: ["list"],
  watch: {
    list: {
      immediate: true,
      handler() {
        // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新
        // 可以保证页面中的结构一定是有的，经常和很多插件一起使用（一般来说插件的使用都需要DOM存在才能使用）
        this.$nextTick(() => {
          new Swiper(this.$refs.mySwiper, {
            // vm.$refs 一个对象，持有注册过 ref attribute 的所有 DOM 元素和组件实例。
            loop: true, // 循环模式选项
            autoplay: true, // 自动播放

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style scoped></style>
