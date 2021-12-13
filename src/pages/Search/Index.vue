<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="params.categoryName">
              {{ params.categoryName }}
              <i @click="removeCategoryName">×</i>
            </li>
            <li class="with-x" v-if="params.keyword">
              {{ params.keyword }} <i @click="removeKeyword">×</i>
            </li>
            <li class="with-x" v-if="params.trademark">
              {{ params.trademark.split(":")[1] }}
              <i @click="removeTrademark">×</i>
            </li>
            <template v-if="params.props">
              <li
                class="with-x"
                v-for="(prop, index) in params.props"
                :key="index"
              >
                {{ prop.split(":")[1] }}
                <i @click="removeAttr(index)">×</i>
              </li>
            </template>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          @sendTrademarkInfo="getTrademarkInfo"
          @sendAttrInfo="getAttrInfo"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <!-- 过滤条件 -->
            <!-- 排序方式 
            1: 综合,
            2: 价格 asc: 升序,desc: 降序  示例: "1:desc"-->
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 样式绑定计算属性 -->
                <li :class="{ active: isAsc }" @click="changeOrder()">
                  <a href="javascript:;">价格⬆</a>
                </li>
                <li :class="{ active: isDesc }" @click="changeOrder()">
                  <a href="javascript:;">价格⬇</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank"
                      ><img :src="good.defaultImg"
                    /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">{{
                      good.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!-- 分页 -->
          <Pagination
            :pageNo="params.pageNo"
            :pageSize="params.pageSize"
            :total="total"
            :totalPages="totalPages"
            :continuous="5"
            @getCurPageNoCustom="getCurPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";

export default {
  name: "Search",
  data() {
    return {
      params: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "",
        pageNo: 1,
        pageSize: 3,
        props: [],
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
  },
  beforeMount() {
    Object.assign(this.params, this.$route.query, this.$route.params);
  },
  mounted() {
    this.params.order = "2:asc";
    this.getData();
  },
  computed: {
    ...mapGetters(["goodsList", "trademarkList", "attrsList"]),

    isAsc() {
      return this.params.order.includes("asc");
    },
    isDesc() {
      return this.params.order.includes("desc");
    },
    ...mapState({
      total: (state) => state.search.searchList.total,
      totalPages: (state) => state.search.searchList.totalPages,
    }),
  },
  methods: {
    getData() {
      this.$store.dispatch("getSearchList", this.params);
    },
    // 移除面包屑-分类名
    removeCategoryName() {
      this.params.categoryName = "";
      // 分类名置空，对应id也需要置空
      this.params.category1Id = undefined;
      this.params.category2Id = undefined;
      this.params.category3Id = undefined;
      // this.getData()
      // 地址栏也需要修改，但是不能删掉params参数
      this.$router.push({
        name: "search",
        params: this.$route.params,
      });
    },
    // 移除面包屑-关键字
    removeKeyword() {
      this.params.keyword = undefined;
      // 通知 header 组件清除关键字
      this.$bus.$emit("clearKeyword");

      this.$router.push({
        name: "search",
        query: this.$route.query,
      });
    },
    // 移除面包屑-品牌
    removeTrademark() {
      this.params.trademark = "";
      this.getData();
    },
    // 移除面包屑-属性
    removeAttr(index) {
      // 移除顺序任意的，不能简单使用 pop 方法
      // this.params.props.pop();
      this.params.props.splice(index, 1);
      this.getData();
    },

    // 自定义事件 获取子组件传递的数据
    getTrademarkInfo(info) {
      this.params.trademark = info;
      this.getData();
    },
    getAttrInfo(info) {
      // 数组去重
      if (!this.params.props.includes(info)) {
        this.params.props.push(info);
        this.getData();
      }
    },
    // 获取当前页数据
    getCurPageNo(pageNo) {
      this.params.pageNo = pageNo;
      this.getData();
    },
    // 升降序查询
    changeOrder() {
      if (this.params.order.includes("asc")) {
        this.params.order = this.params.order.replace("asc", "desc");
      } else {
        this.params.order = this.params.order.replace("desc", "asc");
      }
      this.getData();
    },
  },
  watch: {
    $route() {
      Object.assign(this.params, this.$route.query, this.$route.params);
      this.getData();
      // 清除上一次请求的三级分类id参数
      this.params.category1Id = "";
      this.params.category2Id = "";
      this.params.category3Id = "";
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
