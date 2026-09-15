// import { cyber } from "./utils/cyber";
// import { UserModel } from "./models/user-model";

// const hash = cyber.hashPassword("1234");
// console.log("HASH:", hash);

// const token = cyber.generateToken({
//     userId: 1, firstName: "Admin", lastName: "User",
//     email: "admin@vacations.com", password: "1234", roleId: 1
// } as UserModel);

// console.log("TOKEN:", token);
// console.log("valid:", cyber.verifyToken(token));
// console.log("admin:", cyber.verifyAdmin(token));


import { appConfig } from "./utils/app-config";
import { cyber } from "./utils/cyber";

console.log("SALT:", appConfig.hashSalt);
console.log("HASH:", cyber.hashPassword("Test1234"));