import Task from "../models/Task"
import { getPagination } from "../libs/getpagination"

export const getAllTask2 = async (req, res) => {
    try {
        const { size, page, titulo } = req.query
        const condition = titulo
            ? {
                titulo: { $regex: new RegExp(titulo), $options: "i" },
            }
            : {};
            console.log(condition);
        const { limit, offset } = getPagination(size, page)
        const tasks = await Task.paginate(condition, { offset, limit });
        res.json({
            totalDocs: tasks.totalDocs,
            tasks: tasks.docs,
            totalpages: tasks.totalPages,
            currentPage: tasks.page - 1
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Error al traer las tareas",
        })
    }

}
export const getAllTask = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Error al traer las tareas",
        })
    }

}

export const getAllDoneTask = async (req, res) => {
    const tasks = await Task.find(req.params.done)
    res.send(tasks)
}

export const getOneTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id)
        if (!task) {
            return res.estatus(404).json({ message: `La tarea con ${id} no existe` });
        }
        res.json(task)
    } catch (error) {
        res.status(500).json({
            message: error.message || "Error al traer la tarea",
        })
    }
}


export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await Task.findByIdAndDelete(id)
        res.json(deleteTask)
    } catch (error) {
        res.status(500).json({
            message: error.message || "Error al eliminar la tarea",
        })
    }

}

export const createTask = async (req, res) => {
    if (!req.body.titulo) {
        return res.estatus(400).send({ message: "el titulo es obligatorio" });
    }
    try {
        const newTask = new Task({
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            done: req.body.done ? req.body.done : false
        });
        const savedTask = await newTask.save()
        //console.log(newTask)
        res.json(savedTask)
    } catch (error) {
        res.estatus(500).json({
            message: error.message || "Error al crear las tareas",
        })
    }

}
export const updateTask = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, req.body,
            {
                useFindAndModify: false
            })
        res.json(updatedTask)
    } catch (error) {
        res.estatus(500).json({
            message: error.message || "Error al actualizar las tareas",
        })
    }

}