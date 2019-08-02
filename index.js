const request = require('request');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');
var cron = require('node-cron');

const mobilesales_URL = 'https://www.ptt.cc/bbs/mobilesales/index.html';
const crontab_period = 60 * 5;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'qqaz50313@gmail.com',
    pass: '',
  },
});

let task = cron.schedule('*/5 * * * *', () => {
  console.log('running every 5 minute');
  request(mobilesales_URL, mobilesales);
});
task.start();
// request(mobilesales_URL, mobilesales);

function mobilesales(error, response, body) {
  let $ = cheerio.load(body);
  let post_length = $('.title').length;
  let post_list = $('.title a').map((index, obj) => {
    if (index < post_length - 3) {
      let timestamp = parseInt($(obj).attr('href').substr(19, 10));
      return {
        title: $(obj).text(),
        url: "https://www.ptt.cc" + $(obj).attr('href'),
        timestamp: timestamp,
      }
    }
    return
  }).get()

  post_list = post_list.filter(isIphone7);
  // console.log(post_list);
  sendMail(post_list);
}

function isIphone7(post) {
  let within_crontab_period = post.timestamp > (Date.now() / 1000 - crontab_period);
  if (within_crontab_period) {
    return !!post.title.match(/(iphone)/i) && !!post.title.match(/7/i);

;
  }
}

function sendMail(list) {
  let list_length = list.length;
  if (!list_length) {
    console.log("沒有新文章！！");
    return
  }
  console.log("寄送信件中...");
  const mailOptions = {
    from: 'qqaz50313@gmail.com',
    to: 'qqaz50313@gmail.com',
    subject: list[list_length - 1].title,
    text: list[list_length - 1].url,
  };
  // console.log(mailOptions);
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


function sliceStr(str, index) {
  let strReplace = str.replace(/\s/g, "");
  return strReplace.slice(0, strReplace.indexOf("搜尋同標題文章"))
}
