"use strict";'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('tools', [{
        id: 1,
        title: 'hotel',
        link: 'https://github.com/typicode/hotel',
        description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
        tags: [
          'node',
          'organizing',
          'webapps',
          'domain',
          'developer',
          'https',
          'prox'
        ]
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('tools', null, {});
  }
};
