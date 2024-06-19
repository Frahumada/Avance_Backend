class TicketManager {
  #priceBaseGain = 0.15;
  constructor() {
    this.events = [];
  }

  addEvent(name, place, price, capacity = 50, date = new Date()) {
    const event = {
      id: this.#getMaxId() + 1,
      name,
      place,
      price: price + this.#priceBaseGain,
      capacity,
      date,
      participants: [],
    };
    this.events.push(event);
  }

  #getMaxId() {
    let maxId = 0;
    this.events.map((event) => {
      if (event.id > maxId) {
        maxId = event.id;
      }
    });
    return maxId;
  }

  getEvents() {
    return this.events;
  }

  addUser(idEvent, idUser) {
    const event = this.#getEvent(idEvent);
    if (event) {
      if (!event.participants.includes(idUser)) {
        event.participants.push(idUser);
      }
    } else {
      console.log("this event not exists");
    }
  }

  eventTour(idEvent, newPlace, newDate) {
    const event = this.#getEvent(idEvent);
    if (event) {
        const newEvent = {
            ...event,
            id: this.#getMaxId() + 1,
            place: newPlace,
            date: newDate,
            participants: []
    };
    this.events.push(newEvent);
    } else {console.log("this event not exists");}
  }
  #getEvent(idEvent) {
    return this.events.find((event) => event.id === idEvent);
  }
}

const ticketManager = new TicketManager();

ticketManager.addEvent("Ulises Bueno","Plaza de la musica", 4200, 10000)
ticketManager.addEvent("La Mona","Sargento Cabral", 6500, 12000)
ticketManager.addUser(1,"Oso")
ticketManager.addUser(1,"Chino")
ticketManager.addUser(1,"Matias")
ticketManager.addUser(2,"Rodrigo")
ticketManager.eventTour(2,"Comedor universitario", new Date("2024-04-25T02:02:49.637Z"))
ticketManager.addUser(3,"Rodrigo")
ticketManager.addUser(3,"Chino")
ticketManager.addUser(1,"Rodrigo")
console.log(ticketManager.getEvents())


