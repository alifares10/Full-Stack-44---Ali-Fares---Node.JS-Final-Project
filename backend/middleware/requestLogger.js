const jf = require("jsonfile");

const requestLogger = async (req, res, next) => {
  const { method, url, body } = req;
  const userName = req.session.userName.replace(/\s+/g, "");
  const FILE_PATH = `logs/${userName}Actions.json`;
  const actionId = Math.floor(Math.random() * 1000000);
  const log = {
    actions: [
      {
        actionId,
        method,
        url,
        body,
        userName,
        time: new Date().toISOString(),
      },
    ],
  };

  jf.readFile(FILE_PATH, (err, data) => {
    if (err) {
      jf.writeFile(FILE_PATH, log, { spaces: 2 }, (err) => {
        if (err) {
          console.log(err);
        }
      });
    } else {
      data.actions.push(log.actions[0]);
      jf.writeFile(FILE_PATH, data, { spaces: 2 }, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  });

  next();
};

module.exports = { requestLogger };
