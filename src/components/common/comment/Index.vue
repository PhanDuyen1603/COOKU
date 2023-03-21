<template>
  <div class="section mb-md-5 mb-3 p-0">
    <div class="comments__top">
      <h5>bạn đã thử công thức này chưa?</h5>
      <p>Hãy chia sẽ suy nghĩ của bạn trong phần bình luận bên dưới!</p>
      <p class="text__highlight">{{ totalComment > 0 ? totalComment + ' bình luận' : 'Hãy là người đầu tiên bình luận' }} </p>
      <p v-if="!$$isSigned" class="clicked">
        Bạn cần <span class="text__highlight text__highlight--underline cursor-pointer" @click="openLoginModal()">Đăng nhập</span> để bình luận</p>
    </div>
    <CommonCommentForm
      :disabled="!$$isSigned"
      :entity="entity"
      :entity-i-d="entityID"
      @pushComment="pushComment"
    />
    <!-- <content-loader
      v-if="fetchingFirst"
      :width="400"
      :height="160"
      :speed="2"
      primary-color="#f3f3f3"
      secondary-color="#ecebeb"
    >
      <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
      <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
      <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
      <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
      <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
      <circle cx="20" cy="20" r="20" />
    </content-loader> -->
    <div v-for="comment in comments" :key="comment.id" class="comment-list">
      <div class="comment__item">
        <div class="comment">
          <CommonCommentInput
            :comment="comment"
            @pushLike="pushLike"
            @removeLike="removeLike"
          >
            <template #commentAction>
              <div class="like__group--action">
                <div @click.prevent="handleActionLike(comment)">
                  <!-- <IconsLike
                    v-if="isCurrentUserLike(comment)"
                    class="pb-1"
                    :fill="'#df8c26'"
                    height="20"
                  />
                  <IconsLikeOutline
                    v-else
                    class="pb-1"
                    :fill="!isCurrentUserLike(comment) ? '#FBE4C8' : '#df8c26'"
                    height="20"
                  /> -->

                  <span v-if="comment.likes.length" class="count-like">
                    {{ comment.likes?.length }}
                  </span>
                </div>
                <span class="title-reply cursor-pointer" @click.prevent="replyComment(comment.id)">
                  Trả lời
                </span>
              </div>
            </template>
          </CommonCommentInput>
          <div class="comment__action comment__action--custom">
            <CommonCommentForm
              v-if="commentIdReply == comment.id"
              :entity="entity"
              :entity-i-d="entityID"
              :comment-parent="comment"
              @pushCommentChild="pushCommentChild"
            />
            <div v-if="comment.child_comments?.length > 5">
              <a href="/" class="cmt-more"
                ><img
                  class="icon ic-right"
                  src="~/assets/images/cmt-ic.png"
                  alt=""
                />Hiện {{ comment.child_comments?.length }} câu trả lời</a
              >
            </div>
          </div>
          <div class="comment__child ps-4">
            <div
              v-for="(commentChild, key) in comment.child_comments"
              :key="key"
              class="mt-2"
            >
              <CommonCommentInput :comment="commentChild">
                <template #commentAction>
                  <div>
                    <a href="#" @click.prevent="handleActionLike(commentChild)">
                      <IconsLike
                        class="pb-1"
                        :fill="!isCurrentUserLike(commentChild) ? '#FBE4C8' : '#df8c26'"
                        height="20"
                      ></IconsLike>
                    </a>
                    <span v-if="commentChild.likes?.length" class="count-like">
                      {{ commentChild.likes?.length }}
                    </span>
                  </div>
                </template>
              </CommonCommentInput>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="view-more-cmt">
        <a href="/" class="view-more-cmt-item"
          >Xem tất cả bình luận
          <img
            class="icon ic-left"
            src="~/assets/images/arrow_back4.png"
            alt=""
          />
        </a>
      </div> -->
  </div>
</template>
<script>
// import { ContentLoader } from 'vue-content-loader'
import set from 'lodash/set'

