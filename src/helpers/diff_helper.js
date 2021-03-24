const fs = require('fs');

const {Helper} = codeceptjs;

class Diff extends Helper {

  // automatically save screenshot and create base image if missing
  async dontSeeVisualDiff(baseImage, options) {
    // access current client of WebDriver helper
    const resemble = this.helpers['ResembleHelper']
    resemble._addMochaContext = async function(baseImage, misMatch, tolerance) {
      //hack to prevent attachment
    }

    const webdriver = this.helpers['WebDriver']

    await webdriver.saveScreenshot(baseImage, true)
    try {
      fs.accessSync(resemble.baseFolder + baseImage, fs.constants.F_OK | fs.constants.W_OK)
    }catch(e) {
      await resemble._prepareBaseImage(baseImage)
    }
    options.skipFailure = false
    return resemble.seeVisualDiff(baseImage, options)
  }
}

module.exports = Diff;
