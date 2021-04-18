const cron = require('node-cron');
const moment = require("moment");
const readlineSync = require('readline-sync')

function getTime() {
    const waktu = moment().format("h:mm:ss");
    return waktu;
  }

  const menu = ['Autolike + Auto Follow', 'Auto Tinggalkan Jejak', 'Auto Unfollow']
  const index  = readlineSync.keyInSelect(menu, 'Choice ?');

  switch(index){
    case 0 :
        console.log(`[${getTime()}] Cron berjalan Setiap jam **:00`)
        cron.schedule('0 * * * *',()=>require('./complete'))
        break;
    case 1:
        console.log(`[${getTime()}] Cron berjalan Setiap 5 menit`)
        cron.schedule('*/1 * * * *',()=>require('./viewTimeline'))
        break;
    case 2:
        console.log(`[${getTime()}] Cron berjalan Setiap jam **:00`)
        cron.schedule('0 * * * *',()=>require('./complete'))
        break;
    default:
        console.log(`[${getTime()}] Menu tidak terdaftar`)
        process.exit()
        break;
  }