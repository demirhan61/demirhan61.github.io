var mod = "ekle";
var deger=2;
var task_count=2;
document.getElementById("button1").addEventListener("click",function(){
	if(mod=="ekle"){
		let ul = document.getElementById("list1");
  	let mtn = document.getElementById("text1").value;             
		deger++;
  	let li = 		`<li class="list-group-item dh-list-task-item" id="dh-task${deger}">
	
								<div class="dh-form-check">
									 <input type="checkbox" class="form-check-input" id="checkbox${deger}" onclick="updateSelected('checkbox${deger}','dh-lbl${deger}')">
										<label for="checkbox${deger}" class="form-label" id="dh-lbl${deger}">${mtn}</label>
								 </div>	
				 
									<div class="operations">
										<button class="btn btn-danger me-2" onclick="deleteTask('dh-task${deger}')">
											<i class="fa-solid fa-trash "></i>
					 					</button>
					 
					          <button class="btn btn-primary" onclick="updateTask('dh-lbl${deger}')">
											<i class="fa-solid fa-pen-to-square"></i>
										</button>
									</div>
							</li>`;	

		ul.insertAdjacentHTML("beforeend",li);
  	task_count++;
		document.getElementById("dh-task-count").innerText =task_count.toString();
		document.getElementById("text1").value="";
	}
	else if(mod=="edit"){
    //                                                     demirhan
		document.getElementById(editedId).innerText = document.getElementById("text1").value;
		document.getElementById("text1").value ="";
    console.log("Güncellenen Label:",editedId);
		mod = "ekle";
	}
  
});

var editedId;

document.getElementById("text1").addEventListener("keypress",function(event){	
if(event.key=="Enter"){	
	document.getElementById("button1").click();
	event.preventDefault();
}
	
});

function deleteTask(id){
	document.getElementById(id).remove();
	task_count--;
	document.getElementById("dh-task-count").innerText =task_count.toString();
}

function updateTask(id){ // güncelleme kodu.
	console.log(document.getElementById(id).innerText);
	document.getElementById("text1").value = document.getElementById(id).innerText;
	mod = "edit";
	editedId = id;
  console.log("Güncellenecek Label:",editedId);
}

function deleteAllTask(){
	document.getElementById("list1").innerHTML="";
	task_count=0;
	document.getElementById("dh-task-count").innerHTML = task_count.toString();
}

/*
Görev 1: İşaretlenen görevlerin üzeri çizili olsun.

Çözüm: 1-> (+) Herbir görevin tıklanma olayına bir fonksiyon ekle.
			 2-> Bu fonksiyon içinde görev tıklandı mı tıklanmadı mı algılama
		Eğer görev seçili ise üzeri çizili olsun 
		değilse normal yazı olsun.
	
(+)	Yan Görev: Üzeri çizili olması için bir style tanımla.
*/

function updateSelected(checkbox_id,label_id){
	console.log("Tıklanıldı.");
	console.log(document.getElementById(checkbox_id).checked);
	
	if(document.getElementById(checkbox_id).checked){
		console.log("Seçili oldu.");
		document.getElementById(label_id).classList.add("dh-task-done");
	}
	else{
		console.log("Seçim kaldırılsın.");
		document.getElementById(label_id).classList.remove("dh-task-done");
	}
}
