<template>
  <div>
    <div class="title">编辑商店简介</div>
    <quill-editor
      class="ql-editor"
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    >
    </quill-editor>
    <el-button class="savebt" @click="Postintro()" type="primary"
      >保存商店简介</el-button
    >
  </div>
</template>
<script>
import { postintro ,getshopbyuid} from "@/api/shop";
import { mapGetters } from "vuex";
import { quillEditor } from "vue-quill-editor";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
Quill.register("modules/ImageExtend", ImageExtend);
export default {
  data() {
    return {
      content: null,
      editorOption: {
        modules: {
          ImageExtend: {
            name: "file",
            size: 2, // 单位为M, 1M = 1024KB
            action: "http://localhost:8080/updateimg",
            headers: (xhr) => {},
            response: (res) => {
              console.log(res);
              return res.message;
            },
          },
          toolbar: {
            container: container,
            handlers: {
              image: function () {
                QuillWatch.emit(this.quill.id);
              },
            },
          },

          imageResize: {
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white",
            },
          },
        },
      },
    };
  },

  components: {
    quillEditor,
  },
  created(){
      getshopbyuid(this.userid).then((res) => {
        this.content=res.data.content
      });   
  },
  methods: {
    Postintro() {
      postintro({intro: this.content, uid:this.userid }).then((res) => {
        this.$message({
          message: "保存成功",
          type: "success",
        });
      });
    },
    onEditorBlur(e) {
      // console.log(e, "失去焦点事件");
      // console.log(this.content);
    },
    onEditorFocus(e) {
      //console.log(e, "获得焦点事件");
    },
    onEditorChange(e) {
      //  console.log(e, "内容改变事件");
    },
  },
  mounted() {
    // 富文本提示信息
    this.$nextTick(() => {
      const titleConfig = {
        "ql-bold": "加粗",
        "ql-color": "颜色",
        "ql-font": "字体",
        "ql-code": "插入代码",
        "ql-italic": "斜体",
        "ql-link": "添加链接",
        "ql-background": "背景颜色",
        "ql-size": "字体大小",
        "ql-strike": "删除线",
        "ql-script": "上标/下标",
        "ql-underline": "下划线",
        "ql-blockquote": "引用",
        "ql-header": "标题",
        "ql-indent": "缩进",
        "ql-list": "列表",
        "ql-align": "文本对齐",
        "ql-direction": "文本方向",
        "ql-code-block": "代码块",
        "ql-formula": "公式",
        "ql-image": "图片",
        "ql-video": "视频",
        "ql-clean": "清除字体样式",
        "ql-upload": "文件",
      };
      const oToolBar = document.getElementsByClassName("ql-editor")[0];
      const aButton = oToolBar.querySelectorAll("button");
      const aSelect = oToolBar.querySelectorAll("select");
      aButton.forEach(function (item) {
        if (item.className === "ql-script") {
          item.value === "sub" ? (item.title = "下标") : (item.title = "上标");
        } else if (item.className === "ql-indent") {
          item.value === "+1"
            ? (item.title = "向右缩进")
            : (item.title = "向左缩进");
        } else {
          item.title = titleConfig[item.classList[0]];
        }
      });
      aSelect.forEach(function (item) {
        item.parentNode.title = titleConfig[item.classList[0]];
      });
    });
  },
   computed: {
    ...mapGetters(["userid", "token"]),
  },
};
</script>
<style lang="scss" scoped>
.title {
  font-size: 28px;
  font-weight: bold;
  margin: 5% 0px 0px 41%;
}
.ql-editor {
  width: 80%;
  margin-left: 10%;
  ::v-deep.ql-container {
    height: 500px;
  }
}
.savebt {
  margin-left: 42%;
}
</style>