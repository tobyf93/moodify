$(document).ready(function() {
  $('body').on('click', '#button', function() {
    if (gon.playlists.length > 0) {
      analyzePlaylists();
    } else {
      window.location.href = '/auth/spotify';
    }
  });

  var analyzePlaylists = function() {
    $.ajax(
       {
         type: "POST",
         url: '/analyze',
         data: JSON.stringify(gon.playlists),
         dataType: "json",
         contentType: 'application/json'
       }
     );
  };
});
