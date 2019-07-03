//find urls in string and make clickable
//http://stackoverflow.com/questions/37684/how-to-replace-plain-urls-with-links
function cmcLinkUrls(strToLink) {
	if (strToLink != null) {    
		
		var strLinked, strRegexPat1, strRegexPat2;
		
		//strLinked = strToLink;
		//return strLinked;

		//URLs starting with http://, https://
		strRegexPat1 = /(\b(https?|):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
		strLinked = strToLink.replace(strRegexPat1, '<a href="$1">$1</a>');

		//URLs starting with "www." (without // before it, or it'd re-link the ones done above).
		strRegexPat2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
		strLinked = strLinked.replace(strRegexPat2, '$1<a href="http://$2" target="_blank">$2</a>');
		
		return strLinked;
	    
	}
	return '';
}
