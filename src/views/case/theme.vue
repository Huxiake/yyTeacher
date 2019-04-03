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
                <el-button type="primary" @click="handleGetCase">新建主题</el-button>
              </el-col>
              <el-col :span="7">
                <el-input v-model="search.name"/>
              </el-col>
              <el-col :span="1">
                <el-button type="primary" @click="handleGetCase">查询</el-button>
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
                key="3"
                prop="parentName"
                label="父主题名称"
                width="200"
              />
              <el-table-column
                key="1"
                prop="description"
                label="描述"
              />
              <el-table-column
                key="status"
                label="状态"
                width="100"
              >
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.status === 'enabled'" type="success">正常</el-tag>
                  <el-tag v-if="scope.row.status === 'disabled'" type="danger">禁用</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button
                    :disabled="!(scope.row.createBy === userId)"
                    size="mini"
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    @click="handleEdit(scope.$index, scope.row)"/>
                  <el-button
                    :disabled="!(scope.row.createBy === userId)"
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    @click="handleDelete(scope.$index, scope.row)"/>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCaseThemes } from '@/api/case'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  components: {
    Breadcrumb
  },
  data() {
    return {
      search: {
        name: '',
        pageNum: 0,
        pageSize: 10
      },
      caseThemesList: []
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  created() {
    this.handleGetCase()
  },
  methods: {
    handleGetCase() {
      getCaseThemes(this.search).then(response => {
        if (response.data.errorMsg === '操作成功') {
          this.caseThemesList = response.data.data.rows
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

