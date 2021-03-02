const { query, text } = require("express");

const controller = {};
let condition = true;
controller.init = (req, res) => {

    if(req.body.tac){
        const data = req.body.tac;
        const act1 = req.body.act1;
        const act2 = req.body.act2;
        const act3 = req.body.act3;
        req.getConnection((err, conn) => {
            const text = "SELECT Network as NETWORK, Country as COUNTRY, ACT as ACCESSTECH, Frecuency as FREQUENCY FROM ( SELECT *, (SELECT ACT from (SELECT distinct tac, ACT, frecuency FROM tac_table WHERE tac = \""+ data +"\") as ttable where ttable.ACT = Subtable.ACT and ttable.frecuency = Subtable.Frecuency) as A, (SELECT frecuency from (SELECT distinct tac, ACT, frecuency FROM tac_table WHERE tac = \""+ data +"\") as ttable where ttable.ACT = Subtable.ACT and ttable.frecuency = Subtable.Frecuency) as F, (SELECT tac from (SELECT distinct tac, ACT, frecuency FROM tac_table WHERE tac = \""+ data +"\") as ttable where ttable.ACT = Subtable.ACT and ttable.frecuency = Subtable.Frecuency) as T FROM (SELECT distinct Country, ACT, Frecuency, Network FROM act) as Subtable ) as Subtable2 WHERE A is not null;"

        conn.query(text, (err, imei) => {
                if (err) {
                    res.json(err);
                }
                
                condition = false;
                const titletext = "for " + data
                res.render('imeis', {
                    data: {values: imei, tac: titletext, a1: act1, a2: act2, a3: act3}
                });
            });
        });
            
            
    }
    else {

        const data = ""
        req.getConnection((err, conn) => {
            conn.query('SELECT Network as NETWORK, Country as COUNTRY, ACT as ACCESSTECH, Frecuency as FREQUENCY FROM act', (err, imei) => {
                if (err) {
                    res.json(err);
                }
                
                condition = false;
                res.render('imeis', {
                    data: {values: imei, tac: data, a1: "2G", a2: "3G", a3: "4G"}
                });
            });
        });
    }
    
    // console.log("no emai");
    //     req.getConnection((err, conn) => {
    //         conn.query('SELECT * FROM act', (err, imei) => {
    //             if (err) {
    //                 res.json(err);
    //             }
                
    //             condition = false;
    
    //             res.render('imeis', {
    //                 data: imei
    //             });
    //         });
    //     });
    
    
};

controller.test = (req, res) => {
    
    res.redirect('../');
};


controller.show = (req, res) => {
    const data = req.body.imei;
    req.getConnection((err, conn) => {
        if (err) {
            res.send(`Errore ${err}`)  //callback
        }

        const text = "SELECT Country, A, Network FROM ( SELECT *, (SELECT ACT from (SELECT distinct tac, ACT, frecuency FROM tac_table WHERE tac = \""+ data +"\") as ttable where ttable.ACT = Subtable.ACT and ttable.frecuency = Subtable.Frecuency) as A, (SELECT frecuency from (SELECT distinct tac, ACT, frecuency FROM tac_table WHERE tac = \""+ data +"\") as ttable where ttable.ACT = Subtable.ACT and ttable.frecuency = Subtable.Frecuency) as F, (SELECT tac from (SELECT distinct tac, ACT, frecuency FROM tac_table WHERE tac = \""+ data +"\") as ttable where ttable.ACT = Subtable.ACT and ttable.frecuency = Subtable.Frecuency) as T FROM (SELECT distinct Country, ACT, Frecuency, Network FROM act) as Subtable ) as Subtable2 WHERE A is not null;"

        conn.query(text, (err, imei) => {

            if (err) {
                res.send(`Errore ${err} in database`);
            }
     
            
            
            res.render('map',{
                data: imei
            });
            
            
        })
    })
}
controller.back = (req, res) => {
    res.redirect('../');
};

module.exports = controller;