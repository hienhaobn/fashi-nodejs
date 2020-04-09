const mongoose = require("mongoose");
const CategoryProduct = require("../models/CategoryProduct");
const BrandProduct = require("../models/BrandProduct");
const Product = require("../models/Product");

module.exports.getListProduct = async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let resPerPage = 6;
  const findBrand =  BrandProduct.find({});
  const findCategory = CategoryProduct.find({});
  const findProduct =  Product.find({}).
  populate({"path": "_brand", "select": "name"}).
  populate({path: "_category_product", select: "name"})
  .skip((resPerPage * page) - resPerPage)
  .limit(resPerPage)
  .lean();
  await Promise.all([findProduct, findBrand, findCategory]).then(values => {
    res.render("pages/admin/product/list-product", {
      data: {
        pros: values[0],
        brands: values[1],
        cates: values[2]
      }
    });
  });
};
module.exports.getListBrand = (req, res) => {
  BrandProduct.find({}, function(err, brands) {
    if (err) res.status(500).json({ status: "fail" , error: err});
    else res.render("pages/admin/product/list-brand", { brands: brands });
  });
};
module.exports.getListCategoryProduct = (req, res) => {
  CategoryProduct.find({}, function(err, cates) {
    if (err) res.status(500).json({ status: "fail", error: err});
    else
      res.render("pages/admin/product/list-category-product", { cates: cates });
  });
};
module.exports.getListProductMen = async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let resPerPage = 9;
  const findProduct =  await Product.find({}).
  populate({"path": "_brand","select": "name"})
  .skip((resPerPage * page) - resPerPage)
  .limit(resPerPage)
  .lean();
 res.render("pages/shop-men", {data: findProduct});
}
// category
module.exports.getCategory = (req, res) => {
  let id = req.params.id;
  CategoryProduct.find({ _id: mongoose.Types.ObjectId(id) }, function(err,pro) {
    if (err) {
      res.json({ status: "fail", error: err });
    } else {
      res.json({ status: "success", data: pro });
    }
  });
};

module.exports.addCategory = (req, res) => {
  let nameCategory = req.body.txtName;
  let typeProduct = req.body.txtTypeProduct;

  if(!req.body){
    res.status( 404 ).json({
      code: 1,
      message: "Không tìm thấy dữ liệu request"
    });
  }
  if (nameCategory && typeProduct) {
    let cate = new CategoryProduct({
      name: nameCategory,
      type_product: typeProduct,
      status: true
    });

    cate.save(function(err) {
      if (err)
        res.redirect("http://localhost:3001/admin/page/list-category-product");
      else
        res.redirect("http://localhost:3001/admin/page/list-category-product");
    });
  }
};

module.exports.deleteCategory = async (req, res) => {
  
  let id = req.body.categoryId;
  if(!id){
    res.status( 404 ).json({
      code: 1,
      message: "Không tìm thấy id thể loại"
    })
  }
  const queryCategory = await CategoryProduct.findOne({ _id: mongoose.Types.ObjectId(id) }).populate('products');
  
  if(queryCategory){
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
      const productsId = queryCategory.products;
      productsId.map( async (product) =>{
        const brandId = product._brand;
        console.log(product);
        await BrandProduct.findOneAndUpdate({ _id: mongoose.Types.ObjectId(brandId) }, {$pull : {products: product._id}});
        await Product.deleteOne({_id: product._id});
      } )
      await CategoryProduct.deleteOne({_id: id});
      res.json({code: 0, message: "Xóa thể loại sản phẩm thành công!"});
    } catch(err) {
      session.abortTransaction();
      res.json({code: 1,error: err, message: "Xóa thể loại sản phẩm thất bại!"});
    } finally {
      session.endSession();
    }
  }
};

module.exports.updateCategory = (req, res) => {
  let id = req.params.id;
  let name = req.body.nameCategory;
  let typeProduct = req.body.nameTypeProduct;
  let status = parseInt(req.body.category) === 0 ? true : false;
  if(!id){
    res.status( 404 ).json({
      code: 1,
      message: "Không tìm thấy id thể loại"
    })
  }
  if(!req.body){
    res.status( 404 ).json({
      code: 1,
      message: "Không tìm thấy dữ liệu request"
    });
  }

  CategoryProduct.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      $set: {
        name: name,
        type_product: typeProduct,
        status: status
      }
    },
    { new: true },
    function(err, doc) {
      if (err) {
        res.status( 404 ).json({
          code:1,
          error: err,
          message: "Cập nhật thể loại thất bại"
        });
      }
      else {
        console.log("Update category success");
        res.redirect("http://localhost:3001/admin/page/list-category-product");
      }
    }
  );
};

