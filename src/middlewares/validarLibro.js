const Joi = require('joi');

const validarLibro = (req, res, next) => {
    
  const esquemaLibro = Joi.object({
    titulo: Joi.string().required(),
    autor: Joi.string().required(),
    key: Joi.string().required(),
    añoDePublicacion: Joi.number().required(),
    categoria: Joi.string().required()
  });

  const { error } = esquemaLibro.validate(req.body);

  if (error) {
    return res.status(400).json({ error: 'Datos inválidos: ' + error.details[0].message });
  }

  next();
};

module.exports = validarLibro;

