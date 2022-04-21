<template>
  <div class="content">
    <div class="text">
      商店所有订单
    </div>
    <el-table
      :data="tableData"
      :stripe="true"
      border
      fit
      highlight-current-row
      style="width: 100%;margin-top:3%"
    >
      <el-table-column
        align="center"
        fixed
        prop="time"
        label="预约时间"
        width="250"
      >
      </el-table-column>
      <el-table-column align="center" prop="name" label="姓名">
      </el-table-column>
      <el-table-column align="center" prop="shop.price" label="价格">
      </el-table-column>
      <el-table-column align="center" prop="phone" label="电话">
      </el-table-column>
      <el-table-column align="center" prop="orderstatusitem.name" label="状态">
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="{ row }">
          <!-- <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          移除
        </el-button> -->
          <!-- <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button
            v-if="row.status != 'published'"
            size="mini"
            type="success"
            @click="handleModifyStatus(row, 'published')"
          >
            Publish
          </el-button> -->
          <el-button type="danger" size="mini" @click="del(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="cur"
      :hide-on-single-page="true"
      class="pg"
      background
      layout="prev, pager, next"
      :total="totalelement"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getshopbyuid } from "@/api/shop";
import { getallbysid,delorder } from "@/api/order";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      tableData: [],
      shopid: "",
      page: 0,
      uid: "",
      totalelement: 0,
    };
  },
  computed: {
    ...mapGetters(["userid", "token"]),
  },
  methods: {
    cur(e) {
      this.page=e-1
      getallbysid(this.shopid, e - 1)
        .then((re) => {
          this.tableData = re.data.content;
          this.totalelement = re.data.totalElements;
        })
        .catch((err) => {});
    },

    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    del(r) {
      console.log(r)
       delorder(r.id)
        .then((res) => {
         this.$message({
          message: '删除订单成功！',
          type: 'warning'
        });
        getallbysid(this.shopid, this.page)
        .then((re) => {
          this.tableData = re.data.content;
          this.totalelement = re.data.totalElements;
        })
        .catch((err) => {});
        })
        .catch((err) => {});
    },
  },
  created() {
    getshopbyuid(this.userid)
      .then((res) => {
        this.shopid = res.data.id;
        getallbysid(res.data.id, this.page)
          .then((re) => {
            this.tableData = re.data.content;
            this.totalelement = re.data.totalElements;
          })
          .catch((err) => {});
      })
      .catch((err) => {});
  },
};
</script>
<style lang="scss" scoped>
.pg {
  margin-top: 15px;
  text-align: center;
}
.text{
  margin-top: 3%;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
}

</style>

