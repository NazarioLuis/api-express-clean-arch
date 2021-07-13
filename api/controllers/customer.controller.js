class CustomerController {
    get = (req, res) => {
        res.json({
            result: "get customeres"
        });
    }
}

module.exports = CustomerController