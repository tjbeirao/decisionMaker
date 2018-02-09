$(document).ready(function(){
    $('#nav-bar .button').on('click', function(event){
        var sortedIDs = $( "#Fsortable" ).sortable( "toArray" );
        $.ajax({
            url: '/tweets',
            method: 'POST',
            data: tweetText,
            success: loadTweets,
            error: function( jqXHR, textStatus, errorThrown ){
              alert(errorThrown);
            }
          });
      });
    var sortedIDs = $( ".selector" ).sortable( "toArray" );
})