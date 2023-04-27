<template>
  <div>
    <nav class="horizonal_pagination">
      <ul class="pagination">
        <li
          role="presentation"
          aria-hidden="true"
          class="page-item"
          :class="{ disabled: isInFirstPage }"
        >
          <a @click="onClickFirstPage" class="page-link">First</a>
        </li>

        <li class="page-item" :class="{ disabled: isInFirstPage }">
          <a
            @click="onClickPreviousPage"
            class="page-link"
            aria-label="Go to previous page"
          >
            Previous
          </a>
        </li>
        <li
          v-if="separatorPrevious"
          role="separator"
          class="page-item disabled bv-d-xs-down-none"
        >
          <span class="page-link">…</span>
        </li>
        <li
          class="page-item"
          :class="{ active: isPageActive(page.name) }"
          v-for="(page, pageKey) in pages"
          :key="pageKey"
        >
          <a
            class="page-link"
            @click="onClickPage(page.name)"
            :disabled="page.isDisabled"
            :aria-label="`Go to page number ${page.name}`"
            >{{ page.name }}</a
          >
        </li>
        <li
          v-if="separatorNext"
          role="separator"
          class="page-item disabled bv-d-xs-down-none"
        >
          <span class="page-link">…</span>
        </li>
        <li class="page-item" :class="{ disabled: isInLastPage }">
          <a class="page-link" @click="onClickNextPage" href="#">Next</a>
        </li>
        <li
          role="presentation"
          class="page-item"
          :class="{ disabled: isInLastPage }"
        >
          <button
            role="menuitem"
            type="button"
            tabindex="-1"
            aria-label="Go to last page"
            class="page-link"
            @click="onClickLastPage"
          >
            Last
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  emits: ['input', 'pageChange', 'update:modelValue'],
  props: {
    maxVisibleButtons: {
      type: Number,
      default: 3,
    },
    total: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 1,
    },
    modelValue: {
      default: 1,
    },
  },
  computed: {
    currentPage: {
      get() {
        return parseInt(this.modelValue)
      },
      set(newValue) {
        this.$emit('input', newValue)
      },
    },
    totalPages() {
      return Math.ceil(this.total / this.perPage)
    },
    startPage() {
      if (this.currentPage === 1) {
        return 1
      }

      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1
      }

      return this.currentPage - 1
    },
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      )
    },
    separatorNext() {
      return this.totalPages - this.maxVisibleButtons > this.currentPage - 2
    },
    separatorPrevious() {
      return this.maxVisibleButtons - 1 < this.currentPage
    },
    pages() {
      const range = []

      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        })
      }

      return range
    },
    isInFirstPage() {
      return this.currentPage === 1
    },
    isInLastPage() {
      return this.currentPage === this.totalPages
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit('input', 1)
      this.$emit('pageChange', 1)
    },
    onClickPreviousPage() {
      const page = this.currentPage - 1
      this.$emit('input', page)
      this.$emit('pageChange', page)
    },
    onClickPage(page) {
      this.$emit('input', page)
      this.$emit('pageChange', page)
    },
    onClickNextPage() {
      const page = this.currentPage + 1
      this.$emit('input', page)
      this.$emit('pageChange', page)
    },
    onClickLastPage() {
      const page = this.totalPages
      this.$emit('input', page)
      this.$emit('pageChange', page)
    },
    isPageActive(page) {
      return this.currentPage === page
    },
  },
}
</script>
<style lang="scss" scoped>
.page-item.disabled .page-link {
    color: #8898aa;
    pointer-events: none;
    background-color: #fff;
    border-color: #dee2e6;
}

.page-item.active .page-link {
    background-color: #e5625c;
    border-color: #e5625c;
        z-index: 3;
    color: #fff;
}

.page-item:first-child .page-link {
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
}

.page-link {
    color: #e5625c;
}
.pagination li:not(.disabled) {
  cursor: pointer;
}
.horizonal_pagination {
  display: flex;
  justify-content: center;
}
</style>
