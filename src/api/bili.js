import request from '../../../../vue/vue3-ts-web/src/utils/request.js'

export default{
  getPageList(data, page, size) {
    return request({
      url: `/video/list/${page}/${size}`,
      method: 'post',
      data
    })
  }
}
