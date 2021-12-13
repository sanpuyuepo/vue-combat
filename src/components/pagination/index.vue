<template>
  <div class="pagination">
    <button :disabled="pageNo === 1" @click="sendCurPageNo(pageNo - 1)">
      上一页
    </button>
    <button v-if="continuousNum.start > 1" @click="sendCurPageNo(1)" :class=" {active: pageNo === 1} ">1</button>
    <button v-if="continuousNum.start > 2">···</button>

    <button
      v-for="(page, index) in continuousNum.end"
      :key="index"
      @click="sendCurPageNo(page)"
      :class=" {active: pageNo === page}"
    >
      <template v-if="page >= continuousNum.start">
        {{ page }}
      </template>
    </button>

    <button v-if="continuousNum.end < totalPages - 1">···</button>
    <button v-if="continuousNum.end < totalPages" @click="sendCurPageNo(totalPages)" :class=" {active: pageNo === totalPages}">
      {{ totalPages }}
    </button>
    <button :disabled="pageNo === totalPages" @click="sendCurPageNo(pageNo + 1)">
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "totalPages", "continuous"],
  computed: {
    continuousNum() {
      const { pageNo, continuous, totalPages } = this;
      let start = 1,
        end = 1;
      if (totalPages > continuous) {
        start = pageNo - parseInt(continuous / 2);
        end = pageNo + parseInt(continuous / 2);

        if (start < 0) {
          start = 1;
          end = continuous;
        }

        if (end > totalPages) {
          end = totalPages;
          start = end - continuous + 1;
        }
        
      } else {
        end = totalPages;
      }
      console.log({start, end});
      return { start, end };
    },
  },
  methods: {
    sendCurPageNo(value) {
      this.$emit("getCurPageNoCustom", value);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
