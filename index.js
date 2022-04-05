import fs from 'fs'
import {exec} from 'child_process'
import enquirer from 'enquirer'
import chalk from 'chalk'
import banner from './modulos/banner/index.js'

//const { Input } = require('enquirer');
banner()
const prompt = new enquirer.Input({
    name: 'projetos',
    message: 'What project name ?'
});

const pack = {
  "name": "test-min-app",
  "version": "1.0.0",
  "scripts": {
    "start": "react-scripts start"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
prompt.run()
  .then(answer => callback(answer))
  .catch(console.error);

function callback(call){
    console.log(call);
    let dir = "./" + call + "/"
  if(!fs.existsSync(dir))
  {
    fs.mkdirSync(dir)
  }else{
    console.log("Diretorio existe");
  }

  fs.writeFileSync(dir + 'package.json', JSON.stringify(pack))

  //Install modules
   exec(`cd ${dir} && yarn add react react-dom react-scripts`, (err, ctt) => {
     console.log(ctt);
  })

  let srcDir = './' + dir + '/src/'
  let publicDir = './' + dir + '/public/'

  function createStructure(){
    if(!fs.existsSync(srcDir))
    {
      fs.mkdirSync(srcDir)
    }else{
    console.log("Diretorio existe");
    }
    // =================================================== \\
    if(!fs.existsSync(publicDir))
    {
      fs.mkdirSync(publicDir)
    }else{
      console.log("Diretorio existe");
    }
  }

  async function createFiles(){
    let indJs = `
  import ReactDOM from 'react-dom'
  import App from './App'
  ReactDOM.render(
    <App />,
    document.getElementById("root")
  )
    `
    let indHtml = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title></title>
  </head>
  <body>
   <div id="root"></div> 
  </body>
  </html>
    `
    let indApp = `
  function App(){
    return(
      <div>
        <p>Body</p>
      </div>
      )
  }

  export default App
    `
    fs.writeFileSync(srcDir + 'index.js', indJs)
    fs.writeFileSync(publicDir + 'index.html', indHtml) 
    fs.writeFileSync(srcDir + 'App.js', indApp) 
    console.log(chalk.blue("cd " + dir));
    console.log(chalk.blue("yarn start"));
  }
  createStructure()
  createFiles()
}
