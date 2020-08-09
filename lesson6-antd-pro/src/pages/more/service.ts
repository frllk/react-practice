import { request } from '@/utils/request';

export async function getChannelData(params?: any) {
  console.log('params', params)
  return request("/api/searchProductData", {
    data: params,
    method: "post"
  });
}