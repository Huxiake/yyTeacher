import request from '@/utils/request'
import qs from 'qs'

// 分页获取案例列表
export function getCase(pageInfo) {
  const search = qs.stringify(pageInfo)
  return request({
    url: '/v1/teacher/cases/pageList?' + search,
    method: 'get'
  })
}

// 获取案例详情
export function getCaseDetails(id) {
  return request({
    url: '/v1/teacher/cases/' + id,
    method: 'get'
  })
}

// 提交案例修改
export function editCaseDatails(id, caseDetails) {
  const data = qs.stringify(caseDetails)
  return request({
    url: '/v1/teacher/cases/' + id + '?' + data,
    method: 'put'
  })
}

// 增加案例
export function addCaseDatails(caseDetails) {
  const data = qs.stringify(caseDetails)
  return request({
    url: '/v1/teacher/cases/?' + data,
    method: 'post'
  })
}

// 删除案例
export function deleteCase(id) {
  return request({
    url: '/v1/teacher/cases/' + id,
    method: 'delete'
  })
}

// 获取案例问题
export function getCaseStudy() {
  return request({
    url: '/v1/teacher/caseStudy?pageNum=0&pageSize=100',
    method: 'get'
  })
}

// 新增案例问题
export function newCaseStudy(question) {
  const data = qs.stringify(question)
  return request({
    url: '/v1/teacher/caseStudy?' + data,
    method: 'post'
  })
}

// 获取案例问题回答
export function getCaseStudyComments(id) {
  return request({
    url: '/v1/teacher/caseStudyComments?caseStudyId=' + id + '&pageNum=0&pageSize=100',
    method: 'get'
  })
}

// 对问题回答进行回复
export function putCaseStudyComments(id, recovery) {
  const data = qs.stringify(recovery)
  console.log(id)
  console.log(data)
  return request({
    // url: '/v1/teacher/caseStudyComments/' + id + '?teacherCommentGrade=' + grade + '?teacherContent=' + content,
    url: '/v1/teacher/caseStudyComments/' + id + '?' + data,
    method: 'put'
  })
}

// 获取案例评论
export function getCaseComments() {
  return request({
    url: '/v1/teacher/caseComments/pageList?pageNum=0&pageSize=100',
    method: 'get'
  })
}

// 对案例进行评论
export function putCaseComments(content) {
  const data = qs.stringify(content)
  return request({
    url: '/v1/teacher/caseComments?' + data,
    method: 'post'
  })
}

// 审核案例评论
export function auditComment(id, audit) {
  return request({
    url: '/v1/teacher/caseComments/auditComment/' + id + '?audit=' + audit,
    method: 'put'
  })
}

// 删除案例评论
export function deleteCaseComments(id) {
  return request({
    url: 'v1/teacher/caseComments/' + id,
    method: 'delete'
  })
}

// 获取案例主题列表
export function getCaseThemes(themesInfo) {
  const serach = qs.stringify(themesInfo)
  return request({
    url: 'v1/teacher/caseThemes/pageList?' + serach,
    method: 'get'
  })
}

// 获取案例题目列表
export function getCaseTitles(titlesInfo) {
  const serach = qs.stringify(titlesInfo)
  return request({
    url: '/v1/teacher/caseTitles/pageList?' + serach,
    method: 'get'
  })
}

// 获取案例主题ID列表
export function getCaseThemeId() {
  return request({
    url: 'v1/teacher/caseThemes',
    method: 'get'
  })
}

// 获取案例题目ID列表
export function getCaseTitleId() {
  return request({
    url: '/v1/teacher/caseTitles',
    method: 'get'
  })
}

// 获取案例科目ID列表
export function getCaseSubjectId() {
  return request({
    url: '/v1/student/subjects',
    method: 'get'
  })
}
