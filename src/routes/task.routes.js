import { Router } from 'express'
import * as taskCtrl from "../controllers/task.controller"

const router = Router()

router.get('/', taskCtrl.getAllTask)

router.get('/:id', taskCtrl.getOneTask)

router.get('/:done', taskCtrl.getAllDoneTask)

router.delete('/:id', taskCtrl.deleteTask)

router.post('/', taskCtrl.createTask)

router.put('/:id', taskCtrl.updateTask)

export default router;