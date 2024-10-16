const con = require("../config/database");

module.exports = {
    //////////////////////////////////////////////////////////////////////
    //                           DB  Workers                            //
    //////////////////////////////////////////////////////////////////////

    SELECT_Q: (query, no_data_err = true) => {
        
        return new Promise((resolve, reject) => {
            con.query(query, (err, result) => {
                if (!err) {
                    if (result?.rows.length > 0) {
                        resolve(result?.rows);
                    } else {
                        if (no_data_err) {
                            reject("no_data");
                        } else {
                            resolve([]);
                        }
                    }
                } else {
                    console.log(err);
                    
                    reject(err);
                }
            })
        });
    },

    UPDATE_Q: (query, data) => {
        return new Promise((resolve, reject) => {
            con.query(query, data, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(err);
                }
            })
        });
    },

    INSERT_Q: (query, data) => {
        return new Promise((resolve, reject) => {
            con.query(query, data, (err, result) => {
                if (!err) {
                    resolve(result?.rows[0]?.id);
                } else {
                    console.log('err :', err);
                    reject(err);
                }
            })
        });
    },

    DELETE_Q: (query) => {
        return new Promise((resolve, reject) => {
            con.query(query, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(err);
                }
            })
        });
    },

};