$(function() {
  //event category
  $("#data-table").on("click", ".btnDeleteCategoryProduct", function() {
    let id = $(this).data("id");
    $.ajax({
      url: "http://localhost:3001/admin/page/get-category/" + id,
      method: "GET"
    }).done(function(result) {
      console.log(result);
      $("#modal-delete").attr(
        "action",
        "http://localhost:3001/admin/page/delete-category/" + result.data[0]._id
      );
    });
  });
  $("#data-table").on("click", ".btnEditCategoryProduct", function() {
    let id = $(this).data("id");
    $.ajax({
      url: "http://localhost:3001/admin/page/get-category/" + id,
      method: "GET"
    }).done(function(result) {
      console.log(result);
      let status = result.data[0].status === true ? "0" : "1";
      $("#nameCategory").val(result.data[0].name);
      $("#updateStatus").val(status);
      $("#modal-update").attr(
        "action",
        "http://localhost:3001/admin/page/update-category/" + result.data[0]._id
      );
    });
  });

  // event brand
  $("#data-table").on("click", ".btnDeleteProductBrand", function() {
    let id = $(this).data("id");
    if(id) deleteBrandModal(id);
	});
	
  $("#data-table").on("click", ".btnEditProductBrand", function() {
    let id = $(this).data("id");
    $.ajax({
      url: "http://localhost:3001/admin/page/get-brand/" + id,
      method: "GET"
    }).done(function(result) {
      console.log(result);
      let status = result.data[0].status === true ? "0" : "1";
      $("#nameCategory").val(result.data[0].name);
      $("#category").val(status);
      $("#modal-update").attr(
        "action",
        "http://localhost:3001/admin/page/update-brand/" + result.data[0]._id
      );
    });
	});
	function deleteBrandModal(brandId) {
    var html =
      '<div id="dynamicDeleteModal" class="modal fade" tabindex="-1" data-keyboard="false" data-backdrop="static" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
    html += '<div class="modal-dialog">';
    html += '<div class="modal-content">';
    html += '<div class="modal-body">';
    html += "<label><strong>Thông báo</strong></label>";
    html += "<p>Bạn có muốn xóa nhà cung cấp này?</p>";
    html += "</div>";
    html += '<div class="text-center" style="padding: 0 15px 15px;">';
    html +=
      '<button type="button" class="btn btn-green" data-dismiss="modal">Hủy</button>';
    html +=
      '<button type="button" class="btn btn-danger confirm-delete-brand">Xóa</button>';
    html += "</div>"; // content
    html += "</div>"; // dialog
    html += "</div>"; // modalWindow
    $("body").append(html);
    $("#dynamicDeleteModal").modal();
    $("#dynamicDeleteModal").modal("show");

    $(".confirm-delete-brand").on("click", function() {
			$("#dynamicDeleteModal").modal("hide");
      const callback = function(res) {
        if (res.code === 0) {
          swal({icon: "success",title: "Thông báo",text: res.message});
        }else {
          swal({icon: "error",title: "Thông báo",text: res.message});
        }
      };
      deleteBrand(brandId, callback);
      $("#data-table").find("tr." + brandId).remove();
    });
  }
  function deleteBrand(brandId, cb) {
    $.ajax({
      url: "http://localhost:3001/admin/page/delete-brand/",
      method: "POST",
      data: { brandId: brandId },
      dataType: "json",
      error: function(err) {
        $("#dynamicDeleteModal").modal("hide");
        swal({icon: "error",title: "Thông báo",text: "Chưa kết nối server!"})
      }
    }).then(function(res) {
			cb(res);
		});
	}
  // list product

  $("#data-table").on("click", ".btnDeleteProduct", function() {
    let id = $(this).data("id");
    if (id) deleteProductModal(id);
	});
	
  function deleteProductModal(productId) {
    var html =
      '<div id="dynamicDeleteModal" class="modal fade" tabindex="-1" data-keyboard="false" data-backdrop="static" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
    html += '<div class="modal-dialog">';
    html += '<div class="modal-content">';
    html += '<div class="modal-body">';
    html += "<label><strong>Thông báo</strong></label>";
    html += "<p>Bạn có muốn xóa sản phẩm này?</p>";
    html += "</div>";
    html += '<div class="text-center" style="padding: 0 15px 15px;">';
    html +=
      '<button type="button" class="btn btn-green" data-dismiss="modal">Hủy</button>';
    html +=
      '<button type="button" class="btn btn-danger confirm-delete-product">Xóa</button>';
    html += "</div>"; // content
    html += "</div>"; // dialog
    html += "</div>"; // modalWindow
    $("body").append(html);
    $("#dynamicDeleteModal").modal();
    $("#dynamicDeleteModal").modal("show");

    $(".confirm-delete-product").on("click", function() {
      $("#dynamicDeleteModal").modal("hide");
      const callback = function(res) {
        if (res.code === 0) {
          swal({icon: "success",title: "Thông báo",text: res.message});
        }else {
          swal({icon: "error",title: "Thông báo",text: res.message});
        }
      };
      deleteProduct(productId, callback);
      $("#data-table").find("tr." + productId).remove();
    });
  }
  function deleteProduct(productId, cb) {
    $.ajax({
      url: "http://localhost:3001/admin/page/delete-product/",
      method: "POST",
      data: { productId: productId },
      dataType: "json",
      error: function(err) {
        $("#dynamicDeleteModal").modal("hide");
        swal({
          icon: "error",
          title: "Thông báo",
          text: "Chưa kết nối server!"
        })
      }
    }).then(function(res) {
			cb(res);
		});
	}

	function addProductModal(data){
		var html = '<div id="popup-edit-product" class="modal hide">';
	
	 	html+='<div class="modal-header">';
		 html+='<button data-dismiss="modal" class="close" type="button">×</button>';
		 html+='<h3>Sửa thông tin sản phẩm</h3>';
		 html+='</div>';
		 html+='<div class="modal-body">';
		 html+= '<label for="code"><strong>Mã sản phẩm</strong></label>'; 
		 html+= '<input type="text" name="codeProduct" id="codeProduct" placeholder="Nhập mã sản phẩm"><br/>';
		 html+= '<label for="title"><strong>Tên sản phẩm</strong></label>'; 
		 html+= '<input type="text" name="txtNameEdit" id="nameEdit" placeholder="Nhập tên sản phẩm"><br/>';
		 html+= '<label for="image"><strong>Ảnh</strong></label>';
		 html+= '<input type="file" name="file" id="file-edit"><br/>';
		 html+= '<label for="category"><strong>Thể loại</strong></label>';
		 html+= '<select name="category" id="category-edit">';
		 html+=	 '<% data.cates.forEach((cate) => { %>';
		 html+=		 '<option value="<%- cate._id %> "><%- cate.name %> </option>';
		 html+=	 '<% });%>';
		 html+= '</select>';
		 html+=	 '<label for="brand"><strong>Nhà cung cấp</strong></label>';
		 html+= '<select name="brandEdit" id="brandEdit">';
		 html+=	 '<% data.brands.forEach((brand) => { %>';
		 html+=		 '<option value="<%- brand._id %> "><%- brand.name %> </option>';
		 html+=	 '<% });%>'; 
		 html+= '</select>';
		 html+= '<label for="price"><strong>Giá bán</strong></label>' ;
		 html+= '<input type="text" name="txtPriceEdit" id="priceEdit" placeholder="Nhập giá bán"><br/>';
		 html+= '<label for="discount"><strong>Giá giảm</strong></label>' ;
		 html+= '<input type="text" name="txtDiscountEdit" id="discountEdit" placeholder="Nhập giá giảm"><br/>';
		 html+= '<label for="discount"><strong>Số lượng</strong></label>' ;
		 html+=	 '<input type="text" name="txtQuantityEdit" id="quantityEdit" placeholder="Nhập số lượng"><br/>';
		 html+='</div>';
		 html+='<div class="modal-footer">';
		 html+= '<button class="btn btn-primary" type="submit">Lưu</button>';
		 html+=	'<button data-dismiss="modal" class="btn" type="submit">Hủy</button>' ;
		 html+='</div>';
		 html+='</div>';
	}
	function addProduct(){

	}
});
