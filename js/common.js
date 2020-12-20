

/* 별점 세팅 */
function StarRating(form,group,value,disabled){    
    var target = document[form][group];
    target.value = value;
    
    var radios = document.querySelectorAll('[name ='+group+']');
    var length = radios.length;
    for(var i = 0; i < length; i++){
        radios[i].disabled = disabled;
    }
}


/* 필터 팝업 */
function FilterPop(el, classname){        
    var el = document.querySelector(el);
    var body = document.querySelector('body');
    if(classname){            
        if(! el.classList.contains(classname)){
            el.classList.add(classname);
        }
    }
    this.show = function(isShow){        
        if(isShow){
            if(!body.classList.contains('overflow-hidden')){
                body.classList.add('overflow-hidden');
            }
        }else{
            if(body.classList.contains('overflow-hidden')){
                body.classList.remove('overflow-hidden');
            }
        }
        el.style.display = isShow ? 'block' : 'none';
    }  
}


/* 빠른주문 팝업 */
function PopQuick(el){        
    var el = document.querySelector(el);
    var body = document.querySelector('body');

    el.style.display = 'none';

    /* var btn_close = el.querySelector('.btn_close');

    btn_close.addEventListener("click",function(){
        body.classList.remove('overflow-hidden');
        el.style.display = 'none';
    }); */

    var btn_closes = el.querySelectorAll('.btn_close');
    var btn_closes_arr = Array.prototype.slice.call(btn_closes, 0);
    btn_closes_arr.forEach(function(btn){
        btn.addEventListener("click",function(e){
            body.classList.remove('overflow-hidden');
            el.style.display = 'none';
            e.preventDefault();
        })
    });
    
    this.show = function(isShow){        
        if(isShow){
            if(!body.classList.contains('overflow-hidden')){
                body.classList.add('overflow-hidden');
            }
        }else{
            if(body.classList.contains('overflow-hidden')){
                body.classList.remove('overflow-hidden');
            }
        }
        el.style.display = isShow ? 'block' : 'none';
    }    
}

/* 팝업 내 팝업 */
function PopInnerQuick(el){        
    var el = document.querySelector(el);
    var body = document.querySelector('body');
    var btn_close = el.querySelector('.btn_close');

    el.style.display = 'none';

    btn_close.addEventListener("click",function(){        
        el.style.display = 'none';
    });
    
    this.show = function(isShow){                
        el.style.display = isShow ? 'block' : 'none';
    }    
}

/* 검색어 지우기 */
function ClearSearch(target){
    var target  = document.querySelector(target);
    var input_search = target.querySelector('.input_search');
    var btn_clear = target.querySelector('.btn_clear');
    
    if(input_search.value.length){
        btn_clear.classList.add('show');
    }else{
        btn_clear.classList.remove('show');
    }

    input_search.addEventListener("input",function(e){
        if(this.value.length){
            btn_clear.classList.add('show');
        }else{
            btn_clear.classList.remove('show');
        }
    });
    btn_clear.addEventListener("click",function(){
        input_search.value = "";
        btn_clear.classList.remove('show');
    })
}

/* 수량 증가 감소 */
function NumCount(el, init){    
    var _this = this;
    _this.target = document.querySelector(el);      
    _this.btn_down = _this.target.querySelector('.btn_down');
    _this.btn_up = _this.target.querySelector('.btn_up');
    _this.num_count_value = _this.target.querySelector('.num_count_value');    
    _this.num = init;        
    _this.num_count_value.value = _this.num;       
    if(init == 0){
        _this.btn_down.disabled = true;                   
    }
    _this.btn_down.addEventListener('click',function(){       
        _this.num -= 1; 
        if(_this.num <= 0){
            this.disabled = true;                   
        }          
        _this.num_count_value.value = _this.num;        
    });
    _this.btn_up.addEventListener('click',function(){    
        _this.btn_down.disabled = false;              
        _this.num += 1;
        _this.num_count_value.value = _this.num;        
    });        
}



    


