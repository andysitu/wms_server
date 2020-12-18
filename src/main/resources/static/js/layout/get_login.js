window.onload = function() {
  $.ajax({
    url: "../user",
    type: "GET",
    success: function(data) {
      console.log(data);
      if (data.name) {
        $("#username-span").text(data.email);
        $(".unauthenticated").hide();
        $(".authenticated").show();
      } else {
        $(".unauthenticated").show()
        $(".authenticated").hide()
      }

    },
  });
};