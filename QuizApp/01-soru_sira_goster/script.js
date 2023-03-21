/*
Bir web uygulaması yapmak için aşağıdaki adımlar uygulanır.
1-HTML ve Css kullanarak web uygulamasının örnek bir kalıbı çıkarılır(Tasarımı yapılır.)
2-Web uygulaması içerisinde gösterilecek olan veriler için model oluşturulur.(Object-Oriented mantığı, diziler,object veya object-dizisi kullanılır.)
	Bizim projemizde object oriented mantığı kullanacağız.
3- 2.adımda oluşturulan veriler 1.adımda oluşturulan kalıp kullanarak ekranda gösterilir. Bunun için gerekli kodlar yazılır.
4- Kulllanıcı ile etkileşim(Mouse tıklaması butona tıklaması vb.) yapılarak js kodları ile 2.adımda oluşturulan veriler güncellenerek 1.adımda oluşturulan html css kalıbı üzerinde gösterilir.



1.soru: Quiz App sorusu ve cevabı başta görünmesin.
style.css içerisinde gizli classı oluşturulup display:none dedik ve index7.html içinde card bulunduğu classa birde gizli class özelliği ekledik.

2.soru: Sorular için bir veri modeli oluştur.


*/

function Soru(soru_metni,secenekler,dogru_cevap){
	// soru metni string olacak. Örnek: js nedir?
	// seçenekler object olacak. Örnek: {a:"a seçeneği",b:"b seçeneği",c:"c seçeneği",d:"d seçeneği"}
	// doğru cevap ise string olacak. Örnek: c
	this.soru_metni  = soru_metni;
	this.secenekler  = secenekler;
	this.dogru_cevap = dogru_cevap;
}

Soru.prototype.cevabi_kontrolEt = function(cevap){
	let sonuc;
	if(cevap==this.dogru_cevap){
		sonuc = true;
	}
	else{
		sonuc = false;
	}
	return sonuc;
}

soru_dizisi=[
	new Soru(
		"Full Stack Web için gerekli olanlar",
		{a:"Node.js",b:"Typescript",c:"Npm",d:"Nuget"},
		"c"),
	
  new Soru(
		"Back-End Web için gerekli olanlar",
		{a:"Npm",b:"Node.js",c:"Nuget",d:"Typescript"},
		"b"),

	new Soru(
		"Front-End Web için gerekli olanlar",
		{a:"Npm",b:"Nuget",c:"Typescript",d:"Node.js"},
		"d"),

  new Soru(
		"Dev Oops Web için gerekli olanlar",
		{a:"Npm",b:"Node.js",c:"Nuget",d:"Typescript"},
		"a"),

	new Soru(
		"Deep Learning için gerekli olanlar",
		{a:"Node.js",b:"Nuget",c:"Dfa",d:"Ndfa"},
		"b")
];

/*
Buraya kadar sorular için veri modeli oluşturduk ve bu modele soru nesnesi dedik.
Daha sonra 5 tane sorudan oluşan bir dizi oluştuduk. 
Şimdi bu soruları Quiz nesnesi adı altında bir model oluşturalım.
*/

function Quiz(sorular){
	this.sorular = sorular;
	this.soru_index = 0;
    this.dogru_cevap_sayisi = 0;
}

q = new Quiz(soru_dizisi);  


Quiz.prototype.soruGetir = function(){
	return this.sorular[this.soru_index];
}

/*
Görev: Start Quiz butonuna tıkl. soru kartı gösterilsin ve ilk soru soru kartının içerisinde gösterilsin.
Çözüm: 1.adım: Butona tıkl. ilk olarak divin hidden özelliği yok edilir.
       2.adım: SoruGöster diye fonk. tanımlanıp bu fonk içinde Quizden çekilen bir soru soru kartının içinde gösterilir.
			 3.adım: Butona tıklama olayında 2.adımda oluşturulan SoruGöster fonk. çağırılır.
*/

document.getElementById("dh-start-quiz-id").addEventListener("click",function(){
		document.getElementById("card-id").classList.remove("gizli"); 
	// Start-Quiz butonuna tıklandığında card-ın başlangıçta clası gizli idi. biz cardın id özelliğini belirleyip
	// onun silinmesini sağlayarak butona bsıldığında gizli olmamasını sağladık.

    document.getElementById("dh-start-quiz-id").classList.add("hide");
    document.getElementById("dh-sorular-id").classList.add("goster");
    q.dogru_cevap_sayisi = 0;
	SoruGoster(q.soruGetir());
});


