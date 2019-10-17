import RegistrationService from '../services/registration.service.js';

const registrationService = new RegistrationService();

export async function registerUser(req, res, next) {
  const userCredentials = req.body;
  try {
    await registrationService.registerUser(userCredentials);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}
