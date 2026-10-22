const fs = require("fs");


const insertUser = (id, fname, lname = "", age, city) => {
    const fileData = loadFileData()

    const duplicatedData = fileData.filter( data => {
       return data.ID === id;
    })
    if (duplicatedData.length === 0) {
        fileData.push({
        ID: id,
        FirstName: fname,
        LastName: lname,
        Age: age,
        City: city
    })
        saveData(fileData)
        console.log('------------------------------------------');
        console.log("\tData inserted successfully!");
        console.log('------------------------------------------');
    }else{
        console.log('-----------------------------------');
        console.log("A user with same ID already existed!");
        console.log('-----------------------------------');
        console.log(duplicatedData);
    }
    
}



const deleteUser = (id) => {
    const fileData = loadFileData()

    if (id === undefined) {
        if (fileData.length === 0) {
            console.log('--------------------------------------------');
            console.log("\tThere are no users to delete.");
            console.log('--------------------------------------------');
            return;
        }

        saveData([])
        console.log('------------------------------------------');
        console.log("\tAll users deleted successfully!");
        console.log('------------------------------------------');
        return;
    }

    const savedData = fileData.filter(data => data.ID !== id)
    if (savedData.length === fileData.length) {
        console.log(`A user with ID ${id} was not found.`);
        return;
    }

    console.log('------------------------------------------');
    console.log("\tUser deleted successfully!");
    console.log('------------------------------------------');
    saveData(savedData)

}



const readUser = (id) => {
    const fileData = loadFileData()

    if (id === undefined) {
        listAllData()
        return;
    }

    const userData = fileData.find(data => data.ID === id)

    if (userData) {
        console.log('------------------------------------------');
        console.log(`User Data:\n----------\nFirst name: ${userData.FirstName}\nLast name: ${userData.LastName}\nAge: ${userData.Age}\nCity: ${userData.City}`);
        console.log('------------------------------------------');
    }else{
        console.log('---------------------------------------');
        console.log("  A user with that ID is not existed!");
        console.log('---------------------------------------');
    }
}



const listAllData = () => {
    const fileData = loadFileData()

    if (fileData.length === 0) {
        console.log('----------------------------------------');
        console.log("\tThere are no users to list.");
        console.log('----------------------------------------');
        return;
    }

    fileData.forEach(userData => {
        console.log('------------------------------------------');
        console.log(`User Data:\n----------\nFull name: ${userData.FirstName} ${userData.LastName}\nCity: ${userData.City}`);
        console.log('------------------------------------------');
    });
}



const loadFileData = () => {
    try {
        const fileDataJson = fs.readFileSync("jsonData.json").toString();
        const fileDataObject = JSON.parse(fileDataJson);
        return fileDataObject;

    } catch (error) {
      console.error(error);
      return []
    }
}


const saveData = (data) => {
    const dataJson = JSON.stringify(data);
    fs.writeFileSync("jsonData.json", dataJson)
}


module.exports = {
    insertUser,
    deleteUser,
    readUser,
    listAllData
}