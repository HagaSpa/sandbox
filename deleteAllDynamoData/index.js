const AWS = require('aws-sdk');
const Dynamo = new AWS.DynamoDB();

//TODO: async (event) いるの？
exports.handler = (event) => {
    const params = {
        TableName: "Music"
    };

    getTableInfo(params)
        .then(result => {
            console.log("data result: ", result);
        })
        .catch(err => {
            console.log("err : ", err);
        });

    // TODO implement
    return 'Hello from Lambda!';
};

const getTableInfo = (params) => {
    console.log("call api");
    return new Promise(function (onFulfilled, onRejected) {
        return Dynamo.describeTable(params, function (err, data) {
            if (err) onRejected(err);
            else {
                onFulfilled(data);
            }
        });
    });
};