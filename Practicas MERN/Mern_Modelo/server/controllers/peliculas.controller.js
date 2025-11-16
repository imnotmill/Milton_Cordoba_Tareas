import { Pelicula } from "../models/peliculas.model.js";

const peliculasController = {
    getAll: async (req, res) => {
        try {
            const peliculas = await Pelicula.find();
            return res.status(201).json(peliculas);
        } catch (e) {
            return res.status(400).json(e);
        }
    },
    createOne: async (req, res) => {
        const { title, year, director, genre, img } = req.body;
        const newData = { title, year, director, genre, img };
        try {
            const newPelicula = await Pelicula.create(newData);
            return res.status(201).json(newPelicula);
        } catch (e) {
            const messages = {};
            if (e.name === "ValidationError") {
                Object.keys(e.errors).forEach(key => {
                    messages[key] = e.errors[key].message;
                });
            }
            if (e.code === 11000) {
                messages["duplicated"] = "El título ya existe";
            }
            return res.status(400).json({ errors: { ...messages } });
        }
    },
    getOne: async (req, res) => {
        const id = req.params.id;
        try {
            const one = await Pelicula.findById(id);
            if (!one) return res.status(404).json({ message: "El id no existe" });
            return res.status(201).json(one);
        } catch (e) {
            return res.status(400).json(e);
        }
    },
    deleteOne: async (req, res) => {
        const id = req.params.id;
        try {
            const deleted = await Pelicula.findByIdAndDelete(id);
            if (!deleted) return res.status(404).json({ message: "El id no existe" });
            return res.status(201).json({ message: "La película fue eliminada exitosamente" });
        } catch (e) {
            return res.status(400).json(e);
        }
    }
    ,
    updateOne: async (req, res) => {
        const id = req.params.id;
        const { title, year, director, genre, img } = req.body;
        const dataToUpdate = { title, year, director, genre, img };
        try {
            const updated = await Pelicula.findByIdAndUpdate(id, dataToUpdate, { new: true, runValidators: true });
            if (!updated) return res.status(404).json({ message: "El id no existe" });
            return res.status(201).json(updated);
        } catch (e) {
            const messages = {};
            if (e.name === "ValidationError") {
                Object.keys(e.errors).forEach(key => {
                    messages[key] = e.errors[key].message;
                });
            }
            if (e.code === 11000) {
                messages["duplicated"] = "El título ya existe";
            }
            return res.status(400).json({ errors: { ...messages } });
        }
    }
};

export default peliculasController;
