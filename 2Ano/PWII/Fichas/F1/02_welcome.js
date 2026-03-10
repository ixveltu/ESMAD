// node 02_welcome nome
const UserName = process.argv[2]; // caso username seja o 2 argumento ao chamar, usa [2]

UserName
 ? console.log(`Hello, ${UserName}! Welcome to Node!`)
 : console.log(
    "Hello, visitor! Set the USER_NAME variable for a personalized greeting."
   );