//brand
module.exports.getBrand = (req, res) => {
  let id = req.params.id;
  BrandProduct.find({ _id: mongoose.Types.ObjectId(id) }, function(err, brand) {
    if (err) {
      res.json({ status: "fail", error: err });
    } else {
      res.json({ status: "success", data: brand });
    }
  });
};
module.exports.addBrand = (req, res) => {
  let nameBrand = req.body.txtName;

  if (nameBrand) {
    let brand = new BrandProduct({
      name: nameBrand,
      status: true
    });
    brand.save(function(err) {
      if (err) res.redirect("http://localhost:3001/admin/page/list-brand");
      else res.redirect("http://localhost:3001/admin/page/list-brand");
    });
  }
};

module.exports.deleteBrand = async (req, res) => {
  let id = req.body.brandId.trim();
  const queryBrand = await BrandProduct.findOne({ _id: mongoose.Types.ObjectId(id) }).populate('products');
  
  if(queryBrand){
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
      const productsId = queryBrand.products;
      productsId.map( async (product) =>{
        const categoryId = product._category_product;
        console.log(product);
        await CategoryProduct.findOneAndUpdate({ _id: mongoose.Types.ObjectId(categoryId) }, {$pull : {products: product._id}});
        await Product.deleteOne({_id: product._id});
      } )
      await BrandProduct.deleteOne({_id: id});
      res.json({code: 0, message: "Xóa nhà cung cấp thành công!"});
    } catch(err) {
      session.abortTransaction();
      res.json({code: 1,error: err, message: "Xóa nhà cung cấp thất bại!"});
    } finally {
      session.endSession();
    }
  }
};

module.exports.updateBrand = (req, res) => {
  let id = req.params.id;
  let name = req.body.nameCategory;
  let status = parseInt(req.body.category) === 0 ? true : false;

  BrandProduct.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      $set: {
        name: name,
        status: status
      }
    },
    { new: true },
    function(err, doc) {
      if (err) {
        res.status( 404 ).json({
          code: 1,
          error: err,
          message: "Cập nhật nhà cung cấp không thành công."
        });
      }
      else {
        console.log("Update brand success");
        res.redirect("http://localhost:3001/admin/page/list-brand");
      }
    }
  );
};

//list product

module.exports.addProduct = (req, res) => {
  let idCate = mongoose.Types.ObjectId(req.body.category.trim());
  let idBrand = mongoose.Types.ObjectId(req.body.brand.trim());
  if(!req.file){
    return res.status( 404 ).json( {code: 1,"status": "error", "message": "Không tồn tại ảnh này!" } );
  }

  if(req.file.fieldname === "file" && req.file.mimetype.includes( "image" )){
    var product = new Product({
      code: req.body.code,
      title: req.body.txtName,
      image_product: req.file.filename,
      _category_product: idCate,
      _brand: idBrand,
      price: req.body.txtPrice,
      old_price: req.body.txtDiscount,
      quantity: req.body.txtQuantity,
      created_at: Date.now()
    });
    product.save(async(err) => {
      if (err) {
        console.log("Save product error: " + err);
        res.json({
          code: 1,
          message: "Thêm sản phẩm thất bại!",
          error: err
        });
      } else {
        await BrandProduct.findByIdAndUpdate({_id: idBrand}, {$push: {products: product._id}});
        await CategoryProduct.findOneAndUpdate({_id: idCate}, {$push: {products: product._id}});
        res.status( 200 ).json({code: 0,message: "Thêm sản phẩm thành công.", data: product});
      }
    });
  }
};

