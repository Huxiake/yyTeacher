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

// 收藏案例
export function caseCollections(id) {
  return request({
    url: '/v1/teacher/caseCollections?caseId=' + id,
    method: 'post'
  })
}

// 取消收藏案例
export function cancelCaseCollections(id) {
  return request({
    url: '/v1/teacher/caseCollections/cancel?caseId=' + id,
    method: 'delete'
  })
}

// 上架案例
export function caseOnshelf(id) {
  return request({
    url: '/v1/teacher/cases/onShelf/' + id,
    method: 'delete'
  })
}

// 下架案例
export function caseUnshelf(id) {
  return request({
    url: '/v1/teacher/case/soldOut/' + id,
    method: 'put'
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
export function getCaseStudy(id) {
  return request({
    url: '/v1/teacher/caseStudy?caseId=' + id + '&pageNum=0&pageSize=100',
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

// 修改案例问题
export function editCaseStudy(id, question) {
  const data = qs.stringify(question)
  return request({
    url: '/v1/teacher/caseStudy/' + id + '?' + data,
    method: 'put'
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
export function getCaseComments(id) {
  return request({
    url: '/v1/teacher/caseComments/pageList?caseId=' + id + '&pageNum=0&pageSize=100',
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
    url: '/v1/teacher/caseThemes',
    method: 'get'
  })
}

// 修改主题
export function editCaseThemes(id, theme) {
  const data = qs.stringify(theme)
  return request({
    url: '/v1/teacher/caseThemes/' + id + '?' + data,
    method: 'put'
  })
}

// 新建主题
export function addCaseThemes(theme) {
  const data = qs.stringify(theme)
  return request({
    url: '/v1/teacher/caseThemes/?' + data,
    method: 'post'
  })
}

// 删除主题
export function deleteCaseThemes(id) {
  return request({
    url: '/v1/teacher/caseThemes/' + id,
    method: 'delete'
  })
}

// 启/禁用主题
export function caseThemeAble(op, id) {
  return request({
    url: '/v1/teacher/caseThemes/' + op + '/' + id,
    method: 'put'
  })
}

// 获取案例题目ID列表
export function getCaseTitleId() {
  return request({
    url: '/v1/teacher/caseTitles',
    method: 'get'
  })
}

// 修改题目
export function editCaseTitles(id, title) {
  const data = qs.stringify(title)
  return request({
    url: '/v1/teacher/caseTitles/' + id + '?' + data,
    method: 'put'
  })
}

// 新建题目
export function addCaseTitles(title) {
  const data = qs.stringify(title)
  return request({
    url: '/v1/teacher/caseTitles/?' + data,
    method: 'post'
  })
}

// 删除题目
export function deleteCaseTitles(id) {
  return request({
    url: '/v1/teacher/caseTitles/' + id,
    method: 'delete'
  })
}

// 启/禁用题目
export function caseTitleAble(op, id) {
  return request({
    url: '/v1/teacher/caseTitles/' + op + '/' + id,
    method: 'put'
  })
}

// 获取案例科目ID列表
export function getCaseSubjectId() {
  return request({
    url: '/v1/student/subjects',
    method: 'get'
  })
}
