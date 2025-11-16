import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import toConnectToBd from './config/database.js'
import routerForos from './routes/foros.route.js'
import routerUsers from './routes/users.route.js'
import routerPeliculas from './routes/peliculas.route.js'


dotenv.config()


const app = express()
const PORT = process.env.PORT || 8000;



app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())

toConnectToBd()


app.use('/api/foros', routerForos);
app.use('/api/users', routerUsers)
app.use('/api/peliculas', routerPeliculas)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));