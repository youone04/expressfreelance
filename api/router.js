module.exports = (app) => {
    let json = require('./controller');
    app.route('/').get(json.index);
    app.route('/mahasiswa').get(json.index);
    app.route('/create').post(json.create);
    app.route('/read').get(json.read);
    app.route('/update').put(json.update);
    app.route('/delete').delete(json.delete);
}