export default {
  // components: { ContentLoader },
  props: {
    entity: {
      required: true,
    },
    entityID: {
      required: true,
    },
    textColor: {
      required: false,
      default: 'text-yellow',
    },
  },
  data() {
    return {
      fetchingFirst: 1,
      // commentIdReply: 0,
      totalComment: 0,
    }
  },
  mounted() {
    this.fetchingFirst = 1
    setTimeout(() => {
      this.fetchComment()
    }, 1000)
  },
  async setup(prop) {
    const { $modal } = useNuxtApp()
    const { find } = useStrapi()
    const paramsFilter = reactive({
      parent_comment_null: true,
      _sort: 'created_at:DESC',
    })

    // comment
    const totalComment = ref(0)
    const comments = reactive([])
    const commentIdReply = ref(0)

    const fetchComment = async() => {
      try {
        set(paramsFilter, prop.entity, prop.entityID)
        const matchingComments = await find('comments', paramsFilter)

        const paramFilterCount = {}
        set(paramFilterCount, prop.entity, prop.entityID)
        totalComment.value = await find('comments/count', paramFilterCount)

        // this.fetchingFirst = 0
        matchingComments.forEach(x => comments.push(x))

      } catch (error) {
        console.log(error)
      }
    }

    const replyComment = (commentId) => {
      commentIdReply.value = commentId
    }

    const openLoginModal = async () => {
      await $modal.show({
        component: 'TemplateAuthModalAuth',
        wrapper: 'ModalWrapperAuthForm',
        wrapperProps: {
          style: {
            width: '900px'
          },
        }
      })
    }

    return {
      fetchComment,
      openLoginModal,
      replyComment,

      comments,
      totalComment,
      commentIdReply
    }

  },
  methods: {
    pushLike({ comment, like }) {
      comment.likes.push({
        id: like.id,
        author: like.author.id,
      })
    },
    removeLike({ comment, like }) {
      comment.likes = comment.likes.filter((i) => i.id !== like.id)
    },

    async handleActionLike(comment) {
      try {
        const found = comment.likes.find(
          (i) => i.author === this.$strapi.user.id
        )
        if (found === undefined) {
          const likeRes = await this.$strapi.create('likes', {
            author: this.$strapi.user.id,
            comment: comment.id,
          })
          this.pushLike({
            comment,
            like: likeRes,
          })
        } else {
          await this.$strapi.delete('likes', found.id)
          this.removeLike({
            comment,
            like: found,
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    pushCommentChild(data) {
      const commentParent = this.comments.find(
        (i) => i.id === data.commentParentId
      )
      commentParent.child_comments.unshift(data.commentChild)
    },
    pushComment(comment) {
      this.comments.unshift(comment)
    },
    isCurrentUserLike(comment) {
      if (!this.$$user) return false
      return !!comment.likes.find(x => x.author === this.$$user.id)
    },
  },
}
</script>

<style lang="scss">
.like__group--action {
  display: flex;
  gap: 15px;
}
.comment__child {
  border-left: 1px solid #fbe4c8;
}

.comment__item {
  border-radius: 10px;
  align-items: center;
  margin-bottom: 30px;

  .comment__author {
    justify-content: left;

    .comment-avatar {
      width: 52px;
      height: 52px;
      border-radius: 100px;
    }
  }

  .view-more {
    display: flex;
    justify-content: end;
    margin-bottom: 10px;
  }

  .image-cmt {
    border-radius: 15px;
    width: 164px;
    height: 160px;

    .img-cmt-item {
      border-radius: 15px;
      width: 164px;
      height: 160px;
    }
  }

  .tit-diet-top {
    margin-left: .8rem;
  }

  .count-like {
    color: #df8c26;
    font-size: 15px;
    cursor: pointer;
  }

  .title-reply {
    font-weight: 600;
    line-height: 20px;
    color: #df8c26;
    text-decoration-line: underline;
  }

  .cmt-more {
    font-weight: 600;
    font-size: 18px;
    line-height: 1.4;
    color: #df8c26;

    .ic-right {
      margin-right: 10px;
    }
  }

  .line-cmt-child {
    border: 1px solid #fbe4c8;
    transform: rotate(90deg);
    width: 304px;
  }

  .cmt-child-bottom {
    margin-bottom: 20px;
  }

  .comment-child {
    border-left: 1px solid #fbe4c8;
    padding-left: 20px;
    margin-left: 10px;

    .comment-child-iteam {
      margin-top: 20px;
    }

    .cmt-child-notop {
      margin-top: 0px;
    }
  }

  .cmt-child-more {
    display: flex;
    justify-content: end;
  }
}
.image-cook {
  width: 100px;
  height: 100px;
  border-radius: 10px;
}
</style>