var secenek_list; //1
function SoruGoster(soru){
  	document.getElementById("dh-soru-id").innerHTML = `<h4><span id="dh-soru-no-id">${q.soru_index+1}</span>. ${soru.soru_metni}</h4>`;
	  document.getElementById("dh-secenekler-id").innerHTML = "";
	for(let s in soru.secenekler){
		let secenek;
		secenek = `<div class="dh-secenek">
									<span><b>${s}</b>:${soru.secenekler[s]}</span>
				 					<div class="icon">
									</div>
								</div>`;
		document.getElementById("dh-secenekler-id").insertAdjacentHTML("beforeend",secenek);
	}
	
	secenek_list = document.querySelectorAll(".dh-secenek");
	console.log(secenek_list); // 1
	for(let s of secenek_list){ // 2
		s.setAttribute("onclick","secenekTikla(this)"); // 2.1
	}
	document.getElementById("dh-sonraki-soru-id").classList.remove("goster"); //5.2
	siraSayisiGoster(q.soru_index+1,q.sorular.length);
    document.getElementById("dh-dogru-cevap-sayisi-id").innerHTML = `Doğru : ${q.dogru_cevap_sayisi}`;
}


var dogru_icon  = 	'<i class="fa-solid fa-check"></i>';
var yanlis_icon =    '<i class="fa-solid fa-xmark"></i>';
function secenekTikla(secenek){ // Bu fonksiyon içinde cevabı kontrol edeceğiz. // 3
	let tiklanan_secenek;
	tiklanan_secenek = secenek.children[0].children[0].innerText;
	console.log(tiklanan_secenek); //3.1
	
	let soru = q.soruGetir(); // 3.2
	if(soru.cevabi_kontrolEt(tiklanan_secenek)){ //3.2
		console.log("Cevap Doğru"); //3.2
		secenek.classList.add("dogru"); //3.2
		secenek.children[1].innerHTML = dogru_icon; // 4 // icon için children[1]
        q.dogru_cevap_sayisi+=1;
	}
	else{
		console.log("Cevap Yanlış"); //3.3
		secenek.classList.add("yanlis"); //3.3
		secenek.children[1].innerHTML = yanlis_icon; // 4 // icon için chilren[1]
	}
	for(let s of secenek_list){ //3.4
		s.classList.add("disabled"); // 3.4
	}
	document.getElementById("dh-sonraki-soru-id").classList.add("goster"); //5.3
	
}

function siraSayisiGoster(soru_index,soru_sayisi){
    document.getElementById("question-index-id").innerHTML = `${soru_index}/${soru_sayisi}`;
}


/*
Buraya kadar startQuiz butonuna tıklanıldığında ilk soru gösterildi. Bundan sonra sonraki soru butonuna tıklanıldığında bir sonraki sorunun gösterilmesi için soruGöster fonksiyonu bir sonraki soru ile çağırılır. Bunun için gerekli adımlar aşağıdaki gibidir.
1- Sonraki soru adımında bir fonkiyon tanımlanır. Bu fonksiyon sonraki soru butonuna tıkl. çağırılır. Fonk için aşağıdaki kodlar yazılır.
	1.1 Sorunun index numarası soru sayısına eşitse(Son soru gösteriliyorsa) consola Quiz bitti yaz.
  1.2 Sorunun index numarası son sorudan küçükse (soru sayısından küçük ise)
		sorunun index numarası bir artırılır.
		Quizden bir soru getirilir ve soruGöster fonksiyonu çağırılır.
*/

document.getElementById("dh-sonraki-soru-id").addEventListener("click",function(){
	if(q.soru_index==q.sorular.length-1){
		console.log("Quiz Bitti");
	}
	else{
		q.soru_index+=1;
		SoruGoster(q.soruGetir());
	}
});


/*
Cevap seçeneklerinin kontrolü için gerekli adımlar: (Kod yazmaya soruGöster fonk başla.)
1- Soruların tüm seçeneklerini bir listede tut.(secenek list), secenek-list tüm fonk. geçerli olsun diye global değişken olsun.
2- For döngüsü ile secenek-listi gez.
	2.1 Her bir secenek objesine onclick metodu ekle.(Her bir seçeneğe tıklanma fonk ekle.)
 	2.2 Tıklanma fonk. parametre olarak seçeneğin kendisini gönder.
3- 2.1 adımında eklenen fonksiyon içinde cevabı kontrol et.
	3.1 Tıklanan seçeneğin hangi harf olduğunu bul.
  3.2 Doğru ise seçeneğe doğru clası ekle. Böylece arka planı yeşil olacak.
	3.3 Yanlış ise seçeneğe yanlış clası ekle. ""    ""   ""    kırmızı olacak.
  3.4 Tüm seçeneklere bir daha tıklanma olmasın diye disabled clası ekle.
		3.4.1 style.css içerisine disabled clası ekle.
		3.4.2 bu clası for döngüsü ile tüm seçeneklere ekle.
4- Cevabın doğru ya da yanlış olmasına göre seçeneklerde iconların gösterilmesi.
5- Sonraki soru butonu başlangıçta ve seçenekler seçilmeden gösterilmesin, seçeneklerden herhangi biri seçilince gösterilsin.
	5.1 Başlangıçta gösterilmemesi için css kuralı ekle.
  5.2 Sonraki soru butonunun gösterilmesi için css kuralı ekle.(goster)
	5.3 SoruGöster fonk. içinde goster clasını sil. Böylece soru gizlenmiş olsun.
 	5.4 Herhangi bir seçenek seçildiğinde goster clasını ekle. Böylece soru gizlilikten gösterilmeye dogru geçmiş olsun.
	5.5 Sonraki buton için transform transition animasyon ekle.
*/



