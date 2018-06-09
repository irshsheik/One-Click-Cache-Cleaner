import iconService from '../service/IconService'

class CleanerService{
        constructor(){
            var _this = this;
            _this.LIMIT = 100;
            _this.sc = {
                appcache: 0,
                cache: 0,
                cookies: 0,
                downloads: 0,
                fileSystems: 0,
                formData: 0,
                history: 0,
                indexedDB: 0,
                localStorage: 0,
                passwords: 0,
                pluginData: 0,
                serverBoundCertificates: 0,
                serviceWorkers: 0,
                webSQL: 0,
            };

        }//constructor end

        query () {
            this.sc.cookies = 0;
            chrome.cookies.getAllCookieStores((cks) => {
                cks.forEach((ck) => {
                    chrome.cookies.getAll(
                        { storeId: ck.id },
                        (ck) => {
                            console.log('ck length',  ck.length);
                            this.add('cookies', this.sc.cookies + ck.length);
                        });
                });
            });
            
        };

        add(key, value) {
            this.sc[key] = value;
            console.log("app.caclutate = ",this.caculate(), this.LIMIT);
            if(this.caculate() >= this.LIMIT){
                console.log("Limit is high");
                iconService.setHighIcon();
            }
            else if(this.caculate() >= this.LIMIT/2){
                console.log("limit is medium");
                iconService.setMedIcon();
            }
            else if(this.caculate() < this.LIMIT/2){
                console.log("limit is low");
                iconService.setLowIcon();
            }
        };

        caculate(){
            var _sc = this.sc;
            return Object.keys( _sc)
            .reduce( function( sum, key ){
                if(typeof _sc[key] === 'number'){
                     sum = (sum || 0)+ _sc[key] ;
                }else  sum = (sum || 0) + 0;
                return sum;
            }, 0 );
        };
        
}//end class

export default new CleanerService();

