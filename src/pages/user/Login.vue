<template>

  <div class="flex justify-center items-center"
       style="height: 90vh">

    <div class="row base-card-shadow"
         style="width: 60vw;min-width: 300px;">
      <div class="col-5 flex justify-center items-center q-pr-lg"
           v-show="$q.screen.gt.sm">
        <q-skeleton type="text"
                    height="70%"
                    width="50%"
                    v-if="!isLottieF" />
        <lottie-web-cimo align="right"
                         style="height: 70%"
                         :path="defaultOptions.path"
                         @isLottieFinish="handleFinish" />
      </div>
      <q-separator vertical
                   class="q-pl-sm"
                   v-if="$q.screen.gt.sm" />
      <div class="col flex justify-center items-center">
        <q-card square
                style="min-width: 290px;height: 100%; width: 100%;"
                class="no-shadow">
          <q-card-section align="center">
            <h3 class="text-uppercase"
                v-show="$q.screen.gt.sm">GuideHub</h3>
            <div class="col-12 flex justify-center items-center"
                 style="height: 30vh"
                 v-show="!$q.screen.gt.sm">
              <lottie-web-cimo align="right"
                               :path="defaultOptions.path"
                               style="height: 30vh"
                               @isLottieFinish="handleFinish" />
            </div>
            <!-- 用户名 -->
            <q-input class="logon-input"
                     clearable
                     standout="bg-cyan text-white"
                     bottom-slots
                     v-model="username"
                     label="账号">
              <template v-slot:prepend>
                <q-icon name="account_circle" />
              </template>
            </q-input>
            <!-- 密码 -->
            <q-input class="logon-input"
                     standout="bg-cyan text-white"
                     bottom-slots
                     v-model="password"
                     label="密码"
                     :type="isPwd ? 'password' : 'text'"
                     hint="">
              <template v-slot:prepend>
                <q-icon name="vpn_key" />
              </template>
              <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd" />
              </template>
            </q-input>

            <!-- 登录按钮 -->
            <q-btn :loading="loading"
                   class="logon-btn bg-logon-card-input"
                   text-color="white"
                   unelevated
                   label=""
                   style="font-size: large;"
                   @click="logon">登 录 系 统
            </q-btn>
            <div class="row justify-between"
                 style="margin-bottom: 20px;">
              <q-btn flat
                     to="/user/forget"
                     label="忘记密码" />
              <q-btn outline
                     to="/user/register"
                     label="我要注册" />
            </div>
            <p class="text-grey"
               align="left">账号2 ：test &nbsp;&nbsp;&nbsp;&nbsp;密码均为空</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>

</template>

<script>
import LottieWebCimo from '../../components/LottieWebCimo/LottieWebCimo'

export default {
  name: 'Logon',
  data() {
    return {
      isPwd: true,
      username: 'admin',
      password: '',
      defaultOptions: {
        path: 'https://assets1.lottiefiles.com/packages/lf20_gzl797gs.json',
        loop: true,
      },
      loading: false,
      percentage: 0,
      isLottieF: false,
    }
  },
  components: { LottieWebCimo },
  methods: {
    logon() {
      this.loading = !this.loading
      if (this.username === 'admin' || this.username === 'test') {
        sessionStorage.setItem('access_token', 972784674)
        sessionStorage.setItem('user_role', this.username)
        const lt = setTimeout(() => {
          this.$router.push('/').then((e) => {
            this.$q.notify({
              icon: 'insert_emoticon',
              message: 'hi，cimo 欢迎回来',
              color: 'green',
              position: 'top',
              timeout: 1500,
            })
            clearTimeout(lt)
            this.loading = !this.loading
          })
        }, Math.random() * 3000)
      } else {
        this.loading = !this.loading
        this.$q.notify({
          icon: 'announcement',
          message: '账号错误',
          color: 'red',
          position: 'top',
          timeout: 1500,
        })
      }
    },
    handleFinish(e) {
      this.isLottieF = e
    },
  },
}
</script>

<style scoped>
.logon-btn {
  font-size: large;
  margin-top: 0px;
  margin-bottom: 20px;
  width: 100%;
}

.bg-logon-card-input {
  background: linear-gradient(to right, #36d1dc 1%, #5b86e5 99%);
  transition: all 0.3s ease-in-out;
  background-size: 200% auto;
}

.bg-logon-card-input:hover {
  background-position: right center;
  box-shadow: 0 12px 20px -11px #5b86e5;
}
</style>
