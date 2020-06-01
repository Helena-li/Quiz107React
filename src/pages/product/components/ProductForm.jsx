import React from 'react';
import { Button, Form, Drawer, InputNumber, Select, Input } from 'antd';

const ProductForm = props => {
    const { TextArea } = Input;
    const FormItem = Form.Item;
    const { Option } = Select;
    const [form] = Form.useForm();
    const { drawerVisible, onCancel, displayType, productItem } = props;
 
    displayType === 'add' ? form.setFieldsValue(null):form.setFieldsValue({...productItem})

    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 7,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 12,
            },
            md: {
                span: 10,
            },
        },
    };
    const submitFormLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 10,
                offset: 7,
            },
        },
    };

    const handleCancel=()=>{
        form.resetFields();
         
        onCancel();
    }

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const onFinish = values => {
        
        let submitData = props.displayType === 'edit' ? { ...values, id: productItem.id } : values;
        props.submitForm(submitData);
        handleCancel();
    };
    return (
        <Drawer
        width="40%"
            title={displayType==='add'?"Add New":"Edit"}
            placement="right"
            closable={false}
            onClose={handleCancel}
            visible={drawerVisible}
        >
            <Form
                style={{ marginTop: 8, }}
                form={form}
                initialValues={null}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <FormItem
                    {...formItemLayout}
                    label="Name"
                    name="name"
                    rules={[{
                        required: true,
                        message: "Name required",
                    },
                    ]}
                >
                    <Input placeholder="Name" />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Price"
                    name="price"
                    rules={[{
                        required: true,
                        message: "Price required",
                    },
                    ]}
                >
                    <InputNumber step={0.01} placeholder="0.00"
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Type"
                    name="type"
                    rules={[{
                        required: true,
                        message: "Type required",
                    },
                    ]}
                >
                    <Select placeholder="Select type">
                        <Option value="software">software</Option>
                        <Option value="hardware">hardware</Option>
                    </Select>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Description"
                    name="desc"
                >
                    <TextArea style={{ minHeight: 32, }}
                        placeholder="Description"
                        rows={4}
                    />
                </FormItem>
                <FormItem
                    {...submitFormLayout}
                    style={{ marginTop: 32, }}
                >
                    <Button onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit"
                        style={{ marginLeft: 8, }} >
                        Submit
                    </Button>
                </FormItem>
            </Form>
        </Drawer>
    );
};

export default ProductForm;
