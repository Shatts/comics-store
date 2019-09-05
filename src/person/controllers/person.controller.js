import { personService } from '../services/person.service.js';

export async function getPersons(req, res, next) {
    const filters = req.query;
    try {
        const persons = await personService.getAll(filters);
        res.send(persons);
    } catch (e) {
        next(e);
    }
}

export async function getPersonById(req, res, next) {
    const { id } = req.params;
    try {
        const person = await personService.getOne(id);
        res.send(person);
    } catch (e) {
        next(e);
    }
}

export async function postPerson(req, res, next) {
    const person = req.body;
    try {
        const createdPerson = await personService.create(person);
        res.send(createdPerson);
    } catch (e) {
        next(e);
    }
}

export async function deletePerson(req, res, next) {
    const { id } = req.params;
    try {
        await personService.deleteOne(id);
        res.sendStatus(204);
    } catch (e) {
        next(e);
    }
}
