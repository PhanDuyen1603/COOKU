<template>
  <header class="header header-main header-top">
    <nav
      class="header-main__nav nav-main navbar navbar-expand-lg navbar-dark bg-dark"
    >
      <div class="container">
        <NuxtLink to="/" class="navbar-brand">
          <GlobalLogoCircle />
        </NuxtLink>

        <div id="mobile-nav-main" class="mobile menu">
          <CommonIconMenu ref="menu_icon" @onChange="toggleMenu"/>
          <Transition>
            <div v-show="showMenu" class="menu-expand">
              <div class="expand-overlay" @click="closeMenu"></div>
              <nav class="mobile-menu">
                <ul class="navbar-nav me-auto">
                  <li class="close-menu">
                    <CommonIconCloseCircle style="cursor: pointer;" width="32" height="32" fill="#fff" @click="closeMenu" />
                  </li>
                  <li class="nav-mobile-item cursor-pointer profile-image">
                    <div class="nav-mobile-profile">
                      <div class="nav-mobile-avatar">
                        <CommonAvatar :data="unref($$user)" size="big" />
                        <span class="nav-link" @click="openLoginModal">{{ unref($$user)?.fullname || 'ĐĂNG NHẬP' }}</span>
                      </div>
                      <CommonIconLogout v-if="unref($$isSigned)" width="25" height="25" @click="logOut" />
                    </div>
                  </li>

                  <li v-for="item in Menus" :key="item.id" class="nav-mobile-item">
                    <NuxtLink
                      :to="{ name: item.to }"
                      no-prefetch
                      class="nav-link"
                      aria-current="page"
                    >
                      {{ item.name }}
                    </NuxtLink>
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
              </nav>
            </div>
          </Transition>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
const { $modal, $toast, $$user, $$isSigned } = useNuxtApp();
const router = useRouter();

const searchString = ref("");
const menu_icon = ref(null)
const showMenu = ref(false)

const closeMenu = () => {
  showMenu.value = false
  console.log({
    icon: menu_icon.value
  })
  menu_icon.value?.deActive?.()
}

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

const toggleMenu = ({value}) => {
  showMenu.value = value
}

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
  if(unref($$isSigned)) {
    return router.push({
      name: 'profile-slug',
      params: { slug: unref($$user)?.username || 'error' },
    })
  }
  closeMenu()
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

.menu-expand {
  position: fixed;
  right: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  // background-color: red;
  // z-index: 2;
}
.expand-overlay {
  position: absolute;
  right: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.55);
  z-index: 1;
}
.mobile-menu {
  position: fixed;
  right: 0;
  top: 0;
  width: 350px;
  height: 100vh;
  background-color: #fff;
  z-index: 2;
  .nav-link {
    color: #000;
  }
}

.navbar-expand-lg .mobile-menu .navbar-nav {
  align-items: flex-start;
}

.nav-mobile-item {
  padding: 1rem 0
}

.nav-mobile-profile {
  display: flex;
  justify-content: space-between;
  width: 330px;
  padding: 0 1rem;
  align-items: center;
  .nav-link {
    padding: 0;
    background-color: #fff;
  }
}
.nav-mobile-avatar {
  display: flex;
  align-items: center;
  gap: 10px
}

.close-menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  width: 350px;
  background-color: #e5625c;
}
</style>
