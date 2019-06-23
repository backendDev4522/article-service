import React, {Component} from 'react'
import {Form, Button} from 'semantic-ui-react'
import styled from 'styled-components'
import {connect} from 'react-redux'
const InvisibleUploadButton = styled.input`
    display:none;
`
const Preview = styled.div`
    height:300px;
    background-image:url(${props => props.src});
    background-repeat:no-repeat;
    background-position:center center;
    &:hover{
        cursor:pointer;
    }
`
class AddArticle extends Component{
    
    state = {
        image:null,
        content:"",
    }
    onImageChange = e =>{
        if(!(e.target.files && e.target.files.length)){
            return;
        }

        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () =>{
            this.setState({
                image:{
                    file:file,
                    src:reader.result,

                }
            })
        }
    }

    onAddImage = e =>{
        this.refs.image.click();
    }
    
    onHandleChange = e =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onAddArticle = e =>{
        const {image, content} = this.state;
        if(!image){
            this.props.articleActions.addArticleFailed(new Error('Image required'));
            return;
        }
           this.props.articleActions.addArticle({ file: image.file, content});   

    }

    onDeleteImage = e =>{
        this.refs.image.value='';
        this.setState({
            image:null,
        })
    }
    render(){

        const {image, content} = this.state;
        return(
            <Form>
                <InvisibleUploadButton ref="image" type="file" onChange={this.onImageChange} />
                <Button onClick={this.onAddImage}>이미지 추가</Button>
                {image && image.src? <Preview onClick={this.onDeleteImage} src={image.src}/>:null} 
                <Form.TextArea name="content" value={content}onChange={this.onHandleChange} />
                <Button onClick={this.onAddArticle}>게시글 추가</Button>
            </Form>

        )
    }
}

export default connect(null,null)(AddArticle);