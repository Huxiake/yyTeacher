<template>
  <div class="paeg-container">
    <div class="pageHeader">
      <breadcrumb/>
      <div>通知中心</div>
    </div>
    <!-- <div class="pageHeaderWrapper">
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
    </div> -->
    <div class="pageHeaderWrapper">
      <div class="table-card">
        <div class="table-card-header">
          <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item label="标题">
              <el-input v-model="searchForm.title" placeholder="请输入标题"/>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="searchForm.status" placeholder="状态">
                <el-option label="全部" value="all"/>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table-card-content">
          <el-button type="primary">创建公告</el-button>
          <div class="table-card-body">
            <div class="table-body">
              <el-table
                :data="caseList"
                border
              >
                <el-table-column
                  key="1"
                  prop="title"
                  label="标题"
                />
                <el-table-column
                  key="2"
                  label="封面图"
                >
                  <template slot-scope="scope">
                    <img :src="scope.row.coverPic" width="200" height="100">
                  </template>
                </el-table-column>
                <el-table-column
                  key="3"
                  prop="commentCount"
                  label="评论数"
                />
                <el-table-column
                  key="4"
                  prop="likeCount"
                  label="点赞数"
                />
                <el-table-column
                  key="5"
                  prop="createTime"
                  label="创建时间"
                />
                <el-table-column
                  key="6"
                  prop="status"
                  label="状态"
                />
                <el-table-column
                  key="8"
                  label="操作"
                >
                  <template slot-scope="scope">
                    <el-button type="text">编辑</el-button>
                    <el-button type="text">删除</el-button>
                    <el-button type="text">停用</el-button>
                    <el-button type="text">查看评论</el-button>
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
          title: '测试10',
          coverPic: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2146046871,2611785107&fm=27&gp=0.jpg',
          commentCount: 1,
          likeCount: 10,
          createTime: new Date().toString(),
          status: '启用'
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

