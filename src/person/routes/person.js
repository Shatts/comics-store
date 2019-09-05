import express from 'express';
import { deletePerson, getPersonById, getPersons, postPerson } from '../controllers/person.controller.js';

export const personRouter = express.Router();

personRouter.post('/', postPerson);

personRouter.get('/', getPersons);

personRouter.get('/:id', getPersonById);

personRouter.delete('/:id', deletePerson);

