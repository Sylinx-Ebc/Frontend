var username = localStorage.getItem("username");
var userpassword = localStorage.getItem("userpassword");
var userId = localStorage.getItem("userId");

if (username == "" && userpassword == "") {
 window.location.href = '/login.html';
}
else {

  $(function () {
    $.ajax({
      url: "https://localhost:44326/api/Account/" + userId,
      type: "GET",
      datatype: "json",
      success: function (data) {
        console.log(data);
      },
      error: function (data) {
        alert("Bu Id'ye Ait Bir Kullanıcı Yok");
      },
    });
  });

  document.getElementById("account_name").value = username;
  document.getElementById("user_password").value = userpassword;
}

$(function () {
  $("#editProfile").click(function () {
    updateAccount = {
      accountid: localStorage.getItem("userId"),
      username: document.getElementById("account_name").value,
      userpassword: document.getElementById("user_password").value
    }
    var lsUserId = updateAccount.accountid;
    var lsUsername = updateAccount.username;
    var lsPassword = updateAccount.userpassword;

    updateAccount = JSON.stringify(updateAccount);

      $.ajax({
        type: "PUT",
        url: "https://localhost:44326/api/Account",
        contentType:'application/json',
        datatype: "json",
        data: updateAccount,
        success: function (updateAccount) {
          localStorage.setItem("userId", lsUserId);
          localStorage.setItem("username", lsUsername);
          localStorage.setItem("userpassword",lsPassword);
          window.alert("You have changed your account information !");
        },
        error: function (users) {
          alert("Kullanıcılar getirilimedi");
        },
      });
    });
});



$(function fetchPurchase() {
  var userId = localStorage.getItem("userId");
  console.log(userId);
  $purchaselist = $('#cart-items');
  $.ajax({
    url: "https://localhost:44326/api/Purchase/" + userId,
    type: "GET",
    datatype: "json",
    success: function (purchases) {
      $.each(purchases, function (i, purchase) {
        console.log(purchase);
        $purchaselist.append(
          '<div class="cart-row">' +
          '<div class="cart-item cart-column">' +
          '<span class="cart-item-title">' + purchase.productname + '</span>' +
          '</div>' +
          '<span class="cart-price cart-column">' + purchase.productcost + '</span>' +
          '<div class="cart-quantity cart-column">' +
          '<input class="cart-quantity-input" type="number" value="1"/>' +
          '</div>' +
          '</div>');
      })
    },
    error: function () {
      alert("Ürünler getirilimedi");
    },
  });

});


$(function () {
  $("#deleteProfile").click(function () {

      $.ajax({
        type: "DELETE",
        url: "https://localhost:44326/api/Account/"+userId,
        contentType:'application/json',
        datatype: "json",
        success: function () {
          window.alert("You have deleted your account !");
          window.location.href = '/login.html';
        },
        error: function (users) {
          alert("Kullanıcı silinemedi");
        },
      });
    });
});