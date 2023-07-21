const { get } = require('../app');
const editalModel = require('../models/editalModel');

const insertEdital = async (req, res) => {
    try {
        const { studentemail, editalname, officename, orgname } = req.body;
        const edital = await editalModel.insertEdital(studentemail, editalname, officename, orgname);
        return res.status(200).json(edital);
    } catch (error) {
        console.error('Erro ao inserir edital:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
const favoriteEdital = async (req, res) => {
    try {
        const { userId, editalId, secondEditalId, thirdEditalId } = req.body;
        const verifyEditalIsNull = editalId || null;
        const verifySecondIsNull = secondEditalId || null;
        const verifyThirdIsNull = thirdEditalId || null;
        if (editalModel.userExist(req.body.userId) === false) {
       
        const edital = await editalModel.favoriteEdital(userId, verifyEditalIsNull, verifySecondIsNull, verifyThirdIsNull);
        return res.status(200).json(edital);
        }
        else{
            const updateFavortie = await editalModel.updateFavorites(userId, verifyEditalIsNull, verifySecondIsNull, verifyThirdIsNull);
            return res.status(200).json(updateFavortie);
        }
    } catch (error) {
        console.error('Erro ao inserir edital:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
const removeFavoriteEdital = async (req, res) => {
    try {
        if (!req.body.userId || !req.body.controlmd) {
            return res.status(400).json({ message: 'Invalid request. Missing userId or editalId.' });
        }
        const { userId, editalId } = req.body;
        const edital = await editalModel.removeFavoriteEdital(userId, editalId);
        return res.status(200).json(edital);
    } catch (error) {
        console.error('Erro ao tirar edital:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getFavorites = async (req, res) => {
    try {
        if (!req.params.userId) {
            return res.status(400).json({ message: 'Invalid request. Missing userId.' });
        }
        const { userId } = req.params;
        const edital = await editalModel.getFavoriteEditals(userId);
        return res.status(200).json(edital);
    } catch (error) {
        console.error('Erro ao inserir edital:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports = { insertEdital, favoriteEdital , getFavorites, removeFavoriteEdital};