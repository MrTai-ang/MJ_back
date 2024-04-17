<template>
  <div class="article-page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>面经后台</el-breadcrumb-item>
      <el-breadcrumb-item>面经管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="never"    stripe="">
      <template #header>
        <div class="header">
          <span>共 {{ total }} 条记录</span>
          <el-button
            icon="el-icon-plus"
            size="small"
            type="primary"
            round @click="openDrawer('add')">
            添加面经
          </el-button>
        </div>
      </template>
<!-- =内容区 -->
<el-table
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="stem"
        label="标题"
        width="400">
      </el-table-column>
      <el-table-column
        prop="creator"
        label="作者"
        >
      </el-table-column>
      <el-table-column
        prop="likeCount"
        label="点赞">
      </el-table-column>
      <el-table-column
        prop="views"
        label="浏览">
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="更新日期" width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
        width="120">
        <template #default="{row}">
            <div class="icon_caozuo">
                <i class="el-icon-view" @click="openDrawer('view',row.id)"></i>
<i class="el-icon-edit-outline" @click="openDrawer('edit',row.id)"></i>
<i class="el-icon-delete" @click="del(row.id)"></i>
            </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 参数：size-change每页显示多少条,current-change当前页改变  -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
    <el-drawer
  :title="drawerTitle"
  :visible.sync="drawer"
  :before-close="handleClose"
  size="50%">

  <!-- 添加、修改操作，抽屉的内容是一个表单 -->
  <el-form v-if="drawerType!='view'" ref="form" label-width="80px" :model="form" :rules="rules" >
  <el-form-item label="标题" prop="stem" >
    <el-input  placeholder="输入面经标题" v-model="form.stem"></el-input>
  </el-form-item>
  <el-form-item label="内容" prop="content">
    <!-- 这个富文本编译器的文档提示一些编辑器带有的功能 -->
                                                                <!-- 失去焦点时调用form对象的方法，检验数据 -->
    <quillEditor v-model="form.content"  @blur="$refs.form.validateField('content')" ></quillEditor>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">确认</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
  <!-- 预览操作展示即可 -->
  <div v-else class="article-preview ">
    <h5>{{ form.stem }}</h5>
    <div v-html="form.content"></div>
  </div>
</el-drawer>
  </div>
</template>

<script>
import { ArticleListAPI, addArticleAPI, deleteArticleAPI, ArticleAPI, updateArticleAPI } from '@/api/article'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'article-page',
  components: {
    quillEditor
  },
  data () {
    return {
      drawer: false, // 抽屉默认关闭
      current: 1, // 页码，默认获取第一页的数据
      pageSize: 10, // 每页的数据
      list: [], // 存储面经列表数据
      total: 0, // 共计有多少条数据
      drawerType: 'add', // 打开抽屉后的操作类型
      form: {
        // 要提交的内容
        stem: '',
        content: ''
      },
      rules: {
        stem: [{ required: true, message: '标题必填', trigger: 'blur' }],
        content: [{ required: true, message: '内容必填', trigger: 'blur' }]
      }

    }
  },
  created () {
    this.initData()
  },
  computed: {
    drawerTitle () {
      if (this.drawerType === 'add') {
        return '添加面经'
      } else if (this.drawerType === 'view') {
        return '面经预览'
      } else {
        return '编辑面经'
      }
    }

  },

  methods: {
    async del (obj) {
      try {
        await deleteArticleAPI(obj)
        this.initData() // 重新渲染页面
        this.$message.success('删除成功')
      } catch (err) {
        if (err.response) { this.$message.error(err.response.data.message) } else {
          this.$message.error('删除失败')
        }
      }
    },
    handleSizeChange (val) {
      // 每页多少条变化后触发
      // 形参为每页变化后的值
      // console.log('每页多少条', val)
      this.pageSize = val

      // 重新获取数据
      this.initData()
    },
    handleCurrentChange (val) {
      console.log('当前页码', val)
      this.current = val
      this.initData()
    },
    async initData () {
      const res = await ArticleListAPI(
        {
          current: this.current,
          pageSize: this.pageSize
        }
      )
      //   console.log('页面项：', res)
      this.list = res.data.rows
      this.total = res.data.total
    },
    // 关闭抽屉之前执行的方法
    async openDrawer (val, id) {
      this.drawer = true

      // 添加不需要获取面经详情的：预览、编辑需要获取面经详情
      if (val !== 'add') {
        const res = await ArticleAPI(id)
        console.log('单个面经res:', res)
        this.form.content = res.data.content
        this.form.stem = res.data.stem
        this.form.id = res.data.id // 在form中添加id属性
      } this.drawerType = val
    },
    handleClose (done) {
    //   this.$confirm('确认关闭？')
    //     .then(_ => {
    //       done()
    //     })
      //     .catch(_ => {})
      this.drawer = false
      this.$refs.form?.resetFields()// 重置表单
      delete this.form.id // 彻底删除id属性
    },
    // 提交表单
    onSubmit () {
      // 提交表单时进行完整校验
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // 验证通过，可以提交数据了
          // 判断是添加还是修改操作
          if (this.drawerType === 'add') {
            try {
              await addArticleAPI(this.form)
              // console.log('res', res)
              this.handleClose() // 关闭抽屉
              this.initData() // 重新渲染页面
              this.$message.success('添加成功')
            } catch (err) {
              if (err.response) {
                this.$message.error(err.response.data.message)
              } else {
                this.$message.error('添加失败')
              }
            }
          } else {
            // 修改操作
            try {
              await updateArticleAPI(this.form)
              this.handleClose() // 关闭抽屉
              this.initData() // 重新渲染页面
              this.$message.success('修改成功')
            } catch (err) {
              if (err.response) {
                this.$message.error(err.response.data.message)
              } else {
                this.$message.error('修改失败')
              }
            }
          }
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 25px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px;
  }
  .actions {
    font-size: 18px;
    display: flex;
    justify-content: space-around;
    color: #666;
    > i:hover {
      color: rgba(114, 124, 245, 1);
      cursor: pointer;
    }
  }
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
.el-breadcrumb {
  margin-top: 10px;
}
.el-form {
  padding-right: 40px;
}
.quill-editor {
  ::v-deep .ql-editor {
    height: 300px;
  }
}
.el-rate {
  padding: 10px 0;
}
.article-preview {
  padding: 0 40px 40px 40px;
  > h5 {
    font-size: 20px;
    color: #666;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 30px;
    margin: 0 0 20px 0;
  }
}
.icon_caozuo{
    display: flex;
    justify-content: space-between;
}
</style>
