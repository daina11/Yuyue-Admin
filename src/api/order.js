import request from '@/utils/request'
export function getallbysid(sid,page) {
    return request({
      url: '/getallbysid',
      method: 'get',
      params: { sid,page }
    })
  }
  //
  export function delorder(id) {
    return request({
      url: '/wx/other/delorder',
      method: 'get',
      params: { id }
    })
  }

  export function shopfindbystutas(sid,page) {
    return request({
      url: '/shopfindbystutas',
      method: 'get',
      params: { sid,page }
    })
  }
  //succeeorder

  
export function succeeorder(data) {
    return request({
      url: '/succeeorder',
      method: 'post',
      data,
    })
  }