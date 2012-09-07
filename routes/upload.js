/**
 * Created with JetBrains WebStorm.
 * User: marshal
 * Date: 12-9-6
 * Time: 下午4:15
 * To change this template use File | Settings | File Templates.
 */
exports.upload = function(req, res){
    console.log(req.files);
    res.send('ok');
};
