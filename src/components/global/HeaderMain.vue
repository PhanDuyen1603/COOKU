<template>
  <header class="header header-main header-top">
    <nav class="header-main__nav nav-main navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <NuxtLink to="/" class="navbar-brand">
          <!-- <img class="logo-foodmood" src="~/assets/images/logo-foodmood.png" alt="logo-foodmood" /> -->
        </NuxtLink>

         <div v-if="showMobileMenu" class="nav-item position-relative ps-4">
          <!-- <input v-model="keywordsearch" type="text" class="input__search input__search--mobile rounded--30 border-0"
            placeholder="Tên món, nguyên liệu, chế độ ăn,..." @keyup.enter="handleSearch" /> -->
          <!-- <a class="btn-search justify-content-center d-flex position-absolute rounded--10" @click="handleSearch()">
            <img class="img-response" src="~/assets/images/Vector-search.png" />
          </a> -->
        </div>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav-main"
          aria-controls="nav-main" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div v-if="!showMobileMenu"  id="nav-main" class="collapse navbar-collapse">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <NuxtLink to="/diet" no-prefetch class="nav-link" aria-current="page">Chế độ ăn</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/recipe" no-prefetch class="nav-link">Món ăn</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/tip" no-prefetch class="nav-link">Bí quyết</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/post" no-prefetch class="nav-link">Bài viết</NuxtLink>
            </li>

            <li class="nav-item login cursor-pointer profile-image">
              <!-- <div v-if="$strapi.user === null">
                <a class="nav-link flex-view" data-toggle="modal" data-target="#authModal" @click="changeToLogin()">
                  <img class="icon-login" src="~/assets/images/Vector-login.png" />ĐĂNG
                  NHẬP
                </a>
              </div> -->
              <!-- <div v-if="$strapi.user !== null" class="dropdown">
                <button id="dropdownMenuButton1" class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="/icon/avatar-person.svg" alt="User Avatar" class="avatar-image">
                  <img src="~/assets/images/ic_Dropdown.png" alt="User Avatar" class="avatar-image">
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <NuxtLink class="pl-3 nav-link" :to="{ name: 'profile-slug', params: { slug: $strapi.user.username } }">
                      Trang cá nhân
                    </NuxtLink>
                   </li>
                  <li><a class="pl-3 nav-link" @click="logout">Đăng xuất</a></li>
                </ul>
              </div> -->
            </li>

            <li class="nav-item position-relative ps-4">
              <!-- <input v-model="keywordsearch" type="text" class="input__search rounded--30 border-0"
                placeholder="Tên món, nguyên liệu, chế độ ăn,..." @keyup.enter="handleSearch" /> -->
              <a class="btn-search justify-content-center d-flex position-absolute rounded--10" @click="handleSearch()">
                <!-- <img class="img-response" src="~/assets/images/Vector-search.png" /> -->
              </a>
            </li>
          </ul>
        </div>

        <div v-else id="nav-main" ref="navmain" class="mobile-navbar collapse navbar-collapse">
          <ul class="navbar-nav me-auto">
            <li class="nav-item d-flex align-items-center">
              <!-- <div>
                <AtomsAvatar avatar-size="large" :author="{}"></AtomsAvatar>
              </div> -->
              <!-- <div v-if="$strapi.user" class="ms-4">
                <h3>
                  <NuxtLink
                  :to="{ name: 'profile-slug', params: { slug: $strapi.user.username } }"
                  >
                    {{ $strapi.user.username }}
                  </NuxtLink>
                </h3>
                <a href="" @click="logout()">đăng xuất</a>
              </div> -->
              <!-- <div v-else class="ms-4">
                <h3>Foodmood</h3>
                <a href="" @click="changeToLogin()">đăng nhập</a>
              </div> -->
            </li>
            <li class="nav-item">
              <NuxtLink to="/diet" no-prefetch class="nav-link">Chế độ ăn</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/recipe" no-prefetch class="nav-link">Món ăn</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/tip" no-prefetch class="nav-link">Bí quyết</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/post" no-prefetch class="nav-link">Bài viết</NuxtLink>
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

// const response = await find('recipes')
</script>