module.exports.getProduct = (req, res) => {
  let id = req.params.id;
  if(!id){
    res.status( 404 ).json({
      code: 1,
      message: "Không tìm thấy id người dùng"
    });
  }
  Product.find({ _id: id}, function(err, dataProduct){
    if(err) {
      res.json({
        code: 1,
        message: "Tìm sản phẩm không thành công.",
        err: err
      });
    } else {
      // res.json({
      //   code: 0,
      //   message: "success",
      //   data: dataProduct
      // });
    }
  } ).
  populate({"path": "_brand", "select": "products"}).
  populate({path: "_category_product", select: "products"}).
  lean();

};
module.exports.deleteProduct = async (req, res) => {
  const id = req.body.productId;
  const queryProduct = await Product.findOne({_id: id});
  if(queryProduct){
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
      const idCategory = queryProduct._category_product._id;
      const idBrand = queryProduct._brand._id;
      const deleteCategory = await CategoryProduct.
      updateOne({_id: idCategory}, {$pull: {products: queryProduct._id}},{ safe: true, multi:true });
      const deleteBrand = await BrandProduct.
      updateOne({_id: idBrand}, {$pull: {products: queryProduct._id}},{ safe: true, multi:true });
      if(deleteCategory.ok && deleteBrand.ok) {
        await Product.deleteOne({_id: id});
        res.status( 200 ).json({code: 0,message: "Xóa sản phẩm thành công!"});
        await session.commitTransaction();
      }
    }catch (err){
      session.abortTransaction();
      res.status(400).json( {code: 1,error: err, message: "Xóa sản phẩm thất bại"} );
    } finally{
       session.endSession();
    } 
  } else {
    res.json({code: 1, message: "Xóa sản phẩm thất bại!"});
  }

};

module.exports.updateProduct = async (req, res) => {
  const productId = req.params.id;
  var codeProduct = req.body.editCode;
  var titleProduct = req.body.txtEditName; 
  var categoryProduct = req.body.editCategory;
  var brandProduct = req.body.editBrand;
  var priceProduct = parseInt(req.body.txtEditPrice);
  var discountProduct = parseInt(req.body.txtEditDiscount);
  var quantityProduct = parseInt(req.body.txtEditQuantity);
  const queryProduct = await Product.findOne({_id: productId});
  if(!productId){
    res.status( 404 ).json({
      code: 1,
      message: "Không tìm thấy id người dùng!"
    });
  }
  if(!queryProduct){
    res.status( 404 ).json({
      code: 1,
      message: "Không tìm thấy query"
    });
  }
  // if(!req.file){
  //   return res.status( 404 ).json( {code: 1,"status": "error", "message": "Không tồn tại ảnh này!" } );
  // }
    if(queryProduct._category_product !== categoryProduct){
     
      console.log(categoryProduct);
 
        
    }
  // if(queryProduct) {
  //   const session = await mongoose.startSession();
  //   session.startTransaction();
  //   try{
  //     let requestCategory = req.body.editCategory;
  //     let requestBrand = req.body.editBrand;
  //     let dataUpdateProduct = null;
  //     //cate brand khong thay doi
  //     if(!req.file){
  //       res.status( 404 ).json({
  //         code: 1,
  //         message: "Ảnh không tồn tại"
  //       });
  //     }
  //     if(req.file.fieldname === "fileUpdate" && req.file.mimetype.includes( "image" )){
  //       dataUpdateProduct = await Product.findByIdAndUpdate( productId, {$set: {
  //         code: codeProduct,
  //         title: titleProduct,
  //         image_product: req.file.filename,
  //         price: priceProduct,
  //         old_price: discountProduct,
  //         quantity: quantityProduct,
  //         updated_at: Date.now()
  //       }}, {new: true});
  //       if(!dataUpdateProduct) {
  //         res.status( 404 ).json({code: 1, message: "Lỗi cập nhật dữ liệu"});
  //       }
  //         console.log("Update product success");
  //         res.status( 200 ).json({code: 0, message: "Cập nhật sản phẩm thành công", data: dataUpdateProduct});
  //     }
  //     //cate thay doi va brand thay doi
  //     if(queryProduct._category_product.trim() !== categoryProduct.trim() && queryProduct._brand.trim() === brandProduct.trim()){
  //       console.log(categoryProduct);
  //     }
  //     // cate thay doi va brand khong thay doi

  //     // cate khong thay doi va brand thay doi






  //     const categoryId = queryProduct._category_product._id;
  //     const brandId = queryProduct._brand._id;
  //     const queryCategory = await CategoryProduct.update({_id: categoryId}, {$set: {"products.$": queryProduct._id}});
  //     const queryBrand = await BrandProduct.update({_id: brandId}, {$set: {"products.$": queryProduct._id}});
  //     if(queryCategory.ok && queryBrand.ok){
        
  //     }
  //   } catch(err) {
  //     session.abortTransaction();
  //     res.status( 404 ).json({
  //       code: 1,
  //       error: err,
  //       message: "Cập nhật không thành công"
  //     });
  //   } finally {
  //     session.endSession();
  //   }
  // }

};
