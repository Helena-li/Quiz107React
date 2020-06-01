// mock data
const fakeProductData = [
  {
    id: 1,
    name: 'computer',
    price: 111.11,
    type: 'hardware',
    desc: ''
  },
  {
    id: 2,
    name: 'antd',
    price: 0.11,
    type: 'software',
    desc: 'based on react'
  },
  {
    id: 3,
    name: 'HW p40',
    price: 122.11,
    type: 'hardware',
    desc: 'good to have'
  }
];

let sourceData = fakeProductData;

// function for api
function getFakeProducts(req, res) {
  return res.json(sourceData);
}

function postFakeProduct(req, res) {
  const { body} = req; 

  const { method, id } = body; 

  switch (method) {
    case 'delete':
      sourceData = sourceData.filter(item => item.id !== id);
      break;

    case 'update':
      sourceData.forEach((item, i) => {
        if (item.id === id) {
          sourceData[i] = { ...item, ...body };
        }
      });
      break;

    case 'post':
      sourceData.unshift({
        ...body,
        id: `${sourceData.length+1}`
      });
      break;

    default:
      break;
  }
 
  return res.json(sourceData);
}

export default {
  'GET  /api/fake_product': getFakeProducts,
  'POST  /api/fake_product': postFakeProduct,
};
