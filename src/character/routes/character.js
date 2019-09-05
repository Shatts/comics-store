import express from 'express';
import { deleteCharacter, getCharacterById, getCharacters, postCharacter } from '../controllers/character.controller.js';

export const characterRouter = express.Router();

characterRouter.post('/', postCharacter);

characterRouter.get('/', getCharacters);

characterRouter.get('/:id', getCharacterById);

characterRouter.delete('/:id', deleteCharacter);

