const mongoose = require("mongoose");
const CategoryProduct = require("../models/CategoryProduct");
const BrandProduct = require("../models/BrandProduct");
const Product = require("../models/Product");

module.exports.getListProduct = async (req, res) => {
  const findBrand =  BrandProduct.find({});
  const findCategory = CategoryProduct.find({});
  const findProduct =  Product.find({}).
  populate({"path": "_brand", "select": "name"}).
  populate({path: "_category_product", select: "name"}).lean();
  await Promise.all([findProduct, findBrand, findCategory]).then(values => {
    res.render("pages/admin/product/list-product", {
      data: {
        pros: values[0],
        brands: values[1],
        cates: values[2]
      }
    });
    // res.json(values[0]);
  });
};
module.exports.getListBrand = (req, res) => {
  BrandProduct.find({}, function(err, brands) {
    if (err) res.status(500).json({ status: "fail" });
    else res.render("pages/admin/product/list-brand", { brands: brands });
  });
};
module.exports.getListCategoryProduct = (req, res) => {
  CategoryProduct.find({}, function(err, cates) {
    if (err) res.status(500).json({ status: "fail" });
    else
      res.render("pages/admin/product/list-category-product", { cates: cates });
  });
};

// category
module.exports.getCategory = (req, res) => {
  let id = req.params.id;
  CategoryProduct.find({ _id: mongoose.Types.ObjectId(id) }, function(err,pro) {
    if (err) {
      res.json({ status: "fail" });
    } else {
      res.json({ status: "success", data: pro });
    }
  });
};

module.exports.addCategory = (req, res) => {
  let nameCategory = req.body.txtName;

  if (nameCategory) {
    let cate = new CategoryProduct({
      name: nameCategory,
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

module.exports.deleteCategory = (req, res) => {
  let id = req.params.id;
  CategoryProduct.findByIdAndRemove({ _id: mongoose.Types.ObjectId(id) }).then(
    () => {
      CategoryProduct.find((err, cates) => {
        if (err) {
          console.log("Delete category fail");
          res.redirect(
            "http://localhost:3001/admin/page/list-category-product"
          );
        } else {
          console.log("Delete category success");
          res.redirect(
            "http://localhost:3001/admin/page/list-category-product"
          );
        }
      });
    }
  );
};

module.exports.updateCategory = (req, res) => {
  let id = req.params.id;
  let name = req.body.nameCategory;
  let status = parseInt(req.body.category) === 0 ? true : false;

  CategoryProduct.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    {
      $set: {
        name: name,
        status: status
      }
    },
    { new: true },
    function(err, doc) {
      if (err) throw err;
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
      res.json({ status: "fail" });
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
      res.json({code: 1, message: "Xóa nhà cung cấp thất bại!"});
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
      if (err) throw err;
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
  Product.find({ _id: id}, function(err, dataProduct){
    if(err) {
      res.json({
        status: "fail",
        err: err
      });
    } else {
      res.json({
        status: "success",
        data: dataProduct
      });
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
      res.status(400).json( {code: 1, message: "Xóa sản phẩm thất bại"} );
    } finally{
       session.endSession();
    } 
  } else {
    res.json({code: 1, message: "Xóa sản phẩm thất bại!"});
  }

};

module.exports.updateProduct = (req, res) => {};
