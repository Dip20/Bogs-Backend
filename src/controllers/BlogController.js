const moment = require('moment');
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const prisma = new PrismaClient()
const fs = require('fs');

exports.insert = async (req, res) => {
    /**
     * prepare slugs
     */
    const { title, description } = req.body

    const slug = title.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');


    /**
     * check weather already exist the blog same title in the database
     */

    const check_slug = await prisma.Blog.findMany({
        where: {
            slug: slug,
            is_deleted: 0
        }
    })


    if (check_slug.length == 0) {
        /**
         * save the blog in the database
         */

        try {
            const Blog = await prisma.Blog.create({
                data: {
                    title: title,
                    slug: slug,
                    description: description,
                    is_deleted: 0,
                },
            })

            if (Blog) {

                res.status(200).json({
                    st: "success",
                    msg: "successfully inserted",
                    data: {
                        title: title,
                        slug: slug,
                        description: description
                    }
                })

            } else {
                res.status(400).json({
                    st: "failed",
                    msg: "something went wrong while saving data",
                })
            }


        } catch (error) {
            res.status(500).json({
                st: "failed",
                msg: "Exceptions",
                trace: error
            })
        }

    } else {
        // slug already exist in DB

        res.status(400).json({
            st: "failed",
            msg: "already exist the blog same title slug in the database."
        })
    }

}

exports.update = async (req, res) => {

    /**
     * prepare slugs
     */
    const { title, description } = req.body
    const _id = req.params.id

    const slug = title.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');


    /**
     * check weather already exist the blog same title in the database
     */

    const check_slug = await prisma.Blog.findFirst({

        where: {
            id: {
                not: parseInt(_id)
            },
            slug: slug,
            is_deleted: 0,

        }
    })

    if (check_slug === null) {

        /**
         * update the blog in the database
         */

        try {
            const Blog = await prisma.Blog.update({
                where: {
                    id: parseInt(_id),
                },
                data: {
                    title: title,
                    slug: slug,
                    description: description,
                    is_deleted: 0,
                },
            })

            if (Blog) {

                res.status(200).json({
                    st: "success",
                    msg: "successfully Updated",
                    data: {
                        title: title,
                        slug: slug,
                        description: description
                    }
                })

            } else {
                res.status(400).json({
                    st: "failed",
                    msg: "something went wrong while saving data",
                })
            }


        } catch (error) {
            res.status(500).json({
                st: "failed",
                msg: "Exceptions",
                trace: error
            })
        }

    } else {
        // slug already exist in DB

        res.status(400).json({
            st: "failed",
            msg: "already exist the blog same title slug in the database."
        })
    }
}

exports.get = async (req, res) => {

    /**
     * fetch all records
     */

    const get_data = await prisma.Blog.findMany({
        where: {
            is_deleted: 0
        },
        select: {
            title: true,
            slug: true,
            description: true,
        },
    })

    if (get_data.length > 0) {
        res.status(200).json({
            st: "success",
            total: get_data.length,
            data: get_data
        })

    } else {
        res.status(400).json({
            st: "failed",
            msg: "No data found"
        })
    }
}

exports.delete = async (req, res) => {

    const _id = req.params.id

    /**
     * check weather record exist in the database
     */

    const check_slug = await prisma.Blog.findFirst({

        where: {
            id: parseInt(_id),
        }
    })

    if (check_slug === null) {

        res.status(400).json({
            st: "failed",
            msg: "Record not exist in the database."
        })
    } else {

        /**
        * update the blog in the database
        */

        try {
            const Blog = await prisma.Blog.update({
                where: {
                    id: parseInt(_id),
                },
                data: {
                    is_deleted: 1,
                },
            })

            if (Blog) {

                res.status(200).json({
                    st: "success",
                    msg: "successfully deleted",
                })

            } else {
                res.status(400).json({
                    st: "failed",
                    msg: "something went wrong while deleting data",
                })
            }


        } catch (error) {
            res.status(500).json({
                st: "failed",
                msg: "Exceptions",
                trace: error
            })
        }
    }

}


/**
 * File Upload with Multer
 */
exports.insert_with_image = async (req, res) => {
    const file = req.file;

    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    }

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    res.json(
        {
            msg: 'File uploaded successfully!',
            pth: file.path
        }
    );
}


/**
 * File Upload with express file upload
 */
exports.insert_with_image_2 = async (req, res) => {
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    sampleFile = req.files.sampleFile;

    uploadPath = path.join(`src/public/uploads/blogs/${moment().year()}/${moment().month() + 1}/`);
    filename = `${Date.now()}${path.extname(sampleFile.name)}`;


    fs.mkdir(uploadPath, { recursive: true }, (err) => {
        if (err) {
            res.statusCode(400).json({
                msg: "Error creating folder using file system"
            })
        }

        sampleFile.mv(uploadPath + filename, function (err) {
            if (err)
                return res.status(500).json({ err });

            res.json({ msg: 'File uploaded!', path: `http://localhost:5003/uploads/blogs/${moment().year()}/${moment().month() + 1}/` + filename });
        });
    });



}

