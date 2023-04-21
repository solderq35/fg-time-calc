var mode = "add"; // default

// Takes a string in the form 'h:m:s.s', 'm:s.s', or 's' and converts to seconds
function stringToSeconds(timeString) {
  var timeSeparator = document.timeCalc.timeSeparator.value;
  var sign = 1; // -1 for negative number

  if (timeString == "") return 0;
  if (timeString.substring(0, 1) == "-") {
    sign = -1;
    timeString = timeString.substring(1, timeString.length);
  }
  var days = 0;
  var hr = 0;
  var mn = 0;
  var sec = 0;
  var frames = 0;
  var timeArray = timeString.split(timeSeparator);
  //alert(timeArray.length);
  switch (timeArray.length) {
    case 1:
      if (document.timeCalc.singleFormat[0].checked) {
        // days
        days = Number(timeArray[0]);
      } else if (document.timeCalc.singleFormat[1].checked) {
        // hr
        hr = Number(timeArray[0]);
      } else if (document.timeCalc.singleFormat[2].checked) {
        // min
        mn = Number(timeArray[0]);
      } else if (document.timeCalc.singleFormat[3].checked) {
        // sec
        sec = Number(timeArray[0]);
      } else {
        // frames
        frames = Number(timeArray[0]);
      }
      break;
    case 2:
      if (document.timeCalc.timeFormat[0].checked) {
        // days:hr
        days = Number(timeArray[0]);
        hr = Number(timeArray[1]);
      } else if (document.timeCalc.timeFormat[1].checked) {
        // hr:min
        hr = Number(timeArray[0]);
        mn = Number(timeArray[1]);
      } else if (document.timeCalc.timeFormat[2].checked) {
        // min:sec
        mn = Number(timeArray[0]);
        sec = Number(timeArray[1]);
      } else {
        // sec:frames
        sec = Number(timeArray[0]);
        frames = Number(timeArray[1]);
      }
      break;
    case 3:
      if (document.timeCalc.time3Format[0].checked) {
        // days:hr:min
        days = Number(timeArray[0]);
        hr = Number(timeArray[1]);
        mn = Number(timeArray[2]);
      } else if (document.timeCalc.time3Format[1].checked) {
        // hr:min:sec
        hr = Number(timeArray[0]);
        mn = Number(timeArray[1]);
        sec = Number(timeArray[2]);
      } else {
        // min:sec:frames
        mn = Number(timeArray[0]);
        sec = Number(timeArray[1]);
        frames = Number(timeArray[2]);
      }
      break;
    case 4:
      if (document.timeCalc.time4Format[0].checked) {
        // days:hr:min:sec
        days = Number(timeArray[0]);
        hr = Number(timeArray[1]);
        mn = Number(timeArray[2]);
        sec = Number(timeArray[3]);
      } else {
        // hr:min:sec:frames
        hr = Number(timeArray[0]);
        mn = Number(timeArray[1]);
        sec = Number(timeArray[2]);
        frames = Number(timeArray[3]);
      }
      break;
    case 5:
      days = Number(timeArray[0]);
      hr = Number(timeArray[1]);
      mn = Number(timeArray[2]);
      sec = Number(timeArray[3]);
      frames = Number(timeArray[4]);
      break;
  }
  //alert(hr + ", " + mn + ", " + sec + ", " + frames)
  //alert(sign * (hr*3600 + mn*60 + sec))
  return sign * (days * 86400 + hr * 3600 + mn * 60 + sec);
}

