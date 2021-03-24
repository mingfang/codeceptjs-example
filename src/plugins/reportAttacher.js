const Container = require('codeceptjs').container;
const event = require('codeceptjs').event;
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

module.exports = function(config) {
  const helpers = Container.helpers();
  const reportDir = global.output_dir;

  event.dispatcher.on(event.test.passed, async function (test) {
    const mocha = helpers['Mochawesome'];
    if (!mocha) {
      return
    }

    await mocha.addMochawesomeContext("ScreenShot Image");
    await mocha.addMochawesomeContext(test.title + ".png")
  });

  event.dispatcher.on(event.test.failed, async function (test) {
    const mocha = helpers['Mochawesome'];
    if (!mocha) {
      return
    }
    fs.copyFileSync("./base/" + test.title + ".png", global.output_dir + "/Base_" + test.title + ".png")
    await mocha.addMochawesomeContext("Base Image");
    await mocha.addMochawesomeContext("Base_" + test.title + ".png");
    await mocha.addMochawesomeContext("ScreenShot Image");
    await mocha.addMochawesomeContext(test.title + ".png");
    await mocha.addMochawesomeContext("Diff Image");
    await mocha.addMochawesomeContext("Diff_" + test.title + ".png");
  });

  event.dispatcher.on(event.test.after, async function (test) {
    const mocha = helpers['Mochawesome'];
    if (!mocha) {
      return
    }
  });

}