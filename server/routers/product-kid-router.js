var express = require("express");
var router = express.Router();
const ProductKidController = require("../controllers/productKid.controller");

// upload(req, res, err => {
//     if (err instanceof multer.MulterError) {
//       console.log("A Multer error occurred when uploading");
//       res.json({ result: 0 });
//     } else {
//       console.log("Upload is okay");
//       console.log(req.file); // infomation file uploaded
//       if (req.body.txtUn && req.body.txtPa) {
//         res.json({ file: req.file.filename });
//       } else {
//         var pro = new ProductKid({
//           title: req.body.txtName,
//           category: req.body.txtCategory,
//           image: req.file.filename,
//           brand: req.body.txtMaker,
//           price: req.body.txtPrice,
//           discount: req.body.txtDiscount,
//           ordering: 1,
//           active: 1
//         });
//         pro.save(err => {
//           if (err) {
//             console.log("Save Product Kid Error: " + err);
//           } else {
//             console.log("Save Product Kid Successfull!" + pro._id);
            
//           }
//         });
//       }
//     }
//   });
// });
// Handle upload file image
const multer = require( "multer" ),
  fs = require( "fs-extra" ),
  storage = multer.diskStorage( {
    "destination": ( req, file, cb ) => {
      const path = "./uploads/help/product";

      fs.mkdirsSync( path );
      cb( null, path );
    },
    "filename": ( req, file, cb ) => {
      cb(
        null,
        `${new Date().toISOString().replace( /:|\./g, "" )}-${file.originalname}`
      );
    }
  } ),
  upload = multer( {
    "storage": storage,
    "limits": {
      "fileSize": 1024 * 1024 * 25
    },
    "fileFilter": function( req, file, cb ) {
      if ( !file.originalname.match( /\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/ ) ) {
        return cb( new Error( "Ảnh không đúng dạng, vui lòng thử lại!" ) );
      }
      cb( null, true );
    }
  } );

router.route("/")
        .get(ProductKidController.index)