import React, { Component } from 'react';
import ReactStars from 'react-stars'
import YouTube from 'react-youtube';
import './App.css';


class Video extends Component {
    constructor(props) {
        super(props);

        this.nextPage = this.nextPage.bind(this)
        this.prevPage = this.prevPage.bind(this)
        this.removeVideo = this.removeVideo.bind(this)
        this.rate = this.rate.bind(this)


        this.state = {
            videoslist: [],
            video: [],
            page : 0,
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
        fetch('http://localhost:8000/api/videos/page/0')
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({videoslist: data.data , video :[data.data[0]]});
            }).catch(err => {
            console.log("erreur dans le get : " + err)
        });
    }

    componentWillUnmount() {
        //   base.removeBinding(this.ref);
    }


    removeVideo() {
        const oldvideo = this.state.video;
        const id =oldvideo[0]._id.toString()
        console.log(id)
        fetch('http://localhost:8000/api/videos/'+ id,
            { method: 'DELETE', mode:'CORS',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type': 'application/JSON'
                },
                credentials: 'same-origin'})
                .then(response => response.json())
            .then(data => {
                fetch('http://localhost:8000/api/videos/page/' + this.state.page)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        this.setState({videoslist: data.data , video : [data.data[0]]});
                    }).catch(err => {
                    console.log("erreur dans le get : " + err)
                })
            }).catch(err => {
            console.log("erreur dans le delete: " + err)
        })

    }



    updateVideo() {
        var parsedData =this.state.video;
        const id = parsedData[0]._id.toString();
        const change = JSON.stringify({
                "videoid": parsedData[0].videoid,
                "link": parsedData[0].link,
                "title": this.state.input1,
                "description": this.state.input2,
                "miniature":  parsedData[0].miniature,
            "note": parsedData[0].note
            })
        fetch('http://localhost:8000/api/videos/'+ id,
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
                this.setState({input1: "" ,input2:"" });
                fetch('http://localhost:8000/api/videos/page/' + this.state.page)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        this.setState({videoslist: data.data });
                    }).catch(err => {
                    console.log("erreur dans le get : " + err)
                })
                fetch('http://localhost:8000/api/videos/'+id)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log(data.data)
                        this.setState({video: [data.data] });
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
            "note" : 0
        })
        fetch('http://localhost:8000/api/videos',
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
                this.setState({input3: "" ,input4:"",input5: "" ,input6:"" ,input7: "" });
                fetch('http://localhost:8000/api/videos/page/' + this.state.page)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log(data.data)
                        this.setState({videoslist: data.data});
                    }).catch(err => {
                    console.log("erreur dans le get : " + err)
                })
            }).catch(err => {
            console.log("erreur dans le put: " + err)
        })
    }



    readVideo(id) {
            fetch("http://localhost:8000/api/videos/" + id)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    this.setState({video: [data.data]});
                }).catch(err => {
                console.log("erreur dans le get : " + err)
            });


    }



    nextPage() {
        const page = this.state.page+ 1
        console.log(page)
            fetch("http://localhost:8000/api/videos/page/" + page)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    if (data.data.length ===0 ){
                    } else {
                    this.setState({videoslist: data.data , page: this.state.page + 1});
                    }
                }).catch(err => {
                console.log("erreur dans le get : " + err)
            });
    }


    prevPage() {
        const page = this.state.page - 1
        if (page>= 0){
        console.log(page)
            fetch("http://localhost:8000/api/videos/page/" + page)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    this.setState({videoslist: data.data , page: this.state.page - 1});
                }).catch(err => {
                console.log("erreur dans le get : " + err)
            });
        }
    }

    rate(note){
        var parsedData =this.state.video;
        const id = parsedData[0]._id.toString();
        const change = JSON.stringify({
            "videoid": parsedData[0].videoid,
            "link": parsedData[0].link,
            "title": parsedData[0].title,
            "description": parsedData[0].description,
            "miniature":  parsedData[0].miniature,
            "note": note,
        })
        fetch('http://localhost:8000/api/videos/'+id,
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
                fetch('http://localhost:8000/api/videos/page/' + this.state.page)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        this.setState({videoslist: data.data });
                    }).catch(err => {
                    console.log("erreur dans le get : " + err)
                })
                fetch('http://localhost:8000/api/videos/'+id)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log(data.data)
                        this.setState({video: [data.data] });
                    }).catch(err => {
                    console.log("erreur dans le get : " + err)
                })
            }).catch(err => {
            console.log("erreur dans le put: " + err)
        })
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
                const ratingChanged = (newRating) => {
                    this.rate(newRating) ;
                }
                return <li onClick={() => this.readVideo(el._id.toString())} >
                    <div class="column">
                        <div class="content">
                    <h3>{el.title}</h3>
                    <p>
                    <img src={el.miniature}  /></p>
                            <p>
                        {el.description}
                    </p>
                     <ReactStars count={5}
                                        size={30}
                                        onChange={ratingChanged }
                                        color2={'#fff22a'}
                                        value={el.note}
                     />

                        </div>
                    </div>
                </li>
            }
        );

        let vid= this.state.video.map(
            (el, index) => {
                const ratingChanged = (newRating) => {
                    this.rate(newRating) ;
                }
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

                    <ReactStars count={5}
                                size={30}
                                onChange={ratingChanged }
                                color2={'#fff22a'}
                                value={el.note}
                    />
                   </div>
            }
        );

        return (
            <div className="Video">
                <p> {vid}</p>
                <button onClick={this.removeVideo}>Supprimer</button>

                <div class="row">
                <p>
                    <ul>
                    {list}
                </ul>
                </p>
                </div>
                <p>
                    <button onClick={this.prevPage}>Previous Page</button>
                    <button onClick={this.nextPage}>Next Page</button>
                </p>


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
            </div>
        );
    }


    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

}

export default Video;
