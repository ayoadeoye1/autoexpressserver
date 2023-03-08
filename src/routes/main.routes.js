import express from 'express';

import { postVehicle, patchVehicle, deleteVehicle, getVehicle, getVehicleByDealer } from '../controllers/vehicle.controllers.js';
import { postMcycle, patchMcycle, deleteMcycle, getMcycle, getMcycleByDealer } from '../controllers/motorcycle.controller.js';
import { createDealer, deleteDealer, editDealer, getDealers } from '../controllers/dealer.controller.js';
import { createAdmin, deleteAdmin, editAdmin, getAdmins } from '../controllers/admin.controller.js';

const router = express.Router()

router.route('/main')
.get(() =>{
    res.send('server on');
})

//======= Vehicle routes ======

router.post('/vehicle', postVehicle);
router.patch('/vehicle/:id', patchVehicle);
router.delete('/vehicle/:id', deleteVehicle);
router.get('/vehicle', getVehicle);
router.get('/vehicle',  getVehicleByDealer);

//======= Motorcycle routes ======

router.post('/motorcycle', postMcycle);
router.patch('/motorcycle/:id', patchMcycle);
router.delete('/motorcycle/:id', deleteMcycle);
router.get('/motorcycle/all', getMcycle);
router.get('/motorcycle/getbydealer',  getMcycleByDealer);

//======= Dealer routes ======

router.post('/dealer', createDealer);
router.patch('/dealer/:id', editDealer);
router.delete('/dealer/:id', deleteDealer);
router.get('/dealer', getDealers);

//======= Admin routes ======

router.post('/admin', createAdmin);
router.patch('/admin/:id', editAdmin);
router.delete('/admin/:id', deleteAdmin);
router.get('/admin', getAdmins);

export default router;