// Takes a string in the form 'h:m:s:f', 'm:s:f', 's:f' or 'f' and extract the frames
function stringToFrames(timeString) {
  var timeSeparator = document.timeCalc.timeSeparator.value;
  var sign = 1; // -1 for negative number

  if (timeString == "") return 0;
  if (timeString.substring(0, 1) == "-") {
    sign = -1;
    timeString = timeString.substring(1, timeString.length);
  }
  var frames = 0;
  var timeArray = timeString.split(timeSeparator);
  //alert(timeArray.length);
  switch (timeArray.length) {
    case 1:
      if (document.timeCalc.singleFormat[4].checked) {
        // f
        frames = Number(timeArray[0]);
      }
      break;
    case 2:
      if (document.timeCalc.timeFormat[3].checked) {
        // s:f
        sec = Number(timeArray[0]);
        frames = Number(timeArray[1]);
      }
      break;
    case 3:
      if (document.timeCalc.time3Format[2].checked) {
        // m:s:f
        frames = Number(timeArray[2]);
      }
      break;
    case 4:
      if (document.timeCalc.time4Format[1].checked) {
        // h:m:s:f
        frames = Number(timeArray[3]);
      }
      break;
    case 5:
      frames = Number(timeArray[4]);
      break;
  }
  //alert(hr + ", " + mn + ", " + sec + ", " + frames)
  //alert(sign * (hr*3600 + mn*60 + sec))
  return sign * frames;
}

// Takes an hr string, mn string, and sec string and converts to seconds
function stringToSeconds3(dayString, hrString, minString, secString) {
  return (
    Number(dayString) * 86400 +
    Number(hrString) * 3600 +
    Number(minString) * 60 +
    Number(secString)
  );
}