/* A: Soru Sırasının Gösterilmesi için yapılacak olanlar.  */
/*
Sistemin çalışmasını gözden geçirelim varsa iyileştirmeler yapalım.
Ekranda startQuiz butonu ve Quiz App kartı aynı anda gösteriliyor. Oysaki başlangıçta ekranda sadece StartQuiz butonu olsun.
Bu butona tıklayınca QuizApp kartı gösterilsin. StartQuiz butonu gizlensin. Bunun için hem StartQuiz hem QuizApp kartı için bir goster bir gizle diye style tanımlamamız lazım.(Sonraki Soru butonunda yaptığımız gibi.)

A.1: style8.css de startQuiz butonu için göster ve gizli styleri ekle. index.htmlde classı dh-start-quiz-btn adında class tanımladık.
Ondan sonra style.css içinde dh-start-quiz-btn.goster ve.gizle biçimleri adı altında styler tanımladık.
A.2: Start-Quiz buton fonk. tıklanma fonksiyonunda startQuiz butonunun claslistesine gizliyi ekle. ekledim ve dh-start-quiz btn gizlisi eklendi.
A.3: style.csse QuizApp kartı için gizli ve goster style ekle. Bunu yaparken QuizApp kartının normal css kuralı gizli olsun goster kuralı gösterecek şekilde ayarlansın. dh-sorular .dh-sorular.goster kısmı (style8.css de)

B: Şimdi Sorular arasında gezinirken hangi soruda olduğumuzu gösterecek şekilde yeni bir özellik ekleyelim.
B.1: Sonraki Sayfa buton sağa çekilip sol tarafına sırasayısını gösterecek şekilde bir metin ekleyelim. İlk önce sonraki sayfa butonu olan kısımda divi card body içeren kısımlara iki tane daha div ekledik. Question-index ve next-btn-div. Sonra ise card-body olduğu kısma bir de footer clası ekledik ve style içinde bunlara özellik vererek buton ile yan yana gelmesini sağladık.
B.2: Sıra sayısı göster adında bir fonksiyon tanımlayalım.
	B.2.1: Fonksiyonun adı siraSayisiGoster() olsun.
 	B.2.2: Bu fonksiyon kaçıncı soruda olduğumuzu ve toplam soru sayısını parametre olarak alsın.
	B.2.3: İlgili div içerisine erişip sorusırasını ve sorusayısını bu div içerisine yazsın.
 	B.2.4: Bu fonksiyon soruGoster fonk. içinde çağırılsın.

B.3 : Sorunun başına soru numarasını yazalım?
    B.3.1: Soru başlığı yazan dive erişmek için ona bir id verelim.
    B.3.2: SoruGöster fonk. içinde bu id'e erişip sorumetninden önce sorunoyu yaz.
*/


/*  en sonunda bölünecek. OOPLarın tamamı bittikten sonra en sonunda bölme işlemi yapılacak.
C: Şimdi sırada kodları hiyerarşik olarak farklı farklı bölmek var. Bunun amacı şudur. Script.js içerisine çok fazla kod yazdığımız zaman bu kodların bakım yapılması değiştirilmesi zorlaşmaktadır. Bu nedenle mantıksal olarak birbiri ile ilişkili kodları farklı dosyalara bölmek en mantıklı yoldur. 
C.1: soru.js adında bir dosya oluştur.
C.1.1: bu dosyanın içine soru constructurunu prototype ve sorular dizisini al.
C.1.2: script.js dosyasından alınan kodları sil.
C.1.3: soru.js dosyasını index.html script.js dosyasının çağırıldığı yerin öncesinde çağır.
C.1.4: Web sayfası eskisi gibi çalışıyor mu diye test et. Hata var mı diye test et. Hata varsa hataları gider.
*/


/*
D: Skor Bilgisi Göster 
    D.1: Quiz constructor içerisinde doğrucevap sayısı adında bir değişken tanımla.
    D.2: Doğru cevap sayısı değişkenini StartQuiz butonuna tıklayınca sıfırla.
    D.3: secenekTikla fonksiyonunda cevap doğru ise doğrucevap sayısı değişkenini 1 artır.
    D.4: doğrucevapsayısı değişkenini QuizApp yanında açılan div içerisinde göster.
        D.4.1: QuizApp divinin sağ tarafında yeni bir div ekle.
        D.4.2: Bu dive erişmek için id ekle.
        D.4.3: Bu dive erişip içerisine doğrucevap sayısını yaz.(SoruGöster fonksiyonunda.)
        
E: Şimdi de her bir soruyu takip edebileceğimiz bir yan panel ekleyelim.
    E.1: Yan panele sorusayısı kadar numaralandırılmış kutucuk ekleyelim.
    E.2: Her bir soru işaretlendiğinde yan paneldeki ilgili soru doğru ya da yanlış olsun.
    E.3: Yan paneldeki herhangi bir soru numarasına tıklanıldığında o soru gösterilmiş olsun.     

*/
