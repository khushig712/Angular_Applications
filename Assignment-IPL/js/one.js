google.charts.load("current", {packages:["corechart"]});
// google.charts.setOnLoadCallback(drawChart);
var attempt = 3; // Variable to count number of attempts.
		// Below function Executes on click of login button.
function validate(){
	var username = document.getElementById("user").value;
	var password = document.getElementById("pass").value;
	if ( username == "gkhushi712" && password == "khushigupta"){
		alert ("Login successful");
		window.location = "./loggedHome.html"; // Redirecting to other page.
		return false;
	}
	else{
		attempt --;// Decrementing by one.
		alert("You have left "+attempt+" attempt;");
		// Disabling fields after 3 attempts.
		if( attempt == 0){
			document.getElementById("user").disabled = true;
			document.getElementById("pass").disabled = true;
			document.getElementById("submit").disabled = true;
			return false;
				}
			}
		}
var admins=[
    {
        "username":"gkhushi712",
        "password":"khushigupta"
    }
];
var login_btn;
var register_btn;
var email;
var password;
try{
var lgo_btn=document.getElementById("lgo");
lgo_btn.addEventListener('click',()=>{
    localStorage.setItem("log_in_state",false);
    location.replace("index.html");
})
}
catch(error){
    console.log(error);
}
function indexinit(){
    login_btn=document.getElementById("sign-in-btn");
    register_btn=document.getElementById("register");
    email=document.getElementById("email");
    password=document.getElementById("password");
    localStorage.setItem("log_in_state",false)
    login_btn.addEventListener('click',()=>{
        for(let element of admins){
              if(element["username"]===email.value && element["password"]===password.value){
                    localStorage.setItem("log_in_state",true);
                    location.replace("./loggedHome.html")
              }        
        }
    })
}


// fucntion to authenticate and get token
function login(username,password){
    fetch('https://indipl2020.herokuapp.com/authenticate',
    {
        "method":'POST',
        "headers":{
            'Content-Type':'application/json',
        }
        ,
        "body":JSON.stringify({"username":username,"password":password})
        }
    ).then(resp=>resp.json()).then(data=>{localStorage.setItem("token",data.token);}).catch(error=>{console.log(error);})
}
function getToken(){
    login('admin@gmail.com','admin');
    return localStorage.getItem("token");
}

function register(){
    det=getregisterdetails();
    console.log(det);
    fetch('https://indipl2020.herokuapp.com/register',
        {
            "method":'POST',
            "headers":{
                'Content-Type':'application/json',
            }
            ,
            "body":JSON.stringify(det)
        }
    ).then(resp=>resp.json()).then(data=>console.log(data)).catch(error=>console.log(error));
}

