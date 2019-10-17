import characterService from '../../common/services/crud-operations.service.js';

export async function getCharacters(req, res, next) {
  const filters = req.query;
  try {
    const characters = await characterService.getAll(filters);
    res.send(characters);
  } catch (e) {
    next(e);
  }
}

export async function getCharacterById(req, res, next) {
  const { id } = req.params;
  try {
    const character = await characterService.getOne(id);
    res.send(character);
  } catch (e) {
    next(e);
  }
}

export async function postCharacter(req, res, next) {
  const character = req.body;
  try {
    const createdCharacter = await characterService.create(character);
    res.send(createdCharacter);
  } catch (e) {
    next(e);
  }
}

export async function deleteCharacter(req, res, next) {
  const { id } = req.params;
  try {
    await characterService.deleteOne(id);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
}
