import React, {Component} from 'react'
import {Form} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import {Message} from 'semantic-ui-react'
import * as authActions from '../../module/auth/actions'
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'

class SignUpWithEmail extends Component{

    state = {
        email: '',
        password:'',
        passwordCheck:'',
    }

    onHandelChange = e =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onSignUpWithEmail = e =>{
        const {email, password, passwordCheck} = this.state;

        if(!email){
            this.props.authActions.signUpWithEmailFailed(new Error('Enter Your Email'))
            return;
        }
        if(!password){
            this.props.authActions.signUpWithEmailFailed(new Error('Enter Your password'))
            return;
        }
        if(password !== passwordCheck){
            this.props.authActions.signUpWithEmailFailed(new Error('Password not matched'))
            return;
        }
        
        //이메일로 회원가입
    }
    
    
    render(){
        const {email,password, passwordCheck} = this.state;
        const {isLoading, error} = this.props;
        return(
           <Form>
               <Form.Field>
                   <lable>이메일</lable>
                   <input name="email" placeholder="이메일" value={email} conChange={this.onHandelChange} />
               </Form.Field>
               <Form.Field>
                   <lable>비밀번호</lable>
                   <input name="password" type="password" placeholder="비밀번호" value={password} conChange={this.onHandelChange} />
               </Form.Field>
               <Form.Field>
                   <lable>비밀번호 확인</lable>
                   <input name="passwordCheck" placeholder="비밀번호 확인" value={passwordCheck} conChange={this.onHandelChange} />
               </Form.Field>
               <Form.Button fluid type="submit" loading={isLoading} onClick={this.onSignUpWithEmail}>회원가입</Form.Button>
               {error&&error.message ? <Message>{error.message}</Message> : null}
           </Form>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        isLoading: state.auth.signUpWithEmail.isLoading,
        error:state.auth.signUpWithEmail.error
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        authActions: bindActionCreators(authActions,dispatch),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(SignUpWithEmail));