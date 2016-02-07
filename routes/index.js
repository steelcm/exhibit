
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Exhibit: your portal into the art world!' })
};