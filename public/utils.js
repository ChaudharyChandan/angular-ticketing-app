Date.prototype.getAgo = function(dString){
	var utcOffset,offsetSplitChar;
	var offsetMultiplier=1;var dateTime=dString.split("T");
	var date=dateTime[0].split("-");
	var time=dateTime[1].split(":");
	var offsetField=time[time.length- 1];
	var offsetString,offsetFieldIdentifier;
	offsetFieldIdentifier=offsetField.charAt(offsetField.length- 1);
	if(offsetFieldIdentifier=="Z"){
	utcOffset=0;
	time[time.length- 1]=offsetField.substr(0,offsetField.length- 2);
	}else{
	if(offsetField[offsetField.length- 1].indexOf("+")!=-1){
		offsetSplitChar="+";
		offsetMultiplier=1;
	} else{
		offsetSplitChar="-";offsetMultiplier=-1;
	}
	offsetString=offsetField.split(offsetSplitChar);
	time[time.length- 1]==offsetString[0];
	offsetString=offsetString[1].split(":");
	utcOffset=(offsetString[0]*60)+ offsetString[1];
	utcOffset=utcOffset*60*1000;
	}
	this.setTime(Date.UTC(date[0],date[1]- 1,date[2],time[0],time[1],time[2])+(utcOffset*offsetMultiplier));
	var diff=(((new Date()).getTime()- this.getTime())/ 1000),
	day_diff=Math.floor(diff/86400),
	month_diff = Math.floor(diff/2592000);
	if(isNaN(day_diff)||day_diff<0) return;
	var z = day_diff==0 && (diff<60&&"Just now" || diff<120 && "1 minute ago" || diff<3600 && Math.floor(diff/60)+" minutes ago" || diff<7200 && "1 hour ago" || diff<86400&&Math.floor(diff/3600)+" hours ago") || day_diff==1&&"Yesterday" || day_diff<7&&day_diff+" days ago" || day_diff<30&&Math.ceil(day_diff/7)+" weeks ago" || month_diff<2 && "1 month ago" || month_diff<12 && month_diff+" months ago" || month_diff<13 && "1 year ago" || Math.floor(month_diff/12)+" years ago";
	return z;
};