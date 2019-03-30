<template>
  <div class="paeg-container">
    <div class="pageHeader">
      <breadcrumb/>
      <div>回答列表</div>
    </div>
    <div class="pageHeaderWrapper">
      <div class="table-card">
        <div class="table-card-body">
          <el-table
            :data="study"
          >
            <el-table-column
              prop="question"
              label="回答列表"
            />
            <el-table-column
              width="160px"
            >
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="handleRecovery(scope.row.id)">回复</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog :visible.sync="dialogFormVisible" title="点评详情">
            <el-form :model="recovery">
              <el-form-item label-width="200" label="回答评价">
                <el-radio-group v-model="recovery.teacherCommentGrade">
                  <el-radio label="excellent">优秀</el-radio>
                  <el-radio label="good">良好</el-radio>
                  <el-radio label="medium">中等</el-radio>
                  <el-radio label="bad">差</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label-width="200" label="回复内容">
                <el-input v-model="recovery.teacherContent"/>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="handlePut">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import { getCaseStudy, getCaseStudyComments, putCaseStudyComments } from '@/api/case'

export default {
  components: {
    Breadcrumb
  },
  data() {
    return {
      dialogFormVisible: false,
      casestudyId: '',
      case: {
        titleName: '',
        content: ''
      },
      study: [],
      activeId: '',
      recovery: {
        teacherCommentGrade: '',
        teacherContent: ''
      },
      studyComments: []
    }
  },
  created() {
    this.casestudyId = this.$route.params.casestudyid
    this.caseStudyComments()
    this.caseStudy()
  },
  methods: {
    caseStudyComments() {
      getCaseStudyComments().then(res => {
        if (res.data.errorMsg === '操作成功') {
          this.studyComments = res.data.data.rows
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
    handleRecovery(id) {
      this.dialogFormVisible = true
      this.recovery = {}
      this.activeId = id
    },
    handlePut() {
      console.log(this.recovery)
      putCaseStudyComments(this.activeId, this.recovery)
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
    a {
      color: #97a8be;
      margin-left: 10px;
    }
    .comments-content {
    border-bottom: 1px solid #ebeef5;
    margin: 10px auto;
    }
  }
}
.el-table th > .cell {
  font-size: 20px;
  padding-left: 0;
  color: #5f5f5f;
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