// Takes seconds and converts to h:m:s.s
function secondsToString(seconds, frames, displayFrames) {
  if (typeof seconds == "undefined") var seconds = 0;
  if (typeof frames == "undefined") var frames = 0;
  if (typeof displayFrames == "undefined") var displayFrames = 0;

  var myForm = document.timeCalc;
  var timeSeparator = document.timeCalc.timeSeparator.value;
  var sign = ""; // "-" for negative number

  if (seconds < 0) {
    sign = "-";
    seconds = -1 * seconds;
  }

  var days = Math.floor(seconds / 86400);
  var hr = Math.floor((seconds % 86400) / 3600);
  var mn = Math.floor((seconds % 3600) / 60);
  //var mn = Math.floor(seconds/60)%60
  var sec = round3(seconds % 60);
  var timeString = "";

  //if (myForm.outputFormat[0].checked || myForm.outputFormat[2].checked || myForm.outputFormat[5].checked) {
  //	var timeString = "" + sec
  //else if (myForm.outputFormat[1].checked || myForm.outputFormat[4].checked) {
  //	var timeString = "" + mn
  //else
  //	var timeString = "" + hr
  //}

  if (myForm.outputFormat[0].checked || myForm.outputFormat[1].checked) {
    // days:hr:min:sec:frames or days:hr:min:sec
    if (days > 0) {
      // d,h,m,s are all non-blank
      timeString = days + timeSeparator;
      if (hr >= 10) timeString = timeString + hr + timeSeparator;
      else timeString = timeString + "0" + hr + timeSeparator;
      if (mn >= 10) timeString = timeString + mn + timeSeparator;
      else timeString = timeString + "0" + mn + timeSeparator;
      if (sec >= 10) timeString = timeString + sec;
      else timeString = timeString + "0" + sec;
    } else if (hr > 0) {
      // days is blank, h,m,s are non-blank
      timeString = hr + timeSeparator;
      if (mn >= 10) timeString = timeString + mn + timeSeparator;
      else timeString = timeString + "0" + mn + timeSeparator;
      if (sec >= 10) timeString = timeString + sec;
      else timeString = timeString + "0" + sec;
    } else if (mn > 0) {
      // days and hrs are blank, m,s are non-blank
      timeString = mn + timeSeparator;
      if (sec >= 10) timeString = timeString + sec;
      else timeString = timeString + "0" + sec;
    } else timeString = sec; // days, hrs and min are blank
  } else if (myForm.outputFormat[2].checked || myForm.outputFormat[4].checked) {
    // hr:min:sec:frames or hr:min:sec
    // days aren't shown, so merge days into hours
    hr = days * 24 + hr;
    if (hr > 0) {
      // d is blank; h,m,s are all non-blank
      timeString = hr + timeSeparator;
      if (mn >= 10) timeString = timeString + mn + timeSeparator;
      else timeString = timeString + "0" + mn + timeSeparator;
      if (sec >= 10) timeString = timeString + sec;
      else timeString = timeString + "0" + sec;
    } else if (mn > 0) {
      // days and hr are blank, m,s are non-blank
      timeString = mn + timeSeparator;
      if (sec >= 10) timeString = timeString + sec;
      else timeString = timeString + "0" + sec;
    } else timeString = sec; // days, hrs and min are blank
  } else if (myForm.outputFormat[3].checked) {
    // day:hr:min
    // sec aren't shown, so merge seconds into minutes
    mn = mn + round3(sec / 60.0);
    if (days > 0) {
      // d,h,m are all non-blank; s not shown
      timeString = days + timeSeparator;
      if (hr >= 10) timeString = timeString + hr + timeSeparator;
      else timeString = timeString + "0" + hr + timeSeparator;
      if (mn >= 10) timeString = timeString + mn + timeSeparator;
      else timeString = timeString + "0" + mn + timeSeparator;
    } else if (hr > 0) {
      // days is blank; h,m are non-blank; s not shown
      timeString = hr + timeSeparator;
      if (mn >= 10) timeString = timeString + mn + timeSeparator;
      else timeString = timeString + "0" + mn + timeSeparator;
    } else timeString = mn;
  } else if (myForm.outputFormat[6].checked) {
    // days:hr
    // min & sec aren't shown, so merge minutes & seconds into hours
    hr = hr + mn / 60.0;
    hr = round3(hr + sec / 3660.0);
    if (days > 0) {
      if (hr >= 10) timeString = days + timeSeparator + hr;
      else timeString = days + timeSeparator + "0" + hr;
    } else timeString = hr;
  } else if (myForm.outputFormat[7].checked) {
    // hr:min
    // days & sec aren't shown, so merge days into hours & merge seconds into minutes
    hr = days * 24 + hr;
    mn = mn + round3(sec / 60.0);
    if (hr > 0) {
      if (mn >= 10) timeString = hr + timeSeparator + mn;
      else timeString = hr + timeSeparator + "0" + mn;
    } else timeString = mn;
  } else if (myForm.outputFormat[5].checked || myForm.outputFormat[8].checked) {
    // min:sec or min:sec:frames
    // days,hr aren't shown, so merge days & hr into minutes
    mn = days * 1440 + mn;
    mn = hr * 60 + mn;
    if (mn > 0) {
      if (sec >= 10) timeString = mn + timeSeparator + sec;
      else timeString = mn + timeSeparator + "0" + sec;
    } else timeString = sec;
  } else if (myForm.outputFormat[10].checked) {
    // days
    timeString = round3(seconds / 86400);
  } else if (myForm.outputFormat[11].checked) {
    // hr
    timeString = round3(seconds / 3600);
  } else if (myForm.outputFormat[12].checked) {
    // min
    timeString = round3(seconds / 60);
  } else if (myForm.outputFormat[9].checked) {
    // sec
    timeString = round3(seconds);
  } else {
    // frames
    timeString = round3(seconds);
  }
  if (displayFrames) {
    if (frames >= 10) timeString = timeString + timeSeparator + frames;
    else timeString = timeString + timeSeparator + "0" + frames;
  }
  return sign + timeString;
}

function round2(myNumber) {
  return Math.floor(Math.round(myNumber * 100)) / 100;
}

function round3(myNumber) {
  return Math.floor(Math.round(myNumber * 1000)) / 1000;
}

