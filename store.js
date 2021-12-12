if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
function ready() {
  $(function fetchProducts() {
    $productList = $("#productList");
    $.ajax({
      url: "https://localhost:44326/api/Product/",
      type: "GET",
      datatype: "json",
      success: function (products) {
        $.each(products, function (i, product) {
          $productList.append(
            '<div class="shop-item">' +
              '<span class="shop-item-title">' +
              product.productname +
              "</span>" +
              '<img class="shop-item-image" src="Images/Album 1.png" />' +
              '<div class="shop-item-details">' +
              '<span class="shop-item-price">' +
              
              product.productcost +
              "</span>" +
              '<button class="btn btn-primary shop-item-button" type="button">' +
              "ADD TO CART" +
              "</button>" +
              "</div> " +
              "</div>"
          );
        });

        var addToCartButtons =
          document.getElementsByClassName("shop-item-button");

        for (var i = 0; i < addToCartButtons.length; i++) {
          var button = addToCartButtons[i];
          button.addEventListener("click", addToCartClicked);
        }
      },
      error: function () {
        alert("Ürünler getirilimedi");
      },
    });
  });

  var removeCartItemButtons = document.getElementsByClassName("btn-danger");
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }



  function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
  }

  function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updateCartTotal();
  }

  function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
    var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
    var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
    addItemToCart(title, price, imageSrc);
    updateCartTotal();
  }

  function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");
    var cartItems = document.getElementsByClassName("cart-items")[0];
    var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
    for (var i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == title) {
        alert("This item is already added to the cart");
        return;
      }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input id="quantity" class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow
      .getElementsByClassName("btn-danger")[0]
      .addEventListener("click", removeCartItem);
    cartRow
      .getElementsByClassName("cart-quantity-input")[0]
      .addEventListener("change", quantityChanged);
  }

  function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName("cart-items")[0];
    var cartRows = cartItemContainer.getElementsByClassName("cart-row");
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i];
      var priceElement = cartRow.getElementsByClassName("cart-price")[0];
      var quantityElement = cartRow.getElementsByClassName(
        "cart-quantity-input"
      )[0];
      var price = parseFloat(priceElement.innerText.replace("$", ""));
      var quantity = quantityElement.value;
      total = total + price * quantity;
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("cart-total-price")[0].innerText =
      "$" + total;
  }
}

$(function () {
    $("#Purchase").click(function () {
        
        var itemCount = document.getElementsByClassName("cart-item-title").length;
        console.log("item count" + document.getElementsByClassName("cart-item-title").length);
    for(var i = 0; i < itemCount; i++) {
        var quantity = parseInt(
        document.getElementsByClassName("cart-quantity-input")[i].value);
        for (var k = 0; k < quantity; k++) {
            newItem = {
                productname: document.getElementsByClassName("cart-item-title")[i].innerText,
                accountid: parseInt(localStorage.getItem("userId")),
                productcost: parseInt(document.getElementsByClassName("cart-price")[i+1].innerText),
            };
        
            console.log(newItem);
            newItem = JSON.stringify(newItem);
            console.log(newItem);

        $.ajax({
        type: "POST",
        url: "https://localhost:44326/api/Purchase",
        contentType: "application/json",
        datatype: "json",
        data: newItem,
            success: function (newItem) {
                console.log("success");
                console.log(newItem);
              
        },
        error: function () {
          alert("Satın alma başarısız");
        },
      });
      
      }
    }
      window.alert("Purchase Successfull!");
  });
});
