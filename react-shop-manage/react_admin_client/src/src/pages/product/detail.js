import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import {Card,List,Icon,Typography,Upload} from 'antd'
// import { IncomingMessage } from 'http';
import { reqCategoryName } from '../../api';
import {imgUrl} from '../../config'
const { Text } = Typography;
const listStyle={fontSize:15,marginRight:'1rem'}
class ProductDetail extends Component {
  state = {  
    cName1:'',//一级分类名称
    cName2:'',//二级
  }
  constructor(){
    super()
    this.title=(
      <Icon type="arrow-left" onClick={this.goBack} style={{fontSize:20}}/>
    )
  
}

  async componentDidMount(){//加载所属分类
    const {pCategoryId, categoryId} = this.props.location.state
    if(pCategoryId==='0') {//如果是一级列表像
      const result = await reqCategoryName({pCategoryId})
      this.setState({
        cName1:result.data.name
      })
    } else {//二级
      const results = await Promise.all([ reqCategoryName({pCategoryId}),reqCategoryName({categoryId})])
      this.setState({
        cName1:results[0].data.name, //一级分类的categoryid不是0
        cName2:results[1].data.name
      })
    }
  }

  goBack=(e)=>{
    this.props.history.goBack()
  }

  render() {
    const data=this.props.location.state //路由传进来的数据
    
    const {cName1,cName2} = this.state
    const listTitle=[
      '商品名称','商品描述','商品价格','所属分类','商品图片','商品详情'
    ]

    return (
      <Card title={this.title}>
      <List
        header={<div>商品详情</div>}
        bordered
        // dataSource={data}
        // renderItem={(item,index) => (
        //   <List.Item>
        //     <Text  style={{fontSize:15,marginRight:'1rem'}}>{listTitle[index]}:</Text>{item}
        //   </List.Item>
        //   )}
        >
        <List.Item>
            <Text  style={listStyle}>{listTitle[0]}:</Text>{data.name}
        </List.Item>
        <List.Item>
            <Text  style={listStyle}>{listTitle[1]}:</Text>{data.desc}
        </List.Item>
        <List.Item>
            <Text  style={listStyle}>{listTitle[2]}:</Text>{data.price}
        </List.Item>
        <List.Item>
            <Text  style={listStyle}>{listTitle[3]}:</Text>{cName1} {cName2? '-->'+cName2:''}
        </List.Item>
        <List.Item>
            <Text  style={listStyle}>{listTitle[4]}:</Text>
            <span>
              {
                data.imgs.map(img=>{
                  if(img){
                    return (<img style={{margin:2}}
                    src={imgUrl+img}
                    alt='img'
                  />)
                  }
                })
              }
            </span>
        </List.Item>
        <List.Item>
            <Text  style={listStyle}>{listTitle[5]}:</Text>
            <span  style={{paddingTop:15}} dangerouslySetInnerHTML={{__html: data.detail}}></span>
        </List.Item>
        </List>
      </Card>
    ); 
  }
}
export default withRouter(ProductDetail)