function saveData() {
  var params = [];
  for (i = 1; i <= 40; i++) {
    // Save times
    val = eval("document.timeCalc.time" + i + ".value");
    if (val != "") {
      //  && !isNaN(val)
      params[params.length] = "t" + i + "=" + val;
    }
    // Save comments
    val = eval("document.timeCalc.comments" + i + ".value");
    if (val != "") {
      params[params.length] = "c" + i + "=" + encodeURI(val);
    }
  }
  // Save options
  if (document.timeCalc.plusMinusMode[0].checked == 1)
    params[params.length] = "mode=0";
  if (document.timeCalc.plusMinusMode[1].checked == 1)
    params[params.length] = "mode=1";
  if (document.timeCalc.singleFormat[0].checked == 1)
    params[params.length] = "fs0=1";
  if (document.timeCalc.singleFormat[1].checked == 1)
    params[params.length] = "fs1=1";
  if (document.timeCalc.singleFormat[2].checked == 1)
    params[params.length] = "fs2=1";
  if (document.timeCalc.singleFormat[3].checked == 1)
    params[params.length] = "fs3=1";
  if (document.timeCalc.singleFormat[4].checked == 1)
    params[params.length] = "fs4=1";
  if (document.timeCalc.timeFormat[0].checked == 1)
    params[params.length] = "ft0=1";
  if (document.timeCalc.timeFormat[1].checked == 1)
    params[params.length] = "ft1=1";
  if (document.timeCalc.timeFormat[2].checked == 1)
    params[params.length] = "ft2=1";
  if (document.timeCalc.timeFormat[3].checked == 1)
    params[params.length] = "ft3=1";
  if (document.timeCalc.time3Format[0].checked == 1)
    params[params.length] = "f3t0=1";
  if (document.timeCalc.time3Format[1].checked == 1)
    params[params.length] = "f3t1=1";
  if (document.timeCalc.time3Format[2].checked == 1)
    params[params.length] = "f3t2=1";
  if (document.timeCalc.time4Format[0].checked == 1)
    params[params.length] = "f4t0=1";
  if (document.timeCalc.time4Format[1].checked == 1)
    params[params.length] = "f4t1=1";
  params[params.length] =
    "d=" + encodeURI(document.timeCalc.timeSeparator.value);
  if (document.timeCalc.outputFormat[0].checked == 1)
    params[params.length] = "o0=1";
  if (document.timeCalc.outputFormat[1].checked == 1)
    params[params.length] = "o1=1";
  if (document.timeCalc.outputFormat[2].checked == 1)
    params[params.length] = "o2=1";
  if (document.timeCalc.outputFormat[3].checked == 1)
    params[params.length] = "o3=1";
  if (document.timeCalc.outputFormat[4].checked == 1)
    params[params.length] = "o4=1";
  if (document.timeCalc.outputFormat[5].checked == 1)
    params[params.length] = "o5=1";
  if (document.timeCalc.outputFormat[6].checked == 1)
    params[params.length] = "o6=1";
  if (document.timeCalc.outputFormat[7].checked == 1)
    params[params.length] = "o7=1";
  if (document.timeCalc.outputFormat[8].checked == 1)
    params[params.length] = "o8=1";
  if (document.timeCalc.outputFormat[9].checked == 1)
    params[params.length] = "o9=1";
  if (document.timeCalc.outputFormat[10].checked == 1)
    params[params.length] = "o10=1";
  if (document.timeCalc.outputFormat[11].checked == 1)
    params[params.length] = "o11=1";
  if (document.timeCalc.outputFormat[12].checked == 1)
    params[params.length] = "o12=1";
  if (document.timeCalc.outputFormat[13].checked == 1)
    params[params.length] = "o13=1";
  if (document.timeCalc.outputFormat[14].checked == 1)
    params[params.length] = "o14=1";
  //if (document.timeCalc.fractionType.checked == 1) params[params.length] = 'fps=100'
  else if (!isNaN(document.timeCalc.fps.value))
    params[params.length] = "fps=" + document.timeCalc.fps.value;

  if (params.length == 0) var url = baseUrl;
  else var url = baseUrl + "?" + params.join("&");

  //prompt('URL should be copied to clipboard if you are on PC. If you are on mobile device, copy the URL here: ',url);

  /* Alert the copied text */
  alert("Original Run Link Copied to Clipboard");

  document.getElementById("myInput").value = url;

  var copyText = document.getElementById("myInput");
  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  //navigator.clipboard.writeText(url);

  /* Copy Data (longer to work on mobile) */
  var oldContentEditable = myInput.contentEditable,
    oldReadOnly = myInput.readOnly,
    range = document.createRange();

  myInput.contentEditable = true;
  myInput.readOnly = false;
  range.selectNodeContents(myInput);

  var s = window.getSelection();
  s.removeAllRanges();
  s.addRange(range);

  myInput.setSelectionRange(0, 999999); // A big number, to cover anything that could be inside the element.

  myInput.contentEditable = oldContentEditable;
  myInput.readOnly = oldReadOnly;

  document.execCommand("copy");

  finalurl = url;
  //console.log(finalurl);
  return finalurl;
}

