import { mongoose } from "mongoose";
import { songsSchema } from "./songs.model.js";


const playlistSchema = mongoose.Schema(
    {
        name: {
            type : String,
            required : [true, "The name of the plalist os mandatory"],
            minlength : [3, "The playlist's name should have at least 3 characters"],
            maxlength : [100, "The playlist's name should have at most 100 characters"],
            unique: true
        },
        songs : [songsSchema]
    }, 
    {timestamps: true}
)

const Playlist = mongoose.model("playlist", playlistSchema);

export default Playlist;