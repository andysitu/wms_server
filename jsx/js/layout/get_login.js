$.ajax({
  beforeSend: function(xhr, settings) {
    // Get CSRF token
    if (settings.type == "POST" || settings.type == "PUT" ||
        settings.type == "DELETE" || settings.type == "PATCH") {
          if (!(/^http:.*/.test(settings.url) || /^https:.*/
          .test(settings.url))) {
            var cookies = document.cookie.split(";"),
                c, token;
            for (var i=0; i < cookies.length; i++) {
              c = cookies[i].split("=");
              if (c[0] == "XSRF-TOKEN") {
                token = c[1];
                break;
              }
            }
            if (token) {
              xhr.setRequestHeader("X-XSRF-TOKEN", token);
            }
          }
        }
  }
});

var log_helper = {
  logout() {
    $.ajax({
      url: "/logout",
      success: function() {
        $(".unauthenticated").show()
        $(".authenticated").hide()
      },
    });
  }
}

window.onload = function() {
  $.ajax({
    url: "/user",
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