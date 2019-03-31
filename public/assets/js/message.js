// Finction to print all Messages
function printAllMessage(data){
  for (let i = 0; i < data.length; i++) {

    var appendVar, btnVar;

    if (data[i].isTrashed == false){
      var time = moment(data[i].timestamp).format("LL")

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
      $(this).css('background-color','#FFFF00');
      $(this).text('starred');
    }else{
      $(this).css('background-color','#fff');
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


$("#highlightButton").on("click", function(event){
  event.preventDefault();
  // turn user input lower case
  var input = $("#highlight").val()

  $(".card-text").each(function(){
      // turn content to lower case
      var content = $(this).text();
      var searchMask = input;
      //g modifier: global. All matches (don't return on first match)
      //i modifier: insensitive. Case insensitive match (ignores case of [a-zA-Z])
      var regEx = new RegExp(searchMask, "ig");

      console.log(regEx)
      
      var replaceMask = `<span class="highlighted-text">${searchMask} </span>`;
      $(this).html(content.replace(regEx, replaceMask));
  });

    // Send the GET request.
    $.ajax("/api/content",{
      type: "GET"
    }).then(
      function(data) {
        for (let i = 0; i < data.length; i++) {
          console.log(data[i].content);
       
        }

      }
    );
})