function getregisterdetails(){
    let det=
    {
        "username":"gkhushi712",
        "enabled":true,
        "fullname":"Khushi Gupta",
        "id":"khushi",
        "password":"khushigupta",
        "roles":[{
            "role":"admin"
            }
        ]
    };
    // console.log(JSON.stringify(det))
     return det;
}
function getallteams(){
    token=getToken();
    const teams=[];
    let headings=["City","Coach","Home","Label","Team"];
    console.log(token);
    fetch('https://indipl2020.herokuapp.com/ipl2020/team/all',
        {
                "method":'GET',
                "headers":{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
        }
    ).then(resp=>resp.json()).then((data)=>{
        let table = "<table class='table table-striped table-dark table-responsive-sm'>";
    
        headings.forEach(h => {
            table += `<th>${h}</th>`
         }) 
         table += "</th>";
         data.forEach(c => {
            table += "</tr>";
            table += `<td>${c.city}</td><td>${c.coach}</td><td>${c.home}</td><td>${c.label}</td><td>${c.team}</td>`;
            table += "</tr>";
        })
        table += "</table>";
        document.getElementById("content").innerHTML=table;
    })
    .catch(error=>console.log(error));
}

function getteamlabels(){
    token=getToken();
    fetch("https://indipl2020.herokuapp.com/ipl2020/team/labels",
        {
            "method":'GET',
            "headers":{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            
        }
    ).then(resp=>resp.json()).then(data=>console.log(data)).catch(error=>console.log(error));
}

function getplayersbyteam(name){
    token=getToken();
    headings=["Name","Role","Label","Price"];
    fetch(`https://indipl2020.herokuapp.com/ipl2020/team/${name}`,
        {
            "method":'GET',
            "headers":{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
                
            },
            // "path":JSON.stringify({"teamLabel":`${name}`})
        }
    ).then(resp=>resp.json()).then(data=>{
        console.log(data)
        let table = "<table class='table table-striped table-dark table-responsive-sm'>";
        var ted = [
            ['Role' , 'Number'],
            ['Batsman',     0],
            ['Wicket Keeper',      0],
            ['Bowler',  0],
            ['All-Rounder', 0],
          ];
        headings.forEach(h => {
            table += `<th>${h}</th>`
         }) 
         table += "</th>";
         data.forEach(c => {
            table += "</tr>";
            table += `<td>${c.name}</td><td>${c.role}</td><td>${c.label}</td><td>${c.price}</td>`;
            table += "</tr>";
            for(let element of ted){
                if(element[0]===c.role)
                    element[1]++;
            }
        })
        table += "</table>";
        document.getElementById("player-table").innerHTML=table;
        console.log(ted);
        drawChart(ted,name);
    
    }).catch(error=>console.log(error));

}

function getPlayersbyteamandrole(team,role){
    token=getToken();
    headings=["Name","Role","Label","Price"];
    fetch(`https://indipl2020.herokuapp.com/ipl2020/team/${team}/${role}`,
    {
        "method":'GET',
        "headers":{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },

    }).then(resp=>resp.json()).then(data=>{
        let table = "<table class='table table-striped table-dark table-responsive-sm'>";
        
        headings.forEach(h => {
            table += `<th>${h}</th>`
         }) 
         table += "</th>";
         data.forEach(c => {
            table += "</tr>";
            table += `<td>${c.name}</td><td>${c.role}</td><td>${c.label}</td><td>${c.price}</td>`;
            table += "</tr>";
        })
        table += "</table>";
        document.getElementById("role-table").innerHTML=table;

    }).catch(error=>console.log(error));

}

function p1init(){
    getallteams();
}

function drawChart(inputdata,name) {
    var data = google.visualization.arrayToDataTable(inputdata);
    var options = {
    // title: 'Team Role composition',

      pieHole: 0.4,
      backgroundColor: {
          fill: "#19398a"
      },
      legend:
            { 
            textStyle: {color: 'white', fontSize: 14}}
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    google.visualization.events.addListener(chart, 'select', selectHandler);
    chart.draw(data, options);


    function selectHandler(){
        var selectedItem=chart.getSelection()[0];
        console.log(selectedItem);
        if(selectedItem){
            let role=data.getValue(selectedItem.row, 0);
            getPlayersbyteamandrole(name,role);
        }
    }
 }

function gettotalamount(){
    token=getToken();
    fetch('https://indipl2020.herokuapp.com/ipl2020/team/totalamount',
    {
        "method":'GET',
        "headers":{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }

    }).then(resp=>resp.json()).then(data=>{
        ted=[
            ['Team','Amount',{role:'style'}]
        ]
        data.forEach(c=>{
           ted.push([c.teamName,c.amount,'gold']);
        }
        );
        drawBarGraph(ted);
    }).catch(error=>console.log(error));
}


function getamountbyrole(team){
    token=getToken();
    fetch(`https://indipl2020.herokuapp.com/ipl2020/team/amountbyrole/${team}`,
    {
        "method":'GET',
        "headers":{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }

    }).then(resp=>resp.json()).then(data=>
    {
        console.log(data);
         var ted = [
          ['RoleName' , 'Amount'],
          ];
        data.forEach(c => {
          ted.push([c.roleName,c.amount]);
        });
        console.log(ted);
        // console.log(ted);
        // // drawChart(ted,name);
        var d = google.visualization.arrayToDataTable(ted);
        var options = {
        // // title: 'Team Role composition'
          pieHole: 0.4,
           backgroundColor: {
               fill: "#19398a"
          },
           legend:
                { 
               textStyle: {color: 'white', fontSize: 14}}
         };
        var chart = new google.visualization.PieChart(document.getElementById('byrole-graph'));
        // // google.visualization.events.addListener(chart, 'select', selectHandler);
         chart.draw(d, options);
    

    }).catch(error=>console.log(error));


}

function drawBarGraph(ted){
    var data = google.visualization.arrayToDataTable(ted);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

      var options = {
        animation:{
            duration:2000,
            easing:'out',
            startup:true
        },
        title: "Amount spent by each team",
        width: 1000,
        height: 600,
        backgroundColor: {
            fill: "#19398a"
        },
        bar: {groupWidth: "95%"},
        legend: { position: "none",text2tyle: {color: 'white', fontSize: 14} },
        annotations: {
            textStyle: {
              fontName: 'Times-Roman',
              fontSize: 15,
              bold: false,
              italic: true,
              // The color of the text.
              color:'white',
              // The color of the text outline.
            //   auraColor: '#d799ae',
              // The transparency of the text.
              opacity: 0.8
            }
          },
        hAxes:{
            0:{
                textStyle:{color:'white'}
            },
            1:{
                textStyle:{color:'white'}
            },
        },
        titleTextStyle:{
            color:'white'
        },
        vAxis:{
            textStyle:{
                color:'white'
            }
        }
      };
      var chart = new google.visualization.BarChart(document.getElementById("barchart_values"));
      google.visualization.events.addListener(chart, 'select', selectHandler);
      function selectHandler(){
        var selectedItem=chart.getSelection()[0];
        console.log(selectedItem);
        if(selectedItem){
            let team=data.getValue(selectedItem.row, 0);
           getamountbyrole(team);
            // getPlayersbyteamandrole(name,role);
        }
      }
      chart.draw(view, options);
}

function getmaxamountbyrole(){
    token=getToken();
    fetch('https://indipl2020.herokuapp.com/ipl2020/team/maxamoutbyrole',
    {
        "method":'GET',
        "headers":{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
    }).then(resp=>resp.json()).then(data=>{
         console.log(data);///////////////////////////////////////////////////////////
         headings=["Name","Role","Label","Price"];
        let table = ["<table class='table table-striped table-dark table-responsive-sm'>",
        "<table class='table table-striped table-dark table-responsive-sm'>",
        "<table class='table table-striped table-dark table-responsive-sm'>",
        "<table class='table table-striped table-dark table-responsive-sm'>"];
        for(let t in table){
            headings.forEach(h => {
                t += `<th>${h}</th>`
             }) 
             t += "</th>";
        }
        
        data.forEach(c => {
            //  table.forEach(t=>t+="<tr>")
            for(let t of table){
                t=>t+="</tr>"
            }
             if(c.role=="Batsman"){
                console.log("Batsman");
                c.players.forEach(p=>{
                    table[0] += `<td>${p.name}</td><td>${p.role}</td><td>${p.label}</td><td>${p.price}</td>`;
                    table[0]+="</tr>"
                })
             }
             else if(c.role=="Wicket Keeper"){
                console.log("Wk");
                c.players.forEach(p=>{
                    table[1] += `<td>${p.name}</td><td>${p.role}</td><td>${p.label}</td><td>${p.price}</td>`;
                    table[1]+="</tr>"
                })
             }
             else if(c.role=="All-Rounder"){
                console.log("AR");
                c.players.forEach(p=>{
                    table[2] += `<td>${p.name}</td><td>${p.role}</td><td>${p.label}</td><td>${p.price}</td>`;
                    table[2]+="</tr>"
                    
                })
             }
             else if(c.role=="Bowler"){
                console.log("Bowl");
                c.players.forEach(p=>{
                    table[3] += `<td>${p.name}</td><td>${p.role}</td><td>${p.label}</td><td>${p.price}</td>`;
                    table[3]+="</tr>"
                })
             }
            });
        
        //    table += `<td>${c.name}</td><td>${c.role}</td><td>${c.label}</td><td>${c.price}</td>`;
        //     table += "</tr>";
        // })
        // table += "</table>";
        // document.getElementById("role-table").innerHTML=table;
        for(let t of table){
            t+="</table>";
        }
        document.getElementById("Batsman-high").innerHTML+=table[0];
        document.getElementById("Wicket-high").innerHTML+=table[1];
        document.getElementById("Bowler-high").innerHTML+=table[3];
        document.getElementById("All-high").innerHTML+=table[2];

    }).catch(error=>console.log(error));
}

function p3init(){
    gettotalamount();
}

function p2init(){
    let team_select=document.getElementById("team-select");
    // getPlayersbyteamandrole('MI','Batsman');
    getplayersbyteam("MI");
    team_select.addEventListener('change',()=>{
        document.getElementById("player-table").innerHTML=document.getElementById("spinner1")
        console.log(team_select.value);
        getplayersbyteam(team_select.value); 
    }
    )
}
function getplayerbyname(name){
    token=getToken();
    fetch(`https://indipl2020.herokuapp.com/ipl2020/team/players/search/${name}`,
    {
        "method":'GET',
        "headers":{
            'Content-Type':"application/json",
            "Authorization":`Bearer ${token}`
        }

    }).then(resp=>resp.json()).then(data=>{
        if(data.length===0)
            alert("No results found");
        else{
            headings=["Name","Role","Label","Price"];
            let table = "<table class='table table-striped table-dark table-responsive-sm'>";
            headings.forEach(h => {
            table += `<th>${h}</th>`
            }) 
            table += "</th>";
            data.forEach(c => {
                table += "</tr>";
                table += `<td>${c.name}</td><td>${c.role}</td><td>${c.label}</td><td>${c.price}</td>`;
                table += "</tr>";
            })
            table += "</table>";
            document.getElementById("search-result").innerHTML=table;

        }
    }).catch(error=>console.log(error));
}
function p4init(){
    getmaxamountbyrole();
    var player_search=document.getElementById("search-btn");
    var feild=document.getElementById("search-key")
    player_search.addEventListener('click',()=>
    {
        // console.log(feild.value);
        getplayerbyname(feild.value);
    }
    );
}