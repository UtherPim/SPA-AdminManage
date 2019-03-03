import {Route,Switch,Redirect,Router} from 'react-router-dom';
import React from 'react';
import HomePage from '../Pages/HomePage'
import Statistics from '../Pages/statistics'
import Office from '../Pages/office'
import OrderManage from '../Pages/userManage/orderManage'
import BillManage from '../Pages/userManage/billManage'
import VipManage from '../Pages/userManage/vipManage'
import TeamA from '../Pages/teamBuild/teamA'
import TeamB from '../Pages/teamBuild/teamB'
import FilePreview from '../Pages/filePreview'
import Home from '../Pages/StorePages/HomePage'
import LoginPage from '../Pages/LoginPage'
import RegisterPage from '../Pages/RegisterPage'
import ForgotPassword from '../Pages/ForgotPassword'
import context from '../utils/context'

class SelfRoute extends React.Component{
    constructor (props) { 
        super(props)
        this.state={

        }
    }

    render(){
        return (
            <Router history={context.getBrowserHistory()}>
                <div>
                    <Switch>
                        <Route path = '/system' render = {()=>{
                            return (
                                <HomePage>
                                    <Switch>
                                        <Route path="/system/home" component={Statistics}></Route>
                                        <Route path="/system/office" component={Office}></Route>
                                        <Route path="/system/user/order" component={OrderManage}></Route>
                                        <Route path="/system/user/bill" component={BillManage}></Route>
                                        <Route path="/system/user/vip" component={VipManage}></Route>
                                        <Route path="/system/team/aTeam" component={TeamA}></Route>
                                        <Route path="/system/team/bTeam" component={TeamB}></Route>
                                        <Route path="/system/file" component={FilePreview}></Route>
                                    </Switch>
                                </HomePage>
                            )
                        }} />
                        <Route path = '/'  exact render={()=> (
                            <Redirect to = '/system'/>
                        )} />
                        <Route path='/login' component={LoginPage} />
                        <Route path='/register' component={RegisterPage} />
                        <Route path='/forgotPwd' component={ForgotPassword} />
                        <Route path='/chlitinaStore' component={Home} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default SelfRoute;