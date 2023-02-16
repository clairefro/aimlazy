const fs = require("fs");
const path = require("path");

const _createFilePath = (path) => {
  /** treat last chunk of path as a file and ignore */
  const pathArray = path.split("/").slice(0, -1);

  let currentPath = "";
  let pathExists = true;

  pathArray.forEach((dir) => {
    currentPath += `${dir}/`;
    if (!fs.existsSync(currentPath)) {
      pathExists = false;
      fs.mkdirSync(currentPath);
    }
  });

  return pathExists;
};

const writeDataToFileSync = (data, pathname) => {
  const out = path.resolve(process.cwd(), pathname);
  _createFilePath(out);
  console.log({ out });
  try {
    if (fs.existsSync(out)) {
      fs.writeFileSync(out, data);
    } else {
      fs.writeFileSync(out, data, { flag: "w+" });
    }
  } catch (e) {
    console.log(`Error writing file to '${pathname}'`);
    console.log(e);
  }
};

module.exports = { writeDataToFileSync };
