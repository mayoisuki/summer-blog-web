import request from '@/utils/request'



export function save(data) {
  return request({
    url: '/profile/save',
    method: 'post',
    data    //data就是放在body传输数据
  })
}



