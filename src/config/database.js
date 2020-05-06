// yarn add pg pg-hstore || mysql || 'sqlite'

module.exports = {
    dialect: 'postgres' | 'mysql' | 'sqlite',
    host: 'localhost',
    username: '',
    password: '',
    database: '',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};