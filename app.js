// DOM Selectors
// Project Status
const amountBacked = document.querySelector('.amountBacked')
const totalBackers = document.querySelector('.totalBackers')
const daysLeft = document.querySelector('.daysLeft')
const toggleNav = document.querySelector('.nav-toggle')
const navbarLinks = document.querySelector('.navbar-links')
// Modal Selectors
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-btn]')
const overlay = document.getElementById('overlay')
const modalPledgeTier = document.querySelectorAll('.modal .pledge-item-container')
const pledgeModal = document.querySelector('#modal')
const thankyouModal = document.querySelector('#modal-thankyou')
// Bookmark Button
const bookmarkImg = document.querySelector('#bookmark-img')
const bookmarkSpan = document.querySelector('#bookmark-span')
const bookmarkBtn = document.querySelector('.btn-bookmark')
// Forms
const noRewardForm = document.querySelector('#no-reward')
const noRewardinput = document.querySelector('#no-reward input')
const bambooStandForm = document.querySelector('#bamboo-stand')
const bambooStandinput = document.querySelector('#bamboo-stand input')
const blackStandForm = document.querySelector('#black-stand')
const blackStandinput = document.querySelector('#black-stand input')
const mahoganyStandForm = document.querySelector('#mahogany-stand')
const mahoganyStandinput = document.querySelector('#mahogany-stand input')
// Progess Bar
const progressBar = document.querySelector('.progress-bar-fill')


// Database
const masterCraftData = {
    status:{
        amountBacked: 64500,
        goal: 100000,
        totalBackers: 56,
        daysLeft: 100
    },
    tiers:
        [
            // {
            //     name: 'No Reward',
            //     inventory: 'n/a',
            //     minPledge: 0,
            //     display: 'n/a',
            //     container: 'n/a'
            // },
            {
                name: 'Bambo Stand',
                inventory: 100,
                minPledge: 25,
                display: document.querySelectorAll('.bamboo'),
                container: document.querySelectorAll('.bamboo-container')
            },
            {
                name: 'Black Edition Stand',
                inventory: 65,
                minPledge: 75,
                display: document.querySelectorAll('.black'),
                container: document.querySelectorAll('.black-container')
            },
            {
                name: 'Mahogany Special Edition',
                inventory: 2,
                minPledge: 200,
                display: document.querySelectorAll('.mahogany'),
                container: document.querySelectorAll('.mahogany-container')
            }
        ]
}

// Pledge Form 
noRewardForm.addEventListener('submit', (evt)=>{
    const pledgeAmount = parseInt(noRewardinput.value)
    updateDB(pledgeAmount)
    updateStatusDisplay()
    updateInvDisplay()
    closeModal(modal)
    openModal(thankyouModal)
    updatePB()
    evt.preventDefault()
})

bambooStandForm.addEventListener('submit', (evt)=>{
    const pledgeAmount = parseInt(bambooStandinput.value)
    updateDB(pledgeAmount,0)
    updateStatusDisplay()
    updateInvDisplay()
    closeModal(modal)
    openModal(thankyouModal)
    outOfStock()
    updatePB()
    evt.preventDefault()
})

blackStandForm.addEventListener('submit', (evt)=>{
    const pledgeAmount = parseInt(blackStandinput.value)
    updateDB(pledgeAmount,1)
    updateStatusDisplay()
    updateInvDisplay()
    closeModal(modal)
    openModal(thankyouModal)
    outOfStock()
    updatePB()
    evt.preventDefault()
})

mahoganyStandForm.addEventListener('submit', (evt)=>{
    const pledgeAmount = parseInt(mahoganyStandinput.value)
    updateDB(pledgeAmount,2)
    updateStatusDisplay()
    updateInvDisplay()
    closeModal(modal)
    openModal(thankyouModal)
    outOfStock()
    updatePB()
    evt.preventDefault()
})

// Display Upating (on page load)
updateStatusDisplay()
updateInvDisplay()
updatePB()



// Modals and Overlay
openModalButtons.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        const modal = document.querySelector(btn.dataset.modalTarget)
        openModal(modal)
    })
})

overlay.addEventListener('click', ()=>{
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal =>{
        closeModal(modal)
    })
})

closeModalButtons.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        const modal = btn.closest('.modal')
        closeModal(modal)
    })
})

// Modal Form Show/Hide
modalPledgeTier.forEach(tier =>{
    tier.addEventListener('click', ()=>{
        const tierForm = tier.querySelector('.pledge-form-container')
        toggleForm(tier, tierForm)
    })
})

// Bookmark Button
bookmarkBtn.addEventListener('click', ()=>{
    bookmarkImg.classList.toggle('bookmarked')
    bookmarkSpan.classList.toggle('bookmarked')
    const bookmarkState = bookmarkSpan.innerHTML
    if(bookmarkState === 'Bookmark'){
        bookmarkSpan.innerHTML = 'Bookmarked'
    } else if (bookmarkState === 'Bookmarked'){
        bookmarkSpan.innerHTML = 'Bookmark'
    }
})

// Navbar
toggleNav.addEventListener('click', () =>{
    navbarLinks.classList.toggle('active')
})


// Functions
// Update Data Base after form submission
function updateDB(pledgeAmount, tier){
    masterCraftData.status.amountBacked += pledgeAmount
    masterCraftData.status.totalBackers ++
   if(tier >= 0){
       masterCraftData.tiers[tier].inventory--
   }
}

// Update Project Status Display / Inventory Display
function updateStatusDisplay(){
    amountBacked.textContent = `$${numberWithCommas(masterCraftData.status.amountBacked)}`
    totalBackers.textContent = `${numberWithCommas(masterCraftData.status.totalBackers)}`
    daysLeft.textContent = `${numberWithCommas(masterCraftData.status.daysLeft)}`
}

function updateInvDisplay(){
    masterCraftData.tiers.forEach(tier =>{
        tier.display.forEach(display =>{
            display.innerHTML = `${tier.inventory} <span>left</span>`
        })
    })
}

function outOfStock(){
    masterCraftData.tiers.forEach(tier =>{
        if(tier.inventory === 0){
            console.log(tier)
            tier.container.forEach(container =>{
                container.classList.add('out-of-stock')
                const button = container.querySelector('button')
                button.textContent = `Out of Stock`
            })
        }
    })
}


function updatePB(){
    const pbValue = (masterCraftData.status.amountBacked/masterCraftData.status.goal)*100
    console.log(pbValue)
    progressBar.style.width = `${pbValue}%`
}

// Show JavaScript Integer w/ commas
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Modals
function openModal(modal){
    if(modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal){
    if(modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
    removeForm()
}

// Modal Form Show/Hide
function toggleForm(tier, tierForm){
    removeForm()
    tier.classList.add('active')
    tierForm.classList.add('active')

}

function removeForm(){
    const openTier = document.querySelector('.pledge-item-container.active')
    const openForm = document.querySelector('.pledge-form-container.active')
    if(openTier && openForm){
        openTier.classList.remove('active')
        openForm.classList.remove('active')
    }
}
