const jf = require("jsonfile");
const { Mutex } = require("async-mutex");

//using a mutex to insure that if there is two actions at the same time, the file will not be corrupted
const mutex = (() => {
  console.log("actionsLogger mutex created");
  return new Mutex();
})();

const actionsLogger = async (req, res, next) => {
  try {
    //acquire the lock
    const release = await mutex.acquire();

    const userName = req.session.userName.replace(/\s+/g, "");
    //create a file for each user to log their actions
    const FILE_PATH = `logs/${userName}Actions.json`;
    const maxActions = req.session.maxActions;
    const currentActions = req.session.actions;
    const remainingActions = maxActions - currentActions;

    const log = {
      actions: [
        {
          userName,
          maxActions,
          date: new Date().toISOString().slice(0, 10),
          actionsAllowed: remainingActions,
        },
      ],
    };

    await new Promise((resolve, reject) =>
      jf.readFile(FILE_PATH, (err, data) => {
        if (err) {
          //if the file does not exist, create it and add the new action to it
          try {
            jf.writeFile(FILE_PATH, log, { spaces: 2 }, (err) => {
              if (err) {
                console.log(err);
              }
            });
          } finally {
            resolve(1);
          }
        } else {
          //if the file exists, add the new action to it
          data.actions.push(log.actions[0]);
          try {
            jf.writeFile(FILE_PATH, data, { spaces: 2 }, (err) => {
              if (err) {
                console.log(err);
              }
            });
          } finally {
            resolve(1);
          }
        }
      })
    );

    //release the lock
    release();

    next();
  } catch (error) {
    console.error("Error acquiring lock:", error);
    next(error);
  }
};

module.exports = { actionsLogger };
