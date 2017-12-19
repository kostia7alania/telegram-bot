var mysql = require('mysql'); 
getTime = () => {var today=new Date(),h=today.getHours(),m=today.getMinutes(),s=today.getSeconds(),ret = h+":"+m+":"+s;console.log(ret);return ret}
// var fs = require('fs'); 
var TelegramBot = require('node-telegram-bot-api'); 
// // Устанавливаем токен, который выдавал нам бот.
var token = '473704944:AAGe54RmkGH683T_FsZlIV7YEIni5vKtkrE'; 
// // Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true}); 
// // Matches "/echo [whatever]" 
// bot.onText(/\/добавить (.+)/, (msg, match) => {
  // // 'msg' is the received Message from Telegram
  // // 'match' is the result of executing the regexp above on the text content
  // // of the message 
  // const chatId = msg.chat.id;
  // const resp = match[1]; // the captured "whatever" 
  // // send back the matched "whatever" to the chat 
  // var time = getTime();
  // bot.sendMessage(chatId,time+"=>Спаршена команда=>"+resp);
  // console.log(time+"=>Спаршена команда=>"+resp)
// });
var sendTelega = (chatId,message)			=>	{setTimeout(function(){bot.sendMessage(chatId,message)},1000)}
var sendTelegaOpt = (chatId,message,opt) 	=> 	{setTimeout(function(){bot.sendMessage(chatId,message,opt)},1000)}

var selectFrom = (name) => {return 'SELECT * FROM '+name;}
var	cl=(s)=>{console.log(s)};
var selectKey = (db,table,where,key) => {return `SELECT * FROM `+db+`.`+table+`	WHERE `+where+` LIKE '%`+key+`%';`}
var insertPhrase = (db,table,column,phrase) => {return "INSERT INTO `telega`.`phrases` (`phrase`) VALUES ('"+phrase+"');"}	
// INSERT INTO `telega`.`phrases` (`phrase`) VALUES ('Раз два три');


