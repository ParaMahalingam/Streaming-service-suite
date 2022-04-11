var mysql = require('mysql');

var con = mysql.createConnection({
    host: "78.47.241.54",
    user: "streaming",
    password: "Streaming123@",
    database: "streaming"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

function Login(LoginInfo, callback) {
    con.query("SELECT * FROM User WHERE Username = ? AND BINARY(`Password`) = ? AND Banned = 0", [LoginInfo.Username, LoginInfo.Password], function (err, result) {
        if (err) {
            callback({ message: 'An error has occured!' })
        }
        else {
            var string = JSON.stringify(result);
            var json = JSON.parse(string);
            callback(json);
        }
    });
}

//MySQL statement for creating a new watchlist content
function addUser(data, callback) {
    con.query("INSERT INTO User SET ?", data, function (err, result) {
        if (err) {
            console.log(err);
            callback("There was an error!");
        } else {
            callback(result.insertId);
        }
    });
}

function updateBan(BanType, UserID, callback) {
    console.log(UserID)
    con.query(
        "UPDATE User SET Banned = ? WHERE ID = ?", [BanType, UserID], function (err, result) {
            if (err) {
                callback("There was an error!");
            } else {
                callback(result.affectedRows);
            }
        }
    );
}

function markAsSeen(ID, callback) {
    con.query(
        "UPDATE WatchList SET Seen = ? WHERE ID = ?", [1, ID], function (err, result) {
            if (err) {
                callback("There was an error!");
            } else {
                callback(result.affectedRows);
            }
        }
    );
}

function updatePassword(Data, callback) {
    con.query(
        "UPDATE User SET Password = ? WHERE ID = ?", [Data.Password, Data.ID], function (err, result) {
            if (err) {
                callback("There was an error!");
            } else {
                callback(result.affectedRows);
            }
        }
    );
}


function getUsers(callback) {
    con.query("SELECT * FROM User", function (err, result, fields) {
        if (err) {
            callback({ message: 'An error has occured!' })
        }
        else {
            var string = JSON.stringify(result);
            var json = JSON.parse(string);
            callback(json);
        }
    });
}

function getWatchList(id, callback) {
    con.query("SELECT * FROM WatchList WHERE UserID = ?", [id], function (err, result) {
        if (err) {
            callback({ message: 'An error has occured!' })
        }
        else {
            var string = JSON.stringify(result);
            var json = JSON.parse(string);
            callback(json);
        }
    });
}

//MySQL statement for creating a new watchlist content
function addWatchList(data, callback) {
    con.query("INSERT INTO WatchList SET ?", data, function (err, result) {
        if (err) {
            console.log(err);
            callback("There was an error!");
        } else {
            callback(result.insertId);
        }
    });
}

//MySQL statement for creating a new Advertisement
function addAds(data, callback) {
    con.query("INSERT INTO Advertisement SET ?", data, function (err, result) {
        if (err) {
            console.log(err);
            callback("There was an error!");
        } else {
            callback(result.insertId);
        }
    });
}

//delete a title
function deleteTitle(ID, callback) {
    con.query(
        "DELETE FROM WatchList WHERE ID = ?", [ID], function (err, result) {
            if (err) {
                callback("There was an error!");
            } else {
                callback(result.affectedRows);
            }
        }
    );
}

//delete a user
function deleteUser(ID, callback) {
    con.query(
        "DELETE FROM User WHERE ID = ?", [ID], function (err, result) {
            if (err) {
                console.log(err)
                callback("There was an error!");
            } else {
                callback(result.affectedRows);
            }
        }
    );
}

//delete an ad
function deleteAd(ID, callback) {
    con.query(
        "DELETE FROM Advertisement WHERE ID = ?", [ID], function (err, result) {
            if (err) {
                console.log(err)
                callback("There was an error!");
            } else {
                callback(result.affectedRows);
            }
        }
    );
}

function getAdvertisement(callback) {
    con.query("SELECT * FROM Advertisement", function (err, result) {
        if (err) {
            callback({ message: 'An error has occured!' })
        }
        else {
            var string = JSON.stringify(result);
            var json = JSON.parse(string);
            callback(json);
        }
    });
}
module.exports = {
    Login,
    getWatchList,
    deleteTitle,
    deleteUser,
    markAsSeen,
    addUser,
    deleteAd,
    updatePassword,
    addWatchList,
    addAds,
    updateBan,
    getUsers,
    getAdvertisement
};