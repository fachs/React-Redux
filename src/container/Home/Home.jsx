import React, { Component, Fragment } from 'react';
import BlogPost from '../pages/BlogPost/BlogPost';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import LifeCycleComp from '../pages/LifeCycleComp/LifeCycleComp';
import Product from '../pages/Product/Product';
import YoutubeComp from '../pages/YoutubeComp/YoutubeComp';
import DetailPost from '../pages/BlogPost/DetailPost/DetailPost';

class Home extends Component {
    render() {
        return <Router>
            <Fragment>
                <div className="navigation">
                    <Link to="/" > Home </Link>
                    <Link to="/product" > Product </Link>
                    <Link to="/lifecycle" > Life Cycle </Link>
                    <Link to="/youtubecomp" > Youtube Component </Link>
                </div>
                <Route path="/" exact component={BlogPost} />
                <Route path="/detail-post/:id" component={DetailPost} />
                <Route path="/product" component={Product} />
                <Route path="/lifecycle" component={LifeCycleComp} />
                <Route path="/youtubecomp" component={YoutubeComp} />
            </Fragment>
            
        </Router>
    }
}

export default Home;