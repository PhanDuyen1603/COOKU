<template>
  <footer class="footer">
    <div class="icon-scroll-top icon" @click="scrollToTop">
      <img src="/icons/arrow-up-solid.svg" alt="icon" />
    </div>
    <div class="footer__wrapper">
      <div class="footer__item">
        <div class="footer__item--desc">
          <div>
            <NuxtLink to="/" class="footer__logo">
              <GlobalLogoCircle />
            </NuxtLink>
          </div>
          <p class="mt-3">
            Cooku giúp bạn cải thiện sức khỏe, thực hiện những chế độ ăn lành
            mạnh
          </p>
        </div>
        <div class="social__list">
          <div class="icon__circle icon__circle--big icon__circle--shadow">
            <img src="/icons/facebook.svg" alt="" />
          </div>
          <div class="icon__circle icon__circle--big icon__circle--shadow">
            <img src="/icons/instagram.svg" alt="" />
          </div>
          <div class="icon__circle icon__circle--big icon__circle--shadow">
            <img src="/icons/twitter.svg" alt="" />
          </div>
        </div>
      </div>
      <div class="footer__item">
        <ul class="nav">
          <li class="nav__title clicked">
            <h3>Liên kết</h3>
          </li>
          <li class="nav__item clicked">
            <NuxtLink to="/"> Trang chủ </NuxtLink>
          </li>
          <li
            v-for="(category, index) in categories"
            :key="index"
            class="nav__item clicked"
          >
            <NuxtLink :to="`/${category.key}`">
              {{ category.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="footer__item">
        <ul class="nav">
          <li class="nav__title clicked">
            <h3>Công ty</h3>
          </li>
          <li class="nav__item clicked">
            <NuxtLink to="/"> COOKU VIETNAM </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="footer__item">
        <ul class="nav">
          <li class="nav__title clicked">
            <h3>Ứng dụng</h3>
          </li>
          <li class="nav__item">
            <p>
              Tải ngay app <span class="color-main">Cooku</span> <br />để có
              những trải nghiệm <br />tuyệt vời hơn
            </p>
          </li>
          <li class="nav__item color-main underline">
            <NuxtLink to="/">Android App</NuxtLink>
          </li>
          <li class="nav__item color-main underline">
            <NuxtLink to="/">Ios App</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="copy-right">
      <p>
        Copyright © 2023 <span class="color-main">Cooku</span>. All Rights
        Reserved.
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    this.categories = [
      {
        title: "Chế độ ăn",
        key: "diet",
      },
      {
        title: "Món ăn",
        key: "recipe",
      },
      {
        title: "Bí quyết",
        key: "tip",
      },
      {
        title: "Bài viết",
        key: "post",
      },
    ];
    return {};
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  padding-top: 42px;
  margin-top: 70px;
  background: var(--clr-gray);
  font-family: "Nunito";

  &__wrapper {
    display: flex;
    justify-content: space-around;
    max-width: var(--size-xl);
    margin: 0 auto;
    padding-bottom: 42px;
  }

  &__item:first-child {
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 25px;
    text-align: center;

    .social__list {
      display: flex;
      justify-content: center;
      gap: 44px;
    }

    &--desc {
      font-size: var(--fs-lg);
      .logo__wrapper {
        margin: 0 auto;
      }
    }
  }

  @media (max-width: 768px) {
    &__wrapper {
      flex-wrap: wrap;
    }
    &__item:first-child {
      width: 100vw;
      margin-bottom: 2rem;
    }
  }
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__title h3 {
    font-size: var(--fs-xxxl);
    font-weight: var(--font-weight-9);
    margin-bottom: 1rem;
    @media (max-width: 768px) {
      font-size: var(--fs-xl);
      font-weight: var(--font-weight-8);
    }
  }

  &__item {
    font-size: var(--fs-lg);
    font-weight: var(--font-weight-5);
    @media (max-width: 768px) {
      font-size: var(--fs-normal);
    }
  }
}

.icon__circle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #fff;
  z-index: 1;
  position: relative;
  cursor: pointer;
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.icon__circle--shadow {
  box-shadow: 4px 4px 8px rgba(175, 175, 175, 0.25),
    5px 4px 8px rgba(0, 0, 0, 0.15), inset 2px 4px 6px rgba(205, 205, 205, 0.25),
    inset -10px -10px 10px rgba(247, 247, 247, 0.13);
}

.icon__circle--big {
  width: 40px !important;
  height: 40px !important;
}

.color-main {
  color: var(--clr-main);
}

.copy-right {
  border-top: 1px solid var(--clr-gray-dark);
  text-align: center;
  padding: 20px 0;
}
.icon-scroll-top {
  bottom: 3rem;
  z-index: 10;
  padding: 8px 10px;
  border: solid 2px #e5625c;
  right: 3rem;
  position: fixed;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;
  img {
    width: 25px;
    filter: invert(48%) sepia(30%) saturate(954%) hue-rotate(314deg)
      brightness(96%) contrast(104%);
    transition: all 0.2s ease-in-out;
  }
  &:hover {
    background: #e5625c;
    img {
      filter: invert(100%) sepia(6%) saturate(229%) hue-rotate(3deg)
        brightness(116%) contrast(100%);
    }
  }
}

.nav__title h3 {
  font-size: 1.5rem;
  margin-bottom: 0;
}
</style>
