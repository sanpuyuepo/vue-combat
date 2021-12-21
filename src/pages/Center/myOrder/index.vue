<template>
  <div class="order-right">
    <div class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
            <tr>
              <th width="29%">商品</th>
              <th width="31%">订单详情</th>
              <th width="13%">收货人</th>
              <th>金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="orders">
        <table class="order-item" v-for="record in myOrder.records" :key="record.id">
          <thead>
            <tr>
              <th colspan="5">
                <span class="ordertitle"
                  >{{record.createTime}}　订单编号：{{record.outTradeNo}}
                  <span class="pull-right delete"
                    ><img src="../images/delete.png" /></span
                ></span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in record.orderDetailList" :key="item.id">
              <td width="60%" >
                <div class="typographic">
                  <img :src="item.imgUrl" style="width: 100px;"/>
                  <a href="#" class="block-text"
                    >{{item.skuName}}</a
                  >
                  <span>x{{item.skuNum}}</span>
                  <a href="#" class="service">售后申请</a>
                </div>
              </td>
              <td :rowspan="record.orderDetailList.length" v-if="index === 0" width="8%" class="center">{{record.consignee}}</td>
              <td :rowspan="record.orderDetailList.length" v-if="index === 0" width="13%" class="center">
                <ul class="unstyled">
                  <li>总金额¥{{record.totalAmount}}.00</li>
                  <li>在线支付</li>
                </ul>
              </td>
              <td :rowspan="record.orderDetailList.length" v-if="index === 0" width="8%" class="center">
                <a href="#" class="btn">{{record.orderStatusName}} </a>
              </td>
              <td :rowspan="record.orderDetailList.length" v-if="index === 0" width="13%" class="center">
                <ul class="unstyled">
                  <li>
                    <a href="mycomment.html" target="_blank">评价|晒单</a>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="choose-order">
        <!-- 分页 -->
          <Pagination
            :pageNo="page"
            :pageSize="limit"
            :total="myOrder.total"
            :totalPages="myOrder.pages"
            :continuous="5"
            @getCurPageNoCustom="getCurPageNo"
          />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyOrder",
  data() {
    return {
      page: 1, 
      limit: 3,
      myOrder: {}
    };
  },
  mounted() {
    this.getData()
  }, 
  methods: {
    async getData() {
      let res = await this.$API.reqMyOrderList(this.page, this.limit)
      if (res.code === 200) {
        this.myOrder = res.data
      }
    },
    getCurPageNo(page) {
      this.page = page;
      this.getData();
    }
  }
};
</script>

<style scoped></style>
