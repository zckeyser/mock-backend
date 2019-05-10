module.exports = {
 "routes": [
        {
            "route": "test/foo",
            "method": "GET",
            "input": {
                "bar": typeof(1)
            },
            "response": {
                "status": 200,
                "body": {
                    "Success": true
                }
            }
        }
    ]
}