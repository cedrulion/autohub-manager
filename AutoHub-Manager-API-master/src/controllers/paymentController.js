import stripe from 'stripe';

export const  acceptPayment = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'rwf',
                        product_data: {
                            name: req.body.productnames,
                        },
                        unit_amount: req.body.price * 100, 
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            payment_method_types: ['card'],
            success_url: 'http://localhost:5173/PaymentSuccess',
            cancel_url: 'http://localhost:5173/PaymentFailure',
            metadata: {
                customer_name: req.body.names
            }
        });

        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error('Error creating payment session:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
