import React, {Component} from 'react'
import {Form, List, Message} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'
import * as authActions from '../../module/auth/actions'
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'


const StyledListItem = styled(List.Item)`
    &&{
        &:hover{
            cursor:pointer;
            color:blue;
        }
    }
`

class SignInWithEmail extends Component{

    state = {
        email: '',
        password:'',

    }

    onHandelChange = e =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onSignInWithEmail = e =>{
        const {email, password} = this.state;

        if(!email){
            this.props.authActions.signInWithEmailFailed(new Error('Enter your email'))
            return;
        }
        if(!password){
            this.props.authActions.signInWithEmailFailed(new Error('Enter your password'))
            return;
        }

        this.props.authActions.signInWithEmail(email, password);
        
    }
    
    onFindPassword = e => {
        this.props.authActions.signInWithEmailFailed(new Error('Not implemented'))
    }

    goToSignUpWithEmailPage = e =>{
        this.props.history.push('/sign-up/email')
    }
    render(){
        const {email,password} = this.state;
        const {isLoading, error} = this.props;

        return(
           <Form>
               <Form.Field>
                   <lable>이메일</lable>
                   <input name="email" placeholder="이메일" value={email} onChange={this.onHandelChange} />
               </Form.Field>
               <Form.Field>
                   <lable>비밀번호</lable>
                   <input name="password" type="password" placeholder="비밀번호" value={password} onChange={this.onHandelChange} />
               </Form.Field>
               <Form.Button fluid type="submit" loading={isLoading} onClick={this.onSignInWithEmail}>로그인</Form.Button>
               <List>
                   <StyledListItem onClick={this.onFindPassword}>비밀번호를 잊으셨습니까? 비밀번호 찾기</StyledListItem>
                   <StyledListItem onClick={this.goToSignUpWithEmailPage}>회원이 아니십니까? 회원가입</StyledListItem>
               </List>
               {error&&error.message ? <Message>{error.message}</Message> : null}
               
               }
           </Form>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        isLoading: state.auth.signInWithEmail.isLoading,
        error:state.auth.signInWithEmail.error
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        authActions: bindActionCreators(authActions,dispatch),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(SignInWithEmail));