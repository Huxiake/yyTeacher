<template>
  <div class="paeg-container">
    <div class="pageHeader">
      <breadcrumb/>
      <div>新增案例</div>
    </div>
    <div class="pageHeaderWrapper">
      <div class="table-card">
        <div class="table-card-header">
          案例详情
        </div>
        <div class="table-card-body">
          <el-form ref="caseEdit" :model="caseForm" label-width="80px">
            <el-form-item label="案例名称">
              <el-input v-model="caseForm.name"/>
            </el-form-item>
            <el-form-item label="全文内容">
              <el-input v-model="caseForm.content" type="textarea"/>
            </el-form-item>
            <el-form-item label="分析内容">
              <el-input v-model="caseForm.analyzeContent" type="textarea"/>
            </el-form-item>
            <el-form-item label="摘要">
              <el-input v-model="caseForm.digest"/>
            </el-form-item>
            <el-form-item label="科目">
              <el-select v-model="caseForm.subjectId" placeholder="请选择" style="width:200px">
                <el-option
                  v-for="(item, index) in subjectId"
                  :key="index"
                  :label="item.name"
                  :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item label="主题">
              <el-select v-model="caseForm.themeId" placeholder="请选择" style="width:200px">
                <el-option
                  v-for="(item, index) in themeId"
                  :key="index"
                  :label="item.name"
                  :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item label="题目">
              <el-select v-model="caseForm.themeId" placeholder="请选择" style="width:200px">
                <el-option
                  v-for="(item, index) in titleId"
                  :key="index"
                  :label="item.name"
                  :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onCaseSubmit">提交</el-button>
              <el-button @click="$router.go(-1)">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import { addCaseDatails, getCaseThemeId, getCaseTitleId, getCaseSubjectId } from '@/api/case'

export default {
  components: {
    Breadcrumb
  },
  data() {
    return {
      case: {
        titleName: '',
        content: ''
      },
      themeId: '',
      titleId: '',
      subjectId: '',
      caseForm: {
        content: '',
        digest: '',
        analyzeContent: '',
        id: '',
        name: '',
        subjectId: '',
        themeId: '',
        titleId: '',
        type: '',
        userId: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  created() {
    this.caseForm.userId = this.userId
    this.getCaseAllIdList()
  },
  methods: {
    onCaseSubmit() {
      console.log(this.caseForm)
      addCaseDatails(this.caseForm).then(res => {
        console.log(res)
      })
    },
    getCaseAllIdList() {
      getCaseThemeId().then(res => {
        if (res.data.errorMsg === '操作成功') {
          this.themeId = res.data.data
        }
      })
      getCaseTitleId().then(res => {
        if (res.data.errorMsg === '操作成功') {
          this.titleId = res.data.data
        }
      })
      getCaseSubjectId().then(res => {
        if (res.data.errorMsg === '操作成功') {
          this.subjectId = res.data.data
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
</style>

