function loadSearch(){
   var xR = new XMLHttpRequest();
   xR.onload = function() {
	 setData(xR.responseText);
   };
   Lang = document.getElementById("LangSelect").value;
   Qry = document.getElementById("Query").value;
   Lmt = document.getElementById("Limit").value;
   url =  "https://"+document.getElementById("LangSelect").value+".wikipedia.org";
   url = url + "/w/rest.php/v1/search/title?q="+Qry+"&limit="+Lmt;
   xR.open("GET", url, true);
   xR.send();
}

function setData(resTxt){
   res = JSON.parse(resTxt);
   res = res["pages"];
   BBox = document.getElementById("boundbox");
   BBox.innerHTML = '';
   DivItm = document.createElement('div');
   DivItm.setAttribute('class','lstitem');
   DivItm.innerHTML = "Results";
   BBox.appendChild(DivItm);
   for(i=0;i<res.length;i++){
      createItm(res[i], BBox);
   }
   Qry = document.getElementById("Query").value;
   DivItm = document.createElement('div');
   DivItm.setAttribute('class','item');
   DivTxt = document.createElement('div');
   DivTxt.setAttribute('class','txtbox');
   DivItm.appendChild(DivTxt);
   DivSub = document.createElement('div');
   DivSub.setAttribute('class','subtxt');
   InHTML  = '<a href = ';
   InHTML += '"https://'+document.getElementById("LangSelect").value;
   InHTML +='.wikipedia.org/w/index.php?search='+Qry+'&title=Special:Search&profile=advanced&fulltext=1&ns0=1">';
   InHTML += 'Search for pages containing <i>' + Qry + '</i>';
   DivSub.innerHTML = InHTML;
   DivTxt.appendChild(DivSub);
   BBox.appendChild(DivItm);
   DivItm = document.createElement('div');
   DivItm.setAttribute('class','lstitem');
   BBox.appendChild(DivItm);
}

function createItm(res, BBox){
   DivItm = document.createElement('div');
   DivItm.setAttribute('class','item');
   if(res['thumbnail']){
      DivImg = document.createElement('div');
      DivImg.setAttribute('class','imgbox');
      ImgTag = document.createElement('img');
      ImgTag.setAttribute('src','http:'+res['thumbnail']['url']);
      DivImg.appendChild(ImgTag);
      DivItm.appendChild(DivImg);
      ImgTag.setAttribute('class','itmimg');
   }
   DivTxt = document.createElement('div');
   DivTxt.setAttribute('class','txtbox');
   DivItm.appendChild(DivTxt);

   DivHdr = document.createElement('div');
   DivHdr.setAttribute('class','header');
   DivHdr.innerHTML = res["title"];
   DivTxt.appendChild(DivHdr);

   DivSub = document.createElement('div');
   DivSub.setAttribute('class','subtxt');
   DivSub.innerHTML = res['description'];
   DivTxt.appendChild(DivSub);

   DivClr = document.createElement('div');
   DivClr.setAttribute('style','clear: both;');
   BBox.appendChild(DivItm);
   BBox.appendChild(DivClr);

}
