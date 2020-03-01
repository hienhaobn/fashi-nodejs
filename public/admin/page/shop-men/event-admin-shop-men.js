$(function () {
    //upload file
    $("#data-table").on("click", ".deleteProductMen", function () {
        let id = $(this).data("id");
        $("#ModalDeleteProductMen").on("click", ".btnDeleteProductMen", function () {
            $.ajax({
                "url": "http://localhost:3001/admin/page/shop-men/delete-prduct-men&" + id,
                "method": "POST"
            }).done(function () {
                alert("Xóa sản phẩm thành công!");
                location.reload();
            })

        });

        // $.ajax({
        //     "url": "http://localhost:3001/admin/page/shop-men/delete-prduct-men&" + idProduct,
        //     "method": "POST",
        //     contentType: "application/json; charset=utf-8",
        //     error: function (err) {
        //         $("#ModalDeleteProductMen").modal('hide');
        //         alert("We couldn't connect to the server!");
        //     }
        // }).done (   function()  {
        //     $("#ModalDeleteProductMen").modal();
        //     $("#ModalDeleteProductMen").modal('hide');
        //     $(idProduct).remove();
        //     alert("Xóa sản phẩm thành công");
        // })

    });
    // $("#data-table").on("click", ".editProductMen", function () {
    //     let id = $(this).data("id");
    //     $.ajax({
    //         "url": "http://localhost:3001/admin/page/shop-men/edit-product-men&" + id,
    //         "method": "GET",
    //         "data": pros
    //     }).done(function (data) {
    //         console.log(data);
    //     });
    // });
    // function editProduct() {
    //     // var html = '<form action="http://localhost:3001/admin/page/shop-men/edit-product-men<%- pros._id %> " method="POST" enctype="multipart/form-data">';
    //     var html = '<div class="modal fade" id="ModalEditProductMen" tabindex="-1" role="dialog"';
    //     html += 'aria-labelledby="exampleModalCenterTitle" aria-hidden="true">';
    //     html += '<div class="modal-dialog modal-dialog-centered" role="document">';
    //     html += '<div class="modal-content">';
    //     html += '<div class="modal-header">';
    //     html += '<h5 class="modal-title" id="exampleModalLongTitle">Thêm sản phẩm</h5>';

    //     html += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
    //     html += ' <span aria-hidden="true">&times;</span>';
    //     html += ' </button>';
    //     html += '</div>';
    //     html += '<div class="modal-body" style="margin-left: 150px;">';

    //     html += '<input type="text" name="Name" id="name" placeholder="Nhập tên" /> <br/>';
    //     html += '<input type="text" name="Category" id="category" placeholder="Nhập thể loại" /><br/>';
    //     html += '<img src="http://localhost:3001/upload/<%- pros.image %>" alt="anh" /><br/>';
    //     html += '<input type="file" name="fileImage" id="image" /><br/>';
    //     html += '<input type="text" name="Maker" id="maker" placeholder="Nhập thương hiệu" /><br/>';
    //     html += '<input type="text" name="Price" id="price" placeholder="Nhập giá bán" /><br/>';
    //     html += '<input type="text" name="Discount" id="discout" placeholder="Nhập giá giảm" />';

    //     html += ' </div>';
    //     html += ' <div class="modal-footer">';
    //     html += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>';
    //     html += ' <button id="btnSaveEditProductMen" type="submit" class="btn btn-primary">Lưu</button>';
    //     html += ' </div>';
    //     html += '</div>';
    //     html += '</div>';
    //     html += '</div>';
    //     // html += '</form>';
    //     $('body').append(html);
    //     $("#ModalEditProductMen").modal();
    //     $("#ModalEditProductMen").modal('show');
    //     $("#btnSaveEditProductMen").on("click", function() {

    //     })
    // }
    //    function deleteProductMen(idProduct) {


    //    }
    // $("#btnSaveProductMen").click(function(req, res) {
    //     let txtName = $("#name").val();
    //     let txtCategory = $("#category").val();
    //     let txtBrand = $("#maker").val();
    //     let txtPrice = $("#price").val();
    //     let txtDiscount = $("#discount").val();
    //     $.ajax({
    //         "url": "http://localhost:3001/admin/page/admin-shop-men",
    //         "method": "POST",
    //         "data": {
    //             name: `${txtName}`,
    //             category: `${txtCategory}`,

    //         }
    //     }).done(function(result){
    //         console.log(result);
    //     });
    // })
})