function clearFields() {
  for (i = 1; i <= 40; i++) {
    eval("document.timeCalc.time" + i + '.value = ""');
  }
  for (i = 1; i <= 40; i++) {
    eval("document.timeCalc.cumtime" + i + '.value = ""');
    eval("document.timeCalc.comments" + i + '.value = ""');
  }
  document.timeCalc.timeMin.value = "";
  document.timeCalc.timeMax.value = "";
  document.timeCalc.timeAvg.value = "";
  document.timeCalc.timeTotal.value = "";
  document.timeCalc.timeMin2.value = "";
  document.timeCalc.timeMax2.value = "";
  document.timeCalc.timeAvg2.value = "";
  document.timeCalc.timeTotal2.value = "";

  document.timeCalc.time1.focus();
}

function addSeconds(sec1, sec2) {
  //, fps) {
  //if (typeof fps == "undefined") var fps = 1;
  if (isNaN(sec1)) return sec2;
  if (isNaN(sec2)) return sec1;
  //if (fps2 == 100) {
  //	return sec1 + sec2;
  //}
  // else {
  // Add the fractions
  //alert(''+fps+' fps');
  var aArray = sec1.toString().split(".");
  var bArray = sec2.toString().split(".");
  if (aArray.length < 2) aArray[1] = 0;
  if (bArray.length < 2) bArray[1] = 0;
  if (aArray[1].length < 2) aArray[1] = aArray[1] + "0";
  if (bArray[1].length < 2) bArray[1] = bArray[1] + "0";
  //alert(aArray[0] + ', ' + aArray[1] + ', ' + bArray[0] + ', ' + bArray[1]);
  var tempTotal2 = parseInt(aArray[1]) + parseInt(bArray[1]);
  //alert(''+aArray[0] +', '+bArray[0]);
  //var tempTotal3 = parseInt(aArray[0]) + parseInt(bArray[0]) + Math.floor(tempTotal2/fps2);
  var tempTotal3 = parseInt(aArray[0]) + parseInt(bArray[0]);
  //var frames = tempTotal2%fps2;
  //if (frames < 10) frames = '0' + frames.toString();
  //alert(tempTotal3.toString()+'.'+frames);
  //return(tempTotal3.toString()+'.'+frames);
  return tempTotal3.toString();
  //}
}

// Returns the value of the first selected radio button, else returns nil
function selectedRadioValue(radioGroupObj) {
  // eg. document.mainForm.myRadioName
  //var radioGroupObj = document.getElementsByName(radioName);
  for (var i = 0; i < radioGroupObj.length; i++) {
    if (radioGroupObj[i].checked) {
      return radioGroupObj[i].value;
    }
  }
  return nil;
}

function changeMode() {
  if (document.timeCalc.plusMinusMode[0].checked) mode = "add";
  else mode = "sub";
  addTimes();
}

