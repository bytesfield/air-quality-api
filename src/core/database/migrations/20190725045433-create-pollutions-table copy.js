const table = 'pollutions';

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
      aqius: {
        allowNull: false,
        type: Sequelize.INTEGER(11)
      },
      mainus: {
        allowNull: false,
        type: Sequelize.STRING(10)
      },
      aqicn: {
        allowNull: false,
        type: Sequelize.INTEGER(11)
      },
      maincn: {
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
