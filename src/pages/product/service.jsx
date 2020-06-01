import request from 'umi-request';

export async function queryFakeProduct() {
  return request('/api/fake_product'
  );
}
export async function removeFakeProduct({id}) {
  return request('/api/fake_product', {
    method: 'POST',
    params: {
      id,
    },
    data: { id, method: 'delete' },
  });
}
export async function addFakeProduct(params) {
  return request('/api/fake_product', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { ...params, method: 'post'},
  });
}
export async function updateFakeProduct(params) {
  return request('/api/fake_product', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}
