<template>
  <div class="app-container">
    <div class="ud-img">
      <el-upload
        action="http://localhost:8080/updateimg"
        :show-file-list="false"
        :accept="'image/*'"
        :on-success="handleSuccess"
      >
        <el-image
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            width: 300px;
            height: 180px;
            background: #f5f7fa;
            color: #909399;
            margin-bottom: 10px;
          "
          :src="bannerUrl"
          ><div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i></div
        ></el-image>
        <el-button type="primary" size="medium">上传背景图片</el-button>
      </el-upload>
    </div>
    <el-form
      :ref="shopform"
      :model="shopform"
      label-width="80px"
      :rules="rules"
    >
      <el-form-item label="店铺名称" prop="name">
        <el-input v-model="shopform.name" style="width: 550px"></el-input>
      </el-form-item>
      <el-form-item label="店铺标题" prop="title">
        <el-input v-model="shopform.title" style="width: 550px"></el-input>
      </el-form-item>
      <el-form-item label="店铺地址" prop="location">
        <el-input v-model="shopform.location" style="width: 550px"></el-input>
      </el-form-item>
      <el-form-item label="预约价格" prop="price">
        <el-input
          v-model.number="shopform.price"
          style="width: 150px"
        ></el-input>
      </el-form-item>
      <el-form-item label="店铺电话" prop="phone">
        <el-input
          v-model.number="shopform.phone"
          style="width: 250px"
        ></el-input>
      </el-form-item>
      <el-form-item label="店铺类型" prop="fenlei">
        <el-select v-model="shopform.fenlei" placeholder="请选择店铺分类">
          <el-option
            v-for="(item, index) in fenleilist"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="营业时间" prop="date1" style="width: 550px">
        <el-col :span="11">
          <!-- <el-form-item prop="date1">
            <el-time-picker
              type="date"
              placeholder="选择日期"
              v-model="shopform.date1"
              style="width: 100%"
            ></el-time-picker>
          </el-form-item> -->
          <el-form-item prop="date1">
            <el-time-select
              placeholder="起始时间"
              v-model="shopform.date1"
              :picker-options="{
                start: '00:30',
                step: '00:30',
                end: '23:30',
              }"
            >
            </el-time-select>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2" style="text-align: center">-</el-col>
        <el-col :span="11">
          <!-- <el-form-item prop="date2">
            <el-time-picker
              placeholder="选择时间"
              v-model="shopform.date2"
              style="width: 100%"
            ></el-time-picker>
          </el-form-item> -->
          <el-form-item prop="date2">
            <el-time-select
              placeholder="结束时间"
              v-model="shopform.date2"
              :picker-options="{
                start: '00:30',
                step: '00:30',
                end: '23:30',
                minTime: shopform.date1,
              }"
            >
            </el-time-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="营业">
        <el-switch v-model="shopform.open"></el-switch>
      </el-form-item>
      <el-form-item :label="statuslab" class="status">
        <el-switch
          v-model="shopform.shopstatus"
          active-color="#13ce66"
          inactive-color="#ff4949"
          disabled
        >
        </el-switch>
      </el-form-item>
      <el-form-item style="margin-left: 15%">
        <el-button type="primary" @click="onSubmit(shopform)"
          >保存信息</el-button
        >
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getcategory, saveshop, getshopbyuid } from "@/api/shop";
import { mapGetters } from "vuex";
export default {
  filters: {},
  data() {
    return {
      shopform: {
        name: "",
        price: "",
        title: "",
        fenlei: "",
        date1: "",
        open: false,
        date2: "",
        location: "",
        phone: "",
        uid: "",
        imgurl: "",
        shopstatus: false,
      },
      statuslab: "未提交审核",
      //后台传回来的背景图的链接
      bannerUrl: "",
      shopstatus: false,
      fenleilist: { valuetype: "" },
      rules: {
        name: [
          { required: true, message: "请输入商店名称", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" },
        ],
        price: [
          { required: true, message: "价格不能为空" },
          { type: "number", message: "价格必须为数字值" },
        ],
        phone: [
          {
            required: true,
            type: "number",
            message: "请输数字",
            trigger: "blur",
          },
        ],
        location: [
          { required: true, message: "请输入商店地址", trigger: "blur" },
          {
            min: 2,
            max: 25,
            message: "长度在 2 到 25 个字符",
            trigger: "blur",
          },
        ],
        title: [
          { required: true, message: "请输入商店标题", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "长度在 5 到 20 个字符",
            trigger: "blur",
          },
        ],
        fenlei: [
          { required: true, message: "请选择店铺分类", trigger: "change" },
        ],
        date1: [
          {
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        date2: [
          {
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
      },
    };
  },
  created() {
    this.fetchData();
    getcategory().then((res) => {
      this.fenleilist = res.data;
    });
    getshopbyuid(this.userid).then((res) => {
      this.shopform.name = res.data.name;
      this.shopform.price = res.data.price;
      this.shopform.title = res.data.title;
      this.shopform.date1 = res.data.begintime;
      if (res.data.subscribeStatus.id == 0) {
        this.shopform.open = true;
      } else {
        this.shopform.open = false;
      }
      this.shopform.date2 = res.data.endtime;
      this.shopform.location = res.data.location;
      this.shopform.phone = res.data.phone;
      this.shopform.imgurl = res.data.imgurl;
      this.shopform.fenlei = res.data.categoryId;
      this.bannerUrl = res.data.imgurl;
      if (res.data.status == 1) {
        this.shopform.shopstatus = true;
        this.statuslab = "审核通过";
      } else if (res.data.status == 0) {
        this.shopform.shopstatus = false;
        this.statuslab = "商店待审核";
      } else {
        this.shopform.shopstatus = false;
        this.statuslab = "审核未通过";
      }
    });
  },
  computed: {
    ...mapGetters(["userid", "token"]),
  },
  methods: {
    onSubmit(shopform) {
      this.shopform.uid = this.userid;
      this.shopform.imgurl = this.bannerUrl;
      if (this.shopform.imgurl == "") {
        this.$message({
          message: "请上传背景图",
          type: "warning",
        });
      } else {
        this.$refs[shopform].validate((valid) => {
          if (valid) {
            saveshop(this.shopform)
              .then((res) => {
                this.$message({
                  message: "保存成功",
                  type: "success",
                });
              })
              .catch(() => {
                this.$message({
                  message: "保存失败",
                  type: "warning",
                });
              });
          } else {
            return false;
          }
        });
      }
    },
    //上传成功获取后台返回的链接
    handleSuccess: function (result) {
      console.log(result);
      this.bannerUrl = result.message;;
    },
    fetchData() {
      this.listLoading = true;
      // getList().then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
    },
  },
};
</script>
<style lang="scss" scoped>
.app-container {
  width: 60%;
  margin: 0 auto;
  ::v-deep.status {
    .el-form-item__label {
      width: auto !important;
    }
  }
}
.ud-img {
  margin: 0px 15% 15px;
}
</style> 