class DB {
    initDB() {
        return Promise.resolve(true)
    }

    insert(table, data) {
        return Promise.resolve(true)
    }

    deleteDB () {
        return Promise.resolve(true)
    }

    query(query, params = []) {
        return Promise.resolve(true)
    }

    queryAll(query, params = []) {
        return Promise.resolve(true)
    }
}

module.exports = new DB()
