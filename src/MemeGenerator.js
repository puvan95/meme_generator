import React, {Component} from "react"

class MemeGenerator extends Component{
    constructor(){
        super()
        this.state={
            topText : "",
            bottomText : "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs : []
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        fetch("http://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response =>{
                const{memes} = response.data
                console.log(memes[0])
                this.setState({allMemeImgs : memes})
            })
    }

    handleChange(event){
        const{name, value} = event.target
        this.setState({
            [name] : value
        })
    }

    handleSubmit(event){
        event.preventDefault()

        const randomInt = Math.floor(Math.random() * this.state.allMemeImgs.length)

        const randomMeme = this.state.allMemeImgs[randomInt].url

        this.setState({
            randomImg: randomMeme
        })
    }

    render(){
        
        return(
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input
                        type = "text"
                        name="topText"
                        placeholder="Enter Top Text"
                        value= {this.state.topText}
                        onChange = {this.handleChange}
                    />
                    <input
                        type = "text"
                        name="bottomText"
                        placeholder="Enter Bottom Text"
                        value= {this.state.bottomText}
                        onChange = {this.handleChange}
                    />

                    <button>Generate</button>

                </form>

                <div className="meme">
                    <h2 className = "top">{this.state.topText}</h2>
                    <img src={this.state.randomImg} alt=""/>
                    <h2 className = "bottom">{this.state.bottomText}</h2>
                </div>

            </div>
        )
    }
}

export default MemeGenerator