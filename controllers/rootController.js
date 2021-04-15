function willcomeToMyApp(req, res) {
  res.status(200).send("Password generator app");
}
function generatePasswords(req, res) {
  console.log({ body: req.body });
  const { minlength, nuOfSpecialChar, nuOfnumbers, nuOfpasswords } = req.body;
  // length for Capital letters and small letters
  const rest = Number(nuOfSpecialChar) + Number(nuOfnumbers);
  let restLetters = Number(minlength) - Number(rest);
  try {
    // console.log(isNaN(minlength), isNaN(nuOfSpecialChar), isNaN(nuOfnumbers), isNaN(nuOfpasswords))
    if (
      !minlength ||
      !nuOfSpecialChar ||
      nuOfSpecialChar < 1 ||
      !nuOfnumbers ||
      nuOfnumbers < 1 ||
      nuOfpasswords < 1 ||
      !nuOfpasswords
    ) {
      res
        .status(401)
        .json("Fill all enteries. You passed empty or invalid entries.");
    } else if (minlength < 6 || minlength > 128) {
      res.status(403).json("Password Length must be 6-128 characters.");
    } else if (
      isNaN(minlength)||
      isNaN(nuOfSpecialChar) ||
      isNaN(nuOfnumbers) ||
      isNaN(nuOfpasswords)
    ) {
      res.status(400).send("All entries must to be a number"); // Bad Request
    } else {
      let passwords = []; // array to return all passwords
      const numberChars = "0123456789";
      const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const lowerChars = "abcdefghijklmnopqrstuvwxyz";
      const specialChars = "!@#$%^&*()<>,.?/[]{}-=_+|/";

      for (let p = 0; p < nuOfpasswords; p++) {
        resultNumber = "";
        for (let i = 0; i < nuOfnumbers; i++) {
          resultNumber += numberChars.charAt(
            Math.floor(Math.random() * numberChars.length)
          );
        }
        // add randum amount of capital and small leters
        let resultCharUp = "";
        do {
          randLength1 = Math.floor(Math.random() * minlength);
        } while (randLength1 < restLetters / 2);
        for (let i = 0; i < randLength1; i++) {
          resultCharUp += upperChars.charAt(
            Math.floor(Math.random() * upperChars.length)
          );
        }
        do {
          randLength2 = Math.floor(Math.random() * minlength);
        } while (randLength2 < restLetters / 2);
        resultCharLow = "";
        for (let i = 0; i < randLength2; i++) {
          resultCharLow += lowerChars.charAt(
            Math.floor(Math.random() * lowerChars.length)
          );
        }
        resultCharSpe = "";
        for (let i = 0; i < nuOfSpecialChar; i++) {
          resultCharSpe += specialChars.charAt(
            Math.floor(Math.random() * specialChars.length)
          );
        }
        randPassword =
          resultCharUp + resultCharLow + resultCharSpe + resultNumber;
        const newRand = randomString(randPassword);
        if (passwords && minlength >= 6 && minlength <= 128) {
          passwords.push(newRand);
        }
      }
      if (passwords) {
        console.log(
          "🚀 ~ file: rootController.js ~ line 75 ~ generatePasswords ~ passwords",
          passwords
        );
        res.status(200).json(passwords);
      }
    }
  } catch (error) {
    console.log(" error", error);

    // res
    //   .status(500)
    //   .json({ message: "Something went wrong, could not fetch passwords." });
  }
}
function randomString(string) {
  const array = string.split(""); // change atring to array
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  // return array to string
  let newStr = "";
  for (let i = 0; i < array.length; i++) {
    newStr += array[i];
  }
  return newStr;
}
module.exports = {
  generatePasswords,
  willcomeToMyApp,
};
