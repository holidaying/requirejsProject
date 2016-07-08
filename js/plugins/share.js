define(['config','authorize_userinfo','share'],function()
{
	window['shaketv'] && shaketv.wxShare(share_img, share_title, share_desc, getUrl(openid));	
})
