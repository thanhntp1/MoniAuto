const puppeteer = require('puppeteer');
const path = require ('path');
const fs = require('fs');
const email = require('./email');
const http = require('http');
const httpProxy = require('http-proxy');

const arrayHo = ['Vĩnh ','Chu ','Nguyễn ','Nguyễn ','Nguyễn ','Dặng ','Lý ','Huỳnh ','Hồ ','Ngư ','Nguyễn ','Bùi ','Dương ','dinh ','Phí ','Doãn ','Hoàng ','Nguyễn ','Trương ','Triệu ','Mạch ','Dỗ ','Tôn ','Ngô ','Vũ ','Phạm ','Tạ ','Lý ','Nghiêm '];
const arryaTen= ['Giang','Cương','Xuân','Nhật','Thái ','Bảo','Tấn',' Quý','Anh Tài','Hữu','Khánh An','Kiến Ðức','Hữu Hùng','Quốc Hạnh','Hoàng Khải','Hồng Thụy','Hoài Phong','Phúc Hòa','Hữu Cường','Triều Thành','Huy Quang','Thiên Hưng','Thụy Miên','Ân Lai','Minh Kỳ','Quảng Dạt','Phương Nam','Lâm Trường','Phú Hùng','Hải Bằng'];
const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36';
const extensionPath = path.join(process.cwd(), '5.10.5_0');

const proxyList = [
  '104.207.51.48:3128',
  '104.207.38.2:3128',
  '104.167.27.247:3128',
  '104.167.26.25:3128',
  '104.167.28.245:3128',
  '104.167.24.146:3128',
  '104.207.60.156:3128',
  '104.207.51.191:3128',
  '104.207.62.157:3128',
  '104.207.34.222:3128',
  '104.207.40.242:3128',
  '104.207.60.82:3128',
  '104.207.37.179:3128',
  '104.167.26.47:3128',
  '104.207.51.203:3128',
  '104.167.25.68:3128',
  '104.207.54.55:3128',
  '104.207.62.223:3128',
  '104.207.62.216:3128',
  '104.207.59.117:3128',
  '104.207.39.195:3128',
  '104.207.37.9:3128',
  '104.207.56.221:3128',
  '104.207.51.121:3128',
  '104.167.25.183:3128',
  '104.207.57.204:3128',
  '104.207.37.199:3128',
  '104.207.49.232:3128',
  '104.207.49.246:3128',
  '104.207.51.17:3128',
  '104.207.45.88:3128',
  '104.207.41.91:3128',
  '104.207.33.120:3128',
  '104.167.31.25:3128',
  '104.207.58.2:3128',
  '104.207.57.49:3128',
  '104.167.29.126:3128',
  '104.207.56.88:3128',
  '104.207.35.156:3128',
  '104.207.41.193:3128',
  '104.207.45.97:3128',
  '104.207.48.61:3128',
  '104.207.56.152:3128',
  '104.207.52.130:3128',
  '104.207.39.69:3128',
  '104.207.38.218:3128',
  '104.207.39.181:3128',
  '104.207.53.182:3128',
  '104.207.38.179:3128',
  '104.207.59.77:3128',
  '104.207.57.150:3128',
  '104.207.54.174:3128',
  '104.207.63.86:3128',
  '104.167.28.252:3128',
  '104.207.47.89:3128',
  '104.207.59.174:3128',
  '104.207.59.242:3128',
  '104.207.42.157:3128',
  '104.207.46.171:3128',
  '104.167.28.95:3128',
  '104.207.39.35:3128',
  '104.207.49.229:3128',
  '104.207.41.68:3128',
  '104.207.42.169:3128',
  '104.207.58.157:3128',
  '104.207.50.166:3128',
  '104.167.31.213:3128',
  '104.207.36.73:3128',
  '104.167.30.189:3128',
  '104.207.47.32:3128',
  '104.207.45.156:3128',
  '104.207.40.4:3128',
  '104.207.60.78:3128',
  '104.207.39.157:3128',
  '104.167.25.136:3128',
  '104.207.63.149:3128',
  '104.207.38.85:3128',
  '104.207.54.149:3128',
  '104.207.39.225:3128',
  '104.167.31.234:3128',
  '104.207.48.170:3128',
  '104.207.58.102:3128',
  '104.207.52.107:3128',
  '104.207.50.123:3128',
  '104.207.33.202:3128',
  '104.207.48.58:3128',
  '104.207.33.205:3128',
  '104.207.54.2:3128',
  '104.207.43.234:3128',
  '104.207.42.64:3128',
  '104.207.42.117:3128',
  '104.207.47.185:3128',
  '104.207.42.191:3128',
  '104.207.48.213:3128',
  '104.207.47.216:3128',
  '104.207.37.16:3128',
  '104.207.40.17:3128',
  '104.207.49.2:3128',
  '104.207.40.29:3128',
  '104.207.62.239:3128'
];
const port = 8000;


