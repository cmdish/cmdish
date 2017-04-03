import Text from "./Text";
import Error from "./Error";
import Song from "./Song";
import ListOfSongs from "./ListOfSongs";

import { TEXT_BUFFER, ERROR_BUFFER, SONG_BUFFER, LIST_OF_SONGS_BUFFER } from "../../constants";

export default {
    [TEXT_BUFFER]: Text,
    [ERROR_BUFFER]: Error,
    [SONG_BUFFER]: Song,
    [LIST_OF_SONGS_BUFFER]: ListOfSongs
};