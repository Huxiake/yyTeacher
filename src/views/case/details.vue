<template>
  <div class="paeg-container">
    <div class="pageHeader">
      <breadcrumb/>
      <div>案例详情</div>
    </div>
    <div class="pageHeaderWrapper">
      <div class="table-card">
        <div class="table-card-header">
          案例详情
        </div>
        <div class="table-card-body">
          <div style="margin-bottom: 40px;">{{ this.case.content }}</div>
          <el-table
            :data="study"
            header-cell-class-name="HeaderCell"
          >
            <el-table-column
              prop="question"
              label="问题列表"
            />
            <el-table-column
              width="160px"
            >
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="handleReply(scope.row.id)">回答列表</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 40px;color:#5f5f5f;font-size:20px;font-weight: bold">
            案例评论
          </div>
          <div v-for="(item, index) in comments" :key="index">
            <div class="comments-header">
              <!-- <span>{{ item.userName }}</span> -->
              <span>郑映颖</span>
              <span style="font-size: 12px;margin-left: 5px;">{{ new Date(item.gmtCreate).toLocaleString() }}</span>
            </div>
            <div class="comments-body">
              <span>{{ item.content }}</span>
              <!-- {{ item }} -->
            </div>
            <div class="comments-footer">
              <el-collapse>
                <svg-icon class="zan-svg" icon-class="zan"/>
                <span>{{ item.praiseCount }}</span>
                <a @click="handleDelete">删除</a>
                <!-- <el-collapse-item title="查看回复" name="1"  @change="handleChange">
                    <div class="comments-content">
                      <span>{{  }}</span>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
                    </div>
                </el-collapse-item> -->
              </el-collapse>
            </div>
            <div class="line" style="margin-top:15px"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import { getCaseDetails, getCaseStudy, getCaseComments } from '@/api/case'

export default {
  components: {
    Breadcrumb
  },
  data() {
    return {
      caseId: '',
      case: {
        titleName: '',
        content: ''
      },
      study: [],
      comments: []
    }
  },
  created() {
    this.caseId = this.$route.params.id
    this.caseDetails(this.caseId)
    this.caseStudy()
    this.caseComments()
    console.log(new Date(1553848068000).toLocaleString())
  },
  methods: {
    caseDetails(id) {
      getCaseDetails(id).then(res => {
        if (res.data.errorMsg === '操作成功') {
          this.case.titleName = res.data.data.titleName
          this.case.content = res.data.data.content
        }
      })
    },
    caseStudy() {
      getCaseStudy().then(res => {
        if (res.data.errorMsg === '操作成功') {
          this.study = res.data.data.rows
        }
      })
    },
    caseComments() {
      getCaseComments().then(res => {
        console.log(res)
        if (res.data.errorMsg === '操作成功') {
          console.log('111')
          this.comments = res.data.data.rows
        }
      })
    },
    handleReply(id) {
      console.log(id)
      this.$router.push({
        name: 'study',
        params: { casestudyid: id }
      })
    },
    handleDelete() {
      console.log('delete')
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
.line{
  height: 1px;
  border-top: 1px solid #f2f2f2;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 15px;
}
.table-card {
  min-height: calc(100vh - 168px);
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
.table-card-header {
  padding:24px 32px;
  padding-bottom: 0;
  font-size: 20px;
  font-weight: bold;
}
.table-card-body {
  padding:24px 32px;
  padding-top: 10px;
  .comments-header {
    color: #97a8be;
    padding: 5px;
  }
  .comments-body {
    padding-left: 10px;
  }
  .comments-footer {
    .zan-svg{
      // position: absolute;
      // margin: 3px;
    }
    span {
      // position: absolute;
      // margin-left: 21px;
    }
    a {
      // position: absolute;
      color: #97a8be;
      margin-left: 10px;
    }
    .comments-content {
    border-bottom: 1px solid #ebeef5;
    margin: 10px auto;
    }
  }
}
.HeaderCell {
  font-size: 20px;
  padding-left: 0;
  color: #5f5f5f;
}
.el-table th > .cell {
  padding-left: 0;
}
.el-icon-arrow-right::before {
    content: "";
}
.el-collapse-item__header {
  height: 21px;
  line-height: 21px;
  width: 55px;
  height: 21px;
  border-bottom: none;
  margin-left: 50px;
}
.el-collapse {
  border-top: none;
  border-bottom: none;
  margin-top: 5px;
  padding-left: 10px;
}
.el-collapse-item:last-child {
  display: inline-block;
}
.el-collapse-item__wrap {
  border-bottom: none;
  margin-left: 20px;
}
</style>

