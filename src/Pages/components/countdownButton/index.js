/** 
 * 倒计时按钮，传属性name给<CountdownButton />--必须

*/

import React from 'react';
import { Button } from 'antd';

class CountdownButton extends React.Component{
    constructor (props){
        super (props);
        this.state={
            isShow: false,
            timer: 59,
            isDisabled: false,
            Timer:''
        }
    }

    handleTimer=()=>{
        this.setState({
            isShow: true
        })
        let Timer=setInterval(()=>{
            if(this.state.timer>0){
                this.setState({
                    timer: this.state.timer-1,
                    isDisabled: true
                })
            }else{
                clearInterval(Timer)
                this.setState({
                    isShow: false,
                    isDisabled: false
                })
            }
            
        },1000)
        this.setState({
            Timer
        })
    }

    componentWillUnmount (){
        clearInterval(this.state.Timer)
    }

    render (){
        
        const { isShow, timer, isDisabled } = this.state

        return (
            <Button onClick={this.handleTimer} disabled={isDisabled}>{this.props.name}{isShow?`(${timer})`:''}</Button>
        )
    }
}

export default CountdownButton;