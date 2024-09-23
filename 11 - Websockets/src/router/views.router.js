import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
  res.render('websocket')
});


router.get("/vista1", (req, res) => {
  res.render("vista1", { layout: "main2.handlebars" });
});

router.get("/vista2", (req, res) => {
  res.render("vista2");
});

router.get("/vista3", (req, res) => {
  let user = {
    firstname: "John",
    lastname: "Smith",
  };
  res.render("vista3", user);
});
//NO ESTA BIEN METER EL JSON DE ESTA FORMA PERO ES PARA PROBAR.
const users = [
  // {
  //     "id": "3f07bb7f-cd21-42c9-b82a-a519a356d716",
  //     "firstname": "Pedro",
  //     "lastname": "Gomez",
  //     "email": "Pgomez@gmail.com",
  //     "code": "RodrigoAutoriza"
  // },
  // {
  //     "id": "82bf2a52-7cbf-4023-aa70-54cebf5f9fa8",
  //     "firstname": "Juan Roman",
  //     "lastname": "Riquelme",
  //     "email": "Jr_10@gmail.com"
  // },
  // {
  //     "id": "5611579d-06a0-406b-bf91-3a04b156bf81",
  //     "firstname": "Franco",
  //     "lastname": "Ahumada",
  //     "email": "Franco_Ahumada@gmail.com",
  //     "code": "RodrigoAutoriza"
  // },
  // {
  //     "id": "303ec328-3fc7-48bf-9af0-f85b9cac47c8",
  //     "firstname": "Rodrigo",
  //     "lastname": "Ceballos",
  //     "email": "Rodrigo_Ceballos@gmail.com",
  //     "code": "RodrigoAutoriza"
  // },
  // {
  //     "id": "4247106d-dcb6-4963-be43-b16757d2c865",
  //     "firstname": "Claudia",
  //     "lastname": "Ceballos",
  //     "email": "C_Ceballos@gmail.com",
  //     "code": "RodrigoAutoriza"
  // },
  // {
  //     "id": "ddc3cc85-eb96-461d-bc78-87bef7741004",
  //     "firstname": "Felipe",
  //     "lastname": "Lencina",
  //     "email": "Fl_21@gmail.com",
  //     "code": "RodrigoAutoriza"
  // }
];

router.get("/actividad", (req, res) => {
  const random = Math.floor(Math.random() * 6);
  console.log(random);
  const user = users[random];
  console.log(user);
  res.render("actividad", user);
});

router.get("/lista1", (req, res) => {
  res.render("lista1", { users });
});

router.get("/lista2", (req, res) => {
  res.render("lista2", { users });
});

router.get("/lista2", (req, res) => {
  res.render("lista2", { users });
});



export default router;
