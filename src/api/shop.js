import request from '@/utils/request'

export function getcategory(params) {
  return request({
    url: '/wx/other/getcategory',
    method: 'get',
    params
  })
}

export function saveshop(data) {
  return request({
    url: '/saveshop',
    method: 'post',
    data,
  })
}

export function getshopbyuid(uid) {
  return request({
    url: '/getshopbyuid',
    method: 'get',
    params: { uid }
  })
}
export function postintro(data) {
  return request({
    url: '/postintro',
    method: 'post',
    data
  })
}