import Cart from '../models/cart.js';

export const addToCart = async (req, res) => {
  try {

    const { productId, quantity } = req.body;

    const cartItem = new Cart({
      productId,
      quantity,
      user: req.user._id
    });

    await cartItem.save();

    res.status(201).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCartForUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const cartItems = await Cart.find({ user: userId, paymentStatus: { $in: ['PENDING', 'PAID'] } }).populate('productId');
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const getAllCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find().populate('productId').populate({ path: 'user', select: 'email' });
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const deleteProductItemById = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Cart.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const clearCartForUser = async (req, res) => {
  try {
    const userId = req.user._id;
    await Cart.updateMany({ user: userId, paymentStatus: 'PENDING' }, { paymentStatus: 'PAID' });
    res.status(200).json({ message: 'Cart marked as paid successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { cartItemId, orderStatus } = req.body;
    const updatedCartItem = await Cart.findByIdAndUpdate(
      cartItemId,
      { orderStatus },
      { new: true }
    );

    if (!updatedCartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.status(200).json({ message: 'Order status updated successfully', cartItem: updatedCartItem });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getOrderStatus = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const cartItem = await Cart.findById(cartItemId).populate('productId');

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.status(200).json({ orderStatus: cartItem.orderStatus, cartItem });
  } catch (error) {
    console.error('Error fetching order status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const bookAppointment = async (req, res) => {
  try {
    const { productId, date, location, phoneNumber } = req.body;
    const user = req.user._id;

    const appointment = new Cart({
      productId,
      user,
      date,
      location,
      phoneNumber
    });

    await appointment.save();

    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const getAllAppointmentsForUser = async (req, res) => {
  try {
    const appointments = await Cart.find()
      .populate('productId')
      .populate({ path: 'user', select: 'email names' });
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const countAllCartProducts = async (req, res) => {
  try {
    const totalQuantity = await Cart.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$quantity" }
        }
      }
    ]);

    res.status(200).json({ totalQuantity: totalQuantity[0] ? totalQuantity[0].total : 0 });
  } catch (error) {
    console.error('Error counting cart products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTopSellingProduct = async (req, res) => {
  try {
    const topProduct = await Cart.aggregate([
      {
        $group: {
          _id: "$productId",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 1
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails"
        }
      },
      {
        $unwind: "$productDetails"
      },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          count: 1,
          productDetails: 1
        }
      }
    ]);

    if (!topProduct || topProduct.length === 0) {
      return res.status(404).json({ message: 'No top selling product found' });
    }

    res.status(200).json(topProduct[0]);
  } catch (error) {
    console.error('Error fetching top selling product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
