<template>
  <q-layout view="lHh Lpr fff"
            class="bg-grey-1">
    <q-header elevated
              class="bg-white text-grey-8"
              height-hint="64">
      <q-toolbar class="GPL__toolbar"
                 style="height: 64px">
        <q-btn flat
               dense
               round
               @click="toggleLeftDrawer"
               aria-label="Menu"
               icon="menu"
               class="q-mx-md" />
        <!-- 标题 -->
        <q-toolbar-title v-if="$q.screen.gt.sm"
                         shrink
                         class="row items-center no-wrap">

          <img src="https://cdn.quasar.dev/img/layout-gallery/logo-google.svg">
          <router-link style="text-decoration: none;"
                       to="/"> <span class="q-ml-sm">GuideHub</span></router-link>

        </q-toolbar-title>

        <q-space />
        <!-- 热点搜索 -->
        <q-select ref="search"
                  dense
                  standout
                  use-input
                  hide-selected
                  class="GL__toolbar-select"
                  color="accent"
                  :stack-label="false"
                  label="探索"
                  v-model="text"
                  :options="filteredOptions"
                  @filter="filter"
                  style="width: 50%">

          <template v-slot:append>
            <img src="https://cdn.quasar.dev/img/layout-gallery/img-github-search-key-slash.svg">
          </template>

          <template v-slot:no-option>
            <q-item>
              <q-item-section>
                <div class="text-center">
                  <q-spinner-pie color="grey-5"
                                 size="24px" />
                </div>
              </q-item-section>
            </q-item>
          </template>

          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps"
                    :to="scope.opt.href"
                    class="GL__select-GL__menu-link">
              <q-item-section side>
                <q-icon name="collections_bookmark" />
              </q-item-section>
              <q-item-section>
                <q-item-label v-html="scope.opt.label" />
              </q-item-section>
              <q-item-section side
                              :class="{ 'default-type': !scope.opt.type }">
                <q-btn outline
                       dense
                       no-caps
                       text-color="blue-grey-5"
                       size="12px"
                       class="bg-grey-1 q-px-sm">
                  {{ scope.opt.type || '跳转' }}
                  <q-icon name="subdirectory_arrow_left"
                          size="14px" />
                </q-btn>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <!-- 导航右侧 -->
        <!-- 发布 -->
        <q-btn v-if="$q.screen.gt.xs"
               flat
               dense
               no-wrap
               color="primary"
               icon="add"
               no-caps
               label="Create"
               class="q-ml-sm q-px-md">
          <q-menu anchor="top end"
                  self="top end">
            <q-list class="text-grey-8"
                    style="min-width: 100px">
              <q-item aria-hidden="true">
                <q-item-section class="text-uppercase text-grey-7"
                                style="font-size: 0.7rem">发布</q-item-section>
              </q-item>
              <q-item v-for="menu in createMenu"
                      :key="menu.text"
                      :to="menu.href"
                      clickable
                      v-close-popup
                      aria-hidden="true">
                <q-item-section avatar>
                  <q-icon :name="menu.icon" />
                </q-item-section>
                <q-item-section>{{ menu.text }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-btn v-if="$q.screen.gt.xs"
               flat
               dense
               no-wrap
               color="primary"
               icon="cloud_upload"
               no-caps
               label="Upload"
               class="q-ml-sm q-px-md" />

        <q-space />
        <!-- 通知 -->
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round
                 flat
                 size="sm"
                 color="grey-8"
                 icon="notifications_none"
                 @click="openMessage">
            <q-badge color="negative"
                     style="padding: 2px 4px"
                     title-color="white"
                     floating
                     v-if="totalInformCount > 0">{{ totalInformCount }}
            </q-badge>
          </q-btn>
          <!-- 头像 -->
          <q-btn round
                 flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
        <div>
          <q-menu :offset="[0, 36]"
                  transition-show="jump-down"
                  transition-hide="jump-up"
                  content-style="width: 400px;"
                  max-height="800px"
                  v-model="showMessage">
            <div>
              <q-card class="full-width">
                <q-tabs v-model="messageTab"
                        class="text-grey"
                        active-color="primary"
                        indicator-color="primary"
                        align="justify"
                        narrow-indicator>
                  <q-tab name="informs">
                    <span v-if="informCount > 0">
                      通知({{ informCount }})
                    </span>
                    <span v-else>通知(暂无新内容)</span>
                  </q-tab>
                  <q-tab name="notifies">
                    <span v-if="notifiesCount > 0">
                      私信({{ notifiesCount }})
                    </span>
                    <span v-else>私信(暂无新内容)</span>
                  </q-tab>
                  <q-tab name="waitDeals">
                    <span v-if="waitDealCount > 0">
                      其他({{ waitDealCount }})
                    </span>
                    <span v-else>其他(0)</span>
                  </q-tab>
                </q-tabs>
                <q-separator />
                <q-tab-panels v-model="messageTab"
                              animated>
                  <q-tab-panel name="informs"
                               class="q-pa-none">
                    <q-list>
                      <div v-for="(inform, index) in informs"
                           v-bind:key="index"
                           @click="look('inform', index)">
                        <q-item class="cursor-pointer q-ma-xs"
                                :disable="inform.disable">
                          <q-item-section avatar>
                            <q-avatar :color="inform.color"
                                      :text-color="inform.textColor"
                                      :icon="inform.icon" />
                          </q-item-section>
                          <q-item-section class="q-gutter-xs">
                            <q-item-label :lines="1">
                              {{ inform.title }}
                            </q-item-label>
                            <q-item-label caption>
                              {{ inform.desc }}
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-separator v-if="index < informs.length - 1"
                                     inset="item" />
                      </div>
                      <q-separator />
                      <q-item class="row q-pa-none text-center cursor-pointer">
                        <q-item-section class="col q-pa-none q-ma-none">
                          <q-btn label="清空"
                                 flat
                                 :ripple="{ color: 'info' }"
                                 class="q-ma-none full-width full-height no-border-radius"
                                 @click="clearMessage('informs')"></q-btn>
                        </q-item-section>
                        <q-separator vertical />
                        <q-item-section class="col q-pa-none q-ma-none">
                          <q-btn label="查看更多"
                                 flat
                                 :ripple="{ color: 'info' }"
                                 class="q-ma-none full-width full-height no-border-radius"
                                 @click="lookMore('通知')"></q-btn>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-tab-panel>
                  <q-tab-panel name="notifies"
                               class="q-pa-none">
                    <q-list>
                      <div v-for="(notify, index) in notifies"
                           v-bind:key="index"
                           @click="look('notify', index)">
                        <q-item class="cursor-pointer q-ma-xs"
                                :disable="notify.disable">
                          <q-item-section avatar>
                            <q-avatar :color="notify.color"
                                      :text-color="notify.textColor"
                                      :icon="notify.icon" />
                          </q-item-section>
                          <q-item-section class="q-gutter-xs">
                            <q-item-label :lines="1">
                              {{ notify.title }}
                            </q-item-label>
                            <q-item-label caption>
                              {{ notify.desc }}
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-separator v-if="index < informs.length - 1"
                                     inset="item" />
                      </div>
                      <q-separator />
                      <q-item class="row q-pa-none text-center cursor-pointer">
                        <q-item-section class="col q-pa-none q-ma-none">
                          <q-btn label="清空消息"
                                 flat
                                 :ripple="{ color: 'info' }"
                                 class="q-ma-none full-width full-height no-border-radius"
                                 @click="clearMessage('notifies')"></q-btn>
                        </q-item-section>
                        <q-separator vertical />
                        <q-item-section class="col q-pa-none q-ma-none">
                          <q-btn label="查看更多"
                                 flat
                                 :ripple="{ color: 'info' }"
                                 class="q-ma-none full-width full-height no-border-radius"
                                 @click="lookMore('查看消息')"></q-btn>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-tab-panel>
                  <q-tab-panel name="waitDeals"
                               class="q-pa-none">
                    <q-list>
                      <div v-for="(waitDeal, index) in waitDeals"
                           v-bind:key="index"
                           @click="look('waitDeal', index)">
                        <q-item class="cursor-pointer q-ma-xs"
                                :disable="waitDeal.disable">
                          <q-item-section avatar>
                            <q-avatar :color="waitDeal.color"
                                      :text-color="waitDeal.textColor"
                                      :icon="waitDeal.icon" />
                          </q-item-section>
                          <q-item-section class="q-gutter-xs">
                            <q-item-label :lines="1">
                              {{ waitDeal.title }}
                            </q-item-label>
                            <q-item-label caption>
                              {{ waitDeal.desc }}
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-separator v-if="index < informs.length - 1"
                                     inset="item" />
                      </div>
                      <q-separator />
                      <q-item class="row q-pa-none text-center cursor-pointer">
                        <q-item-section class="col q-pa-none q-ma-none">
                          <q-btn label="清空消息"
                                 flat
                                 :ripple="{ color: 'info' }"
                                 @click="clearMessage('waitDeals')"
                                 class="q-ma-none full-width full-height no-border-radius"></q-btn>
                        </q-item-section>
                        <q-separator vertical />
                        <q-item-section class="col q-pa-none q-ma-none">
                          <q-btn label="查看更多"
                                 flat
                                 :ripple="{ color: 'info' }"
                                 class="q-ma-none full-width full-height no-border-radius"
                                 @click="lookMore('查看其他')"></q-btn>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-tab-panel>
                </q-tab-panels>
              </q-card>
            </div>
          </q-menu>
        </div>
      </q-toolbar>
    </q-header>
    <!-- 侧边栏 -->
    <q-drawer v-model="leftDrawerOpen"
              bordered
              behavior="mobile"
              @click="leftDrawerOpen = false">
      <q-scroll-area class="fit">
        <q-toolbar class="GPL__toolbar">
          <q-toolbar-title class="row items-center text-grey-8">
            <img class="q-pl-md"
                 src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg">
            <span class="q-ml-sm">GuideHub</span>
          </q-toolbar-title>
        </q-toolbar>

        <q-list padding>
          <q-item v-for="link in links1"
                  :key="link.text"
                  :to="link.href"
                  clickable
                  class="GPL__drawer-item">
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <q-item v-for="link in links2"
                  :key="link.text"
                  clickable
                  class="GPL__drawer-item">
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <q-item v-for="link in links3"
                  :key="link.text"
                  clickable
                  class="GPL__drawer-item">
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <q-item clickable
                  class="GPL__drawer-item GPL__drawer-item--storage">
            <q-item-section avatar>
              <q-icon name="cloud" />
            </q-item-section>
            <q-item-section top>
              <q-item-label>Storage</q-item-label>
              <q-linear-progress :value="storage"
                                 class="q-my-sm" />
              <q-item-label caption>2.6 GB of 15 GB</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="GPL__page-container">
      <router-view />

      <q-page-sticky v-if="$q.screen.gt.sm"
                     expand
                     position="left">
        <div class=" column fit q-pt-xl q-px-sm"
             style="overflow:hidden">

          <q-btn v-for="link in links1"
                 :key="link.text"
                 :to="link.href"
                 round
                 flat
                 color="grey-8"
                 stack
                 no-caps
                 size="26px"
                 class="GPL__side-btn">
            <q-icon size="22px"
                    :name="link.icon" />
            <div class="GPL__side-btn__label">{{ link.text }}</div>
            <q-badge floating
                     color="red"
                     text-color="white"
                     style="top: 8px; right: 16px">
              1
            </q-badge>
          </q-btn>

        </div>
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import LAYOUT_DATA from '../mock/data/layout/layoutData'
const stringOptions = [
  { val: '登录', href: '/user/login', type: '热度：22092' },
  { val: '注册', href: '/user/register', type: '热度：13212' },
  { val: '个人中心', href: '/account', type: '热度：10092' },
  { val: '设置', href: '/account/settings', type: '热度：1092' },
  {
    val: '饿我去恶趣味我去恶趣味去问我去恶趣味去问去问',
    href: '/register',
    type: '热度：1092',
  },
  { val: 'awdawdaw', href: '/register', type: '热度：1002' },
]

export default {
  name: 'GooglePhotosLayout',

  setup() {
    const leftDrawerOpen = ref(false)
    const search = ref('')
    const storage = ref(0.26)
    const text = ref('')
    const options = ref(null)
    const filteredOptions = ref([])

    function filter(val, update) {
      if (options.value === null) {
        // load data
        setTimeout(() => {
          options.value = stringOptions
          search.value.filter('')
        }, 1000)
        update()
        return
      }

      if (val === '') {
        update(() => {
          filteredOptions.value = options.value.map((op) => ({
            label: op.val,
            href: op.href,
            type: op.type,
          }))
        })
        return
      }

      update(() => {
        filteredOptions.value = [
          {
            label: val,
            href: '/user/login',
            type: 'In this repository',
          },
          {
            label: val,
            href: '/user/register',
            type: 'All GitHub',
          },
          ...options.value
            .filter((op) => op.val.toLowerCase().includes(val.toLowerCase()))
            .map((op) => ({
              label: op.val,
              href: op.href,
              type: op.type,
            })),
        ]
      })
    }
    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }
    return {
      // 用的
      text,
      options,
      filteredOptions,
      search,
      filter,
      leftDrawerOpen,
      storage,
      links1: [
        { icon: 'home', text: '首页', href: '/' },
        { icon: 'photo_album', text: '探索', href: '/home' },
        { icon: 'assistant', text: '测试', href: '/test' },
        { icon: 'login', text: '登录', href: '/user/login' },
        { icon: 'assistant', text: '注册', href: '/user/register' },
        { icon: 'home', text: '个人中心', href: '/account' },
        { icon: 'settings', text: '设置', href: '/account/settings' },
      ],
      links2: [
        { icon: 'archive', text: 'Archive' },
        { icon: 'delete', text: 'Trash' },
      ],
      links3: [
        { icon: 'settings', text: 'Settings' },
        { icon: 'help', text: 'Help & Feedback' },
        { icon: 'get_app', text: 'App Downloads' },
      ],
      createMenu: [
        { icon: 'photo_album', text: 'Album', href: '/register' },
        { icon: 'people', text: 'Shared Album', href: '/register' },
        { icon: 'movie', text: 'Movie', href: '/register' },
        { icon: 'library_books', text: 'Animation', href: '/register' },
        { icon: 'dashboard', text: 'Collage', href: '/register' },
        { icon: 'book', text: 'Photo book', href: '/register' },
      ],
      toggleLeftDrawer,
    }
  },
  data() {
    return {
      informs: LAYOUT_DATA.informsData,
      notifies: LAYOUT_DATA.notifyDatas,
      menuData: LAYOUT_DATA.routeDatas,
      waitDeals: LAYOUT_DATA.waitDealDatas,
      languageDatas: LAYOUT_DATA.languageDatas,
      scrollStyleData: LAYOUT_DATA.scrollStyleData,
      messageTab: 'informs',

      rightDrawerOpen: false,
      rightDrawerSetting: false,
      rightOffset: LAYOUT_DATA.rightOffset.rightOffsetInit,
      rightOffsetGithub: LAYOUT_DATA.rightOffset.rightOffsetGithubInit,

      gtSm: this.$q.screen.gt.sm,
      tabs: LAYOUT_DATA.accessTabs,
      currentPath: null,
      notif2: true,
      activeDate: 1,
      draggingLink: false,
      draggingSetting: false,
      // 用的
      showMessage: false,
    }
  },
  methods: {
    openMessage() {
      this.showMessage = !this.showMessage
    },
    clearMessage(items) {
      if (items === 'informs') {
        this.disable(this.informs)
      } else if (items === 'notifies') {
        this.disable(this.notifies)
      } else {
        this.disable(this.waitDeals)
      }
    },
    disable(items) {
      for (let i = 0; i < items.length; ++i) {
        items[i].disable = true
      }
    },
    // 通知
    lookMore(message) {
      this.$q.notify({
        progress: true,
        color: 'primary',
        group: false,
        icon: 'check_circle',
        position: 'top',
        timeout: 2000,
        message: message,
      })
    },
    look(type, index) {
      if (type === 'inform') {
        this.informs[index].disable = true
      } else if (type === 'notify') {
        this.notifies[index].disable = true
      } else {
        this.waitDeals[index].disable = true
      }
    },
  },
  computed: {
    menuContentClass: function () {
      if (this.$q.screen.lt.sm) {
        return 'q-mx-xs'
      }
      return ''
    },
    informCount: function () {
      return LAYOUT_DATA.getAvailableCount(this.informs)
    },
    notifiesCount: function () {
      return LAYOUT_DATA.getAvailableCount(this.notifies)
    },
    waitDealCount: function () {
      return LAYOUT_DATA.getAvailableCount(this.waitDeals)
    },
    totalInformCount: function () {
      return this.informCount + this.notifiesCount + this.waitDealCount
    },
    // 搜索相关
  },
}
</script>

<style lang="sass">
.GPL
  &__toolbar
    height: 64px
  &__toolbar-input
    width: 35%
  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px
    .q-item__section--avatar
      padding-left: 12px
      .q-icon
        color: #5f6368
    .q-item__label:not(.q-item__label--caption)
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem
    &--storage
      border-radius: 0
      margin-right: 0
      padding-top: 24px
      padding-bottom: 24px
  &__side-btn
    &__label
      font-size: 12px
      line-height: 24px
      letter-spacing: .01785714em
      font-weight: 500
  @media (min-width: 1024px)
    &__page-container
      padding-left: 94px
</style>