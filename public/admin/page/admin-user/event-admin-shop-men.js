$(function() {
  //upload file
  if ($("#data-table")) {
    $(".modal").hide();
  }

  $("#data-table").on("click", ".btnDeleteAccount", function() {
    let id = $(this).data("id");
    $.ajax({
      url: "http://localhost:3001/admin/page/admin-user/" + id,
      method: "GET"
    }).done(function(result) {
      $("#modal-delete").attr(
        "action",
        "http://localhost:3001/admin/page/admin-user/delete-user/" +
          result.data[0]._id
      );
      console.log(result);
    });
  });

  $("#data-table").on("click", ".btnEditAccount", function() {
    let id = $(this).data("id");
    $.ajax({
      url: "http://localhost:3001/admin/page/admin-user/" + id,
      method: "GET"
    }).done(function(result) {
      var oldData = result.data[0];
      var newData = {
        "username": oldData.username,
        "password": oldData.password
      }
      if($("#editAccount")) {
        $("#edit-name").val(newData.username);
        $("#modal-edit").attr(
            "action",
            "http://localhost:3001/admin/page/admin-user/edit-user/" +
              result.data[0]._id
          );
      }
     
    });
    
  });
});
