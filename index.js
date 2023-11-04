import  express  from "express";
import url from "url";
import { DataService } from "./servises/servises.js";

const pathData = "./json/data.json";
const product = await DataService.readJSONFile(pathData);
const parsedData = JSON.parse(product);


const replaceTemplet = (temp,product) =>{
  let outPut = temp.replace(/{%PRODUCTNAME%}/g,product.productName);
  outPut = outPut.replace(/{%IMAGE%}/g,product.image);
  outPut = outPut.replace(/{%PRICE%}/g,product.price);
  outPut = outPut.replace(/{%FROM%}/g,product.from);
  outPut = outPut.replace(/{%NUTRIENTS%}/g,product.nutrients);
  outPut = outPut.replace(/{%QUANTITY%}/g,product.quantity);
  outPut = outPut.replace(/{%DESCRIPTION%}/g,product.description);
  outPut = outPut.replace(/{%ID%}/g,product.id);
  if(!product.organic)outPut = outPut.replace(/{%NOT_ORGANIC%}/g,'not-organic');
  return outPut
  
}

const tempOveriew = await DataService.readJSONFile("./templates/template-overview.html","utf-8");
const tempCard =  await DataService.readJSONFile("./templates/template-card.html","utf-8");
const tempProduct =  await DataService.readJSONFile("./templates/template-product.html","utf-8")



const PORT = 3000;
const app = express();
app.use(express.json());

//Overview
app.get("/overview", function(req, res) {
 const cardHtml = parsedData.map(el => (replaceTemplet(tempCard,el))).join('')
 const output =  tempOveriew.replace(`{%PRODUCT_CARDS%}`,cardHtml) 

 res.send(output)
});

app.get("/card", function (req, res) {
  
  // const product = parsedData[query.id]
  // const out = replaceTemplet(tempProduct,product)
  res.send(tempProduct)
});

app.get("/product", function (req, res) {
  // const queryPat = parsedData.map(el=>parsedData.id=el.id)
  
  const {query} = url.parse(req.url, true)
  const product = parsedData[query.id];
  const output =  replaceTemplet(tempProduct,product) 

  
  
  
  // const productCard = parsedData.map(el => (replaceTemplet(tempCard,el))).join('')

  
  res.send(output)
});

//Not found
app.all("*", (req, res) => {
  res.status(404).send("Error 404! Requested content doesn't exist");
});
app.listen(PORT, () => {
  console.log(`Server is up and running at port:${PORT}`);
});
