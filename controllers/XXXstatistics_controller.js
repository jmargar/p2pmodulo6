var models = require('../models/models.js');

// GET /quizes/statistics
exports.show = function(req, res) {
	
	var values = [];
	
	models.Quiz.findAndCountAll().then( function(resp) {
		values['Número de preguntas'] = resp.count;
		console.log('------- '+resp.count);
	}).done( function(){

		models.Comment.findAndCountAll().then( function(resp) {
			values['Número de comentarios'] = resp.count;
		}).done( function (){

			models.Comment.findAndCountAll({where: {publicado:  true}}).then( function(resp) {
				values['Número de comentarios aprobados'] = resp.count;
			}).done( function (){

				models.Quiz.findAll({
					include: [{ model: models.Comment, required: true}]
				}).then( function(resp) {
					values['Preguntas con comentarios'] = resp.length;
				}).done( function (){

					models.Quiz.findAll({
						include: [{ model: models.Comment, where: {publicado:  true}, required: true}]
					}).then( function(resp) {
						values['Preguntas con algún comentario aprobado'] = resp.length;
						values['Preguntas sin comentarios'] = values['Número de preguntas'] - values['Preguntas con comentarios'];
					}).done( function (){
						
						res.render('statistics/show', {title: 'Estadísticas ', values: values});
					});
				});
			});
		});
	});


};