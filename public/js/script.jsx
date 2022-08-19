var mainURL = "https://jservice.io/api/random";
var clueType = "random";
document.getElementById("currentCategory").innerHTML = "random";

async function fetchClues(url) {
  if (clueType == "random") {
    const response = await fetch(url);
    const jsonData = await response.json();
    document.getElementById("question").innerHTML = jsonData[0].question;
    document.getElementById("answer").innerHTML = jsonData[0].answer;
  } else {
    const response = await fetch(url);
    const jsonData = await response.json();
    const size = jsonData.clues.length;
    const index = Math.floor(Math.random() * size);
    document.getElementById("question").innerHTML =
      jsonData.clues[index].question;
    document.getElementById("answer").innerHTML = jsonData.clues[index].answer;

    console.log(url);
    console.log(jsonData.clues[Math.floor(Math.random() * size)].question);
  }
}

async function fetchCategories() {
  const response = await fetch("https://jservice.io/api/categories?count=100");
  const jsonData = await response.json();
  for (let i = 0; i < jsonData.length; i++) {
    var tag = document.createElement("p");
    tag.setAttribute("id", jsonData[i].id);
    tag.setAttribute("className", "categoryName");
    tag.setAttribute("onClick", "changeCategory(this.id, this.innerHTML)");
    tag.setAttribute("style", "cursor:pointer");
    var text = document.createTextNode(jsonData[i].title);
    tag.appendChild(text);
    document.getElementById("categories").appendChild(tag);
  }
}

function changeCategory(id, text) {
  document.getElementById("currentCategory").innerHTML = text;
  console.log("test function called");
  console.log("ID: " + id);
  //Override css on element with id='random'
  if (id === "random") {
    mainURL = "https://jservice.io/api/random";
    clueType = "random";
    console.log("random called");
  } else {
    //Set mainURL and clue type for categories other than random
    mainURL = "https://jservice.io/api/category?id=" + id;
    clueType = "category";
  }
}

//Calling function to fetch categories so that they are displayed on initial load
fetchCategories();

class Clues extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: "1",
      answer: "hidden",
      correct: 0,
      incorrect: 0
    };
    this.refreshQuestion = this.refreshQuestion.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
    this.counter = this.counter.bind(this);
  }

  refreshQuestion() {
    fetchClues(mainURL);
    $("#answer").css("visibility", "hidden");
    document.getElementById("answerButton").innerHTML = "Show Answer";
    this.setState({
      answer: "hidden"
    });
  }

  showAnswer() {
    if (this.state.answer == "hidden") {
      $("#answer").css("visibility", "visible");
      document.getElementById("answerButton").innerHTML = "Hide Answer";
      this.setState({
        answer: "revealed"
      });
    } else {
      $("#answer").css("visibility", "hidden");
      document.getElementById("answerButton").innerHTML = "Show Answer";
      this.setState({
        answer: "hidden"
      });
    }
  }

  counter(type) {
    if (type === "correct") {
      this.setState((state) => ({
        correct: state.correct + 1
      }));
    } else if (type === "incorrect") {
      this.setState((state) => ({
        incorrect: state.incorrect + 1
      }));
    } else {
      this.setState((state) => ({
        correct: 0,
        incorrect: 0
      }));
    }
  }

  render() {


    return (
      <div>
        <div className="row d-flex justify-content-center">
          <div className="col-2 rounded py-2" id="categories">
            <p
              className="categoryName"
              id="random"
              onClick={() => changeCategory("random", "random")}
            >
              random
            </p>
          </div>

          <div className="col-6 mx-3" id="clueBox">
            <br />
            <h2 className="text-center" id="question">
              {" "}
            </h2>
            <br />
            <h3 className="text-center" id="answer">
              {" "}
            </h3>
            <br />
            <button className="mb-4 mx-2" onClick={this.refreshQuestion}>
              {" "}
              New Question{" "}
            </button>
            <button id="answerButton" onClick={this.showAnswer}>
              {" "}
              Show Answer{" "}
            </button>
          </div>

          <div className="col-2 rounded pt-4" id="categories">
            <p className="text-center counter">Correct: {this.state.correct} </p>
            <p className="text-center counter">
              Incorrect: {this.state.incorrect}{" "}
            </p>
            <div className="d-flex justify-content-center mt-5">
              <i
                className="fa-solid fa-circle-check fa-2xl icon"
                onClick={() => this.counter("correct")}
              ></i>
              <i
                className="fa-solid fa-circle-xmark mx-3 fa-2xl icon "
                onClick={() => this.counter("incorrect")}
              ></i>
              <i
                className="fa-solid fa-arrows-rotate fa-2xl icon"
                onClick={() => this.counter("reset")}
              ></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Clues />, document.getElementById("clueHolder"));
