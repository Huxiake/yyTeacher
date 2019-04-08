<template>
  <div class="paeg-container">
    <div class="pageHeader">
      <breadcrumb/>
      <div>案例管理</div>
    </div>
    <div class="pageHeaderWrapper">
      <div class="table-card">
        <div class="table-card-body">
          <div class="table-tools">
            <el-row :gutter="16">
              <el-col :span="14">
                <el-button type="primary" @click="handleNewCase">新建案例</el-button>
              </el-col>
              <el-col :span="3">
                <label>主题</label>
                <el-select v-model="search.themeId" placeholder="请选择" style="width:70%">
                  <el-option
                    label="不限"
                    value=""/>
                  <el-option
                    v-for="(item, index) in filters.themeId"
                    :key="index"
                    :label="item.name"
                    :value="item.id"/>
                </el-select>
              </el-col>
              <el-col :span="3">
                <label>题目</label>
                <el-select v-model="search.titleId" placeholder="请选择" style="width:70%">
                  <el-option
                    label="不限"
                    value=""/>
                  <el-option
                    v-for="(item, index) in filters.titleId"
                    :key="index"
                    :label="item.name"
                    :value="item.id"/>
                </el-select>
              </el-col>
              <el-col :span="3">
                <label>状态</label>
                <el-select v-model="search.auditStatus" placeholder="请选择" style="width:70%">
                  <el-option
                    v-for="(item, index) in filters.auditStatus"
                    :key="index"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </el-col>
              <el-col :span="1">
                <el-button type="primary" @click="handleGetCase">查询</el-button>
              </el-col>
            </el-row>
          </div>
          <div class="table-body">
            <el-table
              :data="caseList"
              @row-click="handleRow"
            >
              <el-table-column
                key="1"
                prop="name"
                label="案例名称"
                align="center"
              />
              <el-table-column
                key="11"
                prop="onShelfBy"
                align="center"
                label="作者"
              />
              <el-table-column
                key="2"
                prop="themeName"
                align="center"
                label="主题"
              />
              <el-table-column
                key="3"
                prop="titleName"
                align="center"
                label="题目"
              />
              <!-- <el-table-column
                key="4"
                align="center"
                label="是否上架"
              >
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.isOnShelf" type="success">是</el-tag>
                  <el-tag v-if="!scope.row.isOnShelf" type="danger">否</el-tag>
                </template>
              </el-table-column> -->
              <el-table-column
                key="8"
                align="center"
                label="审核状态"
              >
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.auditStatus === 'to_audit'" type="info">待审核</el-tag>
                  <el-tag v-if="scope.row.auditStatus === 'audit_refuse'" type="danger">审核不通过</el-tag>
                  <el-tag v-if="scope.row.auditStatus === 'audit_pass'" type="success">审核通过</el-tag>
                </template>
              </el-table-column>
              <!-- <el-table-column
                key="9"
                align="center"
                label="状态"
              >
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.status === 'enabled'" type="success">正常</el-tag>
                  <el-tag v-if="scope.row.status === 'disabled'" type="danger">禁用</el-tag>
                </template>
              </el-table-column> -->
              <!-- <el-table-column
                key="7"
                align="center"
                label="评价"
              >
                <template slot-scope="scope">
                  <svg-icon icon-class="zan"/><span>{{ scope.row.praiseCount }}</span>
                  <svg-icon icon-class="pinglun"/><span>{{ scope.row.commentCount }}</span>
                  <svg-icon icon-class="question"/><span>{{ scope.row.questionCount }}</span>
                </template>
              </el-table-column> -->
              <el-table-column
                key="17"
                align="center"
                label="操作"
              >
                <template slot-scope="scope">
                  <el-button
                    :disabled="!(scope.row.userId === userId)"
                    size="mini"
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    @click="handleEdit(scope.row.id)"/>
                  <el-button
                    :disabled="!(scope.row.userId === userId)"
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    @click="handleDelete(scope.row.id)"/>
                </template>
              </el-table-column>
              <!-- <el-table-column
                align="center"
                label="上下架"
              >
                <template slot-scope="scope">
                  <el-button
                    v-if="!scope.row.isOnShelf"
                    :disabled="!(scope.row.userId === userId)"
                    size="mini"
                    type="danger"
                    @click="handleOnShelf(scope.row.id)">上架</el-button>
                  <el-button
                    v-if="scope.row.isOnShelf"
                    :disabled="!(scope.row.userId === userId)"
                    size="mini"
                    type="danger"
                    @click="handleUnShelf(scope.row.id)">下架</el-button>
                </template>
              </el-table-column> -->
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCase, deleteCase, getCaseThemeId, getCaseTitleId, caseOnshelf, caseUnshelf } from '@/api/case'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  components: {
    Breadcrumb
  },
  data() {
    return {
      filters: {
        themeId: [],
        titleId: [],
        auditStatus:
        [
          {
            label: '全部',
            value: ''
          },
          {
            label: '待审核',
            value: 'to_audit'
          },
          {
            label: '审核不通过',
            value: 'audit_refuse'

          },
          {
            label: '审核通过',
            value: 'audit_pass'
          }
        ]
      },
      search: {
        auditStatus: '',
        pageNum: 0,
        pageSize: 10,
        themeId: '',
        titleId: ''
      },
      caseList: []
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  created() {
    this.handleGetCase()
    this.getCaseAllIdList()
  },
  methods: {
    handleGetCase() {
      getCase(this.search).then(response => {
        if (response.data.errorMsg === '操作成功') {
          this.caseList = response.data.data.rows
        }
      })
    },
    handleNewCase() {
      this.$router.push('/case/manage/add')
    },
    handleRow(row, column, event) {
      if ((column.target._prevClass !== 'el-icon-edit') && (column.target._prevClass !== 'el-icon-delete')) {
        this.$router.push({
          name: 'details',
          params: { id: row.id }
        })
      }
    },
    handleEdit(id) {
      console.log(id)
      this.$router.push({
        name: 'caseedit',
        params: { id: id }
      })
    },
    handleDelete(id) {
      this.$confirm('此操作将删除该案例, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCase(id).then(res => {
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
      caseOnshelf(id).then(res => {
        if (res.data.errorMsg === '操作成功') {
          this.$message({
            type: 'success',
            message: '已上架!'
          })
          this.handleGetCase()
        }
      })
    },
    handleUnShelf(id) {
      caseUnshelf(id).then(res => {
        if (res.data.errorMsg === '操作成功') {
          this.$message({
            type: 'info',
            message: '已下架!'
          })
          this.handleGetCase()
        }
      })
    },
    getCaseAllIdList() {
      getCaseThemeId().then(res => {
        if (res.data.errorMsg === '操作成功') {
          this.filters.themeId = res.data.data
        }
      })
      getCaseTitleId().then(res => {
        if (res.data.errorMsg === '操作成功') {
          this.filters.titleId = res.data.data
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

