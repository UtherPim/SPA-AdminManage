import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon, Avatar, Dropdown } from 'antd';
import systemMenu from '../Menu'
import './index.css'
import tool from '../../utils/tool'

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      collapsed: false,
      tag: "home",
      userName: 'uther',
      breadcrumb: []
    }
  }

  componentDidMount (){
    let searchList = window.location.pathname.slice(1,).split('/');
    console.log(searchList)
    console.log(tool('','','preMonth'))
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }  

  itemRender = (route, params, routes, paths) =>{
    // console.log(route,params,routes,paths)
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? <span>{route.name}</span> : <Link to={'/'+paths.join('/')}>{route.name}</Link>;
  }

  renderMenu = (menuList)=>{
      return menuList.map((item,index)=>{
        if(item.children){
          return <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}>
            {this.renderMenu(item.children)}
          </SubMenu>
        }else{
          return (
            <Menu.Item key={item.key}  onClick={this.handleClick}>
              <NavLink to={item.path}>
                <Icon type={item.icon}></Icon>
                <span>{item.name}</span>
              </NavLink>
            </Menu.Item>
          )
        }
      })
  }

  clearData=()=>{
    window.location.pathname= '/login'  
  }

  render() {

    const interfaceList=(
      <Menu>
        <Menu.Item onClick={ this.clearData } >
          <span><Icon type="logout" style={{ fontSize: 12}} /> &nbsp;<e>安全退出</e></span>  
        </Menu.Item> 
      </Menu>  
    )
    return (
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo" >
              <img src={window.imgArr.logo_head } alt="" width='170' />
            </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              {this.renderMenu(systemMenu)}
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }} >
              <Dropdown overlay={interfaceList}>
                <Avatar src = { window.imgArr.logo_brand } style={{ position:'absolute', right: 100, top: 10 }} alt={this.userName} ></Avatar>
              </Dropdown> 
            </Header>
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }} itemRender={this.itemRender} routes={systemMenu} >
                {/* <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
              </Breadcrumb>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                {this.props.children}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
