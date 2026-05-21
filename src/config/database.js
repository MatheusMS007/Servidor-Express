import sequelize from './orm.js'

const execute = async (sql, params) => {
  const options = {}
  if (params) options.replacements = params
  return await sequelize.query(sql, options)
}

export default { execute }
