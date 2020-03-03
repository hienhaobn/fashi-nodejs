$(function() {
  //upload file
  if ($("#data-table")) {
    $(".modal").hide();
  }
  $("#data-table").on("click", ".deleteProductMen", function() {
    let id = $(this).data("id");
    $.ajax({
      url: "http://localhost:3001/admin/page/shop-men/" + id,
      method: "GET"
    }).done(function(result) {
      $("#modal-delete").attr(
        "action",
        "http://localhost:3001/admin/page/shop-men/delete-product-men/" +
          result.data[0]._id
      );
    });
  });
  $("#data-table").on("click", ".editProductMen", function() {
    let id = $(this).data("id");
    $.ajax({
      url: "http://localhost:3001/admin/page/shop-men/" + id,
      method: "GET"
    }).done(function(result) {
      var oldData = result.data;
      console.log(oldData[0]);
      var updateData = {
        id: oldData[0]._id,
        name: oldData[0].title,
        category: oldData[0].category,
        imageUrl: oldData[0].image,
        brand: oldData[0].brand,
        price: oldData[0].price,
        discount: oldData[0].discount
      };
      if ($("#ModelEditProductMen")) {
        $("#edit-name").val(updateData.name);
        $("#edit-category").val(updateData.category);
        $("#oldImage").attr(
          "src",
          "http://localhost:3001/upload/" + updateData.imageUrl
        );
        $("#edit-maker").val(updateData.brand);
        $("#edit-price").val(updateData.price);
        if (updateData.discout == null) {
          $("#edit-discout").val(0);
        } else {
          $("#edit-discout").val(updateData.discout);
        }
        $("#modal-edit").attr(
          "action",
          "http://localhost:3001/admin/page/shop-men/edit-product-men/" +
            updateData.id
        );
      }
    });
  });
});
