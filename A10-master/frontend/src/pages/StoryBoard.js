import React, { Component } from 'react';
import { Button, Input, Divider, TextArea, Message, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import './Home.css';
import RouteBuilder from '../helpers/RouteBuilder';
import Actions from '../reducers/Actions';

const submitStory = (title, story) => {
    fetch(RouteBuilder.route('/submitStory'), {
        method: 'POST',
        body: JSON.stringify({ title, story }),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(response => {
        if (response.status === 200) {
            return response.json();
        }
        return null;
    });
};

const fetchCards = storeStories => {
    fetch(RouteBuilder.route('/fetchCards')).then(response => {
        if (response.status === 200) {
            return response.json();
        }
        return null;
    }).then(storyData => {
        storeStories(storyData);
    });
};

const displayStories = storyData => {
    const stories = [];
    storyData.forEach(story => {
        stories.push((
            <div>
                <h3>{story.title}</h3>
                <textarea>{story.story}</textarea>
            </div>
        ));
    });

    return stories;
};

class Home extends Component {
    constructor(props) {
        super(props);

        fetchCards(props.storeStories);
    }

    handleClear() {
        const msg = document.getElementById("sc");
        const title = document.getElementById("title");
        msg.value = "";
        title.value = "";
        return;
    }
    handlePost() {
        const randID = Math.floor(Math.random() * 9901);
        const msgr = document.getElementById("mgr");
        const story = document.getElementById("sc").value;
        const title = document.getElementById("title").value;
        const holder = document.getElementById("scHolder");
        submitStory(title, story);
        if (title.length < 6 || title.length > 255) {
            msgr.innerHTML = "Title is <strong>too short!</strong> You need at least 6 characters to post a story!";
            msgr.classList.remove("info");
            msgr.classList.add("negative");
            return;
        }
        if (story.length < 1 || story.length > 2048) {
            msgr.innerHTML = "Story is <strong>too short!</strong> You need at least 80 characters to post a story!";
            msgr.classList.remove("info");
            msgr.classList.add("negative");
            return;
        }


        //remove <button onClick={this.handlePost} className="ui secondary button">Post</button>
        const sRemove = document.createElement('button');
        sRemove.innerHTML = "close";
        sRemove.classList.add("ui");
        sRemove.classList.add("button");
        sRemove.classList.add("inverted");
        sRemove.classList.add("red");
        sRemove.setAttribute("id", randID);
        sRemove.addEventListener("click", function () {
            this.parentElement.style.display = "none";
        });

        //Story
        const sText = document.createElement('textarea');
        sText.innerHTML = story;
        sText.style.width = "100%";
        sText.style.border = "none";
        sText.disabled = true;
        sText.style.backgroundColor = "white";
        //Story Head
        const sHead = document.createElement('h3');
        sHead.innerHTML = title;
        //Story Holder Div
        const sHolder = document.createElement('div');
        sHolder.classList.add("ui");
        sHolder.classList.add("segment");
        sHolder.appendChild(sHead);
        sHolder.appendChild(sText);
        sHolder.appendChild(sRemove);
        holder.appendChild(sHolder);
        msgr.innerHTML = "Story is <strong>Posted!</strong>";
        msgr.classList.remove("negative");
        msgr.classList.add("positive");
    }
    render() {
        const {
            storyData
        } = this.props;

        return (
            <div>
                <NavBar />
                <div className='container'>
                    <Header as='h2'>Remove Story Card:</Header>
                    <Message id='mgr'>
                        <p>Type at least <strong>80 characters
                        </strong> then click <a href='#' className='alert-link'>
                        'Post'!</a>
                        </p>
                    </Message>
                    <Input
                        icon='book'
                        id='title'
                        iconPosition='left'
                        label={{ tag: true, content: 'Add Title' }}
                        labelPosition='right'
                        placeholder='Enter Title'
                    />
                    <br/><br/>
                    <strong>Story:</strong>
                    <TextArea className='form-control' placeholder='Kittens...' id='sc' rows='3'/>
                    <br/><Button onClick={this.handlePost} primary>Post</Button>
                    <Button onClick={this.handleClear} secondary>Clear</Button>
                    <Divider horizontal>Posted Stories</Divider>
                    <div id='scHolder'>
                        <div className='ui segment'>
                            <Header as='h3'>Cool Story</Header>
                            <p>This is a sample test. This is also a cool story
                             that knows no end. Sike it just ended. You didnt
                             see that coming did you?</p>
                            <i>By</i> <a className='ui yellow image label'>
                            Bro<div className='detail'>Co-worker</div>
                            </a>
                            {displayStories(storyData)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        title: state.story.title,
        story: state.story.story,
        storyData: state.story.storyData,
        hasStoryData: state.story.hasStoryData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        storeStories: storyData => {
            const action = {
                type: Actions.story.fetchCards,
                value: storyData
            };

            dispatch(action);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