bot.on('message', (msg) => {
	cl('======================BEGIn============================ ')
	var sms = msg.text; 
	const chatId = msg.chat.id;
  	const opts = {
		reply_to_message_id: msg.message_id,
		reply_markup: JSON.stringify({
		  keyboard: [
			['Æмбисæндт'],
			['Чындз'],
			['Адæм'],
			['Хох'],
			['Аргъау'],
			['Арахъ'],
			['Фыдæлт']			
		  ]
		})
	}; 
		var tm=new Date(msg.date*1000);
		var dateTime = tm.toLocaleDateString()+" "+tm.toLocaleTimeString();
		var report = `
		Принято в---------------->${getTime()}
		msg.message_id----------->${msg.message_id}
		=>FROM:
		msg.from.id-------------->${msg.from.id}
		msg.from.is_bot---------->${msg.from.is_bot}
		msg.from.first_name------>${msg.from.first_name}
		msg.from.last_name------->${msg.from.last_name}
		msg.from.username-------->${msg.from.username}
		msg.from.language_code--->${msg.from.language_code}
		=>CHAT:
		msg.chat.id-------------->${msg.chat.id}
		msg.chat.first_name------>${msg.chat.first_name}
		msg.chat.last_name------->${msg.chat.last_name}
		msg.chat.username-------->${msg.chat.username}
		msg.chat.type------------>${msg.chat.type}
		=>OTHERS:
		msg.date----------------->${dateTime}
		msg.text----------------->${sms}`; 
	  cl(report); 
	  
var mas =[]; 
mas.push('msg.message_id=>>'+(msg.message_id?msg.message_id:''));
mas.push('msg.from.id=>>'+(msg.from.id?msg.from.id:''));
mas.push('msg.from.is_bot=>>'+(msg.from.is_bot?"1":'0'));
mas.push('msg.from.first_name=>>'+(msg.from.first_name?msg.from.first_name:''));
mas.push('msg.from.last_name=>>'+(msg.from.last_name?msg.from.last_name:''));
mas.push('msg.from.username=>>'+(msg.from.username?msg.from.username:''));
mas.push('msg.from.language_code=>>'+(msg.from.language_code?msg.from.language_code:''));
mas.push('msg.chat.id=>>'+(msg.chat.id?msg.chat.id:''));
mas.push('msg.chat.first_name=>>'+(msg.chat.first_name?msg.chat.first_name:''));
mas.push('msg.chat.last_name=>>'+(msg.chat.last_name?msg.chat.last_name:''));
mas.push('msg.chat.username=>>'+(msg.chat.username?msg.chat.username:''));
mas.push('msg.chat.type=>>'+(msg.chat.type?msg.chat.type:''));
mas.push('msg.date=>>'+(dateTime?dateTime:''));
mas.push('msg.text=>>'+(msg.text?msg.text:'')); 
// cl(mas) 
var columns=vals="";
for(i=0;i<mas.length;i++){
columns = columns +"`"+mas[i].split('=>>')[0]+"`,";
vals    = vals    +"'"+mas[i].split('=>>')[1]+"',";
} 
var columns = columns.slice(0, -1);
var vals    = vals   .slice(0, -1); 
var sql_msg = "INSERT IGNORE INTO telega.msg ("+columns+") VALUES ("+vals+")";
 // cl(sql_msg); cl("<sql_msg")


	  if(msg.chat.id==120855841){sendTelega(chatId,report);};
 if(sms.search('\/')>-1){
	 if(sms.search(/\/добавить (.+)/gim)>-1){		
		var sql = insertPhrase ("telega","phrases","phrase",sms.replace('\/добавить ',''));
	 }
	 else if (sms.search(/\/start/gim)>-1) { 
		sendTelegaOpt(chatId,"Приветствуем на нашем канале! Чтобы получить пословицу, просто напиши любое слово, в ответ получишь пословицу. Чтобы добавить свою пословицу, напиши: '/добавить' и через пробел свою пословицу. \nОтзывы и предложения пишите на почту: osetia-alania@mail.ru\nПриятного пользования ботом!",opts); 
		var sql = "INSERT IGNORE INTO telega.users (`user_id`,`first_name`,`last_name`,`username`,`language_code`,`date`)"
		+` VALUES ('${msg.from.id}', '${msg.from.first_name?msg.from.first_name:""}', '${msg.from.last_name?msg.from.last_name:""}', '${msg.from.username?msg.from.username:""}', '${msg.from.language_code?msg.from.language_code:""}', '${dateTime}')`;
		cl("=>отПриветствовали нового юзера!;");
	}
	 else{sendTelega(chatId,"Не верная команда!"); throw "Пытается команду ввести";}  
	 }
	 
else{var sql = selectKey ("telega","phrases","phrase",sms);}
// cl("===========msg>===========");cl(msg);cl("===========<msg============"); 
	var con = mysql.createConnection({
	  host: "localhost", //mars.lite-host.in
	  user: "root",
	  password: "Kostia22!",
	  database: "telega"
	});

  //=функция для подключения к БД;
	var connecting = (err,info) => {
	  if (err){cl('ОШИБКА ПРИ ПОДКЛЮЧЕНИИ к MySQL -> проверь данные подключения. Подробней тут => '); throw err;}
	  cl("\nПодключено к MySQL!");  // cl(info);  cl("< < === Конец инфы о подключении;");
	 con.query(sql_msg);
	 con.query(sql, func); // функция (тело) запроса;
	};
  
  var func = (err, result, fields) => {
    if (err) {cl("======>err=====>"); throw err;}
	 // cl("=>result=>");	 cl(result); //все варианты ответов из базы
	 cl(`Вариантов ответа------>${result.length}`);
  if(sql.search(new RegExp('insert','gim'))==-1){//при добавлении в базу - не отрпавлять ничего
	 if(result.length>0){
		 if(msg.chat.id==120855841){ph=`=======> Бот ответил в ${getTime()} <======= :\n`;}else{ph=""}
		 try{ var length = result.length;
			  var rand   = Math.round(Math.random()*(length));
			  var rand 	 = (rand==length)?rand-1:rand;
			  var res    = result[rand];
			  var phrs   = res.phrase
			 // ph=ph+result[rand].phrase;
			 ph = ph+phrs;		 
		 }catch(e){ph=` ph		=>	${ph}
						length	=>	${length}
						randNum	=>	${rand}
						res		=>	${res}
						phrs	=>	${phrs}
						ОШИБКА	=>	${e}`}
		cl(`=ОТПРАВИЛИ--->${ph}`)
		 sendTelegaOpt(chatId,ph,opts);//<=ПОСЛОВИЦА!
		 //ОЗВУЧКА 
			var test = 
			(ph.search(new RegExp('ъ','gim'))!=-1)
						||
			(ph.search(new RegExp('æ','gim'))!=-1)
						||
			(ph.search(new RegExp('дз','gim'))!=-1)
cl(`
Детект дз-->${ph.search(new RegExp('дз','gim'))}-->${(ph.search(new RegExp('дз','gim'))!=-1)}
Детект æ--->${ph.search(new RegExp('æ','gim'))}--->${(ph.search(new RegExp('æ','gim'))!=-1)}
Детект осетинского--->${test}`);  
		
		if(test){// if(ph.search(new RegExp('дз','gim'))==-1){ph = ph.replace(new RegExp('з','gim'),"ж")}else{}
			ph = ph.replace(/([^д])з/gmi,"ж").replace(new RegExp('дз','gim'),"з").replace(new RegExp('с','gim'),"ш").replace(new RegExp('æ','gim'), 'а')
		}
			var googleTTS = require('google-tts-api');
			googleTTS(ph, 'ru', 1)   // speed normal = 1 (default), slow = 0.24
			.then(function (url) {
				console.log(url); // https://translate.google.com/translate_tts?...
				bot.sendAudio(chatId, url);
			})
			.catch(function (err) {console.error(err.stack);});
		  

	 }else{
	 sendTelegaOpt(chatId, `${getTime()}; По фразе ${sms} ничего не найдено! (но это пока! - ты сам можешь добавить пословицу - просто набери команду /добавить и дальше просто пиши свою пословицу), например:\n /добавить Жил был дед да бабка. \n Да были у них колобок...`,  opts);
	 }
  }
  
  else if (sms.search(/\/start/gim)==-1) {
	  
	  sendTelegaOpt(chatId,`${getTime()}; Успешно добавлена в базу Ваша пословица:\n ${sms.replace('\/добавить ','')}\nТеперь Вы можете ее вызвать:)`,  opts);
  }
	// cl("=>fields=>закоментил"); cl(fields);  
};
 
con.connect(connecting,func);  
setInterval(function () {con.query('SELECT 1');}, 100000);
});
 
bot.on('polling_error', (error) => {
	cl('===========polling_error>>>>>>>===================='); cl(error.code);  // => 'EFATAL'
});

// var x=0;
// // function func() {x++;  bot.sendMessage(120855841,x+"*100ms");
// // }
// // setTimeout(func, 100); 

// setInterval(function(){
	// x++;var time = getTime();
    // console.log(time+"=>Итерация"+x)
	// bot.sendMessage(120855841,time+"=>Итерация"+x); 
// }, 200);
  
cl('==========>>>>>>>>>>>>END OF JS FILE<<<<<<<<<<<<<=') 
