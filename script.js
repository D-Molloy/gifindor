var gifContainer = $(".gif_container")
var btnContainer = $(".button_container")

var topics = ["quidditch", "hufflepuff", "hagrid", "butterbeer", "daniel radcliffe", "magical creatures"]

function renderButtons() {
  //remove original buttons before rerendering the array of topics
  btnContainer.empty()
  topics.forEach(function (topic) {
    // console.log(topic)
    var button = $("<button class='gifBtn'>")
    button.text(topic)
    btnContainer.append(button)
  })
}


var makeRequest = function (topic) {
  //remove original gifs before rendering the new gifs
  gifContainer.empty()

  var queryURL = `https://api.giphy.com/v1/gifs/search?q=${topic}&api_key=6181b0ebaf0342f1b3f5f8e23474b3fe`;

  // $.ajax({
  //   url: queryURL,
  //   method: "GET",
  // }).

  $.get(queryURL).then(function (response) {
    var gifsArray = response.data

    for (var i = 0; i < 10; i++) {
      var gif = gifsArray[i];
      // console.log(gif.images.fixed_height.url)
      var img = $("<img>")
      img.attr("src", gif.images.fixed_height.url)
      gifContainer.append(img)
    }
  })
}




// click event for DYNAMICALLY added elements 
$(document).on("click", ".gifBtn", function () {
  var buttonText = $(this).text()
  makeRequest(buttonText)
})


// click event for HARD-CODED elements
$("form").on("submit", function (event) {
  event.preventDefault()
  var newTopic = $("input").val()
  topics.push(newTopic)
  renderButtons()
})


renderButtons()