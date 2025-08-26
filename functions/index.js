const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// Exemplo: registrar venda automaticamente com comissão
exports.registrarVenda = functions.firestore
    .document('sales/{saleId}')
    .onCreate((snap, context) => {
        const data = snap.data();
        const comissao = data.valor * 0.15;
        return snap.ref.set({
            ...data,
            comissao,
            liquido: data.valor - comissao
        }, { merge: true });
    });