const { check, checkExact, query, validationResult } = require('express-validator');

//Add task
const addTask = [
    checkExact([
        check('title')
            .trim()
            .notEmpty().withMessage('Title required!'),
        check('content')
            .trim()
            .notEmpty().withMessage('Content required!'),
        check('status')
            .optional()
            .notEmpty().withMessage('Status required!')
            .isIn([1, 2, 3, 4]).withMessage('Invalid status value!'),
        check('start_date')
            .notEmpty().withMessage('Start date required!')
            .isDate().withMessage('Invalid start date!'),
        check('end_date')
            .notEmpty().withMessage('End date required!')
            .isDate().withMessage('Invalid end date!'),
        check('estimate_time')
            .notEmpty().withMessage('Estimate time required!')
            .isFloat({ min: 0, max: 120}).withMessage('Maximum of estimate time is 120h!'),
        check('asignee')
            .notEmpty().withMessage('Please provide an asignee!'),
        check('id')
            .notEmpty().withMessage('Project id required!'),    
    ]),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).send({
                status: 'Failed',
                errors: errors.array()
            });
        }

        next();
    }
];

//Get all tasks
const getTasks = [
    checkExact([
        check('id')
            .notEmpty().withMessage('Project id required!'),
        check('page')
            .notEmpty().withMessage('Page value required!')
            .isInt({ min: 1 }).withMessage('Invalid page value!'),
    ]),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).send({
                status: 'Failed',
                errors: errors.array()
            });
        }

        next();
    }
];

const getTasksByMember = [
    checkExact([
        check('id')
            .notEmpty().withMessage('Project id required!'),
        check('member_id')
            .notEmpty().withMessage('Member id required!'),
        check('page')
            .notEmpty().withMessage('Page value required!')
            .isInt({ min: 1 }).withMessage('Invalid page value!'),
    ]),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).send({
                status: 'Failed',
                errors: errors.array()
            });
        }

        next();
    }
]

//Get tasks by status
const getTasksByStatus = [
    checkExact([
        check('id')
            .notEmpty().withMessage('No id provided!'),
        check('status')
            .notEmpty().withMessage('No status provided!')
            .isIn([1, 2, 3, 4]).withMessage('Invalid status value!'),
        check('page')
            .notEmpty().withMessage('Page value required!')
            .isInt({ min: 1 }).withMessage('Invalid page value!'),
    ]),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).send({
                status: 'Failed',
                errors: errors.array()
            });
        }

        next();
    }
]

//Get tasks by title
const getTasksByTitle = [
    checkExact([
        check('id')
            .notEmpty().withMessage('No id provided!'),
        check('title')
            .trim()
            .notEmpty().withMessage('No status provided!'),
        check('page')
            .notEmpty().withMessage('Page value required!')
            .isInt({ min: 1 }).withMessage('Invalid page value!'),
    ]),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).send({
                status: 'Failed',
                errors: errors.array()
            });
        }

        next();
    }
]

//Update a task
const updateTask = [
    checkExact([
        check('id')
            .notEmpty().withMessage('No task id provided!')
            .isLength(24).withMessage('Invalid id param value!'),
        check('title')
            .optional()
            .trim()
            .notEmpty().withMessage('Title required!'),
        check('content')
            .optional()
            .trim()
            .notEmpty().withMessage('Content required!'),
        check('status')
            .optional()
            .notEmpty().withMessage('Status required!')
            .isIn([1, 2, 3, 4]).withMessage('Invalid status value!'),
        check('start_date')
            .optional()
            .notEmpty().withMessage('Start date required!')
            .isDate().withMessage('Invalid start date!'),
        check('end_date')
            .optional()
            .notEmpty().withMessage('End date required!')
            .isDate().withMessage('Invalid end date!'),
        check('estimate_time')
            .optional()
            .notEmpty().withMessage('Estimate time required!')
            .isFloat({ min: 0, max: 120}).withMessage('Maximum of estimate time is 120h!'),   
    ]),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).send({
                status: 'Failed',
                errors: errors.array()
            });
        }

        next();
    }
];

//Remove a task
const removeTask = [
    checkExact([
        check('id')
            .notEmpty().withMessage('No task id provided!')
            .isLength(24).withMessage('Invalid id param value!')
    ]),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).send({
                status: 'Failed',
                errors: errors.array()
            });
        }

        next();
    }
]

const attachmentsValidator = {
    addTask,
    getTasks,
    getTasksByMember,
    getTasksByStatus,
    getTasksByTitle,
    updateTask,
    removeTask
};

module.exports = attachmentsValidator;