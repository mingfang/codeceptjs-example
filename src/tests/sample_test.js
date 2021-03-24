Feature('Example Feature')

//optional login
Before( (login) => {
  //login using codecept.conf.js
  login('user');
});

Scenario('Lorem Ipsum', (I) => {
  //switch between these pages to test diff
  // I.amOnPage("https://www.lipsum.com")
  I.amOnPage("https://et.lipsum.com")

  I.waitForText("Lorem Ipsum")
  I.dontSeeVisualDiff("Lorem Ipsum.png", {tolerance: 1})
})
