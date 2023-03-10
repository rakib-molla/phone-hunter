const loadPhones = async(searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';

    // show more button 
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
        // display 10 phones only 
        phones = phones.slice(0,10) ;
        showAll.classList.remove('d-none');
    }else{
        showAll.classList.add('d-none');
    }
    
    
    // display no phone found message 
    const noPhone = document.getElementById('no-phone-found-message');
    if (phones.length === 0) {
        
        noPhone.classList.remove('d-none');
    }else{
        noPhone.classList.add('d-none');
    }
    // display all phone 
    phones.forEach(phone =>{
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">${phone.slug}</p>
          
          <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">
              Show Details
            </button>
        </div>
      </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    });
    // stop spinner/loader
    toggleSpinner(false);
}


// 
const processSearch = (dataLimit) =>{
    // start loader
    toggleSpinner(true);

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value ;
    loadPhones(searchText, dataLimit); // search value pass using function parameter dynamic
}

// search value to show message 
document.getElementById('btn-search').addEventListener('click', function(){

    processSearch(10);

     // start loader
    // toggleSpinner(true);

    // const searchField = document.getElementById('search-field');
    // const searchText = searchField.value ;
    // loadPhones(searchText);  search value pass using function parameter dynamic
})

// search input field enter 
document.getElementById('search-field').addEventListener('keypress', function(event){
    
    if( event.key === 'Enter'){
        processSearch(10);
    }
})

// spinner/ loader add
const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }else{
        loaderSection.classList.add('d-none')
    }
}

// show all  not flexiable 
document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
})

const loadPhoneDetails =async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = (phone) =>{
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerHTML = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = ` 
        <p> Release Date: ${phone.releaseDate ? phone.releaseDate : 'release date not avilable'}</p>
        <p> Others: ${phone.mainFeatures ? phone.mainFeatures.storage : 'no storage information'}</p>
        <p> Others: ${phone.others ? phone.others.Bluetooth : 'No Blouetooth Information'}</p>
    `;
}

// loadPhones();