function addTimes() {
  var prevTotalTime = 0;
  var prevTotalFrames = 0;
  var totalTime = 0;
  var totalFrames = 0;
  var minsec = 0;
  var maxsec = 0;
  var minFrames = 0;
  var maxFrames = 0;
  var count = 0;
  var seconds = 0;
  var frames = 0;
  var origSeconds = 0;
  var origFrames = 0;
  var timeString = "";
  var timeSeparator = document.timeCalc.timeSeparator.value;
  var fps = document.timeCalc.fps.value;
  if (fps == "" || isNaN(fps)) fps = 0;
  else fps = parseInt(fps);
  //if (isNaN(fps) || document.timeCalc.fractionType.checked == 1) fps = 100;

  // Display the outputFormat
  outFormat = selectedRadioValue(document.timeCalc.outputFormat).replace(
    /:/g,
    timeSeparator
  );
  writeLayer("totalFormatDisplay", "&nbsp;" + outFormat + "&nbsp;");
  writeLayer("outputFormatDisplay", "&nbsp;" + outFormat + "&nbsp;");
  writeLayer(
    "inputFormatDisplay",
    //'&nbsp;' + 'd:h:m:s:f'.replace(/:/g,timeSeparator) + '&nbsp;<br/>' +
    "&nbsp;" +
      selectedRadioValue(document.timeCalc.time4Format).replace(
        /:/g,
        timeSeparator
      ) +
      "&nbsp;<br/>" +
      "&nbsp;" +
      selectedRadioValue(document.timeCalc.time3Format).replace(
        /:/g,
        timeSeparator
      ) +
      "&nbsp;<br/>" +
      "&nbsp;" +
      selectedRadioValue(document.timeCalc.timeFormat).replace(
        /:/g,
        timeSeparator
      ) +
      "&nbsp;<br/>" +
      "&nbsp;" +
      selectedRadioValue(document.timeCalc.singleFormat).replace(
        /:/g,
        timeSeparator
      ) +
      "&nbsp;"
  );

  //Do frames get displayed?
  if (
    document.timeCalc.outputFormat[0].checked ||
    document.timeCalc.outputFormat[2].checked ||
    document.timeCalc.outputFormat[5].checked ||
    document.timeCalc.outputFormat[9].checked ||
    document.timeCalc.outputFormat[14].checked
  ) {
    var displayFrames = true;
  } else {
    var displayFrames = false;
  }

  if (
    (document.timeCalc.time4Format[1].checked == 1 ||
      document.timeCalc.time3Format[2].checked == 1 ||
      document.timeCalc.timeFormat[3].checked == 1 ||
      document.timeCalc.singleFormat[4].checked == 1 ||
      displayFrames) && // frames were selected
    (document.timeCalc.fps.value == "" || document.timeCalc.fps.value < 1)
  ) {
    alert("Please specify frames-per-second > 0");
    document.timeCalc.fps.focus();
    return;
  }

  for (i = 1; i <= 40; i++) {
    myValue = eval("document.timeCalc.time" + i + ".value");
    seconds = origSeconds = stringToSeconds(myValue);
    frames = origFrames = stringToFrames(myValue);
    //alert('sec1: '+seconds);
    //alert('frames1: '+frames);
    if (fps > 0) {
      seconds = seconds + Math.floor(frames / fps);
      //alert('sec2: '+seconds);
      frames = frames % fps;
    }
    if (i == 1) {
      minsec = origSeconds;
      maxsec = origSeconds;
      minFrames = origFrames;
      maxFrames = origFrames;
    }
    eval("document.timeCalc.sec" + i + ".value = seconds");

    if (mode == "add") {
      // mode = add
      totalFrames = totalFrames + frames;
    } else {
      // mode = subtract
      if (i == 1) totalFrames = frames;
      else totalFrames = totalFrames - frames;
    }
    if (fps > 0 && totalFrames >= fps) {
      //alert('totalFrames (' + totalFrames + ') are over fps (' + fps + ')');
      seconds = seconds + Math.floor(totalFrames / fps);
      //alert('sec2: '+seconds);
      totalFrames = totalFrames % fps;
    }

    if (seconds == 0 && (frames == 0 || !displayFrames)) {
      eval("document.timeCalc.cumtime" + i + '.value = ""');
    } else {
      if (mode == "add") {
        // mode = add
        totalTime = totalTime + seconds;
      } else {
        // mode = subtract
        if (i == 1) totalTime = seconds;
        else totalTime = totalTime - seconds;
      }
      //totalTime = addSeconds(totalTime, seconds, fps);

      //if (isNaN(totalTime)) totalTime = 0;
      //alert('TotalTime:' + totalTime + ', totalFrames:' + totalFrames + ', displayFrames:' + displayFrames);
      timeString = secondsToString(totalTime, totalFrames, displayFrames);
      eval("document.timeCalc.cumtime" + i + ".value = timeString");
      //eval('document.timeCalc.cumtime'+i+'.value = totalTime');
      //minsec = Math.min(minsec, seconds);
      //maxsec = Math.max(maxsec, seconds);
      if (origSeconds <= minsec) {
        if (origSeconds < minsec || origFrames <= minFrames) {
          minFrames = origFrames;
        }
        minsec = origSeconds;
      }
      if (origSeconds >= maxsec) {
        if (origSeconds > maxsec || origFrames >= maxFrames) {
          maxFrames = origFrames;
        }
        maxsec = origSeconds;
      }
      //alert(origSeconds+' seconds; '+frames+' frames; '+minsec+' minsec; '+minFrames+' minFrames');
      count = count + 1;
    }
    //alert(stringToSeconds(myValue) + ' secs, ' + stringToFrames(myValue)+ ' frames @ ' + fps + ' fps == ' + seconds + ' seconds, ' + frames + ' frames\n' +
    //	  totalTime + ' total seconds, ' + totalFrames + ' total frames\n' +
    // 	  'formatted (displayFrames=' + displayFrames + '): ' + secondsToString(totalTime, totalFrames, displayFrames) +
    // 	  '\nmin:'+minsec+':'+minFrames);
    prevTotalTime = totalTime;
    prevTotalFrames = totalFrames;
  }

  if (count > 0) {
    document.timeCalc.timeMin.value = document.timeCalc.timeMin2.value =
      secondsToString(minsec, minFrames, displayFrames);
    document.timeCalc.timeMax.value = document.timeCalc.timeMax2.value =
      secondsToString(maxsec, maxFrames, displayFrames);
    document.timeCalc.timeAvg.value = document.timeCalc.timeAvg2.value =
      secondsToString(totalTime / count, totalFrames / count, displayFrames);
  } else {
    document.timeCalc.timeMin.value = document.timeCalc.timeMin2.value = "";
    document.timeCalc.timeMax.value = document.timeCalc.timeMax2.value = "";
    document.timeCalc.timeAvg.value = document.timeCalc.timeAvg2.value = "";
  }
  document.timeCalc.timeTotal.value = document.timeCalc.timeTotal2.value =
    secondsToString(totalTime, totalFrames, displayFrames);
  //setTimeFromSec(totalTime, 0)
  //alert('total frames: ' + totalFrames);
}

