<template>
  <div class="type-nav">
    <div class="container" @mouseleave="mouseLeave">
      <h2 class="all" @mouseenter="mouseEnter">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="sort">
        <div class="sort" v-show="isShow">
        <!-- 路由跳转的事件委托: -->
        <div class="all-sort-list2" @click="goSearch($event)">
          <div @mouseleave="restoreIndex">
            <!-- 一级分类 -->
            <div
              class="item"
              v-for="(item, index) in categoryList"
              :key="item.categoryId"
              :class="{ curStyle: curIndex === index }"
            >
              <h3 @mouseenter="changeIndex(index)">
                <a
                  :data-category-name="item.categoryName"
                  :data-category1-id="item.categoryId"
                  >{{ item.categoryName }}</a
                >
                <!-- 如果使用router-link，会产生卡顿现象：因为需要创建大量的组件实例，消耗内存 -->
                <!-- <router-link to='/search'>{{ item.categoryName }}</router-link> -->
              </h3>
              <!-- 二级分类 -->
              <div
                class="item-list clearfix"
                :style="{ display: curIndex === index ? 'block' : 'none' }"
              >
                <div
                  class="subitem"
                  v-for="subItem in item.categoryChild"
                  :key="subItem.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-category-name="subItem.categoryName"
                        :data-category2-id="subItem.categoryId"
                        >{{ subItem.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <!-- 三级分类 -->
                      <em
                        v-for="subSubItem in subItem.categoryChild"
                        :key="subSubItem.categoryId"
                      >
                        <a
                          :data-category-name="subSubItem.categoryName"
                          :data-category3-id="subSubItem.categoryId"
                          >{{ subSubItem.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </transition>
      
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import utils from "@/utils";

export default {
  name: "TypeNav",
  data() {
    return {
      curIndex: -1,
      isShow: true,
    };
  },
  // 组件挂载完毕，发送请求
  mounted() {
    // 通知 vuex 发送请求，获取数据，存储到仓库中, 
    // ! 这个数据只需要请求一次，放到根组件中
    // this.$store.dispatch("getBaseCategoryList");
    // 组件挂载完毕，隐藏类型导航
    if (this.$route.path !== '/home') this.isShow = false;
  },
  methods: {
    // 用于绑定动态样式，需要做节流，防止用户快速点击多次触发函数
    changeIndex: utils.throttle(
      function (index) {
        this.curIndex = index;
      },
      50),

    restoreIndex() {
      this.curIndex = -1;
    },

    // 路由跳转
    goSearch(event) {
      // 不能使用 router-link，v-for 创建大量组件实例，消耗内存
      // 最好使用 编程式路由 + 事件委托(父元素响应事件) ？ref
      // 事件委托需要解决：
      // 1. 事件委托将全部子节点的事件都委托给了父节点，如何确定 a 标签节点的事件？
      // 2. 如何传递参数？

      // 在HTML5中我们可以使用data-前缀设置我们需要的自定义属性，来进行一些数据的存放：

      // 给子节点的 a 标签添加自定义属性 data-category-name data-category-Id并绑定，并使用标签的 dataset 获取自定义属性和属性值
      let { categoryName, category1Id, category2Id, category3Id } = event.target.dataset;

      if (categoryName) {
        // 设置参数
        let location = { name: "search" };
        let query = { categoryName: categoryName };
        if (category1Id) {
          query.category1Id = category1Id;
        } else if (category2Id) {
          query.category2Id = category2Id;
        } else {
          query.category3Id = category3Id;
        }
        location.query = query;
        // 参数合并：header 组件中也需要进行参数合并
        location.params = this.$route.params
        // 路由跳转
        this.$router.push(location);
      }
    },

    mouseEnter() {
      if (this.$route.path !== '/home') {
        this.isShow = true
      }
    },
    mouseLeave() {
      if (this.$route.path !== '/home') {
        this.isShow = false
      }
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      a {
        color: #333;
        cursor: pointer;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
              cursor: pointer;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }

        .curStyle {
          background-color: skyblue;
        }
      }
    }

    // 过渡动画
    .sort-enter {
      height: 0;
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>
