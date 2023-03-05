<template>
  <header class="header header-main header-top">
    <nav class="header-main__nav nav-main navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <NuxtLink to="/" class="navbar-brand">
          <LogoCircle />
        </NuxtLink>

        <div
          id="nav-main"
          class="collapse navbar-collapse"
        >
          <ul class="navbar-nav me-auto">
            <li
              v-for="item in Menus"
              :key="item.id"
              class="nav-item"
            >
              <NuxtLink
                :to="item.to"
                no-prefetch
                class="nav-link"
                aria-current="page"
              >
                {{ item.name }}
              </NuxtLink>
            </li>

            <li class="nav-item login cursor-pointer profile-image">
              <div v-if="!$$isSigned" class="">
                <div
                  class="nav-item__login"
                  data-toggle="modal"
                  data-target="#authModal"
                  @click="changeToLogin()"
                >
                  <img class="icon-login" src="images/login.png" />
                  <span>ĐĂNG NHẬP</span>
                </div>
              </div>
              <div v-else class="dropdown">
                <button
                  id="dropdownMenuButton1"
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <CommonAvatar :data="$$user" />
                </button>
                <ul
                  class="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <NuxtLink
                      class="pl-3 nav-link"
                      :to="{ name: 'profile-slug', params: { slug: $strapi.user.username } }"
                    >
                      Trang cá nhân
                    </NuxtLink>
                   </li>
                  <li><a class="pl-3 nav-link" @click="logout">Đăng xuất</a></li>
                </ul>
              </div>
            </li>

            <li class="nav-item__search">
              <input
                v-model="keywordsearch"
                type="text"
                class="input__search rounded--30 border-0"
                placeholder="Tên món, nguyên liệu, chế độ ăn,..."
                @keyup.enter="handleSearch"
              />
              <span
                class="search-icon__wrapper"
                @click="handleSearch()"
              >
                <img class="img-response" src="images/search.png" />
              </span>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  </header>
</template>

<script setup>
// const { find } = useStrapi()
const { $config } = useNuxtApp()
const showMobileMenu = false

const searchString = ref('')

const Menus = [
  {
    id: Math.random().toString(),
    name: 'Chế độ ăn',
    to: 'diet'
  },
  {
    id: Math.random().toString(),
    name: 'Món ăn',
    to: 'recipe'
  },
  {
    id: Math.random().toString(),
    name: 'Bài viết',
    to: 'post'
  },
]

const handleSearch = () => {
  console.log(searchString)
}

// const response = await find('recipes')
</script>