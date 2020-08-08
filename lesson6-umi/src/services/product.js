import request from '../utils/request';

export async function getProductData (params) {
  return request('/api/getProductData', {
    data: params,
    method: 'post',
  });
}
// export async function getChannelDataBySearch(params) {
// return request('/api/getChannelDataBySearch', {
// method: 'post',
// data: params,
// });
// }
