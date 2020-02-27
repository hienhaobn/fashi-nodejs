$(function() {
    //upload file
   $("#data-table").on("click", ".deleteProductMen", function(){
       let id = $(this).data("id");
       console.log(id);
   });
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