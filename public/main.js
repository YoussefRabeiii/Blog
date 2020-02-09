const path = require("path");
const fs = require("fs");

const dirPath = path.join(__dirname, "../src/content");
const dirPathPages = path.join(__dirname, "../src/pages/content");
let postList = [];
let pageList = [];


// Get the Posts And Loop overthem
const getPosts = () => {
  // Read the files
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return `Failed to list content of directory ${err}`
    }

    files.forEach((file, i) => {
      let obj = {};
      let post;

      // Read the content of the files
      fs.readFile(`${dirPath}/${file}`, "utf8", (err, contents) => {
        // Get the MetaData (Between the three ---)
        const getMetaDataIndices = (acc, elem, i) => {
          if (/^---/.test(elem)) {
            acc.push(i);
          }
          return acc;
        };

        // Parse the metaData  ( Convert it to Object )
        const praseMetaData = ({ lines, metaDataIndices }) => {
          if (metaDataIndices.length > 0) {
            let metaData = lines.slice(
              metaDataIndices[0] + 1,
              metaDataIndices[1]
            );

            metaData.forEach(line => {
              obj[line.split(": ")[0]] = line.split(": ")[1];
            });

            return obj;
          }
        };

        // Parse the content
        const parseContent = ({ lines, metaDataIndices }) => {
          if (metaDataIndices.length > 0) {
            lines = lines.slice(metaDataIndices[1] + 1, lines.length);
          }
          return lines.join("\n");
        };

        // Call the Functions
        const lines = contents.split("\n");
        const metaDataIndices = lines.reduce(getMetaDataIndices, []);
        const metaData = praseMetaData({ lines, metaDataIndices });
        const content = parseContent({ lines, metaDataIndices });

        // Create a date so we sort the posts according to it in a descending order
        const date = new Date(metaData.date);
        const timeStamp = date.getTime() / 1000;

        // Create the post (As an Object)
        post = {
          id: timeStamp,
          title: metaData.title ? metaData.title : "No Title Given",
          author: metaData.author ? metaData.author : "No Suthor Given",
          date: metaData.date ? metaData.date : "No Date Given",
          content: content ? content : "No Content Given"
        };
        postList.push(post);

        // Write the posts.json file only when we done loop over the files in the directory
        if (i === files.length - 1) {
          const sorted = postList.sort((a, b) => {
            return a.id < b.id ? 1 : -1;
          });
          let data = JSON.stringify(sorted);
          fs.writeFileSync("src/posts.json", data);
        }
      });
    });
  });
};


/*******************************************************************/

// Get the Pages And Loop overthem
const getPages = () => {
  // Read the files
  fs.readdir(dirPathPages, (err, files) => {
    if (err) {
      return `Failed to list content of directory ${err}`
    }

    files.forEach((file, i) => {
      let page;

      // Read the content of the files
      fs.readFile(`${dirPathPages}/${file}`, "utf8", (err, contents) => {
        // Create the Page (As an Object)
        page = {
            content: contents
        };
        pageList.push(page);
        let data = JSON.stringify(pageList);
        fs.writeFileSync("src/pages.json", data);
      });
    });
  });
};

getPosts();
getPages();