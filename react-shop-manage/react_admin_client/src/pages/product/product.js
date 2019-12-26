import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { Card,Select,Button,Table,Input,message,Typography} from 'antd';
import {reqProductList,reqSearchProduct,reqDeleteProduct,reqProductStatus} from '../../api'
import {formatNumber} from '../../utils/common'
const { Option } = Select;
const { Text } = Typography;
const PAGE_SIZE = 4
const btnStyle={
  marginLeft:'0.5rem'
}
class Product extends Component {
  state = {
    pageNum:1,//默认当前页
    selectValue: '1',//默认按名称搜索
    productListSource:[],
    total:0,
    btnLoading:false,
    tableLoading:false,
    inputPlaceholder:'请输入名称',
    inputValue:'',
    loading:false
  };
  constructor(){
    super()
    const {loading} = this.state
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render:(record)=>(`￥${record}`)
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '状态',
        render:(record)=>(<span><Text type={record.status?'success':'danger'} >{record.status?'在售':'下架'}</Text><Button size='small' style={btnStyle} loading={loading}
          onClick={()=>this.put_out(record)}
          type='primary'>{record.status?'下架':'上架'}</Button></span>
          )
      },
      {
        title: '操作',
        render:(record)=>(
          <span>
          <Button type="link" onClick={()=>(
            this.productDetail(record)
          )}>详情</Button>
          <Button type="link" onClick={()=>(
            this.productUpdate(record)
          )}>修改</Button>
          <Button type="link" loading={this.state.btnLoading} onClick={()=>(
            this.productDelete(record)
            )}>删除</Button>
          </span>
        )
      }
    ]
  }
  // 上下架
  //  const {productId, status} = req.body
  put_out= async (product)=>{
    this.setState({loading:true})
    const params={
      productId:product._id
    }
    if(product.status){//改变商品状态(上下架)
      params.status=0
    }else{
      params.status=1
    }
    const res= await reqProductStatus(params)
    if(res.status===0){
      this.setState({loading:false})
      message.success('更新成功！')
      this.getProductList(this.pageNum)
    }
  }
 //点击修改按钮
  productUpdate= async (record)=>{
    this.props.history.push('/product/add',record)
    console.log(record)
  }
 //点击删除按钮
  productDelete = async (record) =>{
    const res = await reqDeleteProduct({_id:record._id}) 
    if(res.status===0){
      this.getProductList(this.pageNum)
    }
  }

  // 商品详情
  productDetail = (data) => {
    this.props.history.push({
      pathname: '/product/detail',
      state: data
    })
  }

  // 搜索筛选框
  selectHandleChange = selectValue => {
    this.setState({ selectValue,
      inputPlaceholder:selectValue==='1'?'请输入名称':'请输入描述',
      inputValue:''
    });
  }

  inputValue=(e)=>{
    this.setState({
      inputValue:e.target.value
    })
  }

  // 搜索
  // searchBtn= async (e)=>{
  //   e.stopPropagation();
  //   const {selectValue,inputValue}=this.state
  //   if( !inputValue || !inputValue.trim()){
  //     this.setState({inputValue:null})
  //     message.warning('不能为空')
  //     return
  //   }
  //   this.setState({loading:true})
  //   const params={
  //     pageNum,pageSize:PAGE_SIZE
  //   }
  //   selectValue==='1'?params.productName=inputValue:params.productDesc=inputValue
  //   const res = await reqSearchProduct(params)
  //   const {list,total}=res.data
  //   if(!list[0]){message.warn('搜索结果为空！')}
  //   this.setState({total,productListSource:list,loading:false})
  // }

  // 点击添加商品按钮
  addProductBtn=(e)=>{
    e.stopPropagation()//阻止事件冒泡
    this.props.history.push('/product/add')
  }

  // 商品列表
  getProductList= async(pageNum)=>{
    const {inputValue} = this.state
    this.pageNum=pageNum //保存全局，状态更新的时候能够定位到当前页
    this.setState({
      tableLoading:true
    })
    let res
    if(inputValue){ //搜索商品列表
      this.setState({
        btnLoading:true,
      })
       res= await reqSearchProduct({pageNum,pageSize: PAGE_SIZE})
    }else{ //全部商品列表
       res= await reqProductList({pageNum,pageSize:PAGE_SIZE})
    }
    const {total,list}=res.data
    if (res.status === 0 && list.length > 0) {
      // 格式化金额
      list.forEach(item=>{
        item.price=formatNumber(item.price)
      })
      this.setState({
        total,
        productListSource:list,
        tableLoading:false,
        btnLoading:false
      })
    }
  }

  componentDidMount(){
    this.getProductList(1)
  }

  render() {
    const {tableLoading,productListSource,total,btnLoading,inputPlaceholder,inputValue}=this.state
    const title=()=>{
      return (
       <div>
       <Select defaultValue="1" 
       style={{ width: '7rem' }}
       onChange={this.selectHandleChange}>
       <Option value="1">按名称搜索</Option>
       <Option value="2">按描述搜索</Option>
       </Select>
      <Input style={{width:200,marginLeft:6,marginRight:6}}  placeholder={inputPlaceholder} onChange={this.inputValue} value={inputValue} />
      <Button type='primary' style={{transform:'scale(1)'}} onClick={()=>this.getProductList(1)} loading={btnLoading}>搜索</Button>
       </div>
      )
    }
    const addComponment=()=>(
      <span>
      <Button icon="plus" type='primary' onClick={this.addProductBtn}>添加商品</Button>
      </span>
    )
   
    return (
      <Card title={title()} extra={addComponment()}>
       <Table size='small' dataSource={productListSource} columns={this.columns} rowKey={'_id'} bordered 
       loading={tableLoading}
       pagination={{
        // defaultCurrent:1,
        // hideOnSinglePage:false,//一页隐藏分页'
        // showQuickJumper:true,
        current: this.pageNum,
        total,
        defaultPageSize: PAGE_SIZE,
        showQuickJumper: true,
        onChange:this.getProductList,
       }}
       />
      </Card>
    ); 
  }
}
export default withRouter(Product)