function checkKeyPress(nextFieldName, evt) {
  var charCode = navigator.appName == "Netscape" ? evt.which : evt.keyCode;
  if (charCode == 13) {
    // 13 = enter/return
    eval("document.timeCalc." + nextFieldName + ".focus()"); //Go to next field
  } else if (charCode == 67) {
    // 67 = Shift-C
    clearFields();
    return false;
  }
  return true;
}

function secToMins(sec) {
  return sec / 60.0;
}

function secToHours(sec) {
  return sec / 3600.0;
}

function minsToSec(mn) {
  return mn * 60.0;
}

function hoursToSec(hr) {
  return hr * 3600.0;
}

function changeFT(radioObj) {
  // change FractionType (Decimal)
  if (radioObj.checked) {
    document.timeCalc.fps.value = "";
    fps = 100;
  }
  addTimes();
}

function changeFps(textObj) {
  if (isNaN(textObj.value)) {
    alert("Frames per second must be a number");
    textObj.value = "";
    //document.timeCalc.fractionType.checked = true;
    document.timeCalc.fps.focus();
  } else {
    //document.timeCalc.fractionType.checked = false;
    fps = textObj.value;
  }
  addTimes();
}

function writeLayer(layerID, txt) {
  if (document.getElementById) {
    document.getElementById(layerID).innerHTML = txt;
  } else if (document.all) {
    document.all[layerID].innerHTML = txt;
  } else if (document.layers) {
    with (document.layers[layerID].document) {
      open();
      write(txt);
      close();
    }
  }
}

