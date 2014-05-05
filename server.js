
var restify = require('restify'), fs = require('fs');

var ip_addr = '127.0.0.1';
var port    =  '80';
// --- The available food

var organizeStarted = false;

var foodList = {

"food": [
    {
        "id": 4,
        "desc": "marguez"
    },
    {
        "id": 6,
        "desc": "porc"
    }
    ,
    {
        "id": 9,
        "desc": "chicken"
    },
    {
        "id": 2,
        "desc": "cervelas"
    }
]
}

var participantsList = {
    "participants": [
        {
            "name":"Suti",
            "order":[
                {
                    "id":4,
                    "desc":"marguez",
                    "qty":4
                }
            ]
        },
        {
            "name":"Loic",
            "order":[
                {
                    "id":4,
                    "desc":"marguez",
                    "qty":1
                }
            ]
        },{
            "name":"Jd",
            "order":[
                {
                    "id":6,
                    "desc":"porc",
                    "qty":1
                }
            ]
        },{
            "name":"Jc",
            "order":[
                {
                    "id":4,
                    "desc":"merguez",
                    "qty":1
                },{
                    "id":9,
                    "desc":"chicken",
                    "qty":10
                }
            ]
        },
        {
            "name":"Sam",
            "order":[
                {
                    "id":2,
                    "desc":"cervelas",
                    "qty":1
                }
            ]
        },
        {
            "name":"Silvan",
            "order":[
                {
                    "id":2,
                    "desc":"cervelas",
                    "qty":1
                }
            ]
        }

    ]
}



var server = restify.createServer({
    name : "bbqserver"
});
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());


server.listen(port ,ip_addr, function(){
    console.log('%s listening at %s ', server.name , server.url);
});



/*
Return the possible food to chose from
 */
server.get({path : '/foodList.json' , version: '0.0.1'} , function(req, res, next){
        res.send(200,foodList);

});

/*
Return the list of participant along with their food
 */
server.get({path : '/participants.json' , version: '0.0.1'} , function(req, res, next){
    res.send(200,participantsList);

});

/*
 Return if the bbq is on already
 */
server.get({path : '/getBBQStarted.json' , version: '0.0.1'} , function(req, res, next){

    console.log('bbq start', organizeStarted);
    var ob = {}
    ob.status = 'OK';
    ob.organize = organizeStarted;

    res.send(200,ob);

});

/*
Nbr of participants
 */
server.get({path : '/getNbrParticipants' , version: '0.0.1'} , function(req, res, next){
    res.send(200,participantsList.participants.length);

});


/*
New person which want to join a BBQ
 */
server.post({path : '/joinBBQ' , version: '0.0.1'} ,function joinBBQ(req,res,next){


    console.log(req.params.name);
    var partName = req.params.name;
    var partFood = req.params.food;
    console.log(req.params.food);

    var exist = false;
    participantsList.participants.forEach( function (val) {
        if (val.name === partName) {
            val.order = [];
            val.order = partFood;
            exist = true;
        }
    });
    if(!exist){
        var object = {}
        object.name = partName;
        object.order = partFood;
        participantsList.participants.push(object);
    }

    console.log(JSON.stringify(participantsList));

    res.setHeader('Access-Control-Allow-Origin','*');
    res.send(201, 'OK');
    return next();

});




/*
Start a bbq
 */
server.post({path : '/startBBQ' , version: '0.0.1'} ,function joinBBQ(req,res,next){
    console.log('start bbq method')

    if(organizeStarted){
        console.log('bbq already started')
        res.send(201,'NOK')

        return next();
    }
    else{

        organizeStarted = true;

        console.log('bbq started', organizeStarted);
        res.send(201,'OK')

        return next();
        /*FIXME
         Send an email to bern people
         */
    }
});
/*
 Stop a bbq
 */
server.post({path : '/stopBBQ' , version: '0.0.1'} ,function joinBBQ(req,res,next){
    if(organizeStarted){
        res.send(201,'OK')
        console.log('bbq  stop')
        organizeStarted = false;
        return next();


    }
    else{
        res.send(201,'NOK')
        console.log('bbq already stop')
        return next();
    }
});




