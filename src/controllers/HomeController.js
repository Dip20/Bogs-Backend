
const moment = require('moment');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


exports.index = async (req, res) => {
    res.send("hello form home controllers")
}

exports.register = async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: {
                email: 'elsa2@prisma.io',
                name: 'Elsa Prisma',
            },
        })

        res.json({
            msg: "hello form home controllers Register",
        })
    } catch (error) {
        res.json({
            msg: "something went wrong",
            trace: error
        })  
    }
}


exports.get = async (req, res) => {
    try {
        const users = await prisma.user.findMany()

        res.json({
            msg: "success",
            data: users
        })
    } catch (error) {
        res.json({
            msg: "something went wrong",
            trace: error
        })
    }
}