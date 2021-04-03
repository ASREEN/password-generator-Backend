const {generatePasswords2} = require('./rootController')

test('function generate passwords properly', ()=> {
    expect(generatePasswords2())
})