<template>
  <div class="q-pa-md">
    <q-carousel swipeable
                animated
                vertical
                v-model="slide"
                thumbnails
                infinite
                :autoplay="autoplay"
                v-model:fullscreen="fullscreen"
                arrows
                transition-prev="slide-down"
                transition-next="slide-up"
                @mouseenter="autoplay = false"
                @mouseleave="autoplay = true">
      <q-carousel-slide :name="1"
                        img-src="https://cdn.quasar.dev/img/mountains.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">First stop</div>
          <div class="text-subtitle1">Mountains</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="2"
                        img-src="https://cdn.quasar.dev/img/parallax1.jpg">
        <div class="absolute-bottom custom-caption text-white">
          <div class="text-h2">First stop</div>
          <div class="text-subtitle1">Mountains</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="3"
                        img-src="https://cdn.quasar.dev/img/parallax2.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">First stop</div>
          <div class="text-subtitle1">Mountains</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="4"
                        img-src="https://cdn.quasar.dev/img/quasar.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">First stop</div>
          <div class="text-subtitle1">Mountains</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="5"
                        img-src="https://cdn.quasar.dev/img/quasar.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">First stop</div>
          <div class="text-subtitle1">Mountains</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="6"
                        img-src="https://cdn.quasar.dev/img/quasar.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">First stop</div>
          <div class="text-subtitle1">Mountains</div>
        </div>
      </q-carousel-slide>
      <template v-slot:control>
        <q-carousel-control position="bottom-right"
                            :offset="[18, 18]">
          <q-btn push
                 round
                 dense
                 color="white"
                 text-color="primary"
                 :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
                 @click="fullscreen = !fullscreen" />
        </q-carousel-control>
      </template>
    </q-carousel>
  </div>
  <div>
    <q-card class="my-card"
            flat
            bordered>

      <q-card-section horizontal>
        <q-img class="col"
               height="175px"
               src="https://cdn.quasar.dev/img/mountains.jpg">
          <q-chip square
                  color="red"
                  text-color="white"
                  icon="alarm"
                  label="置顶" />

          <div class="text-subtitle2 absolute-bottom text-left">
            这是一条动态测试
          </div>
        </q-img>
      </q-card-section>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>绝伦N</q-item-label>
          <q-item-label caption>2022/2/11 20:00</q-item-label>
        </q-item-section>
        <q-card-actions align="right">
          <q-btn flat
                 round
                 color="red"
                 icon="favorite" />
          <q-btn flat
                 round
                 color="teal"
                 icon="bookmark" />
          <q-btn flat
                 round
                 color="primary"
                 icon="share" />
        </q-card-actions>
      </q-item>
    </q-card>
    <q-card class="my-card"
            flat
            bordered>

      <q-card-section horizontal>

        <lottie-web-cimo align="right"
                         style="height: 175px;width: 100%"
                         :path="defaultOptions.path"
                         @isLottieFinish="handleFinish">
        </lottie-web-cimo>
      </q-card-section>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>绝伦N</q-item-label>
          <q-item-label caption>2022/2/11 20:00</q-item-label>
        </q-item-section>
        <q-card-actions align="right">
          <q-btn flat
                 round
                 color="red"
                 icon="favorite" />
          <q-btn flat
                 round
                 color="teal"
                 icon="bookmark" />
          <q-btn flat
                 round
                 color="primary"
                 icon="share" />
        </q-card-actions>
      </q-item>
    </q-card>
    加入时间线，展示历史
  </div>
</template>


<script>
import LottieWebCimo from '../components/LottieWebCimo/LottieWebCimo'
export default {
  data() {
    return {
      slide: 1,
      autoplay: true,
      fullscreen: false,
      defaultOptions: {
        path: 'https://assets1.lottiefiles.com/packages/lf20_gzl797gs.json',
        loop: true,
      },
    }
  },
  components: { LottieWebCimo },
}
</script>

<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)
</style>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>