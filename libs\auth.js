const jwt = require('jsonwebtoken');

module.exports = function (app) {
  const wrapper = {};

  /*
        Function responsible for generating token
    */
  wrapper.generate_token = function (options) {
    return new Promise(async function (resolve, reject) {
      try {
        let __user_payload = { user: { id: options.id, role: options.role } };
        if (options.member_id) {
          __user_payload = { ...__user_payload, member: { id: options.member_id } };
        }
        const token = jwt.sign(__user_payload, app.config.secret, {
          expiresIn: app.config.token_expiration_time,
        });

        return resolve({ token });
      } catch (e) {
        return app.libs.error_handler.non_controller_handler({
          e,
          reject,
          function_name: 'generate_token',
          options,
        });
      }
    });
  };
  return wrapper;
};
