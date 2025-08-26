const express = require('express');
const cors = require('cors');
const mercadopago = require('mercadopago');

const app = express();
app.use(cors());
app.use(express.json());

mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN
});

app.post('/checkout', async (req, res) => {
    try {
        const { title, quantity, price } = req.body;

        const preference = {
            items: [
                {
                    title,
                    quantity,
                    unit_price: price
                }
            ],
            back_urls: {
                success: "https://seuapp.com/success",
                failure: "https://seuapp.com/failure"
            },
            auto_return: "approved"
        };

        const response = await mercadopago.preferences.create(preference);
        res.json({ id: response.body.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3001, () => {
    console.log('Servidor backend rodando na porta 3001');
});