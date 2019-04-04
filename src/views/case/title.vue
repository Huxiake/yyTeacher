<template>
  <div class="paeg-container">
    <div class="pageHeader">
      <breadcrumb/>
      <div>案例学习管理</div>
    </div>
    <div class="pageHeaderWrapper">
      <div class="table-card">
        <div class="table-card-body">
          <div class="table-tools">
            <el-row :gutter="16">
              <el-col :span="16">
                <el-button type="primary" @click="handleAdd">新建题目</el-button>
              </el-col>
              <el-col :span="7">
                <el-input v-model="search.name"/>
              </el-col>
              <el-col :span="1">
                <el-button type="primary" @click="handleGetCaseTitles">查询</el-button>
              </el-col>
            </el-row>
          </div>
          <div class="table-body">
            <el-table
              :data="caseTitlesList"
            >
              <el-table-column
                key="2"
                prop="name"
                label="主题名称"
                align="center"
                width="200"
              />
              <el-table-column
                key="3"
                prop="subjectName"
                align="center"
                label="科目"
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
                align="center"
                width="100"
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
            <el-dialog :visible.sync="dialogEditVisible" title="修改题目">
              <el-form :model="editTitle">
                <el-form-item label-width="200" label="题目名称">
                  <el-input v-model="editTitle.name"/>
                </el-form-item>
                <el-form-item label-width="200" label="题目描述">
                  <el-input v-model="editTitle.description"/>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEditVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleEditPut">确 定</el-button>
              </div>
            </el-dialog>
            <el-dialog :visible.sync="dialogAddVisible" title="新建题目">
              <el-form :model="addTitle">
                <el-form-item label-width="200" label="题目名称">
                  <el-input v-model="addTitle.name"/>
                </el-form-item>
                <el-form-item label-width="200" label="题目描述">
                  <el-input v-model="addTitle.description"/>
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
import { getCaseTitles, editCaseTitles, addCaseTitles, deleteCaseTitles, caseTitleAble } from '@/api/case'
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
      caseTitlesList: [],
      nowId: '',
      editTitle: {
        id: '',
        name: '',
        description: ''
      },
      addTitle: {
        name: '',
        description: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  created() {
    this.handleGetCaseTitles()
  },
  methods: {
    handleGetCaseTitles() {
      getCaseTitles(this.search).then(response => {
        if (response.data.errorMsg === '操作成功') {
          this.caseTitlesList = response.data.data.rows
        }
      })
    },
    handleEdit(data) {
      console.log(data)
      this.editTitle = {}
      this.dialogEditVisible = true
      this.nowId = data.id
      this.editTitle.name = data.name
      this.editTitle.description = data.description
    },
    handleAdd(id) {
      this.dialogAddVisible = true
      this.addTitle = {}
    },
    handleEditPut() {
      editCaseTitles(this.nowId, this.editTitle).then(res => {
        if (res.data.errorMsg === '操作成功') {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.handleGetCaseTitles()
          this.dialogEditVisible = false
        }
      })
    },
    handleAddPut() {
      addCaseTitles(this.addTitle).then(res => {
        if (res.data.errorMsg === '操作成功') {
          this.$message({
            type: 'success',
            message: '新建成功!'
          })
          this.handleGetCaseTitles()
          this.dialogAddVisible = false
        }
      })
    },
    handleDelete(id) {
      this.$confirm('此操作将删除该题目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCaseTitles(id).then(res => {
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
      caseTitleAble('enable', id).then(res => {
        if (res.data.errorMsg === '操作成功') {
          this.$message({
            type: 'success',
            message: '已启用!'
          })
          this.handleGetCaseTitles()
        }
      })
    },
    handleUnShelf(id) {
      caseTitleAble('disable', id).then(res => {
        if (res.data.errorMsg === '操作成功') {
          this.$message({
            type: 'info',
            message: '已禁用!'
          })
          this.handleGetCaseTitles()
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

