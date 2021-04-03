// Constants with Ascii code characters.
// http://www.asciitable.com/

function generatePasswords(req, res) {
  const { minlength, nuOfSpecialChar, nuOfnumbers, nuOfpasswords } = req.body;
  // console.log("req.body", req.body);
  let passwords = [];
  // let passwordLength = 4 + nuOfSpecialChar + nuOfnumbers; // 4 for Capital letter and small letter
  try {
    if (isNaN(minlength)) {
      res.status(401).json("You passed invalid entry.");
    } else if (minlength < 6 || minlength > 128) {
      res.status(402).json("Password Length must be 6-128 characters.");
    } else if (
      !minlength &&
      !nuOfnumbers &&
      !nuOfSpecialChar &&
      !nuOfpasswords
    ) {
      res
        .status(400)
        .send(
          " Enter a valid URL, pass like this example: http://localhost:5500/api/generate/passwords/v1/"
        ); // Bad Request
    }
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
      resultCharUp = "";
      randLength1 = Math.floor(Math.random() * 10);
      for (let i = 0; i < randLength1; i++) {
        resultCharUp += upperChars.charAt(
          Math.floor(Math.random() * upperChars.length)
        );
      }
      randLength2 = Math.floor(Math.random() * 10);
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
      passwords.push(newRand);
    }
    if (passwords) {
      res.status(200).json(passwords);
    } else {
      res.json("no passowrds generated");
    }
  } catch (error) {
    console.log(" error", error);
    res
      .status(500)
      .json({ message: "Something went wrong, could not fetch passwords." });
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
};
