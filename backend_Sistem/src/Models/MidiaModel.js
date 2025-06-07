module.exports = (sequelize, DataTypes) => {
  const MIDIA = sequelize.define('MIDIA', {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    TIPO_MIDIA: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    NOTICIAS_IDNOTICIAS: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'NOTICIAS',
        key: 'IDNOTICIAS'
      }
    }
  }, {
    tableName: 'MIDIA',
    timestamps: false
  });

  MIDIA.associate = function(models) {
    MIDIA.belongsTo(models.NOTICIAS, {
      foreignKey: 'NOTICIAS_IDNOTICIAS',
      as: 'noticia'
    });
  };

  return MIDIA;
};
