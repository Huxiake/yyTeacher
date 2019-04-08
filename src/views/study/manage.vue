<template>
  <div class="paeg-container">
    <div class="pageHeader">
      <breadcrumb/>
      <div>学生信息管理</div>
    </div>
    <div class="pageHeaderWrapper">
      <div class="table-card">
        <div class="table-card-header">
          <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item label="请输入搜索">
              <el-input v-model="searchForm.username" placeholder="登陆账号/真实姓名"/>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="searchForm.status" placeholder="状态">
                <el-option label="全部" value="all"/>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">查询</el-button>
              <el-button >重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table-card-content">
          <el-button type="primary" icon="el-icon-plus">新增</el-button>
          <div class="table-card-body">
            <div class="table-body">
              <el-table
                :data="caseList"
                border
              >
                <el-table-column
                  key="1"
                  prop="name"
                  label="姓名"
                />
                <el-table-column
                  key="2"
                  prop="class"
                  label="班级"
                />
                <el-table-column
                  key="3"
                  prop="studentId"
                  label="学号"
                />
                <el-table-column
                  key="4"
                  prop="phone"
                  label="手机号码"
                />
                <el-table-column
                  key="5"
                  label="操作"
                >
                  <template slot-scope="scope">
                    <el-button type="text">设置成绩</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
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
      caseList: [
        {
          name: '138',
          class: '医院',
          studentId: '123123',
          phone: '123'
        }
      ],
      searchForm: {
        title: '',
        status: ''
      }
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
  padding:24px 0;
}

// ---
.table-card-header{
  padding:15px 20px 0;
}
.table-card-content{
  padding:5px 20px;
}
</style>

