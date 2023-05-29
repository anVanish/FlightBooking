const db = require('../../config/db')
const Blog = require('../models/BlogModel')

const GeneralRepo = function(){}
GeneralRepo.findAllBlog = ()=>{
    var sql = 'select * from article'
    return db.execute(sql)
}

GeneralRepo.findBlogById = (article_id)=>{
    var sql = 'select * from article where article_id = ?'
    return db.execute(sql, [article_id])
}

GeneralRepo.readBlog = (article_id)=>{
    var sql = 'update article set view = view + 1 where article_id = ?'
    return db.execute(sql, [article_id])
}

GeneralRepo.findPopBlog = () => {
    var sql = 'select * from article order by view desc limit 3'
    return db.execute(sql)
}

module.exports = GeneralRepo