const express = require('express')
const  routes = express()
const firebase = require('firebase')

// GET      /api/pets       get all pets
// GET      /api/pets/id    get single pet
// POST     /api/pets       add a pet
// PUT      /api/pets/id    update pet
// DELETE   /api/pets/id    remove pet


// GET ALL PETS
 routes.get('/', (req,res)=>{
    let pets=[]
    firebase.firestore().collection("pets").get().then(docs=>{
        docs.forEach(doc=>{
            pets.push({...doc.data(), ...{docid: doc.id}})
        })
            res.status(200).json({
                success: true,
                data: pets
            })
    }).catch(e=>{
        res.status(400).json({
            success: false,
            msg: e,
        })
    })
})


// GET A PET
 routes.get('/:id', (req,res)=>{
    firebase.firestore().collection("pets").doc(req.params.id).get().then(docs=>{
        res.status(200).json({
            success: true,
            data: docs.data()
        })
        }).catch(e=>{
            res.status(400).json({
                success: false,
                msg: e,
            })
        })
})


//ADD PET
 routes.post('/',(req,res)=>{
    let data = req.body

    firebase.firestore().collection('pets').add(data).then(doc=>{
        res.status(200).json({
            success: true,
            data: "Pet Registered! ID = "+doc.id,
        })
    }).catch(e=>{
        res.status(400).json({
            success: false,
            msg: e,
        })
    })

    
})


// //UPDATE
//  routes.put('/:id',(req,res)=>{
//     let updatedData = req.body
//     res.status(200).json({
//         success: true,
//         data: "Pet Updated with id "+ req.params.id,
//     })
// })


// DELETE PET
 routes.delete('/:id', (req,res)=>{
    firebase.firestore().collection("pets").doc(req.params.id).delete().then(docs=>{
        res.status(200).json({
            success: true,
            data : "Pet Adopted with id "+ req.params.id
        })
    }).catch(e=>{
        res.status(400).json({
            success: false,
            msg: e,
        })
    })
    
})


module.exports =  routes