const router = require('express').Router();
const employeeController = require('../controllers/employeeController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/', authMiddleware.verifyTokenAdmin, employeeController.createEmployee)
// router.get('/', employeeController.getAllEmployees)
// router.get('/:id', employeeController.getEmployeeByID)
// router.put('/:id', authMiddleware.verifyTokenAdmin, employeeController.updateEmployee)
// router.delete('/:id', authMiddleware.verifyTokenAdmin, employeeController.deleteEmployee)


module.exports = router;