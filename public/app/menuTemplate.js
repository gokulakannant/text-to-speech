const {
  dialog
} = require("electron");
const path = require("path");
const packageJson = require(path.join(__dirname, "../../package.json"));

const template = [{
    label: "File",
    submenu: [{
      role: "quit"
    }]
  },
  {
    label: "Edit",
    submenu: [{
        role: "undo"
      },
      {
        role: "redo"
      },
      {
        type: "separator"
      },
      {
        role: "cut"
      },
      {
        role: "copy"
      },
      {
        role: "paste"
      },
      {
        role: "delete"
      },
      {
        type: "separator"
      },
      {
        role: "selectAll"
      }
    ]
  },
  {
    label: "View",
    submenu: [{
        role: "reload"
      },
      {
        type: "separator"
      },
      {
        role: "resetzoom"
      },
      {
        role: "zoomin"
      },
      {
        role: "zoomout"
      },
      {
        type: "separator"
      },
      {
        role: "togglefullscreen"
      }
    ]
  },
  {
    role: "window",
    submenu: [{
        role: "minimize"
      },
      {
        role: "close"
      }
    ]
  },
  {
    role: "help",
    submenu: [{
      label: "About",
      click: () => {
        const options = {
          title: "Text To Speech",
          message: "About",
          detail: `
            Version: ${packageJson.version}
            Electron: ${process.versions.electron}
            Chrome: ${process.versions.chrome}
            Node.js: ${process.versions.node}
            V8: ${process.versions.v8}
            OS: ${process.platform}`
        };

        dialog.showMessageBox(null, options, response => {
          console.log(response);
        });
      }
    }]
  }
];

module.exports = template;
