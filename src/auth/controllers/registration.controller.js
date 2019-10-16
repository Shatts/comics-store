import RegistrationService from '../services/registration.service.js';

const registrationService = new RegistrationService();

export async function registerUser(req, res, next) {
  const userCredentials = req.body;
  try {
    await registrationService.registerUser(userCredentials);
    // TODO: Check what need to be send if registered
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}
