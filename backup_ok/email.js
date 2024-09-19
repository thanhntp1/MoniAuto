const axios = require('axios');
var sidToken = '';
var checkSuccess = false;

// async function callAPI(endpoint, params) {
//   const baseUrl = 'https://api.guerrillamail.com/ajax.php';
//   let sidToken = '';
//   var checkSuccess = false;
//     return fetch(`${baseUrl}/${endpoint}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(params)
//     }).then(response => response.json());
//   }
  
  function isFromMonica(emailAddress) {
      return emailAddress === "noreply@monica.im";
  }
  
  function extractVerificationCode(emailContent) {
      const match = emailContent.match(/\b(?!00000)\d{6}\b/);
      return match ? match[0] : null;
  }
  
  //Hàm gọi API
  async function callAPI(f, params = {}) {
    const baseUrl = 'https://api.guerrillamail.com/ajax.php';
    const response = await axios.get(baseUrl, {
      params: {
        f: f,
        ...params,
        ip: '127.0.0.1',
        agent: 'Mozilla_foo_bar',
        sid_token: sidToken
      }
    });
    return response.data;
  }

  // 1. Tạo email mới
  async function createEmail() {
    const result = await callAPI('get_email_address', { lang: 'en' });
    sidToken = result.sid_token;
    emailAddress = result.email_addr;
    //console.log(`Email được tạo: ${emailAddress}`);
    return result;
  }

  // 2. Đặt tên email
  async function setEmailName(name, sid_token) {
    const result = await callAPI('set_email_user', { email_user: name });
    sidToken = result.sid_token;
    emailAddress = result.email_addr;
    //console.log(`Email được đặt tên: ${emailAddress}`);
    return result;
  }

  // 3. Đọc email đến
  async function checkEmail(sid_token, checkSuccess) {
    const result = await callAPI('check_email', { seq: 0, sid_token: sid_token });
    if (result.count > 0) {
        for (const email of result.list) {
            if (isFromMonica(email.mail_from)) {
                console.log(`- From: ${email.mail_from}`);
                console.log(`  Subject: ${email.mail_subject}`);
                console.log(`  Date: ${email.mail_date}`);

                // Đọc nội dung email
                const emailContent = await callAPI('fetch_email', {sid_token: sid_token ,email_id: email.mail_id });

                // Sử dụng function để trích xuất mã
                const verificationCode = extractVerificationCode(emailContent.mail_body);

                if (verificationCode) {
                    console.log("Mã xác thực là:", verificationCode);
                    // Đọc email thành công
                    checkSuccess = true;
                    //console.log(checkSuccess);
                    return verificationCode;
                } else {
                    console.log("Không tìm thấy mã xác thực trong email.");
                    return null;
                }
            }
        }
    } else {
        console.log('Email xác minh chưa tới.');
    }
  }

  async function getCodeVerification(sid_token) {
	  let code = "";
    // Kiểm tra email 3 lần, mỗi lần cách nhau 14 giây
    for (let i = 0; i < 2; i++) {
        console.log(`Kiểm tra lần ${i + 1}:`);
        if (!checkSuccess) {
			await new Promise(resolve => setTimeout(resolve, 14000));
			code = await checkEmail(sid_token, checkSuccess);
        }
		else
			return code;
    }
  }

module.exports = {
    createEmail,
    setEmailName,
    getCodeVerification
};