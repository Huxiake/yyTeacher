import request from '@/utils/request'
import qs from 'qs'

// 分页获取案例列表
export function getCase(pageNum, pageSize) {
  const pageInfo = {
    'pageNum': pageNum,
    'pageSize': pageSize
  }
  const data = qs.stringify(pageInfo)
  return request({
    url: '/v1/teacher/cases/pageList?' + data,
    method: 'get'
  })
}

// 分页获取案例主题列表
export function getCaseThemes() {
  return request({
    url: '/v1/teacher/caseThemes',
    method: 'get'
  })
}

export function getCaseDetails(id) {
  return request({
    url: '/v1/teacher/cases/' + id,
    method: 'get'
  })
}

export function getCaseStudy() {
  return request({
    url: '/v1/teacher/caseStudy?pageNum=0&pageSize=100',
    method: 'get'
  })
}

export function getCaseStudyComments() {
  return request({
    url: '/v1/teacher/caseStudyComments?pageNum=0&pageSize=100',
    method: 'get'
  })
}

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

export function getCaseComments() {
  return request({
    url: '/v1/teacher/caseComments/pageList?pageNum=0&pageSize=100',
    method: 'get'
  })
}
