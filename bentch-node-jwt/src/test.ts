import { sign, verify } from "jsonwebtoken";
import { AuthDto, sign as rust_sign, verify as rust_verify, signStr, verifyStr } from "napi-jwt";
import * as fs from "fs";
import * as path from "path";
import { exit } from "process";

const TRY_COUNT = 100000;

const private_key = fs.readFileSync(path.resolve(__dirname, "../../keys/jwtES256.key"), "utf8");
const public_key = fs.readFileSync(path.resolve(__dirname, "../../keys/jwtES256.pub"), "utf8");

let token: string;
let data: AuthDto;

token = sign({ pid: 1024 }, private_key, { expiresIn: 3600, algorithm: "ES256" });
console.log("js token:", token);
data = verify(token, public_key, { algorithms: ["ES256"] }) as AuthDto;
console.log("js verify js token:", JSON.stringify(data));

token = rust_sign(data) as string;
console.log("rust token:", token);
data = rust_verify(token) as AuthDto;
console.log("rust verify rust token:", JSON.stringify(data));

token = rust_sign(data) as string;
data = verify(token, public_key, { algorithms: ["ES256"] }) as AuthDto;
console.log("js verify rust token:", JSON.stringify(data));

token = sign({ pid: 1024 }, private_key, { expiresIn: 3600, algorithm: "ES256" });
data = rust_verify(token) as AuthDto;
console.log("rust verify js token:", JSON.stringify(data));


let now = Date.now();
for (let i = 0; i < TRY_COUNT; i++) {
    sign({ pid: i }, private_key, { expiresIn: 3600, algorithm: "ES256" });
}
let elapsed = Date.now() - now;
console.log(`js signing ${TRY_COUNT} times took ${elapsed}ms`);


token = sign({ pid: 1024 }, private_key, { expiresIn: 3600, algorithm: "ES256" });
now = Date.now();
for (let i = 0; i < TRY_COUNT; i++) {
    verify(token, public_key, { algorithms: ["ES256"] });
}
elapsed = Date.now() - now;
console.log(`js verifying ${TRY_COUNT} times took ${elapsed}ms`);

now = Date.now();
for (let i = 0; i < TRY_COUNT; i++) {
    rust_sign(data);
}
elapsed = Date.now() - now;
console.log(`rust signing ${TRY_COUNT} times took ${elapsed}ms`);

now = Date.now();
for (let i = 0; i < TRY_COUNT; i++) {
    rust_verify(token);
}
elapsed = Date.now() - now;
console.log(`rust verifying ${TRY_COUNT} times took ${elapsed}ms`);


now = Date.now();
for (let i = 0; i < TRY_COUNT; i++) {
    signStr(JSON.stringify(data));
}
elapsed = Date.now() - now;
console.log(`rust signing string ${TRY_COUNT} times took ${elapsed}ms`);

now = Date.now();
for (let i = 0; i < TRY_COUNT; i++) {
    verifyStr(token);
}
elapsed = Date.now() - now;
console.log(`rust verifying string ${TRY_COUNT} times took ${elapsed}ms`);