import Customers from "../models/CustomersModel.js";
import handleErrors from "../helpers/handleErrors.js";
// Customers CRUD
// CREATE new customers
const addCustomer = async (req, res, next) => {
    // Create a new client
    const newCustomer = new Customers(req.body);
    try {
        // Prevent duplicate customers by consulting the DB
        const customerExists = await Customers.findOne({email: req.body.email});
        if (customerExists) {
            return handleErrors(res, 400, 'There is already a registered customer with the same email.');
        }
        // Save it in the DB
        const savedCustomer = await newCustomer.save();
        // Successful response
        res.status(201).json(savedCustomer);
        next();
    } catch (error) {
        handleErrors(res, 500, error.message);
    }
};
// READ all customers
const getCustomers = async (req, res) => {
    try {
        // Query the DB to get all the customers
        const customers = await Customers.find({});
        // There are no registered customers
        if (customers.length === 0) {
            return handleErrors(res, 404, 'No registered customer found.');
        }
        res.status(200).json(customers);
    } catch (error) {
        handleErrors(res, 500, error.message);
    }
};
// READ a customer by ID
const getCustomer = async (req, res) => {
    try {
        // Query the DB to get a the customer
        const customer = await Customers.findById({_id: req.params.id});
        // Customer no found
        if (!customer) {
            return handleErrors(res, 404, 'Customer no found.');
        }
        res.status(200).json(customer);
    } catch (error) {
        handleErrors(res, 500, error.message);
    }
};
// UPDATE a customer by ID
const updateCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        const oldCustomer = await Customers.findById(req.params.id);
        // Customer no found
        if (!oldCustomer) {
            return handleErrors(res, 404, 'Customer no found.');
        }
        // Build a new customer with the existing data
        const updatedCustomerData = {
            ...(req.body.name ? { name: req.body.name } : { name: oldCustomer.name }),
            ...(req.body.lastname ? { lastname: req.body.lastname } : { lastname: oldCustomer.lastname }),
            ...(req.body.company ? { company: req.body.company } : { company: oldCustomer.company }),
            ...(req.body.email ? { email: req.body.email } : { email: oldCustomer.email }),
            ...(req.body.phone ? { phone: req.body.phone } : { phone: oldCustomer.phone })
        };
        // Query the DB to update a customer by ID
        const updatedCustomer = await Customers.findByIdAndUpdate(req.params.id, updatedCustomerData, { new: true });
        res.status(200).json(updatedCustomer);
    } catch (error) {
        handleErrors(res, 500, error.message);
    }
};
// DELETE a customer by ID
const deleteCustomer = async (req, res) => {
    try {
        // Query the DB to delete a customer by ID
        const customer = await Customers.findByIdAndDelete(req.params.id);
        // Customer no found
        if (!customer) {
            return handleErrors(res, 404, 'Customer no found.');
        }
        res.status(200).json({message: 'Customer deleted successfully'});
    } catch (error) {
        handleErrors(res, 500, error.message);
    }

};

export {
    addCustomer,
    getCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer
}
