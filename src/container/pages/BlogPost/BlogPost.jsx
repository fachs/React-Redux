import React, { Component, Fragment } from 'react';
import Post from '../../../component/Post/Post';
import './BlogPost.css';
import axios from 'axios';

class BlogPost extends Component {
    state = {
        post: [],
        formBlogpost: {
            id: 1,
            title: '',
            body: '',
            userId: 1,
        },
        isUpdate: false,
    }

    getPostAPI = () => {
        axios.get('http://localhost:3004/posts?_sort=id&_order=desc')
        .then((res) => {
            console.log(res.data);
            this.setState(
               {post: res.data}
            )
        })
    }

    postDataToAPI = () => {
        axios.post('http://localhost:3004/posts', this.state.formBlogpost).then((res) => {
            console.log(res);
            this.getPostAPI();
            this.setState({
                formBlogpost: {
                    id: 1,
                    title: '',
                    body: '',
                    userId: 1,
                },
            })
        }, (err) => {
            console.log('error', err);
        });
    }

    putDataToAPI = () => {
        axios.put(`http://localhost:3004/posts/${this.state.formBlogpost.id}`, this.state.formBlogpost).then((res) => {
            console.log(res);
            this.getPostAPI();
            this.setState({
                isUpdate: false,
                formBlogpost: {
                    id: 1,
                    title: '',
                    body: '',
                    userId: 1,
                },
            })
        })
    }

    handleRemove = (data) => {
        console.log(data)
        axios.delete(`http://localhost:3004/posts/${data}`).then(() => {
            this.getPostAPI();
        })
    }

    handleFormChange = (event) => {
        console.log('form change')
        let formBlogPostNew = {...this.state.formBlogpost};
        let timestamp = new Date().getTime();
        
        if(!this.state.isUpdate) {
            formBlogPostNew['id'] = timestamp;
        } 

        console.log(timestamp);
        formBlogPostNew[event.target.name] = event.target.value;
        this.setState({
            formBlogpost: formBlogPostNew
        }, () => {
            console.log('value oj: ', this.state.formBlogpost)
        })
    }

    handleSubmit = () => {
        if(this.state.isUpdate) {
            this.putDataToAPI();
        } else {
            this.postDataToAPI();
        }
    }

    handleUpdate = (data) => {
        console.log(data)
        this.setState({
            formBlogpost: data,
            isUpdate: true
        })
    }

    handleDetail = (id) => {
        this.props.history.push(`/detail-post/${id}`)
    }
    
    componentDidMount() {
        // fetch('https://jsonplaceholder.typicode.com/posts')
        // .then(response => response.json())
        // .then(json => {
        //     this.setState({
        //         post: json
        //     })
        // })
        this.getPostAPI();
    }

    render() {
        return <Fragment>
            <p className="section-title">Blog Post</p>
            <div className="form-add-post">
                <label htmlFor="title">Title</label>
                <input type="text" value={this.state.formBlogpost.title} name="title" placeholder="add title" onChange={this.handleFormChange}/>
                <label htmlFor="body">Blog Content</label>
                <textarea name="body" value={this.state.formBlogpost.body} id="body" cols="30" rows="10" onChange={this.handleFormChange}></textarea>
                <button className="btn-submit" onClick={this.handleSubmit}>Simpan</button>
            </div>
            {
                this.state.post.map(post => {
                    return <Post key={post.id} data={post} remove={this.handleRemove} update={this.handleUpdate} goDetail={this.handleDetail}/>   
                })
            }
        </Fragment>
    }
}

export default BlogPost;