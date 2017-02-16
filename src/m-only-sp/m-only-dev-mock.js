let fId = '267804853344286';
let gId = '349499265168-d1v1pe2chuv137r8vdhbr82s953ialv3.apps.googleusercontent.com';
let callbackUrl = '//google.com';
let lwpUrl = '//google.com';
let co_ui = {};
let showRememberMe = false;
let omnitureData = {};
let relogin = 'false';
let loginData = {};

let initData = () => {
	co_ui.amount = "100";
	co_ui.mid = "zg0S39VAXwfFua";
	co_ui.name = "Prerna";
	co_ui.email = "dalela@gmail.com";
	co_ui.mobile = "8888888888";
	co_ui.channel = "WEB";
	co_ui.logoURL = "/assets/images/merchantLogo.png";
	co_ui.registerTabMessage = "Your Account Does not Exist";
	co_ui.merchantName = "Name of the Merchant Maximum character allowed is 14, 25, 30, 40, 60 as per the screen size";
	co_ui.campaignText = 'Hello';
	co_ui.requestType = 'C2CAddnPay';
	loginData.otpId = 'hasd-hjds-aa13-sad1-34rfsdsfdf3';
	loginData.isUserExistsData = '' + 'false' + '';
	loginData.isUserExists = true;
	if (loginData.isUserExistsData != undefined) {
		if (loginData.isUserExistsData != null) {
			if (loginData.isUserExistsData.toString().toLowerCase() == 'false') {
				loginData.isUserExists = false;
			}
		}
	}
	relogin = (relogin == 'true');
	if (relogin) {
		loginData.name = '';
		loginData.emailOrPhone = '';
		loginData.emailId = '';
		loginData.mobileNumber = parseInt('');
	} else {
		co_ui.mobile = parseInt(co_ui.mobile);
		loginData.emailOrPhone = co_ui.mobile;
		if (co_ui.email) {
			loginData.emailOrPhone = co_ui.email;
		}
		loginData.name = co_ui.name;
		loginData.emailId = co_ui.email;
		loginData.mobileNumber = co_ui.mobile;
	}
	loginData.activeTab = 'otp';
}

export let bindContext = (context) => {
  initData();
  console.log(`its ${process.env.NODE_ENV} env, attaching some mock data with context: `, context);
  context.fId = fId;
  context.gId = gId;
  context.callbackUrl = callbackUrl;
  context.lwpUrl = lwpUrl;
  context.co_ui = co_ui;
  context.showRememberMe = showRememberMe;
  context.omnitureData = omnitureData;
  context.relogin = relogin;
  context.loginData = loginData;
}
