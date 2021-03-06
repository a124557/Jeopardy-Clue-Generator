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
  for (i = 0; i < jsonData.length; i++) {
    var tag = document.createElement("p");
    tag.setAttribute("id", jsonData[i].id);
    tag.setAttribute("class", "categoryName");
    tag.setAttribute("onclick", "changeCategory(this.id, this.innerHTML)");
    var text = document.createTextNode(jsonData[i].title);
    tag.appendChild(text);
    document.getElementById("categories").appendChild(tag);
  }
}

function changeCategory(id, text) {
  document.getElementById("currentCategory").innerHTML = text;
  console.log("test function called");
  console.log("ID: " + id);
  $(".categoryName").css({
    "background-color": "white",
    color: "black" });

  $("#" + id).css({
    "background-color": "black",
    color: "white" });

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
      incorrect: 0 };

    this.refreshQuestion = this.refreshQuestion.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
    this.counter = this.counter.bind(this);
  }

  refreshQuestion() {
    fetchClues(mainURL);
    $("#answer").css("visibility", "hidden");
    document.getElementById("answerButton").innerHTML = "Show Answer";
    this.setState({
      answer: "hidden" });

  }

  showAnswer() {
    if (this.state.answer == "hidden") {
      $("#answer").css("visibility", "visible");
      document.getElementById("answerButton").innerHTML = "Hide Answer";
      this.setState({
        answer: "revealed" });

    } else {
      $("#answer").css("visibility", "hidden");
      document.getElementById("answerButton").innerHTML = "Show Answer";
      this.setState({
        answer: "hidden" });

    }
  }

  counter(type) {
    if (type === "correct") {
      this.setState(state => ({
        correct: state.correct + 1 }));

    } else if (type === "incorrect") {
      this.setState(state => ({
        incorrect: state.incorrect + 1 }));

    } else {
      this.setState(state => ({
        correct: 0,
        incorrect: 0 }));

    }
  }

  render() {
    if (this.state.refresh == "1") {
      fetchClues(mainURL);
      this.setState({
        refresh: "2" });

    }
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { class: "row d-flex justify-content-center" }, /*#__PURE__*/
      React.createElement("div", { class: "col-2 rounded py-2", id: "categories" }, /*#__PURE__*/
      React.createElement("p", {
        class: "categoryName",
        id: "random",
        onClick: () => changeCategory("random", "random") }, "random")), /*#__PURE__*/





      React.createElement("div", { class: "col-6 mx-3", id: "clueBox" }, /*#__PURE__*/
      React.createElement("br", null), /*#__PURE__*/
      React.createElement("h2", { class: "text-center", id: "question" },
      " "), /*#__PURE__*/

      React.createElement("br", null), /*#__PURE__*/
      React.createElement("h3", { class: "text-center", id: "answer" },
      " "), /*#__PURE__*/

      React.createElement("br", null), /*#__PURE__*/
      React.createElement("button", { class: "mb-4 mx-2", onClick: this.refreshQuestion },
      " ", "New Question",
      " "), /*#__PURE__*/

      React.createElement("button", { id: "answerButton", onClick: this.showAnswer },
      " ", "Show Answer",
      " ")), /*#__PURE__*/



      React.createElement("div", { class: "col-2 rounded pt-4", id: "categories" }, /*#__PURE__*/
      React.createElement("p", { class: "text-center counter" }, "Correct: ", this.state.correct, " "), /*#__PURE__*/
      React.createElement("p", { class: "text-center counter" }, "Incorrect: ",
      this.state.incorrect, " "), /*#__PURE__*/

      React.createElement("div", { class: "d-flex justify-content-center mt-5" }, /*#__PURE__*/
      React.createElement("i", {
        class: "fa-solid fa-circle-check fa-2xl icon",
        onClick: () => this.counter("correct") }), /*#__PURE__*/

      React.createElement("i", {
        class: "fa-solid fa-circle-xmark mx-3 fa-2xl icon ",
        onClick: () => this.counter("incorrect") }), /*#__PURE__*/

      React.createElement("i", {
        class: "fa-solid fa-arrows-rotate fa-2xl icon",
        onClick: () => this.counter("reset") }))))));






  }}


ReactDOM.render( /*#__PURE__*/React.createElement(Clues, null), document.getElementById("clueHolder"));