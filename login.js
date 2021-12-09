var loggedUsername='';
var loggedUserpassword='';

$(function () {
  $("#Button1").click(function () {
    var username = $("#username").val();
    var userpassword = $("#userpassword").val();
      $.ajax({
        url: "https://localhost:44326/api/Account/",
        type: "GET",
        datatype: "json",
        success: function (users) {
          $.each(users, function (i, user) {
            if (user.username == username && user.userpassword == userpassword) {
              localStorage.setItem("userId", user.accountid)
              localStorage.setItem("username", user.username);
              localStorage.setItem("userpassword",user.userpassword);
              window.location.href = '/index.html';
            
            }
          })
          console.log(users);
        },
        error: function (users) {
          alert("Kullanıcılar getirilimedi");
        },
      });
    });
});

function navigateRegister() {
  window.location.href = '/register.html';
}


  