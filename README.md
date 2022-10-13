# CryptoTracker
BackEnd Test of  fetching data from API CRYPTOCOMPARE. 
/*
    PLEASE USE POSTMAN TO GET ALL RESULTS .WITH CERTAIN METHODS .

    1. ADDING A OBJECT OF NEW COIN 
       
        POST method 
        URL:  http://localhost:8000/crypto/AddCoin
        Body (json): {
                        "cryptoName":"BNB",
                        "about":"CryptoPrice"
                     } 
    
    2. UPDATE AND STORE LATEST PRICE TO DATABASE AND DETAILS (OHCL) ALL COINS
        PUT method
        URL : http://localhost:8000/crypto/DetailUpdate



    
    3. UPDATE AND CONSOLE OUTPUT OF  LIVE PRICE AND OHCL OF ALL COINS
        PUT method
        URL : http://localhost:8000/crypto/live



    4. GET RES DATA OF ALL COINS
        GET method
        URL : http://localhost:8000/crypto/price
    


        5. UPDATE SINGLE COIN'S CURRENT PRICE WITH QUERY :
        PUT method
        URL : http://localhost:8000/crypto/singlePrice?coin=BTC


*/