const mailDomain = [
  "guerrillamail.com",
  "guerrillamail.info",
  "grr.la",
  "guerrillamail.biz",
  "guerrillamail.de",
  "guerrillamail.net",
  "guerrillamail.org",
  "pokemail.net",
  "sharklasers.com"
];

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function change_alias(alias) {
    var str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,"_");
    str = str.replace(/\s+/g,"_");
    str = str.trim(); 
    return str;
}

function getRandomAccount(ho,ten){
	
	return change_alias(ho+ten)+getRandomArbitrary(230,1200);
}

async function openAndClick(page, refUrl) {
try {
	//const page = await browser.newPage();
    //page.setDefaultTimeout(180000);
    const settingUrl = 'https://monica.im/sign-up?utm_source=invitation_download&redirectTo=https%3A%2F%2Fmonica.im%2Fadd-to-browser%3Fsource%3Dinvitation_download';
    const logoutUrl = 'https://monica.im/api/user/logout';
    // Khởi tạo email
    newEmail = await email.createEmail();
    sid_token = newEmail.sid_token;
    //diaChiEmail = newEmail.email_addr;
    //console.log(`Email được tạo: ${diaChiEmail}`);
    //console.log(`Token: ${sid_token}`);
    
    // Tạo account ngẫu nhiên từ họ và tên
    var ho 		= arrayHo[Math.floor(Math.random() * arrayHo.length)];
	var ten  	= arryaTen[Math.floor(Math.random() * arryaTen.length)];
	var account = getRandomAccount(ho,ten);
    // Đặt tên email
    const eAccount = await email.setEmailName(account, sid_token);
    sid_token = eAccount.sid_token;
	diaChiEmail = eAccount.email_addr;
	
	//Đổi tên miền email để tránh trùng domain
	const randomDomain = mailDomain[Math.floor(Math.random() * mailDomain.length)];
	const emailDangKyMonica = diaChiEmail.replace(/@.*$/, '@' + randomDomain);

    console.log(`Email được tạo: ${diaChiEmail}`);
    console.log(`Email đăng ký: ${emailDangKyMonica}`);
    console.log(`Họ tên: ${ho + ten}`);
    console.log(`Token: ${sid_token}`);
    // Điều hướng đến URL refs
    await page.goto(refUrl);
	
    await page.waitForSelector('.monica-btn--TH1fg', {timeout: 2000});
	

	
    // Click vào phần tử với CSS path thứ nhất
    await page.goto(settingUrl, { waitUntil: 'networkidle2' });
    await page.waitForSelector('.Button_icon__Uz0O6', {timeout: 3000});
    // Click vào phần tử với CSS path thứ hai
    const buttons = await page.$$('.Button_icon__Uz0O6');
    if (buttons.length > 1) {
        await buttons[1].click();
    } else {
        console.log('Không tìm thấy nút thứ hai với CSS path .Button_icon__Uz0O6');
    }
    //Chờ cho trang tải xong (nếu cần)
    await page.waitForSelector('.SignUpWithEmail_action-btn__-sipw');
    await page.bringToFront();
	//await page.mouse.click(getRandomArbitrary(100,654), getRandomArbitrary(100,654), 1);
	// sử dụng puppeteer để điền thông tin vào form email, mật khẩu và họ tên
	await page.type('.SignUpWithEmail_form-item__VnfIH:first-child input', `${emailDangKyMonica}`,{delay: 100}); // Điền email 
	await page.type('.SignUpWithEmail_form-item__VnfIH:nth-child(2) input', '123456a@',{delay: 500}); // Điền mật khẩu
	const duplicateEmail = await page.waitForSelector('.SignUpWithEmail_link-btn__FM2xi', {timeout: 2000}).catch(() => null);
    if(duplicateEmail === null){
        
        await page.type('.SignUpWithEmail_form-item__VnfIH:nth-child(3) input', `${ho + ten}`,{delay: 200}); // Điền họ tên
        await delay(3000);
        await page.click('.SignUpWithEmail_action-btn__-sipw'); // submit
        //Chờ cho trang tải xong (nếu cần)
        await page.waitForNavigation(); 
    } else {
        console.log('Email đã tồn tại');
        return;
    }
    // Đọc email đến và lấy mã xác nhận
    var verificationCode = await email.getCodeVerification(sid_token);
    // điền mã xác nhận vào ô input có css path là xxx và nhấn xác nhận
    await page.type('.Input_input-addon-after__GjGKC input', `${verificationCode}`,{delay: 100}); // Điền mã xác nhận
    await delay(2000);
    await page.click('.Button_monica-btn__sZwiq'); // submit
    await page.waitForNavigation();

    // Lưu trữ thông tin tài khoản (email, mật khẩu) vào file account.txt
    const refCode = new URL(refUrl).searchParams.get('c');
    const data = `${refCode}:${emailDangKyMonica}:123456a@ \n`;
    fs.appendFileSync('account.txt', data);
    console.log('Đã lưu tài khoản vào file account.txt');


    await delay(5000);
    // đăng xuất
    await page.goto(logoutUrl, { waitUntil: 'networkidle2' });

} catch (error) {
    console.error('Đã xảy ra lỗi:', error);
} finally {
    
}
}

