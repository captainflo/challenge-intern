// Finction to print all Messages
function printAllMessage(data){
  for (let i = 0; i < data.length; i++) {
    var appendVar, btnVar;
    var time = moment(data[i].timestamp).format("LL")
    
    if (data[i].isTrashed == false){
      appendVar = $(".divUntrash");
      btnVar    = `<button class="trash btn btn-trash" data-id="${data[i].id}" data-trash="${data[i].isStarred}"><i class="fas fa-trash"></i></button>`;

    } else {
      appendVar = $(".divTrash");
      btnVar    = '';
    }
    appendVar.append(`
          <div class="card" id="${data[i].id}">
          <div class="card-body">
            <div class="row">
                <div class="col-md-8">
                    <div class="image-avatar">
                        <img id="avatar" src="${data[i].avatar}" alt="">
                        <p id="handle" class="card-title">${data[i].handle}</p>
                    </div>
                    <span class="twitter">${data[i].source} |</span> <span id="timestamp">${time}</span>
                    <p id="score">Score: ${data[i].score}</p>
                    <p id="content" class="card-text">${data[i].content}.</p>
                </div>
                <div class="col-sm-12 col-md-4">
                    <div class="started">
                        <button data-id="${data[i].id}" data-star="${data[i].isStarred}" class="star btn btn-message">Star Message!</button>
                        ${btnVar}
                    </div>
                </div>
            </div>
          </div>
        </div>`
      );

  starChecked();
}
}

// function count star
function starcount(){
  var count = 0;
  // Send the PUT request.
$.ajax("/api/all",{
  type: "GET",
}).then(
  function(data) {
    for (let i = 0; i < data.length; i++) {
      if(data[i].isStarred == true){
        count += 1;
      }
    }
    $(".Starred").text("Starred: " +count);
  }
);
}
starcount()

//Function to Star the message 
function star(){
  $(document).on("click",".star",function(event) {
    event.preventDefault();
    id = $(this).data("id");
  
    if($(this).data("star") == true){
      $(this).data("star", false);
    }else{
      $(this).data("star", true);
    }
  
    var star = {
      id: id,
      isStarred: $(this).data("star")
    };
  
    console.log(star);
    // Send the PUT request.
    $.ajax("/api/star",{
      type: "PUT",
      data: star
    }).then(
      function(dbstar) {
        starcount();
        starChecked();
      }
    );
  })
}
star();


// Check if isStarred is true
function starChecked(){
  $(".star").each(function(){
    if($(this).data("star") === true){
      $(this).css({
        "background-color": '#D4AF37',
        "border-color" : 'white',
        "color" : '#fff'
    });
      $(this).text('starred');
    }else{
      $(this).css({
        'background-color':'#fff',
        "border-color" : 'black',
        "color" : 'black'
      });
      $(this).text('Star Message!');
    }
  })
}
starChecked();

// Function to Delete the message 
function trash(){
  $(document).on("click",".trash",function(event) {
    event.preventDefault();
    id = $(this).data("id");
    $("#"+id).hide();
  
    if($(this).data("trash") === false){
      $(this).data("trash", true);
    }
  
    var trash = {
      id: id,
      isTrashed: $(this).data("trash")
    };
  
    console.log(trash);
    // Send the PUT request.
    $.ajax("/api/trash",{
      type: "PUT",
      data: trash
    }).then(
      function(dbtrash) {
        
      }
    );
  });
}
trash();

// function print all message when toogle trash and Untrash message
function Allmessage(){
  $.ajax("/api/all",{
    type: "GET",
  }).then(
    function(data) {
      printAllMessage(data);
    }
  );
}
Allmessage();

// Function to allows a user to sort messages by score
function ScoreUP(){
  $("#score").on("click", function(event){
    event.preventDefault();
    
    // Send the PUT request.
    $.ajax("/api/scoreup",{
      type: "GET",
    }).then(
      function(data) {
        $(".divUntrash").empty();
        $(".divTrash").empty();
        printAllMessage(data);
      }
    );
  })
}
ScoreUP();


// Function to allows a user to sort messages by score
function ScoreDown(){
  $("#scoreUP").on("click", function(event){
    event.preventDefault();
    
    // Send the PUT request.
    $.ajax("/api/scoredown",{
      type: "GET",
    }).then(
      function(data) {
        $(".divUntrash").empty();
        $(".divTrash").empty();
        printAllMessage(data);
      }
    );
  })
}
ScoreDown();


// Toogle Score Sorting
$("#buttonParent").on('click', '#score', function () {
  $("#score").val("Score ∆");
  $("#score").attr("id", "scoreUP");
  ScoreDown();
});

$("#buttonParent").on('click', '#scoreUP', function () {
  $("#scoreUP").val("Score ∇");
  $("#scoreUP").attr("id", "score");
  ScoreUP();
});

// Toogle for Trash and Untrash Messages
$('.divTrash').hide();
$("#buttonParent").on('click', '#btn1', function () {
  $('.divTrash').empty();
  Allmessage();
  $("#btn1").val("Untrashed messages");
  $("#btn1").attr("id", "btn2");
  $("#score").hide();
  $("#scoreUP").hide();
  $(".divUntrash").hide();
  $('.divTrash').show();
});

$("#buttonParent").on('click', '#btn2', function () {
  $('.divUntrash').empty();
  Allmessage();
  $("#btn2").val("Show Trashed Messages");
  $("#btn2").attr("id", "btn1");
  $("#score").show();
  $("#scoreUP").show(); 
  $(".divUntrash").show();
  $('.divTrash').hide();
});


// Replace text but keep case Helper function 
function matchCase(text, pattern) {
  var result = '';

  for(var i = 0; i < text.length; i++) {
      var c = text.charAt(i);
      var p = pattern.charCodeAt(i);

      if(p >= 65 && p < 65 + 26) {
          result += c.toUpperCase();
      } else {
          result += c.toLowerCase();
      }
  }
  return result;
}

// Textlight function
$("#highlightButton").on("click", function(event){
  event.preventDefault();
  // turn user input lower case
  var input = $("#highlight").val();
  
  // empty my input
  $( "#highlight" ).val('');

  // Send the GET request.
  $.ajax("/api/content/" + input,{
    type: "GET"
  }).then(
    function(data) {
      $(".divUntrash").empty();
      $(".divTrash").empty();
      
      // loop trought each data the content
      data.forEach(data => {

        // use RegEx to match input case-insensitive
        var regEx = new RegExp(input, "ig");
        var text = data.content

        // use helper func to replace matches
        text = text.replace(regEx, function(match) {
          return '<span class="highlighted-text">' + matchCase(input, match) + '</span>';        
        });

        // reassign data content
        data.content = text;

      });
      // print All messages with the new content
      printAllMessage(data);
  });
});