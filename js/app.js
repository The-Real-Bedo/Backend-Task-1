const yargs = require("yargs")


const jsonData = require("./appLogic.js")

yargs.command ({
    command: "add",
    describe: "used to add an item",
    builder: {
        id: {
            describe: "The ID in 'add' command",
            demandOption: true,
            type: "number"
        },
        fname: {
            describe: "The First name in 'add' command",
            demandOption: true,
            type: "string"
        },
        lname: {
            describe: "The Last name in 'add' command",
            demandOption: false,
            type: "string"
        },
        age: {
            describe: "The Age in 'add' command",
            demandOption: true,
            type: "number"
        },
        city: {
            describe: "The city in 'add' command",
            demandOption: true,
            type: "string"
        }
    },
    handler: (fileData) => {
        // console.log(`user data: FirstName: ${fileData.fname} | LastName: ${fileData.lname} | Age: ${fileData.age}`);

        jsonData.insertUser(fileData.id, fileData.fname, fileData.lname, fileData.age, fileData.city)
    }
})

// ?console.log(yargs.argv);

yargs.command({
    command: "delete",
    describe: "delete command",
    builder: {
        id: {
            describe: "ID of the user to delete (omit to delete all users)",
            demandOption: false,
            type: "number"
        }
    },

    handler: (fileData) => {
        jsonData.deleteUser(fileData.id)
    }
})


yargs.command({
    command: "read",
    describe: "read command",
    builder: {
        id: {
            describe: "ID in read command)",
            demandOption: false,
            type: "number"
        }
    },
    handler: (fileData) => {
        jsonData.readUser(fileData.id)
    }
})

yargs.command({
    command: "list",
    describe: "list command",
    handler: () => {
        jsonData.listAllData()
    }
})

yargs.parse()