function delay (ms){
	return new Promise(resolve => setTimeout(resolve, ms));
} 

async function repeatOpenAndClick(url, times) {
	//Tạo server proxy
	//const server = createProxyRotator(proxyList, url);
	//server.listen(port, () => {
	//  console.log(`Proxy rotator đang chạy trên port ${port}`);
	//});
	
	// Khởi tạo trình duyệt
    let browser;
    browser = await puppeteer.launch({ headless: false , args: [
        'protocolTimeout: 120000',
		'--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--user-agent='+ua,
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`
    ]});

    await delay(5000);
    const page = await browser.newPage();
    page.setDefaultTimeout(180000);
	//============script xóa các tab khác
	//Lấy tất cả các trang (tabs) hiện tại
    const pages = await browser.pages();

    // Nếu có hơn 1 tab
    if (pages.length > 1) {
		// Lưu tab cuối cùng (giả sử đây là tab hiện tại)
		const currentPage = pages[pages.length - 1];

		// Đóng tất cả các tab khác
		for (let i = 0; i < pages.length - 1; i++) {
		  await pages[i].close();
		}
		console.log(`Đã đóng ${pages.length - 1} tab, chỉ còn lại 1 tab hiện tại.`);
    }
	
	//============End script xóa các tab khác
    for (let i = 0; i < times; i++) {
        console.log(`\n\n ------------------------------------`);
        console.log(`Lần thực hiện thứ ${i + 1}`);
        await openAndClick(page,url);
        await delay(getRandomArbitrary(5000,10000));
    }
    // Đóng trình duyệt
    await browser.close();
}

function createProxyRotator(proxyList, targetUrl) {
  // Tạo một proxy server
  const proxy = httpProxy.createProxyServer({});
  
  // Biến đếm để theo dõi proxy hiện tại
  let currentProxyIndex = 0;

  // Tạo server HTTP
  const server = http.createServer((req, res) => {
    // Lấy proxy tiếp theo trong danh sách
    const currentProxy = proxyList[currentProxyIndex];
    
    // Cập nhật index cho lần tiếp theo
    currentProxyIndex = (currentProxyIndex + 1) % proxyList.length;

    console.log(`Sử dụng proxy: ${currentProxy}`);

    // Cấu hình cho proxy hiện tại
    const target = {
      target: targetUrl,
      changeOrigin: true,
      headers: {
        host: targetUrl.replace(/^https?:\/\//, ''),
      },
      proxyTimeout: 30000, // Timeout sau 30 giây
      timeout: 30000,
    };

    // Thêm proxy vào target nếu có
    if (currentProxy) {
      const [host, port] = currentProxy.split(':');
      target.proxy = {
        host: host,
        port: port
      };
    }

    // Thực hiện proxy request
    proxy.web(req, res, target, (err) => {
      if (err) {
        console.error('Lỗi proxy:', err);
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end('Có lỗi xảy ra khi kết nối với proxy');
      }
    });
  });

  // Xử lý lỗi proxy
  proxy.on('error', (err, req, res) => {
    console.error('Lỗi proxy:', err);
    res.writeHead(500, {
      'Content-Type': 'text/plain'
    });
    res.end('Có lỗi xảy ra khi kết nối với proxy');
  });

  return server;
}

// Sử dụng function


// Gọi hàm với URL cho trước
//mrnobita.gs 						= HBTSWA0R
//mrhainam.sg 						= XRYVCNVK
//chinguyen.qtkd1 					= ILAKL1P3
//ta_bao554@guerrillamailblock.com 	= 3KJJFF0T

repeatOpenAndClick('https://monica.im/invitation?c=ILAKL1P3',10);


