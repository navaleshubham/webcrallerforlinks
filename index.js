const express = require('express')
const { spawn } = require('child_process');
const app = express()
var path = require('path');
bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
const {PythonShell} =require('python-shell'); 
const port = process.env.PORT || 3000;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/',(req,res)=>{
    res.render('web.ejs',{'data':false})
})
app.get('/url',(req,res)=>{
    res.render('web.ejs',{'data':false})
})
app.post('/url', (req, res) => {
    var url=req.body.urls
    console.log(url)
    var dataToSend;
    let options = { 
        mode: 'text', 
        pythonOptions: ['-u'], // get print results in real-time 
        args: [url] //An argument which can be accessed in the script using sys.argv[1] 
    }; 
    PythonShell.run('script1.py', options, function (err, result){ 
        if (err) return res.render('web.ejs',{'data':['  please check your url  ','  your url seems buggy  ']}); 
        // console.log('result: ', result.toString()); 
        dataToSend = result.toString().replace('{','').replace('}','').split(', ')
        return res.render('web.ejs',{'data':dataToSend})
  }); 
    // spawn new child process to call the python script
    // s='script1.py'
    // const python = spawn('python', [s, url]);
    // collect data from script
    // python.stdout.on('data', function (data) {
        // console.log('Pipe data from python script ...');
        // dataToSend = data.toString().replace('{','').replace('}','').split(', ')
    // });
    // in close event we are sure that stream from child process is closed
    // python.on('close', (code) => {
        // console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        // console.log(dataToSend)
        // res.render('web.ejs',{'data':dataToSend})
    // });

})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))