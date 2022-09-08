const table = 'weathers';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(table, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11).UNSIGNED
      },
      location_id: {
        allowNull: false,
        references: { model: 'locations', key: 'id' },
        type: Sequelize.INTEGER(11).UNSIGNED
      },
      ts: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      tp: {
        allowNull: false,
        type: Sequelize.INTEGER(11)
      },
      pr: {
        allowNull: false,
        type: Sequelize.INTEGER(11)
      },
      hu: {
        allowNull: false,
        type: Sequelize.INTEGER(11)
      },
      ws: {
        allowNull: false,
        type: Sequelize.INTEGER(11)
      },
      wd: {
        allowNull: false,
        type: Sequelize.INTEGER(11)
      },
      ic: {
        allowNull: false,
        type: Sequelize.STRING(10)
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, _Sequelize) => queryInterface.dropTable(table)
};
