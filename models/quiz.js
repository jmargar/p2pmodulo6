// Definicion del modelo de Quiz con validación

module.exports = function(sequelize,DataTypes){
	return sequelize.define(
		'Quiz',
		{ 	pregunta:{ 
				type: DataTypes.STRING,
				validate: {notempty: {msg: "-> Falta Pregunta"}}
			},
			respuesta:{
				type: DataTypes.STRING,
				validate: {notempty: {msg: "-> Falta Respuesta"}}
			}
		}
	);
}