const Koa = require('koa');
// const Router = require('koa-router');
const router = require('./routes');
const koaBody = require('koa-body');

const bodyParser = require('koa-parser');
const port = 5001;
const app = new Koa();
const serve = require('koa-static');
const cors = require('@koa/cors');
const db = require('./models');
const paginate = require('koa-ctx-paginate');
app.context.db = db;
// app.use(async ctx => {
//     console.log(ctx.db);
// });
db.sequelize.sync({force:false}).then(() => console.log('Models are in sync'));


app.use(cors());
app.use(serve(__dirname + '/public'));

app.use(koaBody({
    formidable:{
        uploadDir: './public',
        keepExtensions: true
    },
    multipart: true,
    urlencoded: true
}));

app.use(bodyParser());
app.use(paginate.middleware(10, 50));

app.use(router.routes());


// app.listen(port);
app.listen(process.env.PORT || 5001);
console.log(`...on ${port}`);
