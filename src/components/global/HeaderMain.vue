<template>
  <header class="header header-main header-top">
    <nav
      class="header-main__nav nav-main navbar navbar-expand-lg navbar-dark bg-dark"
    >
      <div class="container">
        <NuxtLink to="/" class="navbar-brand">
          <GlobalLogoCircle />
        </NuxtLink>

        <div id="nav-main" class="collapse navbar-collapse">
          <ul class="navbar-nav me-auto">
            <li v-for="item in Menus" :key="item.id" class="nav-item">
              <NuxtLink
                :to="{ name: item.to }"
                no-prefetch
                class="nav-link"
                aria-current="page"
              >
                {{ item.name }}
              </NuxtLink>
            </li>

            <li class="nav-item login cursor-pointer profile-image">
              <div v-if="!unref($$isSigned)" class="">
                <div
                  class="nav-item__login"
                  data-toggle="modal"
                  data-target="#authModal"
                  @click="openLoginModal()"
                >
                  <img class="icon-login" src="/images/login.png" />
                  <span>ĐĂNG NHẬP</span>
                </div>
              </div>
              <div v-else class="dropdown">
                <button
                  id="dropdownMenuButton1"
                  class="btn__dropdown--profile dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <CommonAvatar :data="unref($$user)" />
                </button>
                <ul
                  class="dropdown-menu dropdown-menu__profile"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li class="dropdown-item__profile">
                    <NuxtLink
                      class="pl-3 nav-link"
                      :to="{
                        name: 'profile-slug',
                        params: { slug: unref($$user)?.username || 'error' },
                      }"
                    >
                      Trang cá nhân
                    </NuxtLink>
                  </li>
                  <li class="dropdown-item__profile">
                    <a class="pl-3 nav-link cursor-pointer" @click="logOut"
                      >Đăng xuất</a
                    >
                  </li>
                </ul>
              </div>
            </li>

            <li class="nav-item__search">
              <input
                v-model="searchString"
                type="text"
                class="rounded--30 border-0 text-search"
                placeholder="Tên món, nguyên liệu, chế độ ăn,..."
                @keyup.enter="handleSearch"
              />
              <span class="search-icon__wrapper" @click="handleSearch()">
                <img class="img-response" src="/images/search.png" />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
const { $modal, $toast, $$user } = useNuxtApp();
const router = useRouter();

const searchString = ref("");

const Menus = [
  {
    id: Math.random().toString(),
    name: "Chế độ ăn",
    to: "diet",
  },
  {
    id: Math.random().toString(),
    name: "Món ăn",
    to: "recipe",
  },
  {
    id: Math.random().toString(),
    name: "Bài viết",
    to: "post",
  },
];

const handleSearch = () => {
  if (searchString.value.length > 0)
    router.push("/search?tab=recipe&_q=" + searchString.value);
};

const logOut = async () => {
  try {
    const { logout } = useStrapiAuth();
    await logout();
    $toast.show({
      message: "logout success",
      type: "success",
    });
    window?.location.reload(true);
  } catch (error) {
    console.log("logout", error);
  }
};

const openLoginModal = async () => {
  await $modal.show({
    component: "TemplateAuthModalAuth",
    wrapper: "ModalWrapperAuthForm",
    wrapperProps: {
      style: {
        width: "900px",
      },
    },
  });
};
// const response = await find('recipes')
</script>

<style lang="scss">
.btn__dropdown--profile {
  display: flex;
  align-items: center;
  gap: 5px;
  border: none;
  background-color: inherit;
}
.dropdown-menu__profile {
  width: 150px;
  background: var(--clr-red-primary);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  .dropdown-item__profile a {
    font-weight: 800;
    font-size: var(--fs-sm);
    padding: 3px 10px !important;
    line-height: 22px;
    color: #ffffff;
  }
}

#dropdownMenuButton1 {
  color: white;
}

.text-search {
  background: #fff;
  width: 296px;
  height: 30px;
  font-size: 0.8rem !important;
  padding-left: 0.7rem;
  font-family: "Nunito";
  font-weight: 400;
}

.header-top {
  position: absolute;
  z-index: 999;
  left: 0;
  right: 0;
}
</style>
