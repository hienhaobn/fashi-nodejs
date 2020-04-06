module.exports.getBlog = (req, res) => {
    res.render("pages/admin/blog/list-blog.ejs");
}
module.exports.getCategoryBlog = (req, res) => {
    res.render("pages/admin/blog/list-category-blog.ejs");
}