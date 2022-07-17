var express = require('express');
const Joi = require("joi");
var router = express.Router();
const {Game, Players, User, PlayGame, EvaluasiGame} = require("../models");

function randomDice() { // min and max included
    return Math.floor(Math.random() * (6 - 1 + 1) + 1)
}


router.post('/', async function (req, res, next) {

    try {
        const {players, dice} = req.body

        const schema = Joi.object({
            players: Joi.number().min(2).required(),
            dice: Joi.number().min(2).required(),
        });

        const {error} = schema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: "validation failed",
                error: {
                    message: error.details[0].message,
                },
            });
        }

        const user = await User.findOne({
            where: {id: req.userId.id}
        })

        const game = await Game.create({players, dice,
            status: 0,
            userId: user.id})

        for (let i = 1; i <= players; i++) {
            await Players.create({
                name:i,
                order: i,
                gameId: game.id
            })
        }

        return res.status(200).json({
            message: "game created",
            data: game
        })
    } catch (e) {
        console.log(e)
    }

});

router.post('/:id_game/play', async function (req, res, next) {

    try {

        const id_game = req.params.id_game

        const gameThis = await Game.findOne({
            where: {id: id_game}
        })

        if(gameThis === null) {
            return res.status(404).json({
                message: "game kosong"
            })
        }

        const game = await Game.findOne({
            where: {id: id_game, status: true}
        })

        //game done
        if(game) {
            return res.status(200).json({
                message: "game sudah selesai"
            })
        }


        const playGame = await PlayGame.findAll({
            where: {gameId: gameThis.id}
        })

        if(playGame.length === 0){

            let result = []

            for (let i = 1; i <= gameThis.players; i++) {

                result.push(i)

                let dadu_bersih = []
                for (let j = 1; j <= gameThis.dice ; j++) {
                    dadu_bersih.push(randomDice())
                }

                result.push(dadu_bersih)
                await PlayGame.create({
                    poin: 0,
                    playerId: i,
                    ket: dadu_bersih.join(),
                    gameId: gameThis.id
                })
            }

        }else{

        }


        return res.status(200).json({
            message: "game created",
            data: playGame
        })
    } catch (e) {
        console.log(e)
    }

});

module.exports = router;
