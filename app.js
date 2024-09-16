const express =require("express");
const path = require("path");
const Register = require("./model/reg");
const { json } = require("express");
const hbs = require("hbs");
const app = express();
require("./db/conn");
const port = process.env.PORT || 5000;
const static_h1 = path.join(__dirname, "../public");
const static_h2 = path.join(__dirname, "../templates/views");
const static_h3 = path.join(__dirname,"../templates/parties");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_h1));
app.set("view engine", "hbs");
app.set("views", static_h2);
hbs.registerPartials(static_h3);
app.get("/", (req, res)=>{
    res.render("login");

});
app.post("/reg",async (req,res)=>{
    try{
        const password = req.body.password;
        const cpassord = req.body.cpassword;
        if (password == cpassord){
            const emp = new Register({ 
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            phone:req.body.number,
            id:req.body.id,
            password:password,
            repeat:cpassord
            })
            const regs = await emp.save();
            res.status(201).render("index");
        }else{
            res.send("not equal");
        }
    }catch(e){
        res.status(400).send(e);
    }
})
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Register.findOne({ email });

        if (user && user.password === password) {
            res.status(201).render("index"); // Render the index view
        } else {
            res.send("Invalid login details.");
        }
    } catch (error) {
        res.status(400).send("Invalid login details.");
    }
});
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
});