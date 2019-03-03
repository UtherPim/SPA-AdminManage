import React from 'react';
import { Layout, Row, Col, Menu, Dropdown, Icon, message, Input, Carousel  } from 'antd';
import './index.css';

const { Header, Footer, Content } = Layout;
const Search = Input.Search

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    handleMenu=({key})=>{
        message.info(`click on item ${key}`)
    }

    handleSearch=(value)=>{
        message.info(`the text you input is ${value}`)
    }

    render () {

        const menu=(
            <Menu onClick={this.handleMenu}>
                <Menu.Item  key='home' >Chlitina Home</Menu.Item>
                <Menu.Item  key='about' >About Chlitina</Menu.Item>
                <Menu.Item  key='products' >Products of Chlitina</Menu.Item>
                <Menu.Item  key='news' >Latest News</Menu.Item>
                <Menu.Item  key='store' >Store View</Menu.Item>
            </Menu>
        )

        return (
            <div>
                <Layout>
                    <Header  style={{ background: '#fff', padding: 0, height:100,  }} >
                        <Row type="flex" justify="space-around">
                            <Col span={8} className='font-center'>
                                <Dropdown overlay={menu}>
                                    <b href="#" style={{fontSize:16 }}>
                                        <Icon type="bars" style={{ fontSize:26,}}/> 菜单
                                    </b>
                                </Dropdown>
                            </Col>
                            <Col span={8}>
                                <img src={window.imgArr.logo_brand } alt="品牌logo"/>
                            </Col>
                            <Col span={8}>
                                <a href="www.chlitina.com">Chlitina Store</a> &nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;
                                <Search
                                    placeholder="input search text"
                                    onSearch={ this.handleSearch }
                                    style={{ width: 200 }}
                                 />  
                            </Col>
                        </Row> 
                    </Header>
                    <Content  style={{ margin: '0 16px' }}>
                        <Carousel autoplay effect="fade" >
                            <div><img src={ window.imgArr.banner1 } alt="banner1" /></div>
                            <div><img src={ window.imgArr.banner2 } alt="banner1" /></div>
                            <div><img src={ window.imgArr.banner3 } alt="banner1" /></div>
                            <div><img src={ window.imgArr.banner2 } alt="banner1" /></div>
                        </Carousel>
                        <div className='outBox'>
                            <div className="contain">
                                <div className="box">
                                    <div className="large">
                                        <img src={window.imgArr.view1} alt="view1"/>
                                    </div>
                                    <div className="small">
                                        <img src={window.imgArr.view2} alt="view2"/>
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="small">
                                        <img src={window.imgArr.view3} alt="view3"/>
                                    </div>
                                    <div className="large">
                                        <img src={window.imgArr.view4} alt="view4"/>
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="large">
                                        <img src={window.imgArr.view5} alt="view5"/>
                                    </div>
                                    <div className="small">
                                        <img src={window.imgArr.view6} alt="view6"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='news'>

                        </div>
                    </Content>
                    <Footer  className='font-center'>Footer</Footer>
                </Layout>
            </div>
        )
    }
}

export default Home;