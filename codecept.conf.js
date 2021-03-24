exports.config = {
  name: 'test',
  tests: './src/tests/*_test.js',
  output: './output',
  helpers: {
    WebDriver: {
      //change to your page
      url: "https://www.google.com",
      //change to your selenium
      host: 'zalenium',
      port: 443,
      protocol: 'https',
      browser: 'chrome',
      restart: false,
      windowSize: '1440x900',
      desiredCapabilities: {
        chromeOptions: {
          args: [ "--disable-gpu", "--no-sandbox" ],
        },
          "goog:recordVideo" : false,
      },
      smartWait: 5000,
      waitForTimeout: 5000,
    },
    ResembleHelper: {
      require: "codeceptjs-resemblehelper",
      baseFolder: "./base/",
      diffFolder: "./output/"
    },
    Diff: {
      require: './src/helpers/diff_helper.js',
    },
    Mochawesome: {
      disableScreenshots: true
    }
  },
  mocha: {
    reporterOptions: {
      "codeceptjs-cli-reporter": {
        stdout: "-",
        options: {
          verbose: true,
          steps: true,
        }
      },
      "mocha-junit-reporter": {
        stdout: "./output/console.log",
        options: {
          mochaFile: "./output/result.xml"
        },
        attachments: true
      },
      mochawesome: {
        stdout: "./output/console.log",
        options: {
          reportDir: "./output",
          reportFilename: "report",
          inline: true
        }
      }
    }
  },
  plugins: {
    retryFailedStep: {
      enabled: false
    },
    screenshotOnFail: {
      enabled: true,
    },
    stepByStepReport: {
      enabled: true,
      deleteSuccessful: false
    },
    autoLogin: {
      enabled: true,
      inject: 'login',
      users: {
        user: {
          fetch: (I) => {
            const cookie = I.grabCookie()
            return cookie
          },
          restore: (I, cookie) => {
            I.amOnPage('/');
            I.setCookie(cookie)
          },
          check: (I) => {
            I.amOnPage('/');
            /*check for valid session
            I.waitForText("additional check", 5)
             */
          },
          login: (I) => {
            I.amOnPage('/');
            /*example login
            I.waitForText('SIGN IN')
            I.fillField('//input[@type="email"]', 'email@example.com')
            I.fillField("//input[@type='password']", secret('password'))
            I.click("//button[@type='submit']")
             */
          },
        }
      }
    },
    reportAttacher: {
      require: './src/plugins/reportAttacher',
      enabled: true
    },
  }
}