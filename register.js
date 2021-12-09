$(function () {
    $("#Button1").click(function () {
        newAccount = {
            username: $("#username").val(),
            userpassword :$("#userpassword").val()
        }
        newAccount = JSON.stringify(newAccount);
        $.ajax({
        type: "POST",
        url: "https://localhost:44326/api/Account",
        contentType:'application/json',
        datatype: "json",
        data: newAccount,
            success: function (account) {
            localStorage.setItem("userId",account.accountid)
            localStorage.setItem("username", account.username);
            localStorage.setItem("userpassword", account.userpassword);
            window.location.href = '/index.html';
          console.log(account);
        },
        error: function () {
          alert("Kullanıcı kayıt edilemedi");
        },
      });
    });
});

function goToLogin() {
  window.location.href = '/login.html';
}




  