import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Table, Divider, Button, Input, Drawer } from 'antd';
import styles from './style.less';
import ProductForm from './components/ProductForm';

const { Search } = Input;
export const ProductList = props => {
  const {
    loading,
    dispatch,
    productList: { productData},
  } = props;
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [drawerVisible, handleDrawerVisible] = useState(false);
  const [drawerType, handleDrawerType] = useState('');
  const [formValues, setFormValues] = useState({});
  
  console.log(productData)

  const submitForm=(values)=>{
    const { dispatch } = props;
    dispatch({
      type: 'productList/submit',
      payload: values,
    });
    setSearch(false)
    setSearchKeyword('')
  }

  useEffect(() => {
    props.dispatch({
      type: 'productList/fetch'
    });
  }, [1]);

  const handleDelete=(record)=>{
    const { dispatch } = props;
    dispatch({
      type: 'productList/submit',
      payload: {
        id:record.id
      }
    });
  }
 
const handleCancel=()=>{
  handleDrawerVisible(false);
  setFormValues({});
  
}

  const searchName = (e) => {
    console.log("called")
    setSearch(true)
    const data = productData.filter(x => x.name.toLowerCase().search(e.toLowerCase()) >= 0)
    setSearchResult(data);
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      rules: [
        {
          required: true,
          message: 'Name is required',
        },
      ],
    },
    {
      title: 'Price',
      dataIndex: 'price',
      // sorter: true,
      hideInForm: true,
      render: (text) => (`$ ${text}`),
      sorter: (a, b) => a.price - b.price,
      rules: [
        {
          required: true,
          message: 'Price is required',
        },
      ],
    },
    {
      title: 'Type',
      dataIndex: 'type',
      valueEnum: {
        0: {
          text: 'Software',
          status: 'Software',
        },
        1: {
          text: 'Hardware',
          status: 'Software',
        },
      },
      rules: [
        {
          required: true,
          message: 'Type is required',
        },
      ],
    },
    {
      title: 'Description',
      dataIndex: 'desc'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      valueType: 'action',
      render: (_, record) => (
        <>
          <Button
            onClick={() => {
              handleDrawerVisible(true);
              handleDrawerType('edit');
              setFormValues(record);
            }}
          >
            Edit
          </Button>
          <Divider type="vertical" />
          <Button
            onClick={()=>handleDelete(record)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <PageHeaderWrapper>
        <div>
          {productData.length > 0 ?
            <Table
              rowKey={item=>item.id}
              bordered
              title={() => {
                return (
                  <div>
                    <Button size="middle"
                      onClick={() => {
                        handleDrawerVisible(true);
                        handleDrawerType('add');
                      }}
                    >
                      Add
                    </Button>
                    <Search className={styles.contentSearch} 
                    allowClear placeholder="Input searched name" onSearch={(e) => searchName(e)} 
                    value={searchKeyword} onChange={e => setSearchKeyword(e.target.value)} />
                  </div>
                )
              }}
              dataSource={search?searchResult:productData}
              columns={columns}
              pagination={{pageSize:5}}
            />
            : <h4>No product found</h4>
          }
        </div>
      </PageHeaderWrapper>
      
        <ProductForm drawerVisible={drawerVisible} onCancel={handleCancel} 
        displayType={ drawerType} productItem={formValues} submitForm={submitForm}/>
     
    
    </div>
  )
};
export default connect(({ productList, loading }) => ({
  productList,
  loading: loading.models.productList,
}))(ProductList);