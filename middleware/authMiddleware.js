import jwt from "jsonwebtoken";
import handleErrors from "../helpers/handleErrors.js";

const auth = (req, res, next) => {
  // Authorization by header
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    handleErrors(res, 401, 'Not authenticated. No JWT');
    // Debes lanzar una excepción para detener la ejecución aquí.
    throw new Error('Not authenticated. No JWT');
  }
  // Get the token and verify it.
  const token = authHeader.split(" ")[1];
  let reviewToken;
  try {
    reviewToken = jwt.verify(token, 'wordsupersecret@');
  } catch (error) {
    handleErrors(res, 500, error.message);
    // Debes lanzar una excepción aquí también si ocurre un error al verificar el token.
    throw new Error(error.message);
  }
  // Si el token es válido, pero hay algún error, continúa con la ejecución.
  if (!reviewToken) {
    handleErrors(res, 401, 'Not authenticated.');
    // No es necesario lanzar una excepción aquí, ya que estás manejando el error.
  }
  next();
};

export default auth;
