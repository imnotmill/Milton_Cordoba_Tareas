import { faker } from "@faker-js/faker";

const generarCancion = () => ({
id: faker.string.uuid(),
titulo: faker.music.songName(),
artista: faker.person.fullName(),
album: faker.music.album(),
duracion: `${faker.number.int({ min: 120, max: 360 })}s`,
genero: faker.music.genre(),
fechaLanzamiento: faker.date.past().toISOString().split("T")[0],
});


export const getCancion = (req, res) => {
res.status(200).json(generarCancion());
};


export const getPlaylist = (req, res) => {
const cantidad = faker.number.int({ min: 3, max: 10 });
const canciones = Array.from({ length: cantidad }, generarCancion);

const playlist = {
idPlaylist: faker.string.uuid(),
nombre: faker.word.words(2),
descripcion: faker.lorem.sentence(),
canciones,
creador: faker.person.fullName(),
fechaCreacion: faker.date.past().toISOString().split("T")[0],
};

res.status(200).json(playlist);
};