import Orders from "../models/OrdersModel.js";
import handleErrors from "../helpers/handleErrors.js";

// Orders CRUD
// CREATE new orders
const addOrder = async (req, res) => {
    // Create a new order
    const newOrder = new Orders(req.body);
    try {
        // Save it in the DB
        const savedOrder = await newOrder.save();
        // Successful response
        res.status(201).json(savedOrder);
    } catch (error) {
        handleErrors(res, 500, error.message);
    }
};
// READ all orders
const getOrders = async (req, res) => {
    try {
        // Query the DB to get all the orders
        const orders = await Orders.find({})
            .populate('customer')
            .populate({
                path: 'order.product',
                model: 'Products'
            });
        // There are no registered orders
        if (orders.length === 0) {
            return handleErrors(res, 404, 'No registered order found.');
        }
        res.status(200).json(orders);
    } catch (error) {
        handleErrors(res, 500, error.message);
    }
};
// READ a order by ID
const getOrder = async (req, res) => {
    try {
        // Query the DB to get a the order
        const order = await Orders.findById({_id: req.params.id})
            .populate('customer')
            .populate({
                path: 'order.product',
                model: 'Products'
            });
        // order no found
        if (!order) {
            return handleErrors(res, 404, 'order no found.');
        }
        res.status(200).json(order);
    } catch (error) {
        handleErrors(res, 500, error.message);
    }
};
// UPDATE a order by ID
const updateOrder = async (req, res, next) => {
    try {
        // Search the order by its ID
        const oldorder = await Orders.findById({_id: req.params.id});
        // Check if the order was found
        if (!oldorder) {
            return handleErrors(res, 404, 'Order no found.');
        }
       // Query the DB to update a order by ID
       const updatedorder = await Orders.findByIdAndUpdate({_id: req.params.id}, req.body, { new: true })
        .populate('customer')
        .populate({
            path: 'order.product',
            model: 'Products'
        });
       res.status(200).json(updatedorder);
    } catch (error) {
        handleErrors(res, 500, error.message);
        next();
    }
};
// DELETE a order by ID
const deleteOrder = async (req, res) => {
    try {
        // Search the order by its ID
        const order = await Orders.findById(req.params.id);
        // Check if the order was found
        if (!order) {
            return handleErrors(res, 404, 'order no found.');
        }
        // Query the DB to delete a order by ID
        await Orders.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Order deleted successfully'});
    } catch (error) {
        handleErrors(res, 500, error.message);
    }

};

export {
    addOrder,
    getOrders,
    getOrder,
    updateOrder,
    deleteOrder
}