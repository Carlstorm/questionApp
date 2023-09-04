// import * as fs from 'fs'
// import path from 'path'

// export default function loadJSONFilesFromFolder(folderPath) {
//   const files = fs.readdirSync(folderPath);

//   const jsonFiles = files.filter(file => path.extname(file) === '.json');

//   const jsonData = [];

//   jsonFiles.forEach(file => {
//     const filePath = path.join(folderPath, file);
//     const fileContent = fs.readFileSync(filePath, 'utf-8');
//     const jsonObject = JSON.parse(fileContent);
//     jsonData.push(jsonObject);
//   });

//   return jsonData;
// }
