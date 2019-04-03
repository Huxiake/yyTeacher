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
          <el-row :gutter="16" type="flex" justify="center">
            <el-col :span="4">
              <span style="font-size: 16px; font-weight: bold">{{ this.case.titleName }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="16" type="flex" justify="end">
            <el-col :span="2">
              <span style="color:#9b9b9b">{{ this.case.userName }}</span>
            </el-col>
          </el-row>
          <el-form label-width="100px">
            <el-form-item label="主题:">
              <span>{{ this.case.themeName }}</span>
            </el-form-item>
            <el-form-item label="摘要:">
              <span>{{ this.case.digest }}</span>
            </el-form-item>
            <el-form-item label="关键字:">
              <span>{{ this.case.keyword }}</span>
            </el-form-item>
            <el-form-item label="全文内容:">
              <span>{{ this.case.content }}</span>
            </el-form-item>
            <el-form-item label="分析内容:">
              <span>{{ this.case.analyzeContent }}</span>
            </el-form-item>
          </el-form>
          <el-table
            :data="study"
            header-cell-class-name="HeaderCell"
            @header-click="handleNew"
          >
            <el-table-column
              :render-header="renderHeader"
              prop="question"
              label="问题列表"
            />
            <el-table-column
              width="300px"
              align="right"
            >
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="handleEdit(scope.row.question)">修改</el-button>
                <el-button type="primary" size="small" @click="handleReply(scope.row.id)">回答列表</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog :visible.sync="dialogFormVisible" title="新增问题">
            <el-form :model="question">
              <el-form-item label-width="200" label="问题内容">
                <el-input v-model="question.question" type="textarea" autosize/>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="handlePut">确 定</el-button>
            </div>
          </el-dialog>
          <div style="margin-top: 40px;color:#5f5f5f;font-size:20px;font-weight: bold">
            案例评论
          </div>
          <div v-for="(item, index) in comments" v-if="item.audit !== 'audit_refuse'" :key="index">
            <div class="comments-header">
              <span>{{ item.userName }}</span>
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
                <a @click="handleDelete(item.id)">删除</a>
                <a v-if="item.audit === 'to_audit'" @click="handleAudit(item.id)">审核</a>
                <!-- <el-collapse-item title="查看回复" name="1"  @change="handleChange">
                    <div class="comments-content">
                      <span>{{  }}</span>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
                    </div>
                </el-collapse-item> -->
              </el-collapse>
            </div>
            <div class="line" style="margin-top:15px"/>
          </div>
          <div class="editComments">
            <el-input v-model="myComments.content" type="textarea"/>
            <el-row type="flex" justify="end">
              <el-button type="primary" size="mini" @click="handleComments">发表</el-button>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import { getCaseDetails, getCaseStudy, newCaseStudy, getCaseComments, deleteCaseComments, auditComment, putCaseComments } from '@/api/case'

export default {
  components: {
    Breadcrumb
  },
  data() {
    return {
      dialogFormVisible: false,
      caseId: '',
      case: {
        titleName: '',
        userName: '',
        themeName: '',
        keyword: '',
        content: '',
        digest: '',
        analyzeContent: ''
      },
      question: {
        caseId: '',
        question: ''
      },
      study: [],
      comments: [],
      myComments: {
        caseId: '',
        content: ''
      }
    }
  },
  created() {
    this.caseId = this.$route.params.id
    this.caseDetails(this.caseId)
    this.caseStudy()
    this.caseComments()
  },
  methods: {
    caseDetails(id) {
      getCaseDetails(id).then(res => {
        if (res.data.errorMsg === '操作成功') {
          this.case = res.data.data
        }
      })
    },
    renderHeader(h, { column }) {
      return (
        <div>
          <span>问题列表</span>
          <el-button type='primary' size='small' style='margin-left: 20px' onClick={ this.handleNew }>新增</el-button>
        </div>
      )
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
        if (res.data.errorMsg === '操作成功') {
          this.comments = res.data.data.rows
        }
      })
    },
    handleNew() {
      this.question = {}
      this.question.caseId = this.caseId
      this.dialogFormVisible = true
    },
    handleEdit(data) {
      this.question.caseId = this.caseId
      this.question.question = data
      this.dialogFormVisible = true
    },
    handlePut() {
      newCaseStudy(this.question).then(res => {
        if (res.data.errorMsg === '操作成功') {
          this.dialogFormVisible = false
          this.caseStudy()
        }
      })
    },
    handleReply(id) {
      this.$router.push({
        name: 'study',
        params: { casestudyid: id }
      })
    },
    handleDelete(id) {
      this.$confirm('此操作将删除该评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCaseComments(id).then(res => {
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
    handleAudit(id) {
      this.$confirm('是否通过审核?', '提示', {
        confirmButtonText: '通过',
        cancelButtonText: '不通过',
        type: 'warning'
      }).then(() => {
        auditComment(id, 'to_audit').then(res => {
          if (res.data.errorMsg === '操作成功') {
            this.$message({
              type: 'success',
              message: '审核通过!'
            })
            this.caseComments()
          }
        })
      }).catch(() => {
        auditComment(id, 'audit_refuse').then(res => {
          if (res.data.errorMsg === '操作成功') {
            this.$message({
              type: 'info',
              message: '审核拒绝!'
            })
            this.caseComments()
          }
        })
      })
    },
    handleComments() {
      this.myComments.caseId = this.caseId
      putCaseComments(this.myComments).then(res => {
        if (res.data.errorMsg === '操作成功') {
          this.$message({
            type: 'success',
            message: '评论成功!'
          })
          this.caseComments()
          this.myComments = {}
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
.el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
  padding-left: 0;
}
.el-row {
  font-size: 18px;
  margin-top: 10px;
}
.el-form-item__label {
  font-size:15px;
}
.el-form-item {
  margin-bottom: 3px;
}
</style>

