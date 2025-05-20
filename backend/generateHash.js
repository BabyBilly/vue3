const bcrypt = require('bcryptjs');

const plainPassword = 'your_plain_password'; 
const saltRounds = 10;

bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) {
        console.error('生成盐值时出错:', err);
        return;
    }
    bcrypt.hash(plainPassword, salt, function(err, hash) {
        if (err) {
            console.error('生成哈希值时出错:', err);
        } else {
            console.log('生成的明文密码:', plainPassword);
            console.log('生成的哈希值:', hash);
        }
    });
});
