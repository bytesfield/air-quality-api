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
        references: { model: 'locations', key: 'id' },
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false
      },
      ts: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      aqius: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      mainus: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      aqicn: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      maincn: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: (queryInterface, _Sequelize) => queryInterface.dropTable(table)
};
