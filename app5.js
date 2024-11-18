const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  else if( num == 3 ) luck = '小吉'
  else if( num == 4 ) luck = '末吉'
  else if( num == 5 ) luck = '凶'
  else if( num == 6 ) luck = '大凶'
res.render( 'luck', {number:num, luck:luck} );
});

app.get("/jyanken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win ) || 0;
  let total = Number( req.query.total ) || 0;
  let probability = Number( req.query.probability ) || 0;
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  let judgement = '';
  if (num == 1) {
    if (hand == 'パー') {
      judgement = '勝ち';
    } else if (hand == 'グー') {
      judgement = 'あいこ';
    } else judgement = '負け'
  } else if (num == 2) {
    if (hand == 'グー') {
      judgement = '勝ち';
    } else if (hand == 'チョキ') {
      judgement = 'あいこ';
    } else judgement = '負け'
  } else if (num == 3) {
    if (hand == 'チョキ') {
      judgement = '勝ち';
    } else if (hand == 'パー') {
      judgement = 'あいこ';
    } else judgement = '負け'
  }
  // 勝敗に応じたカウント  
  if (judgement == '勝ち') {
    win += 1;
  }
  total += 1;
  //　 勝率を追加
  probability = (win / total) * 100;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total,
    probability: probability
  }
  res.render( 'jyanken', display );
});

app.get("/kuufuku", (req, res) => {
  const value = req.query.range;
  let change = '';
  console.log('あなたの空腹度は' + value + 'です');
  if ( value>=80 ){
    change = '全部マシマシ'
  }else if ( value>20 && value<80){
    change = 'そのまま';
  }else {
    change = '少なめ'
  }
  res.render( 'kuufuku', { range: value, change:change }); // range に value を渡す
});

app.get("/jirou", (req, res) => {
  console.log(req.query);  // コンソールに表示
  
  let selected = req.query.selected;

  // コールの選択肢を確認
  if (selected == '1') {
    res.render('jirou', { filename: "./public/jirou.jpg", alt: "Jirou sokuname" });
  } else if (selected == '2') {
    res.render('jirou', { filename: "./public/jirou1.jpg", alt: "Jirou sonomama" });
  } else if (selected == '3') {
    res.render('jirou', { filename: "./public/jirou2.jpg", alt: "Jirou zenmashi" });
  } else {
    res.render('jirou', { filename: "./public/default.jpg", alt: "Default" });
  }
  });
app.listen(8080, () => console.log("Example app listening on port 8080!"));
