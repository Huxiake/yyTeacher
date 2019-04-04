<template>
  <div class="paeg-container">
    <div class="pageHeader">
      <breadcrumb/>
      <div>案例主题管理</div>
    </div>
    <div class="pageHeaderWrapper">
      <div class="table-card">
        <div class="table-card-body">
          <div class="table-tools">
            <el-row :gutter="16">
              <el-col :span="16">
                <el-button type="primary" @click="handleAdd">新建主题</el-button>
              </el-col>
              <el-col :span="7">
                <el-input v-model="search.name"/>
              </el-col>
              <el-col :span="1">
                <el-button type="primary" @click="handleGetCaseThemes">查询</el-button>
              </el-col>
            </el-row>
          </div>
          <div class="table-body">
            <el-table
              :data="caseThemesList"
            >
              <el-table-column
                key="2"
                prop="name"
                label="主题名称"
                width="200"
              />
              <el-table-column
                key="1"
                prop="description"
                align="center"
                label="描述"
              />
              <el-table-column
                key="status"
                label="状态"
                width="100"
                align="center"
              >
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.status === 'enabled'" type="success">正常</el-tag>
                  <el-tag v-if="scope.row.status === 'disabled'" type="danger">禁用</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                  <el-button
                    :disabled="!(scope.row.createBy === userId)"
                    size="mini"
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    @click="handleEdit(scope.row)"/>
                  <el-button
                    :disabled="!(scope.row.createBy === userId)"
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    @click="handleDelete(scope.$index, scope.row)"/>
                  <el-button
                    v-if="scope.row.status === 'disabled'"
                    :disabled="!(scope.row.createBy === userId)"
                    size="mini"
                    type="success"
                    @click="handleOnShelf(scope.row.id)">启用</el-button>
                  <el-button
                    v-if="scope.row.status === 'enabled'"
                    :disabled="!(scope.row.createBy === userId)"
                    size="mini"
                    type="danger"
                    @click="handleUnShelf(scope.row.id)">禁用</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-dialog :visible.sync="dialogEditVisible" title="修改主题">
              <el-form :model="editTheme">
                <el-form-item label-width="200" label="主题名称">
                  <el-input v-model="editTheme.name"/>
                </el-form-item>
                <el-form-item label-width="200" label="主题描述">
                  <el-input v-model="editTheme.description"/>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEditVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleEditPut">确 定</el-button>
              </div>
            </el-dialog>
            <el-dialog :visible.sync="dialogAddVisible" title="新建主题">
              <el-form :model="addTheme">
                <el-form-item label-width="200" label="主题名称">
                  <el-input v-model="addTheme.name"/>
                </el-form-item>
                <el-form-item label-width="200" label="主题描述">
                  <el-input v-model="addTheme.description"/>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAddPut">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCaseThemes, addCaseThemes, editCaseThemes, deleteCaseThemes, caseThemeAble } from '@/api/case'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  components: {
    Breadcrumb
  },
  data() {
    return {
      dialogEditVisible: false,
      dialogAddVisible: false,
      search: {
        name: '',
        pageNum: 0,
        pageSize: 10
      },
      caseThemesList: [],
      nowId: '',
      editTheme: {
        name: '',
        parentId: ''
      },
      addTheme: {
        description: '',
        name: '',
        parentId: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  created() {
    this.handleGetCaseThemes()
  },
  methods: {
    handleGetCaseThemes() {
      getCaseThemes(this.search).then(response => {
        if (response.data.errorMsg === '操作成功') {
          this.caseThemesList = response.data.data.rows
        }
      })
    },
    handleEdit(data) {
      this.editTheme = {}
      console.log(data)
      this.dialogEditVisible = true
      this.nowId = data.id
      this.editTheme.name = data.name
    },
    handleAdd(id) {
      this.dialogAddVisible = true
      this.addTheme = {}
    },
    handleEditPut() {
      editCaseThemes(this.nowId, this.editTheme).then(res => {
        if (res.data.errorMsg === '操作成功') {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.handleGetCaseThemes()
          this.dialogEditVisible = false
        }
      })
    },
    handleAddPut() {
      addCaseThemes(this.addTheme).then(res => {
        if (res.data.errorMsg === '操作成功') {
          this.$message({
            type: 'success',
            message: '新建成功!'
          })
          this.handleGetCaseThemes()
          this.dialogAddVisible = false
        }
      })
    },
    handleDelete(id) {
      this.$confirm('此操作将删除该主题, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCaseThemes(id).then(res => {
          if (res.data.errorMsg === '操作成功') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.caseComments()
          }
        })
      })
    },
    handleOnShelf(id) {
      caseThemeAble('enable', id).then(res => {
        if (res.data.errorMsg === '操作成功') {
          this.$message({
            type: 'success',
            message: '已启用!'
          })
          this.handleGetCaseThemes()
        }
      })
    },
    handleUnShelf(id) {
      caseThemeAble('disable', id).then(res => {
        if (res.data.errorMsg === '操作成功') {
          this.$message({
            type: 'info',
            message: '已禁用!'
          })
          this.handleGetCaseThemes()
        }
      })
    }
  }
}
</script>

<style lang="scss">
.paeg-container {
  color: #000000;
}
.pageHeader {
    background: #fff;
    padding: 16px 32px;
    border-bottom: 1px solid #e8e8e8;
}
.pageHeaderWrapper {
    margin: 24px 24px 0;
}
.table-card {
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    color: rgba(0,0,0,.65);
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
    background: #fff;
    border-radius: 2px;
    position: relative;
    transition: all .3s;
}
.table-card-body {
  padding:24px 32px;
}
</style>

