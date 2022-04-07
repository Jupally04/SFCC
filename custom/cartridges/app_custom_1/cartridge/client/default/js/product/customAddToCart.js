'use strict';
var base = require('base/product/base');

function handlePostCartAdd(response) {
  $('.minicart').trigger('count:update', response);
  var messageType = response.error ? 'alert-danger' : 'alert-success';
  // show add to cart toast
  if (
    response.newBonusDiscountLineItem &&
    Object.keys(response.newBonusDiscountLineItem).length !== 0
  ) {
    chooseBonusProducts(response.newBonusDiscountLineItem);
  } else {
    if ($('.add-to-cart-messages').length === 0) {
      $('body').append('<div class="add-to-cart-messages"></div>');
    }

    $('.add-to-cart-messages').append(
      '<div class="alert ' +
        messageType +
        ' add-to-basket-alert text-center" role="alert">' +
        response.message +
        '</div>'
    );

    setTimeout(function () {
      $('.add-to-basket-alert').remove();
    }, 2000);
  }
}
module.exports = {
  selectQuantity: function () {
    $(document).ready(function () {
      var $select = $('.select-quantity');
      for (let i = 1; i <= 10; i++) {
        $select.append($('<option></option>').val(i).html(i));
      }
    });
  },
  customAddToCart: function () {
    $(document).on('click', '.custom-add-to-cart', function () {
      var addToCartUrl = $(this).attr('url');
      var form = {
        pid: $(this).attr('pid'),
        quantity: $(this).siblings('.select-quantity').val(),
      };
      debugger;
      if (addToCartUrl) {
        $.ajax({
          url: addToCartUrl,
          method: 'POST',
          data: form,
          success: function (data) {
            handlePostCartAdd(data);
          },
          error: function () {
            alert('Product Cannot be added from here');
          },
        });
      }
    });
  },
};
