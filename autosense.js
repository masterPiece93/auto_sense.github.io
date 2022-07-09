var p = (v)=>{
    console.log(v)
}
const CHARS = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'.split('')
const INTS = '0123456789'.split('')
const SPECIALS = '!@#$%^&*()_-+=`~<,>./?'.split('')
const ADDITIONALS = ['Backspace']
const VALID_KEY_SPACE = [].concat(CHARS,INTS,SPECIALS,ADDITIONALS,[' '])

var keyIsValid = (k)=>{
    return VALID_KEY_SPACE.includes(k)
}
var isPositiveInt = (k)=> INTS.includes(k)
var decrementPointer = function(_p){
    if (_p > 0){
        _p--;
    }
}
var incrementPointer = function(_p){ ;_p++;}

var search_bar = document.getElementById("search_bar");
var search_type = document.getElementById("search_type");
var tag = null
var pointer = -1
var ic = -1
var cc = -1
var prev_char = null
search_bar.onkeydown = function(e){
    p(e)
    p(`prev_char : ${prev_char}`)
    let key = e.key
    if (pointer == -1){
        prev_char=null
    }
    if(e.keyCode == 8 && prev_char != 'Space'){
        if (pointer > -1){
            pointer--
        }
        if (isPositiveInt(prev_char) && ic > -1){
            ic--
        }
        if (cc > -1){
            cc--
        }
    }
}
search_bar.onkeyup = function(e){
    if (!search_bar.value){
        pointer = -1
        ic = -1
        cc = -1
    }
    let key = e.key
    if (keyIsValid(key)){
        p(key)
        
        if (e.keyCode != 8){
            pointer++
        if (isPositiveInt(key)){
            ic++
        }
        else {
            cc++
        }

        }
        p(`pointer ${pointer}`)
        p(`ic ${ic}`)
        p(`cc ${cc}`)
        
        if (pointer == 0){
            if (key=='@' || search_bar.value == '@'){
                tag = 'email'
            }
            else{
                tag = null
            }
        }
        
        if (tag != 'email'){
            if (cc > -1){
                tag = "username"
            }
            else if(cc < 0 && ic > -1){
                tag = 'wdid'
            }
            else{
                tag=null
            }
        }
        if (pointer < 0){
            tag = null
        }
        p(`${search_bar.value},${tag}`)
        
        if (e.keyCode != 8){
            prev_char = key
        }
        search_type.innerHTML = tag

    }
}
