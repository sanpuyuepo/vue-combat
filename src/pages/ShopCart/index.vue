<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked === 1" @change="updateCheckStatus(cart, $event)" />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{cart.skuName}}
            </div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{cart.skuPrice}}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeSkuNum(cart, minus)">-</a>
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="cart.skuNum"
            />
            <a href="javascript:void(0)" class="plus" @click="changeSkuNum(cart, add)" >+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuNum * cart.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCart(cart.skuId)" >删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked" @change="updateAllCheckStatus($event)" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import utils from '@/utils'

export default {
  name: "ShopCart",
  data() {
    return {
      minus: 'minus',
      add: 'add'
    }
  },
  mounted() {
    this.getShopCartList();
  },
  methods: {
    getShopCartList() {
      this.$store.dispatch('getShopCartList')
    },
    // 修改产品数量, 需要节流处理
    changeSkuNum: utils.throttle(async function(cart, type) {
      let step = 1;
      if (type === 'minus') {
        if (!(cart.skuNum > 1)) return;
        step = -1;
      }

      try {
        await this.$store.dispatch('addToCart', {skuId: cart.skuId, skuNum: step});
        this.getShopCartList();
      } catch (error) {
        alert('error.message')
      }
    }, 200),
    // 删除
    async deleteCart(skuId) {
      try {
        await this.$store.dispatch('deleteCartListBySkuId', skuId);
        this.getShopCartList();
      } catch (error) {
        alert('error.message')
      }
    },
    async deleteAllCheckedCart() {
      try {
        await this.$store.dispatch('deleteAllCheckedCart')
        this.getShopCartList();
      } catch (error) {
        alert('error.message')
      }
    },
    // 修改勾选状态
    async updateCheckStatus(cart, event) {
       try {
        let isChecked = event.target.checked ? '1' : '0';
        await this.$store.dispatch('updateCheckStatus', {skuId: cart.skuId, isChecked});
        this.getShopCartList();
      } catch (error) {
        alert('error.message')
      }
    },
    // 全部修改勾选状态
    async updateAllCheckStatus(event) {
      try {
        let checked = event.target.checked ? '1' : '0';
        
        await this.$store.dispatch('updateAllCheckStatus', checked)
        this.getShopCartList();
      } catch (error) {
        alert('error.message')
      }
    }
  },
  computed: {
    ...mapGetters(['cartList']),
    cartInfoList() {
      return this.cartList.cartInfoList || []
    },
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach(item => {
        sum += item.skuNum * item.skuPrice
      });
      return sum;
    },
    isAllChecked() {
      return this.cartInfoList.every(cart => cart.isChecked === 1);
    }
  }
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 5%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 45%;
      }

      .cart-th4 {
        width: 17%;
      }
      .cart-th6 {
        width: 13%;
      }

      .cart-th3,
      .cart-th5 {
        width: 10%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;
      

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
       

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 5%;
        }

        .cart-list-con2 {
          width: 45%;
          

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
