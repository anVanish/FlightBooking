const Blog = function(blog){
    this.article_id = blog.article_id
    this.header = blog.header
    this.content = blog.content
    this.public_date = blog.public_date
    this.view = blog.view
    this.image = blog.image
}

module.exports = Blog