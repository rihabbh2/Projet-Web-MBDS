import React, { Component } from 'react';
import YouTube from 'react-youtube';
import './App.css';


class Video extends Component {
    constructor(props) {
        super(props);

        this.removeVideo = this.removeVideo.bind(this)


        this.state = {
            videoslist: [],
            video: [],
            input1: "",
            input2: "",
            input3: "",
            input4: "",
            input5: "",
            input6: "",
            input7: "",
        };
    }

    componentWillMount() {
        fetch('http://localhost:3000/videos?id=1')
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({video: data});
            }).catch(err => {
            console.log("erreur dans le get : " + err)
        });
        fetch('http://localhost:3000/videos')
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({videoslist: data});
            }).catch(err => {
            console.log("erreur dans le get : " + err)
        });
    }

    componentWillUnmount() {
        //   base.removeBinding(this.ref);
    }


    removeVideo() {
        const oldvideo = this.state.video;
   //     return
        fetch('http://localhost:3000/videos/'+ oldvideo[0].id,
            { method: 'DELETE', mode:'CORS',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type': 'application/JSON'
                },
                credentials: 'same-origin'})
                .then(response => response.json())
            .then(data => {
                fetch('http://localhost:3000/videos')
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        this.setState({videoslist: data , video : [data[0]]});
                    }).catch(err => {
                    console.log("erreur dans le get : " + err)
                })
            }).catch(err => {
            console.log("erreur dans le delete: " + err)
        })

    }



    updateVideo() {
        var parsedData =this.state.video;
        const id = parsedData[0].id;
        const change = JSON.stringify({
                "id": id,
                "videoid": parsedData[0].videoid,
                "link": parsedData[0].link,
                "title": this.state.input1,
                "description": this.state.input2,
                "miniature":  parsedData[0].miniature
            })
        fetch('http://localhost:3000/videos/'+ id,
            { method: 'PUT', mode:'CORS',
              body: change,
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type': 'application/JSON'
                },
                credentials: 'same-origin'})
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({input1: "" ,input2:"" ,video: [data]});
                fetch('http://localhost:3000/videos')
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        this.setState({videoslist: data});
                    }).catch(err => {
                    console.log("erreur dans le get : " + err)
                })
            }).catch(err => {
                console.log("erreur dans le put: " + err)
            })
    }

    addVideo() {
        var parsedData =this.state.video;
        const id = parsedData[0].id;
        const change = JSON.stringify({
            "videoid": this.state.input3,
            "link": this.state.input4,
            "title": this.state.input5,
            "description": this.state.input6,
            "miniature":  this.state.input7,
        })
        fetch('http://localhost:3000/videos/',
            { method: 'POST', mode:'CORS',
                body: change,
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type': 'application/JSON'
                },
                credentials: 'same-origin'})
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({input3: "" ,input4:"",input5: "" ,input6:"" ,input7: "" ,videolist: data});
                fetch('http://localhost:3000/videos')
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        this.setState({videoslist: data});
                    }).catch(err => {
                    console.log("erreur dans le get : " + err)
                })
            }).catch(err => {
            console.log("erreur dans le put: " + err)
        })
    }



    readVideo(id) {
            fetch("http://localhost:3000/videos?id=" + id)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    this.setState({video: data});
                }).catch(err => {
                console.log("erreur dans le get : " + err)
            });


    }

    input1Changed(event) {
        let value = event.target.value;
        this.setState({
            input1: value
        })
    }
    input2Changed(event) {
        let value = event.target.value;
        this.setState({
            input2: value
        })
    }

    input3Changed(event) {
        let value = event.target.value;
        this.setState({
            input3: value
        })
    }

    input4Changed(event) {
        let value = event.target.value;
        this.setState({
            input4: value
        })
    }

    input5Changed(event) {
        let value = event.target.value;
        this.setState({
            input5: value
        })
    }

    input6Changed(event) {
        let value = event.target.value;
        this.setState({
            input6: value
        })
    }

    input7Changed(event) {
        let value = event.target.value;
        this.setState({
            input7: value
        })
    }

    render() {

        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 0
            }
        };

        let list = this.state.videoslist.map(
            (el, index) => {
                return <li onClick={() => this.readVideo(el.id)} >
                    <div class="column">
                        <div class="content">
                    <h3>{el.title}</h3>
                    <p>
                    <img src={el.miniature}  /></p>
                            <p>
                        {el.description}
                    </p>
                        </div>
                    </div>
                </li>
            }
        );

        let vid= this.state.video.map(
            (el, index) => {
                return <div class="content">
                <p >
                    <h3>{el.title}</h3>
                    <YouTube
                        videoId={el.videoid}
                        opts={opts}
                        onReady={this._onReady}
                    />
                </p>
                    <p>{el.description}</p>
                    <input onChange={this.input1Changed.bind(this)}
                           type="text"
                           value={this.state.input1}
                           placeholder="new title"/>
                    <input onChange={this.input2Changed.bind(this)}
                           type="text"
                           value={this.state.input2}
                           placeholder="new desciption"/>
                    <button onClick={this.updateVideo.bind(this)}>Change</button>

                   </div>
            }
        );

        return (
            <div className="Video">
                <p> {vid}</p>
                <button onClick={this.removeVideo}>Supprimer</button>


                <h2> Ajouter une vidéo</h2>
                <input onChange={this.input3Changed.bind(this)}
                       type="text"
                       value={this.state.input3}
                       placeholder="new video id"/>
                <input onChange={this.input4Changed.bind(this)}
                       type="text"
                       value={this.state.input4}
                       placeholder="new video url"/>
                <input onChange={this.input5Changed.bind(this)}
                       type="text"
                       value={this.state.input5}
                       placeholder="new video title"/>
                <input onChange={this.input6Changed.bind(this)}
                       type="text"
                       value={this.state.input6}
                       placeholder="new video description"/>
                <input onChange={this.input7Changed.bind(this)}
                       type="text"
                       value={this.state.input7}
                       placeholder="new video miniature url"/>
                <button onClick={this.addVideo.bind(this)}>Ajouter</button>

                <div class="row">
                <p>
                    <ul>
                    {list}
                </ul>
                </p>

                </div>
            </div>
        );
    }


    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

}

export default Video;
