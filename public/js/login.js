function showHide() {
    const toggler= document.getElementById('toggler')
    const password=document.getElementById('password')
    const image=document.getElementsByClassName('img')
    if (password.type === 'password') {
        password.setAttribute('type', 'text');
        // toggler.style.backgroundImage = "url('images/hide.png')";
        image[0].src='images/hide.png'
    }
    else {
        password.setAttribute('type', 'password');
        image[0].src='images/eye.png'
    }
}