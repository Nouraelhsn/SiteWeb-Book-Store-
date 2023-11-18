const express=require('express')
const path=require('path')
const RouterHome=require('./routers/home.router')
const RouterBook=require('./routers/book.route')
const routerAuth=require('./routers/auth.route')
const routeMybooks=require('./routers/mybooks.route')
const routeContact=require('./routers/contact.route')
const routeAbout=require('./routers/about.route')
const session=require('express-session')
const MongoDbStore=require('connect-mongodb-session')(session)
const flash=require('connect-flash')

const app=express()


app.use(express.static(path.join(__dirname,'assets')))
app.set('view engine', 'ejs')
app.set('views','views')

var Store=new MongoDbStore({
          uri:'mongodb://localhost:27017/library',
          collection:'sessions'
})
app.use(flash())
app.use(session({
          secret:'this is my secret key',
          store:Store,
          resave:true,
          saveUninitialized:true
}))
//get all books in page index

app.use('/',RouterHome)
app.use('/books',RouterBook)
app.use('/',routerAuth)
app.use('/mybooks',routeMybooks)
app.use('/',routeContact)
app.use('/',routeAbout)






app.listen(5000,()=>console.log('server run in port 5000'))