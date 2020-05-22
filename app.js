const Question = ({question}) => {
    const {Question} = question;
    return(
        <div>
            <h1>{Question}</h1>
        </div>
    )
}

class App extends React.Component {

    state ={
        questionTitle: 'question',
        baseURL: "http://jservice.io/api/random",
        searchUrl: "",
        query: "&t="
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.questionTitle);
        this.setState({
            searchUrl: this.state.baseURL
        }, () => {
            fetch(this.state.searchUrl).then((response) => {
                console.log(response);
                return response.json();
            }).then((data) => {
                console.log(data)
                this.setState({
                    question: data
                })
            }, err => console.log(err));
        })
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="questionTitle">Question</label>
                    <button id="questionTitle" type="submit" value={this.state.questionTitle} onChange={this.handleChange}>Get Question</button>
                </form>
                <h2>{this.state.searchUrl}</h2>
                {this.state.question &&
                    <div>
                        <h1>
                            {this.state.question[0].category.title}
                        </h1>
                        <h1>
                            {this.state.question[0].value}
                        </h1>
                        <h1>
                            {this.state.question[0].question}
                        </h1>
                    </div>
                    <button>
                        See the answer
                    </button>
                }
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));