//	var myDate = new Date(2000, 0, 0)
//	myDate.setSeconds
//	alert(myDate.toString())

var fps = 100; // decimal by default
var baseUrl;
function initPage() {
  // Parse url parameters
  var param, num, val;
  var queryIndex = window.location.href.indexOf("?");
  var params = window.location.href.substring(queryIndex + 1).split("&");
  if (queryIndex < 0) baseUrl = window.location.href; // no '?' found in url
  else baseUrl = window.location.href.substring(0, queryIndex);
  if (typeof mode == "undefined") var mode = "add"; // default
  for (i = 0; i < params.length; i++) {
    param = params[i].split("=");
    if (param[0].substr(0, 1) == "t") {
      // if t1 - t40, then restore it's time value
      num = param[0].substring(1);
      if (num != "" && !isNaN(num)) {
        eval("document.timeCalc.time" + num + '.value="' + param[1] + '"');
      }
    } else if (param[0].substr(0, 1) == "c") {
      // Restore comments
      num = param[0].substring(1);
      if (num != "" && !isNaN(num)) {
        eval(
          "document.timeCalc.comments" +
            num +
            '.value="' +
            decodeURI(param[1]) +
            '"'
        );
      }
    } else if (param[0].substr(0, 3) == "f4t") {
      // Four-value time format
      num = param[0].substring(3);
      if (num != "" && !isNaN(num)) {
        eval("document.timeCalc.time4Format[" + num + "].checked=1");
      }
    } else if (param[0].substr(0, 3) == "f3t") {
      // Three-value time format
      num = param[0].substring(3);
      if (num != "" && !isNaN(num)) {
        eval("document.timeCalc.time3Format[" + num + "].checked=1");
      }
    } else if (param[0].substr(0, 2) == "ft") {
      // Two-value time format
      num = param[0].substring(2);
      if (num != "" && !isNaN(num)) {
        eval("document.timeCalc.timeFormat[" + num + "].checked=1");
      }
    } else if (param[0].substr(0, 2) == "fs") {
      // One-value time format
      num = param[0].substring(2);
      if (num != "" && !isNaN(num)) {
        eval("document.timeCalc.singleFormat[" + num + "].checked=1");
      }
    } else if (param[0] == "d") {
      // Time delimiter
      eval(
        'document.timeCalc.timeSeparator.value ="' + decodeURI(param[1]) + '"'
      );
    } else if (param[0].substr(0, 1) == "o") {
      // output format
      num = param[0].substring(1);
      if (num != "" && !isNaN(num)) {
        eval("document.timeCalc.outputFormat[" + num + "].checked=1");
      }
    } else if (param[0] == "fps") {
      // frames/second
      num = param[1]; // fps
      if (num != "" && !isNaN(num)) {
        //if (num == 100) document.timeCalc.fractionType.checked = 1

        //else {
        //document.timeCalc.fractionType.checked = 0;
        document.timeCalc.fps.value = num;
        fps = num;
        //}
      }
    } else if (param[0] == "mode") {
      // PlusMinusMode
      num = param[1]; // mode index
      if (num == 0) {
        mode = "add";
        document.timeCalc.plusMinusMode[0].checked = true;
        document.timeCalc.plusMinusMode[1].checked = false;
      } else if (num == 1) {
        mode = "sub";
        document.timeCalc.plusMinusMode[0].checked = false;
        document.timeCalc.plusMinusMode[1].checked = true;
      }
    }
  }

  window.focus();
  addTimes();
  document.timeCalc.time1.focus();
  return true;
}
