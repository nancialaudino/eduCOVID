/*
export Object cookies{

    criarCookie : function(campo,valor){
        try {
            document.cookie=campo+'='+valor;
        
    
        } catch (error) {
            return false;
        }
        return true;
    }
    */
    
    /**Função para verificar se o cookie existe 
     getCookie : function(campo){
        try {
            var campo2= campo+'=';
            var cookie= decodeURIComponent(document.cookie);
            var cookieArray= cookie.split(';');
            for(var i=0; i<cookieArray.length;i++){
                if(cookieArray[i].includes(campo2)){
                    var valor = cookieArray[i].replace(campo2,"");
                    return valor;
                }
            }
            
        } catch (error) {
    
        }
    console.log(err)
    }
    

};


/**Função para criar cookies */




/**Remover Cookie */
