import express from 'express';

import upload from '../utils/multer.js';

import { postVehicle, patchVehicle, deleteVehicle, getVehicle, getVehicleByDealer } from '../controllers/vehicle.controllers.js';
import { postMcycle, patchMcycle, deleteMcycle, getMcycle, getMcycleByDealer } from '../controllers/motorcycle.controller.js';
import { createDealer, deleteDealer, editDealer, getDealers } from '../controllers/dealer.controller.js';
import { createAdmin, deleteAdmin, editAdmin, getAdmins } from '../controllers/admin.controller.js';
import { AdminLogin } from '../auth/admin.auth.js';
import { DealerLogin } from '../auth/dealer.auth.js';

import { ValidateAdmin } from '../middlewares/admin.authorization.js';
import { ValidateDealer } from '../middlewares/dealer.authorization.js';


const router = express.Router()

router.route('/main')
.get(() =>{
    res.send('server on');
})

//======= Login routes ======

router.post('/adminLog', AdminLogin);
router.post('/dealerLog', DealerLogin);


//======= Vehicle routes ======

router.post('/vehicle', (ValidateDealer || ValidateAdmin), upload.single('image'), postVehicle);
router.patch('/vehicle/:id', (ValidateDealer || ValidateAdmin), upload.single('image'), patchVehicle);
router.delete('/vehicle/:id', (ValidateDealer || ValidateAdmin), deleteVehicle);
router.get('/vehicle/all', getVehicle);
router.get('/vehicle/getbyDealer',  getVehicleByDealer);

//======= Motorcycle routes ======

router.post('/motorcycle', (ValidateDealer || ValidateAdmin), upload.single('image'), postMcycle);
router.patch('/motorcycle/:id', (ValidateDealer || ValidateAdmin), upload.single('image'), patchMcycle);
router.delete('/motorcycle/:id', (ValidateDealer || ValidateAdmin), deleteMcycle);
router.get('/motorcycle/all', getMcycle);
router.get('/motorcycle/getbydealer',  getMcycleByDealer);

//======= Dealer routes ======

router.post('/dealer', createDealer);
router.patch('/dealer/:id', ValidateAdmin, editDealer);
router.delete('/dealer/:id', ValidateAdmin, deleteDealer);
router.get('/dealer', ValidateAdmin, getDealers);

//======= Admin routes ======

router.post('/admin', ValidateAdmin, createAdmin);
router.patch('/admin/:id', ValidateAdmin, editAdmin);
router.delete('/admin/:id', ValidateAdmin, deleteAdmin);
router.get('/admin', ValidateAdmin, getAdmins);

export default router;