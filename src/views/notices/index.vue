<template>
  <div class="paeg-container">
    <div class="pageHeader">
      <breadcrumb/>
      <div>通知中心</div>
    </div>
    <div class="pageHeaderWrapper">
      <div class="table-card">
        <div class="table-card-body">
          <div class="table-tools">
            <el-row :gutter="16">
              <el-col :span="10">
                <el-input/>
              </el-col>
              <el-col :span="10">
                <el-button type="primary" @click="handleGetCase">查询</el-button>
              </el-col>
            </el-row>
          </div>
          <div class="table-body">
            <el-table
              :data="caseList"
            >
              <el-table-column
                key="1"
                prop="name"
                label="案例名称"
              />
              <el-table-column
                key="2"
                prop="themeName"
                label="主题"
              />
              <el-table-column
                key="3"
                prop="titleName"
                label="题目"
              />
              <el-table-column
                key="4"
                prop="content"
                label="全文内容"
              />
              <el-table-column
                key="5"
                prop="analyzeContent"
                label="分析内容"
              />
              <el-table-column
                key="6"
                prop="questionCount"
                label="案例问题数"
              />
              <el-table-column
                key="8"
                label="审核状态"
              >
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.status === 'enabled'" type="success">正常</el-tag>
                  <el-tag v-if="scope.row.status === 'disabled'" type="danger">禁用</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                key="7"
                label="评价"
              >
                <template slot-scope="scope">
                  <svg-icon icon-class="zan"/><span>{{ scope.row.praiseCount }}</span>
                  <svg-icon icon-class="pinglun"/><span>{{ scope.row.commentCount }}</span>
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
import { getCase } from '@/api/case'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  components: {
    Breadcrumb
  },
  data() {
    return {
      caseList: []
    }
  },
  created() {
    this.handleGetCase()
  },
  methods: {
    handleGetCase() {
      getCase(0, 10).then(response => {
        if (response.data.errorMsg === '操作成功') {
          const data = response.data.data
          console.log(data)
          const rows = data.rows
          this.caseList = rows
          console.log(rows)
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

